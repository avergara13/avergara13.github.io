#!/usr/bin/env bash
# TSK-974 — RSP case-study evidence derivatives.
#
# Every published RSP screenshot is a web-delivery derivative of a genuine, unaltered
# application capture supplied by Angel. The only transform is a proportional downscale
# plus JPEG re-encode: no cropping, retouching, compositing, or content change. Crop and
# scale for layout happen in CSS at render time, never in the binary, so the shipped file
# always carries the whole captured screen.
#
# Source originals live outside the repository (they are personal camera-roll files).
# rsp-evidence-provenance.md records the source name and md5 of both sides of every pair,
# so a reviewer can re-run this script against the originals and byte-compare the result.
#
# Usage: scripts/generate_rsp_evidence.sh [SOURCE_DIR]   (default: ~/Downloads)
set -euo pipefail

SOURCE_DIR="${1:-$HOME/Downloads}"
DEST_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/public/images/rsp"
WIDTH=900          # ~2x the widest CSS render (≈460px), so phone UI stays legible on HiDPI
QUALITY=72

# derivative-basename:source-file — the published evidence sequence, in narrative order.
PAIRS=(
  "session-overview:IMG_0553.jpg"
  "capture-ai-lens:IMG_0540.jpg"
  "analysis-buy:IMG_0526.jpg"
  "decision-pass:IMG_0541.jpg"
  "listing-preparation:IMG_0538.jpg"
  "agent-scans:IMG_0547.jpg"
  "agent-recap:IMG_0548.jpg"
)

# Enforcement is by CONTENT, never by filename. A name check is trivially defeated —
# `img_0550.jpg`, `IMG_0550.JPG` and `./IMG_0550.jpg` all open the same withheld bytes — and
# it cannot see a withheld capture supplied through a different SOURCE_DIR at all.
# rsp-evidence-provenance.md is the single source of truth for both tables; this script
# reads it so the two can never drift.
PROVENANCE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/rsp-evidence-provenance.md"
[[ -f "$PROVENANCE" ]] || { echo "missing $PROVENANCE" >&2; exit 1; }

# Withheld md5s live under the "## Withheld captures" heading; published source md5s are the
# third column of the table above it. Reading the whole file would mix the two.
withheld_md5s="$(awk '/^## Withheld captures/,/^## What actually/' "$PROVENANCE" \
  | grep -oE '`[0-9a-f]{32}`' | tr -d '`')"
[[ "$(printf '%s\n' "$withheld_md5s" | grep -c .)" -eq 2 ]] || { echo "expected 2 withheld md5s in $PROVENANCE" >&2; exit 1; }

source_md5_for() {  # published-table row: | `asset.jpg` | `IMG_x.jpg` | `source md5` | `derivative md5` |
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
  printf '%-22s <- %-14s %s\n' "$name.jpg" "$capture" "$(md5 -q "$DEST_DIR/$name.jpg")"
done
