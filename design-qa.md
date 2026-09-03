# Portfolio QA — TSK-961 editorial simplification

Current QA documentation for the portfolio source. It records what was verified, how, and
what is known to remain open. It is not a design specification: the accepted visual system
is the Evidence Stage / Control Surface system already implemented in `app/globals.css`.

## Scope of this pass

TSK-961 simplified recruiter-facing copy across every public page under the editorial law
**Say it once. Prove it next.** It was a bounded editorial and hierarchy pass, not a
redesign. No colour, type family, radius, or spacing token was introduced or changed.

Phases and dispositions:

| Phase | Surface | Disposition |
|---|---|---|
| 1 | HOME | Implemented — retired the hero proof cue and micro-signals, moved the interactive demo off HOME, locked "Selected work" |
| 2 | Loft OS | Implemented — locked eight-section sequence; supplied project mark integrated verbatim; Decision Relay retired as the public label in favour of **Agent Workflow Demo** |
| 3 | Resale Scanner Pro | Implemented — locked seven-step `Capture → … → Learn` flow and the stopping rule |
| 4 | Portfolio (`/work/`) | Implemented — "Evidence Atlas" retired for `Portfolio`; chooser cards reduced to label + one sentence + CTA |
| 5 | About | Implemented — locked hospitality → operations → systems → AI narrative |
| 6 | Hiring | Implemented — reduced to a decision surface |
| 7 | Resume | Implemented — General Resume first; targeting explained once |
| 8 | Lab | Implemented — experimental boundary stated once at page level |
| 9 | Supporting projects | Implemented — The Office Chef retired from the public surface; ARP and Sous Chef simplified |
| 10 | Reconciliation | This document, plus the accessibility repairs and sweeps below |

## Automated verification

- `npm run lint` — clean.
- `npm test` — builds the static export and runs **18** rendered-output tests. All pass.
  (An earlier revision of this file said "eight"; the suite has grown since.)
- `npx tsc --noEmit` — clean.

## Rendered verification

Rendered checks were run against the static export served locally, walking the real DOM
per route. Source and token inspection alone does not establish rendered accessibility, so
contrast is computed from resolved colours against resolved backgrounds.

Routes covered: `/`, `/about/`, `/hiring/`, `/lab/`, `/resume/`, `/work/`,
`/work/loft-os/`, `/work/resale-scanner-pro/`, `/work/assistant-recruiter-pro/`,
`/work/sous-chef/`, and the generated 404 artifacts.

Widths: 1440, 768, 430, 390.

Result at every route and width: exactly one `h1`, a `main` landmark, no horizontal
overflow, no content clipped past the viewport, no image missing `alt`, and no text pair
below its WCAG AA threshold.

## Accessibility repairs made in this pass

- **Resume lane numerals** used `--on-dark-faint` on a light card (2.62:1). Changed to
  `--copper`, the numbering colour already used elsewhere in the system (5.02:1).
- **Generated 404 artifacts** shipped a skip link pointing at a `#main` that did not
  exist, had no `main` landmark, and emitted two `<title>` elements. A real `app/not-found.tsx`
  supplies the landmark and a single title.
- **Labelled containers** (`aria-label` on a `div`) carried no role, so the labels were
  inert to assistive technology. Each now carries `role="group"`.
- **`.menu-button`** was not matched by the project's `:focus-visible` rule and fell back
  to the UA default ring. It is now covered explicitly.

## Privacy and claim boundaries

A sweep across every generated HTML file finds zero occurrences of internal governance
identifiers, Notion URLs or IDs, infrastructure hostnames, credential patterns, or
absolute local paths. A positive control on a string that *is* present confirms the sweep
would have found a hit.

Published personal data is limited and deliberate: a contact email in the page HTML, and a
phone number and city inside the resume PDFs only.

Claim boundaries verified on the flagship surface: no "does not hallucinate", "hallucinations
are eliminated", or "cannot drift" language. The Agent Workflow Demo carries its truth
disclosure (`Curated demonstration · deterministic fixture · not a live autonomous production
run.`), and the Failure Lab keeps its open-gap note rather than reading as a solved story.

## Links, PDFs, and indexing

- Every internal link across the site resolves; every directory link carries a trailing
  slash, matching `trailingSlash: true`.
- External targets are LinkedIn, GitHub, the public Sous Chef repository, and self-canonicals.
- **Four** resume PDFs are published and complete: General, Implementation & Onboarding,
  Business Systems & Operations, and AI Workflow & Automation. (An earlier revision of this
  file said "three".)
- `sitemap.xml` carries 10 entries and does not list The Office Chef.

## The Office Chef

Retired from the public surface. The slug is filtered out of `generateStaticParams`, so the
route is no longer emitted and `/work/office-chef/` returns a genuine 404 — not a redirect,
and nothing implies the concept shipped. Its project data remains in
`components/ProjectCase.tsx` as canonical internal evidence, and it survives publicly only
as an unlinked, clearly labelled concept entry on the Lab page. The orphaned
`og-office-chef.png` was removed from `public/`; its generator entry is retained so the
asset stays reproducible.

The reference inside `Angel_Vergara_Resume_Business_Systems_Operations.pdf` was removed at
source and that single PDF regenerated. The decoded text diff is exactly the two removed
lines; the other three PDFs are byte-identical to their published versions.

## Adversarial pre-freeze review

An eight-lens adversarial review (recruiter, technical recruiter, claims, editorial
duplication, packet conformance, cross-page drift, accessibility, privacy) plus a
completeness critic ran against the built export before freeze. It found real defects.
Everything below was fixed and re-verified:

- Assistant Recruiter Pro was inheriting two content branches authored for the retired
  Office Chef — the `h2` directly above its own workflow, and a generic consulting strip.
  Both now have ARP-specific content, and its Shown/Withheld boundary is no longer Loft OS
  boilerplate.
- The generated 404 artifacts declared the **homepage** as their canonical and carried
  conflicting `index, follow` / `noindex` directives, because `app/not-found.tsx` had no
  metadata of its own and inherited the root layout's. Both are now correct. Note the trap:
  omitting `robots` there lets the layout's `index, follow` reassert.
- The three targeted-resume download links failed WCAG 2.5.3 Label in Name — visible text
  "Download PDF" with an `aria-label` that did not contain it. The accessible name now
  extends the visible label instead of replacing it.
- `.relay-run` was applied to the lifecycle wrapper **and** to the Run-demo button, so the
  governance rail inherited button chrome and a hover state. The wrapper is now `.relay-chain`.
- The Loft OS Public Boundary shipped a paraphrase of the locked body and omitted the demo
  truth disclosure entirely. Both are restored verbatim.
- The Hiring page had demoted the locked headings "Where I fit" and "Start here" to eyebrows
  behind invented `h2`s. The locked strings are headings again.
- HOME still called the portfolio the "work index" after Phase 4 renamed it.
- `Workflow proof · client-safe framing` implied a paying client on ARP; now `public-safe`.

## Dispositions

Recorded rather than silently skipped, per the phase read-back contract:

- **Loft OS project mark — RESOLVED.** The Phase 2 FINAL LOCK requires Angel's supplied
  `Loft OS logo.png` as the hero project mark. The supplied binary was integrated verbatim
  at `public/images/loft-os/logo.png` (sha256 `b040f524…5b7567`, 1024×1024, 1.15 MB). It was
  not recreated, re-encoded, resized, or substituted, and the published copy is byte-identical
  to the file supplied. Its only metadata is a 68-byte `eXIf` chunk carrying ColorSpace and
  pixel dimensions — no GPS, camera, software, author, or timestamp fields, and no C2PA
  provenance manifest. It renders 112 px beside the hero at ≥768 and 88 px stacked at ≤430,
  square at every width, with a reserved box so nothing shifts while it loads. `alt` is
  deliberately empty: the adjacent `h1` already names Loft OS, so a described image would
  duplicate it for screen-reader users.
- **"Preserve the existing five-plane architecture proof" — STALE.** No five-plane construct
  exists in the implementation, in current production, elsewhere in the packet, or in Loft OS
  canon; the canonical architecture document is a three-tier picture. Inventing one would
  have been a new claim. The existing architecture proof (the three control-boundary cards)
  is preserved under the locked heading instead.
- **"My role — Workflow implementation".** The packet conditions this wording on verification
  and says to keep the production wording if it overstates. Loft OS contains implemented
  workflow automation, gates, and tooling built under Angel's direction, so the locked wording
  is supported and was used. The prior production wording was "operating-model documentation".
- **The Office Chef on `/lab/`.** Retained as an unlinked, explicitly labelled `CONCEPT` entry
  on the experimental surface, per direction to preserve the truthful Lab reference. `/lab/` is
  itself indexed, so the concept remains publicly *readable* even though it is no longer
  portfolio proof, carries no link, is absent from the sitemap, and its route 404s. Flagged
  because the Phase 10 acceptance matrix can be read more strictly than that.
- **The interactive demo is a bounded example, not the whole governed run.** The seven-stage
  lifecycle above it is the governed run; the runnable panel is a curated three-agent
  delegation on a fixed fixture. It carries its curated/deterministic disclosure.

## Known open items

- **The test suite has no CI trigger.** `.github/workflows/deploy-pages.yml` runs only on
  push to `main` and only deploys; nothing runs `npm test` or `npm run lint` automatically on
  the source branch. Every guard in this document is therefore enforced by local runs and
  review, not by CI. Changing CI was out of scope for this editorial pass and is flagged for
  a separate decision.
- **Resale Scanner Pro project mark — RESOLVED.** The supplied RSP mark was integrated
  verbatim at `public/images/rsp/mark.png` (sha256 `3df20812…532006`, 1254×1254, 1.21 MB),
  matching the identity recorded for it. It was not redrawn, regenerated, approximated,
  recoloured, or substituted, and no other RSP image was used in its place. It takes the same
  project-mark role as the Loft OS mark — same 112 px / 88 px sizing, same frame, same
  position in the hero — while keeping its own intrinsic square geometry. `alt` is empty for
  the same reason as the Loft OS mark, which also guarantees the mark asserts no product
  claim of its own.
- **The RSP mark carries a 26 KB C2PA provenance manifest, and it is published intact.**
  Decoded before publishing, it contains: generator `OpenAI Media Service API` / `gpt-image`,
  `digitalSourceType: trainedAlgorithmicMedia` (i.e. AI-generated), a 2026-05-11 timestamp,
  content UUIDs, and an SSL.com certificate chain. It contains **no** personal data, account
  identifier, credential, or internal infrastructure reference. It was left in place on two
  grounds: stripping it would alter the exact supplied binary, and removing a truthful
  AI-provenance signal from a portfolio whose whole argument is honest AI-assisted work would
  be the wrong call. Flagged here so the decision is explicit rather than incidental. The Loft
  OS mark carries no such manifest — only a 68-byte `eXIf` with colour space and dimensions.
- **The two project marks are 1.15 MB and 1.21 MB** and are the two largest assets the site
  loads. Both are the exact supplied binaries and were deliberately not re-encoded. Optimised
  derivatives would be a sensible bounded follow-up.
- **Observation, not acted on:** the RSP mark's barcode renders the string `BCANNER1R1`,
  which is not a real word or code. It is part of the supplied canonical artwork, and the
  instruction was explicit not to redraw or regenerate it, so it ships as supplied. Worth
  Angel's attention if the mark is ever revised.
- **Pre-existing unreferenced assets.** `public/og.png` (1.9 MB, unreferenced, and the only
  image carrying a C2PA "AI-generated" provenance manifest), `public/images/rsp/logo.png`,
  `public/images/sous-chef/banner.png`, and `public/images/rsp/agent.png` are shipped but
  referenced by nothing. They predate this pass and were left untouched; they are worth a
  separate bounded cleanup. `public/og-office-chef.png` **was** removed, because this pass
  is what orphaned it.
- The resume-version rule appears on both `/resume/` and `/hiring/`. Both strings are
  separately locked by their own phases, so both were kept.
- `/hiring/` has one inbound internal link, from `/resume/`. That is the locked IA: Hiring is
  a decision surface reached from the resume path, not a primary nav destination.

- Roughly 70 CSS class names were already unused before this pass. They are out of scope
  here and were left untouched; only rules this pass orphaned were removed.
- The four case-study routes ship no explicit `robots` meta and rely on the indexable
  default, while the top-level routes are explicit. Behaviour is correct; the posture is
  simply not uniform.
- `npm audit` reports vulnerabilities in the dependency tree. Not introduced by this pass
  and not addressed here.

final result: passed
