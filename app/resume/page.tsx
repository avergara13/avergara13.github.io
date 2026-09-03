import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume — Angel Vergara",
  description: "Start with the General Resume. Targeted versions reorder the same verified evidence for implementation, business systems, and AI workflow roles.",
  alternates: { canonical: "/resume/" },
  openGraph: {
    type: "website",
    url: "/resume/",
    title: "Angel Vergara — Resume",
    description: "One General Resume plus three targeted versions with one consistent, evidence-backed career story.",
    images: [{ url: "/og-resume.png", width: 1200, height: 630, alt: "Angel Vergara resume" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Vergara — Resume",
    description: "One General Resume plus three targeted versions with one consistent, evidence-backed career story.",
    images: ["/og-resume.png"],
  },
};

const generalFile = "Angel_Vergara_Resume_General.pdf";

// TSK-961 Phase 7: title, one-sentence fit, one "Best for" line, download CTA.
// "Best for" describes role fit, never a previously held title.
const lanes = [
  { number: "01", tone: "cobalt", title: "Implementation & Onboarding", file: "Angel_Vergara_Resume_Implementation_Onboarding.pdf", summary: "Leads with hospitality operations, training, workflow discovery, rollout, adoption, and customer-ready implementation.", bestFor: "Implementation · Onboarding · Customer training · Hospitality technology" },
  { number: "02", tone: "ink", title: "Business Systems & Operations", file: "Angel_Vergara_Resume_Business_Systems_Operations.pdf", summary: "Leads with process discovery, requirements, reporting, operating controls, vendor coordination, and systems judgment.", bestFor: "Business systems · Business/process analysis · Operations systems" },
  { number: "03", tone: "copper", title: "AI Workflow & Automation", file: "Angel_Vergara_Resume_AI_Workflow_Automation.pdf", summary: "Leads with working AI product proof, governed workflows, human decision boundaries, automation, and evidence-backed delivery.", bestFor: "AI workflow automation · AI implementation · Applied AI operations" },
];

export default function ResumePage() {
  return <main id="main" data-section="resume">
    <section className="subpage-hero resume-hero">
      <div className="shell resume-hero-single">
        <p className="eyebrow">Resume</p>
        <h1>Start with the General Resume.</h1>
        <p className="lede">One concise view of my hospitality and operations leadership, systems implementation, business-process work, and current AI-assisted workflow proof.</p>
        <p className="resume-support">For a clearly matched role, use one of the targeted versions below. The evidence stays the same; the emphasis changes.</p>
        <div className="actions"><a className="button primary" href={`/downloads/${generalFile}`} download>Download General Resume <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>

    <section className="alternate-resume-section">
      <div className="shell">
        <div className="split-head"><div><p className="eyebrow">Targeted versions</p><h2>Targeted versions</h2></div><p>Same verified experience. Different proof order for the role.</p></div>
        <div className="alternate-resume-grid">
          {lanes.map((lane) => <article className={`alternate-resume-card ${lane.tone}`} key={lane.number}>
            <div className="lane-number">{lane.number}</div>
            <div>
              <h3>{lane.title}</h3>
              <p>{lane.summary}</p>
              <p className="resume-best-for"><span>Best for</span>{lane.bestFor}</p>
            </div>
            <a className="button" href={`/downloads/${lane.file}`} download>Download PDF<span className="sr-only"> — {lane.title} resume</span> <span aria-hidden="true">↓</span></a>
          </article>)}
        </div>
        <p className="resume-versions-note"><b>How the versions work.</b> The General Resume is the baseline. Targeted versions reorder the same verified chronology and evidence so the most relevant experience appears first for a particular role family.</p>
      </div>
    </section>

    <section className="resume-close dark-section">
      <div className="shell application-grid">
        <div><p className="eyebrow light-eyebrow">Next step</p><h2>Want the proof behind the résumé?</h2></div>
        <div className="application-links">
          <Link href="/work/"><span>View portfolio</span><span aria-hidden="true">→</span></Link>
          <Link href="/hiring/"><span>Open hiring brief</span><span aria-hidden="true">→</span></Link>
          <a href="mailto:avergara13@me.com"><span>Contact</span><span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  </main>;
}
