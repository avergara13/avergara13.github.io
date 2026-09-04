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

`public/images/rsp/` also holds the project marks and the retired placeholder screenshots
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

`session.png`, `listings.png`, `sold.png`, `agent.png`, `logo.png` and `mark.png` are all
unreferenced by the export and still published — six files. (`mark.png` is the canonical
source `scripts/generate_mark_derivatives.py` reads to produce `mark-336.png`, which IS
referenced; it is kept deliberately.) Deleting the rest is deferred to separate follow-up work.

## What actually enforces this — and what does not

Four independent reviews have now found some version of this section overstating its own
guards. The pattern is the point: a text-inspecting test suite cannot prove a *rendered*
property, and every round that claimed otherwise was refuted within minutes. This version
claims no soundness for the crop guards at all.

### Checked by hash or by shape

- **Every file at or below** `public/images/rsp/` and `out/images/rsp/` must hash to an md5 in
  a table above — no extension list, no format reasoning, subdirectories included.
- No withheld md5 may appear anywhere under `public/` or `out/`.
- No exported HTML page may inline an image as a `data:` URI.
- Every referenced evidence binary exists in the export.
- Inside an evidence figure there is no surface for a crop: it holds exactly an `<img>` and a
  `<figcaption>`, the image is the first child, carries no class, and its only inline style is
  the one next/image emits.
- Each RSP evidence image has a label and describing caption text; HOME carries the same
  capture with pinned alt and, by the approved composition, no caption.
- The approved dek is pinned in the lede and in `<meta name="description">`, and the phrase
  family `learning from outcomes` (plus `learns`/`learned`/`smarter from outcomes`) is banned
  document-wide. Close paraphrases such as "learning from *its* outcomes" are not caught.

### Not proven — and here is exactly where it leaks

The crop guards are layers, not proofs. Known open vectors, each demonstrated by review:

- **Ancestors are unchecked.** A sizing utility class or an inline `max-height`/`overflow` on
  any element ABOVE an evidence figure crops it, and nothing looks there.
- **The stylesheet scan is partial.** It reads `app/globals.css` for `object-fit`, `clip-path`,
  height and aspect-ratio. It does not check `margin`, `transform`, `translate`, `position`,
  `inset` or `object-position`; a negative margin on `.rsp-proof-frame img` crops with the
  suite green. It also cannot read the built Tailwind chunk.
- **CSS can substitute the image entirely** via `content:url(data:…)`, which no hash sees and
  the HTML-only `data:` ban does not reach.
- **HOME deliberately crops.** `.product-evidence-slot img` uses `object-fit:cover` at
  `aspect-ratio:900/1215`, showing the top 62.3% of the capture. That framing is intentional
  and accepted; the whole capture is published uncropped on the case study. No test pins the
  ratio, so a change there would be silent.

Only a rendered-geometry measurement — loading the built page in a browser and comparing each
evidence image's painted box against its natural ratio and its ancestors' clip rects — would
close this class. That is tracked as follow-up work, not claimed here.

### Not enforced at all

- **Whether a caption is TRUE of its image.** A PASS figure can be relabelled BUY with
  invented figures and every gate stays green. This is a human review responsibility, and it
  is why each capture was read against its pixels by more than one reviewer.
- Content placed outside `images/rsp/`; alt-text quality beyond length and a generic-label
  check; uniqueness across images.
- **The tables are hand-maintained** from the script's own output, so they record "the bytes
  last published", not "these bytes are not a withheld capture". Re-running
  `scripts/generate_rsp_evidence.sh` against the originals and confirming a clean tree is what
  actually proves the derivatives are what they claim to be.

### Nothing runs on the deploy path

`main` carries only the generated export and no workflow at all, so
`.github/workflows/deploy-pages.yml` — which exists only on source branches and triggers on
push to `main` plus manual dispatch — never fires there, and GitHub's built-in Pages
deployment runs no npm gate. Every guard above is a release precondition a human runs locally
with `npm test`. It is not CI.

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
