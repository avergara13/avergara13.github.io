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

# Captures withheld from the public build. IMG_0550 exposes an order identifier and a ZIP
# code; IMG_0527 renders "Invalid Date". Neither may be published, and neither may be
# rescued by cropping — hiding a defect is exactly what the evidence rules forbid.
BLOCKED=("IMG_0550.jpg" "IMG_0527.jpg")

for blocked in "${BLOCKED[@]}"; do
  for pair in "${PAIRS[@]}"; do
    if [[ "${pair#*:}" == "$blocked" ]]; then
      echo "refusing to publish withheld capture: $blocked" >&2
      exit 1
    fi
  done
done

mkdir -p "$DEST_DIR"
for pair in "${PAIRS[@]}"; do
  name="${pair%%:*}"
  source_file="$SOURCE_DIR/${pair#*:}"
  [[ -f "$source_file" ]] || { echo "missing source capture: $source_file" >&2; exit 1; }
  sips --resampleWidth "$WIDTH" -s format jpeg -s formatOptions "$QUALITY" \
    "$source_file" --out "$DEST_DIR/$name.jpg" >/dev/null
  printf '%-22s <- %-14s %s\n' "$name.jpg" "${pair#*:}" "$(md5 -q "$DEST_DIR/$name.jpg")"
done
