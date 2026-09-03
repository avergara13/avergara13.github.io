import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Portfolio — Angel Vergara", description: "Selected products and systems Angel Vergara has designed, built, and implemented.", alternates: { canonical: "/work/" }, openGraph: { type: "website", url: "/work/", title: "Portfolio — Angel Vergara", description: "Selected products and systems Angel Vergara has designed, built, and implemented.", images: [{ url: "/og-home.png", width: 1200, height: 630, alt: "Angel Vergara portfolio" }] }, twitter: { card: "summary_large_image", title: "Portfolio — Angel Vergara", description: "Selected products and systems Angel Vergara has designed, built, and implemented.", images: ["/og-home.png"] } };

// Chooser cards answer only: what is it, why care, where next. Type/Role/Status grids
// and case-study taxonomy live inside each case study (TSK-961 Phase 4).
const primary = [
  { number: "01", title: "🛋️ Loft OS", href: "/work/loft-os/", label: "Flagship · Governed multi-agent workflow system", summary: "A system for moving AI-assisted work from request to verified closeout with controlled authority, independent review, and evidence.", cta: "View case study", image: "/og-loft-os.png", alt: "Loft OS public-safe systems architecture card" },
  { number: "02", title: "📱 Resale Scanner Pro", href: "/work/resale-scanner-pro/", label: "Working product · In operating use", summary: "A mobile workflow for evaluating resale finds with market evidence, AI-assisted research, and human judgment.", cta: "View case study", image: "/images/rsp/session.png", alt: "Resale Scanner Pro mobile session interface" },
];

const additional = [
  { title: "Assistant Recruiter Pro", href: "/work/assistant-recruiter-pro/", label: "AI workflow", summary: "A workflow for refining job-search strategy from role constraints and human relevance feedback.", cta: "View project" },
  { title: "Sous Chef", href: "/work/sous-chef/", label: "AI-assisted domain workflow", summary: "A workspace that translates culinary operating knowledge into a practical AI-assisted workflow.", cta: "View project" },
];

export default function WorkIndex() {
  return <main id="main" data-section="work-index">
    <section className="work-index shell">
      <header><h1>Portfolio</h1><p>Selected products and systems I’ve designed, built, and implemented.</p></header>
      <div className="work-index-list">
        {primary.map((item) => <Link className="work-index-row" href={item.href} key={item.href}>
          <span>{item.number}</span>
          <div>
            <h2>{item.title}</h2>
            <p className="work-index-label">{item.label}</p>
            <p>{item.summary}</p>
            <p className="work-index-cta">{item.cta}<span aria-hidden="true"> →</span></p>
          </div>
          <Image src={item.image} alt={item.alt} width={780} height={780} sizes="(max-width: 760px) 100vw, 260px" />
        </Link>)}
      </div>

      <section className="work-additional" aria-labelledby="additional-work-title">
        <h2 id="additional-work-title">Additional work</h2>
        <div className="work-additional-list">
          {additional.map((item) => <Link className="work-additional-row" href={item.href} key={item.href}>
            <div>
              <h3>{item.title}</h3>
              <p className="work-index-label">{item.label}</p>
              <p>{item.summary}</p>
            </div>
            <p className="work-index-cta">{item.cta}<span aria-hidden="true"> →</span></p>
          </Link>)}
        </div>
      </section>

      <Link className="lab-link" href="/lab/">Experiments & explorations <span aria-hidden="true">→</span></Link>
    </section>
  </main>;
}
