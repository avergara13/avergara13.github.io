"""Generate web-delivery derivatives of the canonical project marks.

The canonical marks are owner-supplied binaries and are never modified: this script only
reads them. Their SHA-256 digests are pinned below, so the script fails closed if a
canonical original is ever altered, and every derivative is therefore mechanically
traceable to a known-good source.

Marks render at 112px on desktop and 88px on mobile. Derivatives are emitted at 336px,
three times the desktop size, which stays crisp through 3x displays while removing
roughly 94% of the transfer weight of the originals.

Requires Python with `pillow`.

    python3 scripts/generate_mark_derivatives.py           # write derivatives
    python3 scripts/generate_mark_derivatives.py --check    # verify without writing
"""

from __future__ import annotations

import argparse
import hashlib
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RENDERED_WIDTH_DESKTOP = 112
DERIVATIVE_PX = RENDERED_WIDTH_DESKTOP * 3

# canonical original -> pinned SHA-256 of that original
MARKS = {
    "public/images/loft-os/logo.png": "b040f5248301bac5868502db3f2502b746206c4dbe459ae6bb9fbe8e195b7567",
    "public/images/rsp/mark.png": "3df208121f32da59784c20a00601f296b909dd6a3fe9cd4aefcad64f63532006",
}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def derivative_path(source: Path) -> Path:
    return source.with_name(f"{source.stem}-{DERIVATIVE_PX}{source.suffix}")


def build(check_only: bool) -> int:
    failures = 0
    for rel, expected in MARKS.items():
        source = ROOT / rel
        actual = sha256(source)
        if actual != expected:
            print(f"FAIL {rel}: canonical original changed\n  expected {expected}\n  actual   {actual}")
            failures += 1
            continue

        with Image.open(source) as image:
            if image.width != image.height:
                print(f"FAIL {rel}: expected a square mark, got {image.width}x{image.height}")
                failures += 1
                continue
            resized = image.convert("RGB").resize((DERIVATIVE_PX, DERIVATIVE_PX), Image.LANCZOS)

        target = derivative_path(source)
        if not check_only:
            resized.save(target, "PNG", optimize=True)

        if not target.exists():
            print(f"FAIL {rel}: derivative missing at {target.relative_to(ROOT)}")
            failures += 1
            continue

        # Existence is not verification: a stale, truncated, or hand-replaced derivative
        # would still be a file. Compare the committed derivative's decoded pixels against
        # the freshly computed ones. Pixel comparison rather than a byte hash so that a
        # different Pillow build does not raise a false alarm while a wrong image still does.
        with Image.open(target) as committed:
            # The generator always writes RGB. Reject anything else before normalising:
            # an RGBA replacement whose colour channels match but whose alpha is
            # transparent would survive a convert("RGB") comparison while the browser
            # painted a faded or missing mark.
            if committed.mode != "RGB":
                print(
                    f"FAIL {rel}: derivative mode is {committed.mode}, expected RGB "
                    f"(an alpha channel would change what the browser paints)"
                )
                failures += 1
                continue
            committed_rgb = committed.convert("RGB")
            if committed_rgb.size != resized.size:
                print(
                    f"FAIL {rel}: derivative is {committed_rgb.size[0]}x{committed_rgb.size[1]}, "
                    f"expected {DERIVATIVE_PX}x{DERIVATIVE_PX}"
                )
                failures += 1
                continue
            if committed_rgb.tobytes() != resized.tobytes():
                print(f"FAIL {rel}: derivative does not match the canonical original")
                failures += 1
                continue

        print(
            f"ok   {rel}\n"
            f"       source {actual[:16]}… {source.stat().st_size:,} bytes\n"
            f"       -> {target.relative_to(ROOT)} {sha256(target)[:16]}… "
            f"{target.stat().st_size:,} bytes ({DERIVATIVE_PX}x{DERIVATIVE_PX}) pixels verified"
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
