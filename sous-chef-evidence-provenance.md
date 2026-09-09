# Sous Chef case-study evidence — provenance

The companion to `rsp-evidence-provenance.md`, under the same rule: every published Sous
Chef screenshot is a web-delivery derivative of a genuine, unaltered application capture
supplied by Angel on 2026-09-09. The only transform applied to any published binary is a
proportional downscale (1290 → 900px wide) plus a JPEG re-encode at quality 72. Nothing is
cropped, retouched, composited, or otherwise altered: the shipped binary always contains the
whole captured screen, and layout framing is CSS-only. Regenerate with:

    scripts/generate_sous_chef_evidence.sh [SOURCE_DIR]   # default ~/Downloads

The source originals are personal camera-roll files and are intentionally NOT committed.
The hashes below let a reviewer re-run the script against the originals and byte-compare.

Each derivative is re-encoded with `scripts/strip_jpeg_metadata.py` so it carries image data
only. `sips` preserves the capture's EXIF, which would publish the date and time each
screenshot was taken; there is no GPS or device identifier in these files, so that was
untidiness rather than a leak, but a published binary should carry pixels and nothing else.
The RSP derivatives predate this step and still carry their EXIF timestamps — recorded here
as known follow-up work rather than repaired inside this change, since they are reviewed,
hash-pinned assets belonging to another provenance record.

## The mark

`public/images/sous-chef/mark.jpeg` is the official Sous Chef app icon exactly as Angel
supplied it — the same binary, unmodified. It is a JPEG and is kept as one; it is not
converted, recomposed, or re-encoded in place. The 336px web derivative is produced by
`scripts/generate_mark_derivatives.py`, the same pinned pipeline that produces the Loft OS
and RSP marks, and both sides are hash-pinned there.

| File | Role | md5 |
|---|---|---|
| `mark.jpeg` | canonical original, owner-supplied (1254×1254) | `e8121ad2135ca3f6334aa8194e1ad96c` |
| `mark-336.png` | web-delivery derivative, 336×336, no metadata | `c437aa88bfdaa1dc85a4d04b5b7a834e` |

`derivative_path()` in that script emits `.png` regardless of the original's container,
because `render()` always encodes PNG. Before this change it derived the name from the
source suffix, which would have written a PNG to `mark-336.jpeg`.

## Published evidence

| Published asset | Source capture | Source md5 | Derivative md5 |
|---|---|---|---|
| `home-command-center.jpg` | `IMG_0576.jpg` | `49621cc8b803b4b92b821c14cbc16f02` | `d1d8917a1c10f9cd5b00062a260f6be3` |
| `recipe-library.jpg` | `IMG_0578.jpg` | `0adf2f3fcf04f8b0aa3edf89d8d65c32` | `0e18c85cb44908e577cdda53a3eb0239` |
| `recipe-record.jpg` | `IMG_0586.jpg` | `af8e832bd2157dd6f689dc81735215f4` | `3bc256ca34007d78c97a306b2ee23452` |
| `recipe-structure.jpg` | `IMG_0587.jpg` | `8e1ae1740fea6f0e1355a2c8b374df20` | `8c3b237d72804b2ed09538b719571309` |
| `assistant-in-context.jpg` | `IMG_0581.jpg` | `453005e676a9bcf61ebd6e2a00de2a75` | `ddadad1e5dd69757e856757b2d1cbda3` |
| `research-desk.jpg` | `IMG_0582.jpg` | `134e68d88ab1667d0cef5ba537960cc1` | `89fcc4967a74561a684ab923c045a37a` |
| `pantry-inventory.jpg` | `IMG_0583.jpg` | `3ea1b736d3e261236dff4dc5958aeab2` | `e94716fb4ba37dc4f2ec18dee0b77b57` |
| `collections.jpg` | `IMG_0577.jpg` | `28a2770c09ed6903d11a0fd03d457463` | `672b63645d2391167ea09ccabe862ccc` |

### The file numbers in the supplied selection list were wrong

The selection list that accompanied these captures mis-numbered several of them. Every
pairing above was established by **reading the pixels of each file**, not by trusting a
filename, and the differences are not cosmetic:

- The list named `IMG_0584` as "Pantry Inventory". It is the **Account & Preferences
  screen**, carrying Angel's personal email address in plain text, a city-level location,
  and a membership tier. Publishing on the list's numbering would have put a scrapable
  personal email and a home city on a public employer-facing page.

  This file is itself committed to a public repository, so it deliberately describes what
  the withheld capture contains without reproducing any of it. Naming the city here would
  have leaked the thing the withhold exists to protect.
- The list named `IMG_0587` as the account screen to exclude. It is in fact the **second
  half of the recipe detail** — servings, the ingredient list, and the numbered method — and
  is one of the strongest captures in the set.
- The list named `IMG_0585` as the principal recipe-detail evidence. It is the **sign-in
  screen**.

This is why the accompanying instruction not to assume a selected image passes review is
load-bearing, and why the generator script matches on md5 rather than on filename.

## Withheld captures

Neither may be rescued by cropping: removing an identifier by framing is precisely the
concealment the evidence rules forbid, so the whole capture is withheld.

| Capture | Source md5 | Reason withheld |
|---|---|---|
| `IMG_0584.jpg` | `eda01b3429d6897e7c9c49b778820b52` | The account screen. Renders Angel's personal email address in full plain text, a city-level location, and a membership tier, on an authenticated profile card. |
| `IMG_0585.jpg` | `18aeab8bb5a4a2b9274ac955e08670ef` | The sign-in screen. Its copy — `LIVE DONOR SHELL`, `CANONICAL AUTH`, "the existing Gemini-powered studio shell", `GOOGLE AI STUDIO SHELL PRESERVED. SUPABASE AUTH ONLY.` — is internal-sounding and describes an AI arrangement the application has since moved away from, so it would be stale architectural wording published as current proof. |

Four further captures were reviewed and not published for editorial reasons only. Each
duplicates evidence a published capture already carries, and a case study that showed both
would be repeating a capability rather than adding one:

| Capture | Source md5 | Why not published |
|---|---|---|
| `IMG_0579.jpg` | `d20f0aa7f9254d0bc998581eff5c1d6d` | Dark recipe detail (Grilled Salmon). Same evidence as `recipe-record.jpg`. |
| `IMG_0580.jpg` | `223f9b6c1e64a17fc33bf3cc26359287` | Dark recipe detail (Sesame Noodles). Same evidence as `recipe-record.jpg`. |
| `IMG_0589.jpg` | `f55682414607d7d104a70f2410ebdcaf` | Light recipe library. Same evidence as `recipe-library.jpg`. |
| `IMG_0590.jpg` | `cea471440d12534846f75a6f391d459b` | Light home. Same evidence as `home-command-center.jpg`. |

## Three earlier binaries removed

All three previously-published Sous Chef images were removed. None was what the page said
it was, and the defect had been live on the public site.

| Removed file | md5 | What it actually showed | Why it had to go |
|---|---|---|---|
| `desktop.png` | `51e677dec78b3d1ebb4814cf662b33bf` | the **sign-in screen** | Published with `alt="Sous Chef desktop application showing recipe and culinary workspace"`. The page claimed a culinary workspace and showed a login form, and rendered the internal strings `LIVE DONOR SHELL` and `GOOGLE AI STUDIO SHELL PRESERVED. SUPABASE AUTH ONLY.` on a public recruiter surface. |
| `mobile.png` | `7ad0d950752bc4be820a5880e8c17945` | the **sign-in screen**, narrow | Published with `alt="Sous Chef mobile application"`. Same defect, same internal strings. |
| `banner.png` | `cb7626d65ae48156a9e4bb9cf3c3f50a` | a **Google AI Studio marketing banner** | Third-party product branding, not Angel's work and not Sous Chef. Unreferenced by the export, but sitting in the published asset directory where a reader would take it for project evidence. |

None of these three md5s may reappear under `public/` or `out/`.

## What the case study publishes besides captures

`components/KitchenPass.tsx` — an original decorative SVG in the same register as
`components/SystemsLattice.tsx` on the Loft OS stage: explanatory diagram *language*. It
carries no numbers, no readable labels, no window chrome and no device frame, so it cannot
be read as a screenshot. It is `aria-hidden`; the adjacent copy carries the meaning.

## Caption law for this set

Three things are visible in these captures that a caption must NOT convert into a claim.
Each was checked against the application source, not inferred from the image:

1. **The HOME "Kitchen Status" and "Inventory Status" tiles are hard-coded display
   strings**, not computed telemetry (`HomeScreen.tsx` — `useState(true)` never updated, and
   a literal `85% Stocked • 2 Low`). No caption presents them as live state. The Pantry
   screen's four stat tiles, by contrast, *are* computed live from inventory, and the
   caption for that capture says so.
2. **"Pantry Value" is a personal grocery total** — `inventory.reduce((a, c) => a + c.price, 0)`.
   It is not recipe costing, food-cost authority, or restaurant economics, and it is not
   evidence of the planned Pro direction.
3. **A visible AI panel is not a passing end-to-end test.** The assistant captures show the
   surface and its stated scope; they are not offered as proof that an authenticated
   post-containment request succeeded, and that verification remains open.

The recipe content shown ("Spicy Arrabbiata with Fresh Basil" and its grandmother origin
story) is bundled fixture content shipped in the application's own source, not Angel's
private family data. The `LOCKED` badge is the recipe protection lifecycle — `status`
`'locked'` plus `locked_at` — and not a paywall, entitlement, or subscription gate.

## What is enforced mechanically

In `tests/rendered-html.test.mjs`:

- Every binary under `public/images/sous-chef/` and `out/images/sous-chef/` hashes to an md5
  recorded in a table above — no extension list, subdirectories included.
- No withheld md5 appears anywhere under `public/` or `out/`.
- No raw `IMG_*` filename ships.
- Every referenced evidence binary exists in the export, and each carries a label, a
  describing caption, and non-generic alt text.

What is **not** enforced: whether a caption is true of its image. That is a human reading
responsibility — the same limit `rsp-evidence-provenance.md` records — and it is why every
capture here was read against its pixels by a reviewer that did not choose it.
