"""Re-encode a JPEG carrying image data only.

`sips` preserves the source capture's EXIF into every derivative it writes, which publishes
the date and time a screenshot was taken. These captures carry no GPS and no device
identifier, so that is untidiness rather than a leak — but this repository's stated posture
is metadata-free derivatives (see ANCILLARY_CHUNKS in generate_mark_derivatives.py), and a
published binary should carry image data and nothing else.

Pixels are copied through unchanged: the image is re-encoded at the same quality with no
EXIF, ICC, or comment block attached. Nothing is cropped, resized, or colour-shifted.

    python3 scripts/strip_jpeg_metadata.py <path> [quality]
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


def strip(path: Path, quality: int) -> None:
    with Image.open(path) as image:
        if image.format != "JPEG":
            raise SystemExit(f"{path}: expected a JPEG, got {image.format}")
        # A fresh image built from the raw pixel buffer inherits no info dict, so no EXIF,
        # ICC profile or comment block can survive into save().
        clean = Image.frombytes(image.mode, image.size, image.tobytes())
    clean.save(path, "JPEG", quality=quality, optimize=True)


def main() -> None:
    if not 2 <= len(sys.argv) <= 3:
        raise SystemExit(__doc__)
    strip(Path(sys.argv[1]), int(sys.argv[2]) if len(sys.argv) == 3 else 72)


if __name__ == "__main__":
    main()
