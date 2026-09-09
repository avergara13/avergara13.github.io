#!/usr/bin/env bash
# Sous Chef case-study evidence derivatives.
#
# The sibling of scripts/generate_rsp_evidence.sh, and it follows the same rule: every
# published Sous Chef screenshot is a web-delivery derivative of a genuine, unaltered
# application capture supplied by Angel. The only transform is a proportional downscale
# plus JPEG re-encode — no cropping, retouching, compositing, or content change. Crop and
# scale for layout happen in CSS at render time, never in the binary, so the shipped file
# always carries the whole captured screen.
#
# Source originals live outside the repository (they are personal camera-roll files).
# sous-chef-evidence-provenance.md records the source name and md5 of both sides of every
# pair, so a reviewer can re-run this script against the originals and byte-compare.
#
# Usage: scripts/generate_sous_chef_evidence.sh [SOURCE_DIR]   (default: ~/Downloads)
set -euo pipefail

SOURCE_DIR="${1:-$HOME/Downloads}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST_DIR="$ROOT/public/images/sous-chef"
WIDTH=900          # ~2x the widest CSS render, so phone UI stays legible on HiDPI
QUALITY=72

# derivative-basename:source-file — the published evidence sequence, in narrative order.
# NOTE ON THE FILE NUMBERS. The supplied selection list mis-numbered several of these.
# Every pairing below was established by reading the PIXELS of each capture, not by
# trusting a filename: IMG_0584 is the account screen carrying a personal email address
# and a home city, and IMG_0585 is the sign-in screen — both are withheld, and both were
# named in the selection list as product surfaces. See sous-chef-evidence-provenance.md.
PAIRS=(
  "home-command-center:IMG_0576.jpg"
  "recipe-library:IMG_0578.jpg"
  "recipe-record:IMG_0586.jpg"
  "recipe-structure:IMG_0587.jpg"
  "assistant-in-context:IMG_0581.jpg"
  "research-desk:IMG_0582.jpg"
  "pantry-inventory:IMG_0583.jpg"
  "collections:IMG_0577.jpg"
)

# Enforcement is by CONTENT, never by filename — a name check is trivially defeated, and it
# cannot see a withheld capture supplied through a different SOURCE_DIR at all.
# sous-chef-evidence-provenance.md is the single source of truth for both tables; this
# script reads it so the two can never drift.
PROVENANCE="$ROOT/sous-chef-evidence-provenance.md"
[[ -f "$PROVENANCE" ]] || { echo "missing $PROVENANCE" >&2; exit 1; }

# Withheld md5s live under the "## Withheld captures" heading; published source md5s are a
# column of the table above it. Reading the whole file would mix the two.
withheld_md5s="$(awk '/^## Withheld captures/,/^## What the case study publishes/' "$PROVENANCE" \
  | grep -oE '`[0-9a-f]{32}`' | tr -d '`')"
withheld_count="$(printf '%s\n' "$withheld_md5s" | grep -c . || true)"
[[ "$withheld_count" -ge 1 ]] || { echo "expected withheld md5s in $PROVENANCE" >&2; exit 1; }

source_md5_for() {  # published row: | `asset.jpg` | `IMG_x.jpg` | `source md5` | `derivative md5` |
  grep -E "^\| \`$1\` \|" "$PROVENANCE" | grep -oE '`[0-9a-f]{32}`' | head -1 | tr -d '`'
}

mkdir -p "$DEST_DIR"
for pair in "${PAIRS[@]}"; do
  name="${pair%%:*}"
  capture="${pair#*:}"
  source_file="$SOURCE_DIR/$capture"
  [[ -f "$source_file" ]] || { echo "missing source capture: $source_file" >&2; exit 1; }

  actual="$(md5 -q "$source_file")"
  if printf '%s\n' "$withheld_md5s" | grep -qx "$actual"; then
    echo "refusing to publish withheld capture: $source_file (md5 $actual)" >&2
    exit 1
  fi
  expected="$(source_md5_for "$name.jpg")"
  if [[ -n "$expected" && "$actual" != "$expected" ]]; then
    echo "source bytes for $name.jpg do not match the provenance record" >&2
    echo "  expected md5 $expected, read $actual from $source_file" >&2
    exit 1
  fi

  sips --resampleWidth "$WIDTH" -s format jpeg -s formatOptions "$QUALITY" \
    "$source_file" --out "$DEST_DIR/$name.jpg" >/dev/null

  # sips carries the capture's EXIF through into the derivative, which publishes the
  # date and time each screenshot was taken. There is no GPS and no device identifier in
  # these files, so this is tidiness rather than a leak — but the project's stated posture
  # is metadata-free derivatives (see the ancillary-chunk ban in
  # generate_mark_derivatives.py), and a published binary should carry image data only.
  # Pixels are copied through untouched; only the metadata block is dropped.
  python3 "$ROOT/scripts/strip_jpeg_metadata.py" "$DEST_DIR/$name.jpg" "$QUALITY"

  printf '%-24s <- %-14s %s\n' "$name.jpg" "$capture" "$(md5 -q "$DEST_DIR/$name.jpg")"
done
