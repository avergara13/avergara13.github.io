import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About / Career Bridge — Angel Vergara",
  description: "Career bridge context: frontline operations leadership translated into applied AI workflows, business systems, and human-controlled implementation.",
  alternates: { canonical: "/hiring/" },
  openGraph: {
    type: "website",
    url: "/hiring/",
    title: "Angel Vergara — About / Career Bridge",
    description: "Applied AI workflows, business systems, implementation, and human-controlled automation with clear operating context.",
    images: [{ url: "/og-home.png", width: 1200, height: 630, alt: "Angel Vergara about and career bridge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Vergara — About / Career Bridge",
    description: "Applied AI workflows, business systems, implementation, and human-controlled automation with clear operating context.",
    images: ["/og-home.png"],
  },
};

const generalResume = "/downloads/Angel_Vergara_Resume_General.pdf";

export default function HiringPage() {
  return (
    <main id="main" data-section="hiring">
      <section className="subpage-hero app-hero">
        <div className="shell compact-hero">
          <p className="eyebrow light-eyebrow">About / career bridge</p>
          <h1>Applied AI workflows and business systems, grounded in operating reality.</h1>
          <p className="lede">This route keeps compatibility while clarifying current positioning: practical implementation, human-controlled automation, and recruiter-readable proof.</p>
          <div className="actions">
            <a className="button light-button" href={generalResume} download>Download resume (PDF) <span aria-hidden="true">↓</span></a>
            <a className="button outline-light" href="mailto:avergara13@me.com">Contact Angel <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="hiring-fit-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Career bridge</p><h2>From frontline pressure to implementation clarity.</h2></div><p>The same core questions repeat across domains: what failed, who owns the handoff, what decision matters next, and where humans review outcomes.</p></div>
          <div className="fit-list">
            <article><span className="card-tag">Operating context</span><h2>Service and kitchen leadership</h2><p>High-pressure execution where training, quality, inventory, and timing have direct business impact.</p></article>
            <article><span className="card-tag">Systems translation</span><h2>Implementation and workflow structure</h2><p>Requirements mapping, handoff ownership, practical rollout support, and accountable delivery.</p></article>
            <article><span className="card-tag">Applied AI lens</span><h2>Human-controlled automation</h2><p>AI-assisted workflow support with visible review, approval, validation, and recovery points.</p></article>
          </div>
        </div>
      </section>

      <section className="dark-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Recommended proof path</p><h2>Three steps to a fast recruiter scan.</h2></div><p>Start with fit, verify delivery proof, then discuss team-specific implementation constraints.</p></div>
          <div className="proof-path">
            <article><span>01 · FIT</span><h3>Resume</h3><p>Applied AI workflow and business-systems capability in one concise baseline.</p></article>
            <span aria-hidden="true">→</span>
            <article><span>02 · PROOF</span><h3>Resale Scanner Pro + Loft OS</h3><p>RSP proves working delivery; Loft OS shows role-specific workflows, human approval, and recovery discipline.</p></article>
            <span aria-hidden="true">→</span>
            <article><span>03 · CONVERSATION</span><h3>Discuss the operating problem</h3><p>Connect business context, implementation constraints, and practical human-in-the-loop controls.</p></article>
          </div>
          <div className="actions"><a className="button outline-light" href={generalResume} download>Download resume (PDF) <span aria-hidden="true">↓</span></a><Link className="button outline-light" href="/work/resale-scanner-pro">Open RSP case study <span aria-hidden="true">→</span></Link><Link className="button outline-light" href="/work/assistant-recruiter-pro">Open Assistant Recruiter Pro proof <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="hiring-close-section">
        <div className="shell application-grid">
          <div>
            <p className="eyebrow">Current positioning</p>
            <h2>Applied AI workflows with human control and implementation discipline.</h2>
            <p>Use this route for additional context. The primary recruiter scan remains the homepage plus case-study surfaces.</p>
          </div>
          <div className="application-links ink-links">
            <a href="mailto:avergara13@me.com"><span>Start a conversation</span><span>→</span></a>
            <a href={generalResume} download><span>Download the resume (PDF)</span><span>↓</span></a>
            <Link href="/"><span>Return to homepage</span><span>→</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
