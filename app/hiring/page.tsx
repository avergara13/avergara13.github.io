import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Hiring Teams — Angel Vergara",
  description: "A concise hiring brief covering Angel Vergara's strongest role fit, working style, proof sequence, and contact information.",
  alternates: { canonical: "/hiring/" },
};

const implementationResume = "/downloads/Angel_Vergara_Resume_Implementation_Onboarding.pdf";

export default function HiringPage() {
  return (
    <main id="main">
      <section className="subpage-hero app-hero">
        <div className="shell app-hero-grid">
          <div>
            <p className="eyebrow light-eyebrow">For hiring teams</p>
            <h1>Operations credibility. Implementation discipline. Usable systems.</h1>
            <p className="lede">Angel Vergara is a bilingual hospitality operations leader and implementation-focused systems builder who translates frontline complexity into clear workflows, practical tools, and accountable adoption.</p>
            <div className="actions">
              <a className="button light-button" href={implementationResume} download>Download recommended resume (PDF) <span aria-hidden="true">↓</span></a>
              <a className="button outline-light" href="mailto:avergara13@me.com">Contact Angel <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <aside className="app-hero-note">
            <span>Recommended review path</span>
            <b>Implementation resume</b>
            <b>Resale Scanner Pro case study</b>
            <b>Direct conversation</b>
            <small>Public materials are intentionally separated from the private application workflow.</small>
          </aside>
        </div>
      </section>

      <section className="hiring-fit-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Strongest role fit</p><h2>Where the evidence converts fastest.</h2></div><p>The clearest fit combines operational empathy, customer-facing implementation, process translation, and hands-on systems delivery.</p></div>
          <div className="fit-grid">
            <article><span className="card-tag">Primary lane</span><h2>Implementation & onboarding</h2><p>Hospitality technology, SaaS onboarding, configuration, customer training, rollout support, and adoption.</p></article>
            <article><span className="card-tag">Bridge lane</span><h2>Business systems & operations</h2><p>Process discovery, requirements, operational reporting, workforce systems, and implementation consulting.</p></article>
            <article><span className="card-tag">Selective lane</span><h2>Technical customer success</h2><p>Workflow troubleshooting, customer education, product feedback, integration coordination, and measurable adoption.</p></article>
          </div>
        </div>
      </section>

      <section className="dark-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Proof sequence</p><h2>Three steps to a confident screen.</h2></div><p>Each artifact answers a different hiring question: fit, delivery proof, then working relationship.</p></div>
          <div className="proof-sequence">
            <article><span>01 · FIT</span><h3>Implementation resume</h3><p>Leads with operations leadership, training, workflow discovery, configuration, and adoption.</p><a className="button outline-light" href={implementationResume} download>Download resume (PDF) <span aria-hidden="true">↓</span></a></article>
            <article><span>02 · PROOF</span><h3>Resale Scanner Pro</h3><p>Shows product judgment, workflow design, human review, and hands-on delivery in a live product.</p><Link className="button outline-light" href="/work/resale-scanner-pro">Open case study <span aria-hidden="true">→</span></Link></article>
            <article><span>03 · CONVERSATION</span><h3>Discuss the operating problem</h3><p>Angel is strongest when the conversation connects customer reality to implementation constraints and adoption.</p><a className="button outline-light" href="mailto:avergara13@me.com">Email Angel <span aria-hidden="true">→</span></a></article>
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Working style</p><h2>Structured without losing the human context.</h2></div><p>Angel brings the operator’s perspective into implementation work while keeping scope, ownership, and evidence visible.</p></div>
          <div className="working-style">
            <article><h3>What teams can expect</h3><ul><li>Clear discovery and practical requirements</li><li>Bilingual communication and training</li><li>Visible handoffs, decisions, and next steps</li><li>Respect for human approval and operational constraints</li></ul></article>
            <article><h3>What the portfolio proves</h3><ul><li>A live product built around an operator decision</li><li>Sanitized architecture with explicit public boundaries</li><li>Hospitality-domain product judgment</li><li>Concept work labeled honestly and supported with simulated data</li></ul></article>
          </div>
        </div>
      </section>
    </main>
  );
}
