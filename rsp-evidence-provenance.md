# RSP case-study evidence — provenance (TSK-974)

Every RSP screenshot published by this repository is a web-delivery derivative of a
genuine, unaltered Resale Scanner Pro capture supplied by Angel on 2026-09-04. The only
transform applied to any published binary is a proportional downscale (1290 -> 900px wide)
plus a JPEG re-encode at quality 72. Nothing is cropped, retouched, composited, or
otherwise altered in the file: the shipped binary always contains the entire captured
screen, and layout scale is CSS-only. Regenerate with:

    scripts/generate_rsp_evidence.sh [SOURCE_DIR]   # default ~/Downloads

The source originals are personal camera-roll files and are intentionally NOT committed.
The hashes below let a reviewer re-run the script against the originals and byte-compare.

| Published asset | Source capture | Source md5 | Derivative md5 |
|---|---|---|---|
| `session-overview.jpg` | `IMG_0553.jpg` | `4b661a9bf82dcb113d289f29404701b3` | `edda3498fafaa936a12a7edb004893c7` |
| `capture-ai-lens.jpg` | `IMG_0540.jpg` | `eff38432791b0c7a71bc76ee15d9fa0d` | `c7d02ab796318a2410e02a2b038b5b42` |
| `analysis-buy.jpg` | `IMG_0526.jpg` | `6f9da0359254d1fc6353296078aee97b` | `f9d740efe394452d8f45b5f9dc679cf4` |
| `decision-pass.jpg` | `IMG_0541.jpg` | `b6d5b5c3a18e85312d102a3864b0d06c` | `f937c1c37188e13ad22ad99e42baaf80` |
| `listing-preparation.jpg` | `IMG_0538.jpg` | `5fdba30f426915cd73a155730c67fc0f` | `cfdda220e6e2b2d2940ebde4e1796b84` |
| `agent-scans.jpg` | `IMG_0547.jpg` | `10c40757ff05cb879c6b03c092389774` | `c9a3567a343c51b30b807b62f58c8d55` |
| `agent-recap.jpg` | `IMG_0548.jpg` | `c4d38c9dfe1cd9928d2f1a3317d2ec26` | `6cb18f5efd73009e9d19ebb0d2c586ac` |

## Withheld captures

Two supplied captures are permanently excluded from the public build. Neither may be
rescued by cropping: removing a defect or an identifier by framing is precisely the kind
of concealment the evidence rules forbid, so the whole capture is withheld instead.

| Capture | Source md5 | Reason withheld |
|---|---|---|
| `IMG_0550.jpg` | `8a3e3bd44e047cbfdc7de570ecb6cd16` | Exposes a customer order identifier and a ZIP code. |
| `IMG_0527.jpg` | `bbd4c19bc4f23dd4963b93f8031666de` | Renders `Invalid Date` in the recent-sales list. |

One further capture was reviewed and not published for editorial reasons only:
`IMG_0546.jpg` shows the same AI Lens capture state already proven by `IMG_0540.jpg` with a
different item, so it would repeat a capability rather than add one.

## Non-evidence images in the same directory

`public/images/rsp/` also holds the project marks and four retired placeholder screenshots
that no longer have a referrer. They are recorded here so the allowlist below can tell
"known non-evidence asset" from "a binary nobody vouched for" — anything in that directory
matching neither table fails.

| File | md5 |
|---|---|
| `agent.png` | `c4eaa3e93e55cbbb7eed9f97b7affd4d` |
| `listings.png` | `3feec575ccb028ebaf5cdb935147d1c2` |
| `logo.png` | `2cdf380932a0fdc6d0ccf380310ef50f` |
| `mark-336.png` | `e9e1112508e26e5bb72884decbc2d887` |
| `mark.png` | `863667f2468f458ca77d8d904065a1b9` |
| `session.png` | `7713298fc0bd85e463ec8d5248b42a15` |
| `sold.png` | `8d6311fa55c060dcd6c5b5f7ebf33ea0` |

`session.png`, `listings.png`, `sold.png` and `agent.png` are unreferenced but still
published; deleting them is tracked as separate follow-up work.

## What actually enforces this — and what does not

Two independent reviews found earlier versions of this section overstating its own guards.
This version states the limits.

**Enforced soundly** (a property of the published artifact, not of a text scan):

- Every raster in `public/images/rsp/` and `out/images/rsp/` must hash to an md5 recorded in
  one of the tables above, for any image format — so a withheld capture renamed, moved into a
  subdirectory, or re-encoded to PNG fails.
- No withheld md5 may appear anywhere under `public/` or `out/`.
- The RSP page ships no `<style>` element, no `data:` image URI, and no geometric inline
  style on an evidence image — the three routes by which a page can crop or smuggle content
  past any stylesheet scan.
- Every screenshot on the page renders inside an evidence figure that has a label and
  describing caption text; the project mark is the only permitted exception.
- The approved dek is pinned in the lede and in `<meta name="description">`, and the retired
  outcome-loop claim is banned document-wide in any inflection.

**A tripwire, not a proof.** The stylesheet scan for cropping rules reads `app/globals.css`
as text. It catches the defect that actually happened and the obvious variants — media
blocks (including non-plain conditions), later duplicates, more specific selectors, logical
properties, `clip-path`, decimal `aspect-ratio` — but a CSS text scan cannot enumerate every
selector that could reach these images. `@layer`, `@container`, `:is()` forms that avoid the
class names, and rules in a stylesheet this scan does not read remain outside it. Treat a
green here as "no known crop pattern", never as "no crop".

**Nothing runs on the deploy path.** `main` carries only the generated export and no
workflow, so `.github/workflows/deploy-pages.yml` (which triggers on push to `main`) never
fires, and GitHub's built-in Pages deployment runs no npm gate. Every guard above is a
release precondition a human must run locally with `npm test`. It is not CI.

**The allowlist is scoped and self-certifying.** It covers `images/rsp/` only; content placed
in another directory is checked against the withheld hashes alone. And the tables are
maintained by hand from this script's own output, so they record "the bytes last published",
not "these bytes are not a withheld capture". Re-running
`scripts/generate_rsp_evidence.sh` against the originals and confirming a clean tree is what
actually proves the derivatives are what they claim to be.
