# Angel Vergara — Portfolio (source)

[Open the live portfolio](https://avergara13.github.io/)

This branch holds the editable source for the public, employer-facing portfolio:
a Next.js static-export site with a recruiter-first structure — practical
AI-assisted workflows up front, public-safe case studies, one readable career
record with a downloadable PDF, and direct contact links.

Building needs **Node 22+ and Python 3**. `npm run build` runs two resume checks before
`next build`, and refuses to produce output if either fails. `--emit-json --check` verifies
`app/resume/general-resume.json` -- the artifact the readable `/resume/` page renders --
still matches its generator. `--verify-derivatives` verifies each downloadable resume PDF
against `scripts/resume_derivatives.lock.json`, so a content edit cannot ship a page and a
download that disagree. Both are stdlib-only and need no `reportlab`; rebuilding the PDFs
does. A Node-only environment cannot build for that reason.

The `main` branch of this repository carries only the generated static export
that GitHub Pages serves; it is never edited by hand. Durable changes happen
here (`app/`, `components/`, `scripts/`, `tests/`) and reach `main` through a
reviewed release build.

## Layout

- `app/` — routes, layout, metadata, and global styles
- `components/` — header, footer, and the case-study shell + content
- `scripts/generate_resumes.py` — generates the downloadable resume PDFs
  (requires Python with `reportlab`); `--emit-json` writes the artifact `/resume/`
  renders and `--verify-derivatives` gates the PDFs, both stdlib-only
- `scripts/resume_derivatives.lock.json` — written only by a PDF build; records what
  content and generator each committed PDF came from. Do not hand-edit.
- `scripts/generate_mark_derivatives.py` — generates the web-delivery derivatives of the
  canonical project marks; `--check` verifies the committed derivatives without writing
  (requires Python with `pillow`)
- `tests/rendered-html.test.mjs` — claim-boundary and rendering assertions run
  against the built export

## Commands

```bash
npm ci
npm run build   # static export to out/
npm test        # build + rendered-HTML assertions
npm run lint
```

Private application operations, internal repositories, and governed
implementation details are intentionally not part of this repository.
