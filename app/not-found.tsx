import type { Metadata } from "next";
import Link from "next/link";

// Without its own metadata this route inherits the root layout's canonical ("/") and
// index,follow — so the generated 404 artifacts would declare the homepage as canonical.
// robots must be set explicitly: omitting it lets the layout's index,follow reassert and
// conflict with the noindex Next emits for this route.
export const metadata: Metadata = {
  title: "Page not found — Angel Vergara",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
};

// TSK-961 Phase 10: the generated 404 artifacts shipped a skip link pointing at a #main
// that did not exist and had no <main> landmark. This route supplies both.
export default function NotFound() {
  return <main id="main" data-section="not-found">
    <section className="about-page shell">
      <header>
        <p className="eyebrow">404</p>
        <h1>This page could not be found.</h1>
        <p>The link may be out of date, or the page may have been retired. The portfolio, resume, and case studies are all still here.</p>
      </header>
      <div className="actions">
        <Link className="button primary" href="/">Go to the homepage <span aria-hidden="true">→</span></Link>
        <Link className="button" href="/work/">View portfolio <span aria-hidden="true">→</span></Link>
        <Link className="button" href="/resume/">Review resume <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  </main>;
}
