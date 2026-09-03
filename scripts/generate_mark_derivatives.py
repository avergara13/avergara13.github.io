"""Generate the web-delivery derivatives of the canonical project marks.

The canonical marks are owner-supplied binaries and are never modified: this script only
reads them. Both the originals and the derivatives are pinned by SHA-256 below, so the
script fails closed if either side is ever altered and every derivative stays mechanically
traceable to a known-good source.

Pinning the derivative's complete digest — rather than checking properties one at a time —
is what makes `--check` meaningful: dimensions, colour mode, pixel content and ancillary
metadata chunks are all covered by the one comparison. When a digest does not match, the
script reports which of those actually differs so the failure is actionable.

Marks render at 112px on desktop and 88px on mobile. Derivatives are emitted at 336px,
three times the desktop size, which stays crisp through 3x displays while removing roughly
94% of the transfer weight of the originals.

Requires Python with `pillow`.

    python3 scripts/generate_mark_derivatives.py           # write derivatives
    python3 scripts/generate_mark_derivatives.py --check    # verify without writing
"""

from __future__ import annotations

import argparse
import hashlib
import io
import struct
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RENDERED_WIDTH_DESKTOP = 112
DERIVATIVE_PX = RENDERED_WIDTH_DESKTOP * 3

# canonical original -> (sha256 of the original, sha256 of the committed derivative)
MARKS = {
    "public/images/loft-os/logo.png": (
        "b040f5248301bac5868502db3f2502b746206c4dbe459ae6bb9fbe8e195b7567",
        "0e2d0ebe4ec470aacea8c065e0d3a53ea5b665061ba0668c7ba3417aa9de049c",
    ),
    "public/images/rsp/mark.png": (
        "3df208121f32da59784c20a00601f296b909dd6a3fe9cd4aefcad64f63532006",
        "c6c863b8a61bb7ac24e0a31c1eefc2f7074e946a0ec7d3e97f5129bfa8e3175c",
    ),
}

# PNG chunks that are not image data. Derivatives must carry none of them.
ANCILLARY_CHUNKS = {"tEXt", "iTXt", "zTXt", "eXIf", "caBX", "iCCP"}


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def derivative_path(source: Path) -> Path:
    return source.with_name(f"{source.stem}-{DERIVATIVE_PX}{source.suffix}")


def ancillary_chunks(data: bytes) -> list[str]:
    found, offset = [], 8
    while offset + 8 <= len(data):
        length = struct.unpack(">I", data[offset : offset + 4])[0]
        name = data[offset + 4 : offset + 8].decode("latin-1", "replace")
        if name in ANCILLARY_CHUNKS:
            found.append(name)
        offset += 12 + length
    return found


def render(source: Path) -> bytes:
    with Image.open(source) as image:
        if image.width != image.height:
            raise ValueError(f"expected a square mark, got {image.width}x{image.height}")
        resized = image.convert("RGB").resize((DERIVATIVE_PX, DERIVATIVE_PX), Image.LANCZOS)
    buffer = io.BytesIO()
    resized.save(buffer, "PNG", optimize=True)
    return buffer.getvalue()


def explain(committed: bytes, expected: bytes) -> str:
    """Say what actually differs, so a digest mismatch is actionable."""
    with Image.open(io.BytesIO(committed)) as a, Image.open(io.BytesIO(expected)) as b:
        if a.size != b.size:
            return f"dimensions are {a.size[0]}x{a.size[1]}, expected {b.size[0]}x{b.size[1]}"
        if a.mode != b.mode:
            return f"colour mode is {a.mode}, expected {b.mode}"
        if a.tobytes() != b.tobytes():
            return "pixel content differs from the canonical original"
    extra = ancillary_chunks(committed)
    if extra:
        return f"carries metadata chunks {extra}; derivatives must carry none"
    return "byte content differs while pixels match — likely re-encoded; regenerate and update the pin"


def build(check_only: bool) -> int:
    failures = 0
    for rel, (source_digest, derivative_digest) in MARKS.items():
        source = ROOT / rel
        actual_source = sha256_bytes(source.read_bytes())
        if actual_source != source_digest:
            print(
                f"FAIL {rel}: canonical original changed\n"
                f"       expected {source_digest}\n"
                f"       actual   {actual_source}"
            )
            failures += 1
            continue

        expected_bytes = render(source)
        target = derivative_path(source)

        if not check_only:
            target.write_bytes(expected_bytes)

        if not target.exists():
            print(f"FAIL {rel}: derivative missing at {target.relative_to(ROOT)}")
            failures += 1
            continue

        committed = target.read_bytes()
        actual_derivative = sha256_bytes(committed)
        if actual_derivative != derivative_digest:
            print(
                f"FAIL {target.relative_to(ROOT)}: {explain(committed, expected_bytes)}\n"
                f"       expected {derivative_digest}\n"
                f"       actual   {actual_derivative}"
            )
            failures += 1
            continue

        print(
            f"ok   {rel}\n"
            f"       source {actual_source[:16]}… {len(source.read_bytes()):,} bytes\n"
            f"       -> {target.relative_to(ROOT)} {actual_derivative[:16]}… "
            f"{len(committed):,} bytes ({DERIVATIVE_PX}x{DERIVATIVE_PX}, no metadata)"
        )

    return failures


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="verify without writing derivatives")
    args = parser.parse_args()
    if build(args.check):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
