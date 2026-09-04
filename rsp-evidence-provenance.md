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

`session.png`, `listings.png`, `sold.png`, `agent.png` and `logo.png` are unreferenced but
still published — five files, not four. Deleting them is deferred to separate follow-up work.

## What actually enforces this — and what does not

Three independent reviews found earlier versions of this section overstating its own guards.
Each sentence below has been tested by trying to break it.

### Enforced soundly

These are properties of the published artifact, checked by shape or by hash rather than by
reasoning about CSS:

- **Every file** in `public/images/rsp/` and `out/images/rsp/` must hash to an md5 recorded in
  one of the tables above — no extension list, no format reasoning. An earlier version
  allowlisted only raster extensions, and an SVG wrapping a withheld capture as a base64
  `<image href>` published straight through it.
- No withheld md5 may appear anywhere under `public/` or `out/`.
- **No exported page** may inline an image as a `data:` URI. Hash guards cannot see bytes
  inside an HTML file, and scoping this check to one route let the same payload publish on
  another.
- Every referenced evidence binary exists in the export, so a figure cannot ship a broken
  image under a caption describing what should be there.
- **An evidence figure has no surface for a crop to attach to:** it contains exactly an
  `<img>` and a `<figcaption>`, the image is the figure's first child, it carries no class,
  and its only inline style is the `color:transparent` next/image emits. This replaces the
  hunt for cropping declarations, because that hunt cannot be sound — `app/globals.css`
  begins with `@import "tailwindcss"`, so a utility class such as
  `max-h-[620px] object-cover` compiles into a built chunk that no source scan reads. A
  wrapper `<div style="max-height:620px;overflow:hidden">` did the same. Pinning the shape
  removes both vectors instead of chasing them.
- Every screenshot **on the RSP case study** renders inside an accounted-for evidence figure
  with a label and describing caption text. HOME is scoped differently: it carries the same
  capture with descriptive alt text and, by the approved composition, no caption — so alt is
  the only description there, and it is pinned.
- The approved dek is pinned in the lede and in `<meta name="description">`, and the exact
  retired phrase family (`learning from outcomes` and its inflections) is banned across the
  whole document, metadata included.

### A tripwire, not a proof

The stylesheet scan for cropping rules reads `app/globals.css` as text. It catches the defect
that actually happened and the obvious variants — `@media`, `@supports`, `@container`,
`@layer`, later duplicates, more specific selectors, logical properties, `clip-path`, decimal
`aspect-ratio`. It cannot be sound: it does not read the built Tailwind output, and a rule
that reaches these images without naming an `rsp-` class is outside it. Treat green here as
"no known crop pattern in the source stylesheet", never as "no crop". The structural pin
above is what actually holds.

### Not enforced at all — recorded so nothing implies otherwise

- **Whether a caption is TRUE of its image.** Nothing machine-checks correspondence between
  a caption and the pixels it describes. A caption can be relabelled from PASS to BUY, with
  figures that contradict the capture, and every gate stays green. Caption accuracy is a
  human review responsibility, and it is the reason each of these captures was read against
  its image by more than one reviewer.
- **Content placed outside `images/rsp/`.** The allowlist covers the evidence directory only;
  elsewhere, only the withheld-hash blocklist applies, and a re-encode defeats a hash.
- **Alt-text quality beyond length and a generic-label check**, and uniqueness across images.
- **The tables are hand-maintained** from this script's own output, so they record "the bytes
  last published", not "these bytes are not a withheld capture". Re-running
  `scripts/generate_rsp_evidence.sh` against the originals and confirming a clean tree is
  what actually proves the derivatives are what they claim to be.

### Nothing runs on the deploy path

`main` carries only the generated export and no workflow, so
`.github/workflows/deploy-pages.yml` (which triggers on push to `main`) never fires, and
GitHub's built-in Pages deployment runs no npm gate. Every guard above is a release
precondition a human runs locally with `npm test`. It is not CI.

## A published capture with a visible app defect

`agent-scans.jpg` shows the True Botanicals row carrying the GROWLERWERKS uKeg thumbnail —
the wrong product image. It is published deliberately, with the reasoning recorded here
because `IMG_0527.jpg` was withheld for a defect of the same family.

The distinction is what the capture is offered as proof of. `IMG_0527` is market evidence,
and its `Invalid Date` sits inside the recent-sales list that IS the evidence — the defect
undermines the claim the image is making. `agent-scans.jpg` is offered as proof of the
multi-item decision ledger: decisions, categories, buy-to-sell figures and the still-open
buy/pass controls. A stale thumbnail is incidental to that claim, and cropping it away would
be the concealment these rules exist to forbid. Publishing the capture whole, and saying so
here, is the honest option. If that trade stops being acceptable, replace the capture — do
not crop it.
