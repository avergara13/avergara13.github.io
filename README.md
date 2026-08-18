# Angel Vergara — Portfolio (source)

[Open the live portfolio](https://avergara13.github.io/)

This branch holds the editable source for the public, employer-facing portfolio:
a Next.js static-export site with a recruiter-first structure — a working live
product up front, public-safe case studies, three role-matched resume lanes, a
concise hiring-team brief, and direct contact links.

The `main` branch of this repository carries only the generated static export
that GitHub Pages serves; it is never edited by hand. Durable changes happen
here (`app/`, `components/`, `scripts/`, `tests/`) and reach `main` through a
reviewed release build.

## Layout

- `app/` — routes, layout, metadata, and global styles
- `components/` — header, footer, and the case-study shell + content
- `scripts/generate_resumes.py` — generates the three downloadable resume PDFs
  (requires Python with `reportlab`)
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
