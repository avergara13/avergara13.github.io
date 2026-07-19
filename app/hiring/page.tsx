import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Hiring Teams — Angel Vergara",
  description: "A concise hiring brief covering Angel Vergara's strongest role fit, working style, proof sequence, and contact information.",
  alternates: { canonical: "/hiring/" },
  openGraph: {
    type: "website",
    url: "/hiring/",
    title: "Angel Vergara — For Hiring Teams",
    description: "Operations credibility, implementation discipline, and usable systems—with a concise review path.",
    images: [{ url: "/og-hiring.png", width: 1200, height: 630, alt: "Angel Vergara hiring-team brief" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Vergara — For Hiring Teams",
    description: "Operations credibility, implementation discipline, and usable systems—with a concise review path.",
    images: ["/og-hiring.png"],
  },
};

const implementationResume = "/downloads/Angel_Vergara_Resume_Implementation_Onboarding.pdf";

export default function HiringPage() {
  return (
    <main id="main">
      <section className="subpage-hero app-hero">
        <div className="shell compact-hero">
          <p className="eyebrow light-eyebrow">For hiring teams</p>
          <h1>Operations credibility, built for implementation.</h1>
          <p className="lede">Angel Vergara translates frontline complexity into clear workflows, practical tools, and accountable adoption—grounded in hospitality leadership and hands-on product delivery.</p>
          <div className="actions">
            <a className="button light-button" href={implementationResume} download>Download recommended resume (PDF) <span aria-hidden="true">↓</span></a>
            <a className="button outline-light" href="mailto:avergara13@me.com">Contact Angel <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="hiring-fit-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Strongest role fit</p><h2>Where the experience converts fastest.</h2></div><p>The clearest fit combines operational empathy, customer-facing implementation, process translation, and hands-on systems delivery.</p></div>
          <div className="fit-list">
            <article><span className="card-tag">Primary lane</span><h2>Implementation & onboarding</h2><p>Hospitality technology, SaaS onboarding, configuration, customer training, rollout support, and adoption.</p></article>
            <article><span className="card-tag">Bridge lane</span><h2>Business systems & operations</h2><p>Process discovery, requirements, operational reporting, workforce systems, and implementation consulting.</p></article>
            <article><span className="card-tag">Selective lane</span><h2>Technical customer success</h2><p>Workflow troubleshooting, customer education, product feedback, integration coordination, and measurable adoption.</p></article>
          </div>
        </div>
      </section>

      <section className="dark-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Recommended proof path</p><h2>Three steps to a confident screen.</h2></div><p>Each step answers one hiring question: fit, delivery proof, then working relationship.</p></div>
          <div className="proof-path">
            <article><span>01 · FIT</span><h3>Implementation resume</h3><p>Operations leadership, training, discovery, configuration, and adoption.</p></article>
            <span aria-hidden="true">→</span>
            <article><span>02 · PROOF</span><h3>Resale Scanner Pro</h3><p>A shipped product showing workflow design, human review, and delivery.</p></article>
            <span aria-hidden="true">→</span>
            <article><span>03 · CONVERSATION</span><h3>Discuss the operating problem</h3><p>Connect customer reality to implementation constraints and adoption.</p></article>
          </div>
          <div className="actions"><a className="button outline-light" href={implementationResume} download>Download resume (PDF) <span aria-hidden="true">↓</span></a><Link className="button outline-light" href="/work/resale-scanner-pro">Open case study <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="hiring-close-section">
        <div className="shell application-grid">
          <div>
            <p className="eyebrow">Working style</p>
            <h2>Structured without losing the human context.</h2>
            <p>Teams can expect clear discovery, practical requirements, visible handoffs, bilingual communication, and respect for human approval and operational constraints.</p>
          </div>
          <div className="application-links ink-links">
            <a href="mailto:avergara13@me.com"><span>Start a conversation</span><span>→</span></a>
            <a href={implementationResume} download><span>Download the recommended resume</span><span>↓</span></a>
            <Link href="/work/resale-scanner-pro"><span>Review the shipped product</span><span>→</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
