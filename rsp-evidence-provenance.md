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

| Capture | Reason withheld |
|---|---|
| `IMG_0550.jpg` | Exposes a customer order identifier and a ZIP code. |
| `IMG_0527.jpg` | Renders `Invalid Date` in the recent-sales list. |

One further capture was reviewed and not published for editorial reasons only:
`IMG_0546.jpg` shows the same AI Lens capture state already proven by `IMG_0540.jpg` with a
different item, so it would repeat a capability rather than add one.

`scripts/generate_rsp_evidence.sh` fails closed if a withheld capture is ever added to its
publish list, and `tests/rendered-html.test.mjs` asserts the withheld filenames never reach
the build output.
