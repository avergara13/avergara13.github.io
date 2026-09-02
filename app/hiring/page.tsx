import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hiring Brief — Angel Vergara",
  description: "A concise hiring brief: what Angel Vergara does, the role families he fits, the systems he has built, and where to verify the proof.",
  alternates: { canonical: "/hiring/" },
  openGraph: {
    type: "website",
    url: "/hiring/",
    title: "Angel Vergara — Hiring Brief",
    description: "What Angel does, the role families he fits, the systems he has built, and where to verify the proof.",
    images: [{ url: "/og-hiring.png", width: 1200, height: 630, alt: "Angel Vergara hiring brief" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Vergara — Hiring Brief",
    description: "What Angel does, the role families he fits, the systems he has built, and where to verify the proof.",
    images: ["/og-hiring.png"],
  },
};

const generalResume = "/downloads/Angel_Vergara_Resume_General.pdf";

export default function HiringPage() {
  return (
    <main id="main" data-section="hiring">
      <section className="subpage-hero app-hero">
        <div className="shell compact-hero">
          <p className="eyebrow light-eyebrow">Hiring brief</p>
          <h1>Applied AI workflows and business systems, grounded in operating reality.</h1>
          <p className="lede">I design and build practical AI-assisted workflows and business systems that turn messy operational problems into usable, testable tools. This page is the short version for hiring teams: the roles I fit, what I have built, and where to verify it.</p>
          <div className="actions">
            <a className="button light-button" href={generalResume} download>Download resume (PDF) <span aria-hidden="true">↓</span></a>
            <a className="button outline-light" href="mailto:avergara13@me.com">Contact Angel <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="hiring-fit-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Role fit</p><h2>Three role families, one consistent skill set.</h2></div><p>The same core questions repeat across domains: what failed, who owns the handoff, what decision matters next, and where humans review outcomes.</p></div>
          <div className="fit-list">
            <article><span className="card-tag">Role family</span><h2>AI workflow automation</h2><p>Designing assisted workflows with explicit scope, review points, and human approval where the decision matters.</p></article>
            <article><span className="card-tag">Role family</span><h2>Systems implementation</h2><p>Requirements mapping, handoff ownership, rollout support, and accountable delivery.</p></article>
            <article><span className="card-tag">Role family</span><h2>Business systems &amp; operations</h2><p>Operational reporting, process mapping, and the operating detail that comes from running the floor, not observing it.</p></article>
          </div>
        </div>
      </section>

      <section className="dark-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Proof</p><h2>A flagship system and a working product.</h2></div><p>Start with fit, verify delivery proof, then discuss team-specific implementation constraints.</p></div>
          <div className="proof-path">
            <article><span>01 · FIT</span><h3>Resume</h3><p>Applied AI workflow and business-systems capability in one concise baseline.</p></article>
            <span aria-hidden="true">→</span>
            <article><span>02 · PROOF</span><h3>Loft OS + Resale Scanner Pro</h3><p>Loft OS is the flagship governed system: scoped work, separate execution and merge authority, and documented failure and recovery. Resale Scanner Pro is a working product in real operating use.</p></article>
            <span aria-hidden="true">→</span>
            <article><span>03 · CONVERSATION</span><h3>Discuss the operating problem</h3><p>Connect business context, implementation constraints, and practical human-in-the-loop controls.</p></article>
          </div>
          <div className="actions"><a className="button outline-light" href={generalResume} download>Download resume (PDF) <span aria-hidden="true">↓</span></a><Link className="button outline-light" href="/work/loft-os/">Open Loft OS case study <span aria-hidden="true">→</span></Link><Link className="button outline-light" href="/work/resale-scanner-pro/">Open Resale Scanner Pro case study <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="hiring-close-section">
        <div className="shell application-grid">
          <div>
            <p className="eyebrow">Resume &amp; contact</p>
            <h2>Start with the General Resume; the role-specific versions change the proof order, not the facts.</h2>
            <p>Four versions are published: a General Resume plus AI Workflow Automation, Implementation &amp; Onboarding, and Business Systems &amp; Operations.</p>
          </div>
          <div className="application-links ink-links">
            <a href="mailto:avergara13@me.com"><span>Start a conversation</span><span>→</span></a>
            <a href={generalResume} download><span>Download the resume (PDF)</span><span>↓</span></a>
            <Link href="/resume/"><span>Compare all four resumes</span><span>→</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
