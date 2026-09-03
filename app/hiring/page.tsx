import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hiring — Angel Vergara",
  description: "Where Angel Vergara fits, what to look at first, and what proves it: operations experience, systems implementation, and applied AI.",
  alternates: { canonical: "/hiring/" },
  openGraph: {
    type: "website",
    url: "/hiring/",
    title: "Angel Vergara — Hiring",
    description: "Where Angel fits, what to look at first, and what proves it.",
    images: [{ url: "/og-hiring.png", width: 1200, height: 630, alt: "Angel Vergara hiring brief" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Vergara — Hiring",
    description: "Where Angel fits, what to look at first, and what proves it.",
    images: ["/og-hiring.png"],
  },
};

const generalResume = "/downloads/Angel_Vergara_Resume_General.pdf";

// TSK-961 Phase 6: a decision surface, not a biography. Fit -> what to open -> contact.
const fitLanes = [
  ["AI workflow & automation", "Applied AI workflows, automation, human decision points, evaluation, and practical controls."],
  ["Implementation & business systems", "Requirements, process mapping, onboarding, rollout, adoption, and the handoff between business needs and technical teams."],
  ["Hospitality technology", "Restaurant and hospitality systems where operating knowledge strengthens implementation, product, onboarding, and AI-workflow decisions."],
  ["Business / process analysis", "Turning operational friction into requirements, workflows, decision logic, and implementable system changes."],
];

export default function HiringPage() {
  return (
    <main id="main" data-section="hiring">
      <section className="subpage-hero app-hero">
        <div className="shell compact-hero">
          <p className="eyebrow light-eyebrow">Hiring</p>
          <h1>Operations experience. Systems implementation. Applied AI.</h1>
          <p className="lede">I bring hands-on operating leadership into workflow design, implementation, business systems, and human-controlled AI.</p>
          <p className="hiring-support">The strongest fit is where business context, users, systems, and implementation have to work together.</p>
          <div className="actions">
            <a className="button light-button" href={generalResume} download>Download resume <span aria-hidden="true">↓</span></a>
            <Link className="button outline-light" href="/work/">View portfolio <span aria-hidden="true">→</span></Link>
            <a className="button outline-light" href="mailto:avergara13@me.com">Contact <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="hiring-fit-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Role fit</p><h2>Where I fit</h2></div><p>These are role-fit lanes, not claims of prior paid titles.</p></div>
          <div className="fit-list">
            {fitLanes.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="case-section tinted-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Proof</p><h2>Start here</h2></div><p>Detailed proof stays inside the case studies.</p></div>
          <div className="work-additional-list">
            <a className="work-additional-row" href={generalResume} download>
              <div><h3>Resume</h3><p className="work-index-label">Baseline</p><p>The concise baseline for experience, transferable capability, and current systems/AI work.</p></div>
              <p className="work-index-cta">Download General Resume<span aria-hidden="true"> ↓</span></p>
            </a>
            <Link className="work-additional-row" href="/work/loft-os/">
              <div><h3>🛋️ Loft OS</h3><p className="work-index-label">Flagship proof</p><p>Flagship proof of governed multi-agent workflow design, implementation discipline, and controlled autonomous execution.</p></div>
              <p className="work-index-cta">View Loft OS<span aria-hidden="true"> →</span></p>
            </Link>
            <Link className="work-additional-row" href="/work/resale-scanner-pro/">
              <div><h3>📱 Resale Scanner Pro</h3><p className="work-index-label">Working-product proof</p><p>Working-product proof: AI-assisted research and workflow automation grounded in a real operating decision.</p></div>
              <p className="work-index-cta">View Resale Scanner Pro<span aria-hidden="true"> →</span></p>
            </Link>
          </div>
          <p className="hiring-resume-rule">The General Resume is the baseline. Targeted versions reorder the same verified evidence for AI Workflow Automation, Implementation &amp; Onboarding, and Business Systems &amp; Operations.</p>
        </div>
      </section>

      <section className="hiring-close-section">
        <div className="shell application-grid">
          <div>
            <p className="eyebrow">Conversation</p>
            <h2>If the role sits between operations and technology, I’d like to talk.</h2>
            <p>I’m especially interested in implementation, business-systems, hospitality-technology, workflow-automation, and applied-AI roles where understanding the real operation matters as much as choosing the technology.</p>
          </div>
          <div className="application-links ink-links">
            <a href="mailto:avergara13@me.com"><span>Start a conversation</span><span aria-hidden="true">→</span></a>
            <Link href="/resume/"><span>Compare resume versions</span><span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
