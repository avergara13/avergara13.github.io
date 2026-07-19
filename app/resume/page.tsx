import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resumes — Angel Vergara",
  description: "Three ATS-readable resume lanes for implementation, business systems, and AI workflow roles.",
  alternates: { canonical: "/resume/" },
  openGraph: {
    type: "website",
    url: "/resume/",
    title: "Angel Vergara — Resume Suite",
    description: "Three ATS-readable resume lanes with one consistent, evidence-backed career story.",
    images: [{ url: "/og-resume.png", width: 1200, height: 630, alt: "Angel Vergara resume suite" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Vergara — Resume Suite",
    description: "Three ATS-readable resume lanes with one consistent, evidence-backed career story.",
    images: ["/og-resume.png"],
  },
};

const lanes = [
  { number: "01", title: "Implementation & Onboarding", fit: "Recommended first choice", tone: "cobalt", file: "Angel_Vergara_Resume_Implementation_Onboarding.pdf", roles: ["Hospitality technology onboarding", "SaaS implementation specialist", "Customer training and adoption", "Technical customer success"], proof: "Leads with bilingual operations leadership, training, configuration, workflow discovery, and customer-ready implementation." },
  { number: "02", title: "Business Systems & Operations", fit: "Operations-to-systems bridge", tone: "ink", file: "Angel_Vergara_Resume_Business_Systems_Operations.pdf", roles: ["Business systems analyst", "Operations analyst", "Workforce optimization", "Implementation consultant"], proof: "Leads with process discovery, requirements, operating controls, reporting, vendor coordination, inventory, and systems thinking." },
  { number: "03", title: "AI Workflow & Automation", fit: "Selective technical lane", tone: "copper", file: "Angel_Vergara_Resume_AI_Workflow_Automation.pdf", roles: ["AI process analyst", "Workflow automation analyst", "AI implementation specialist", "Solutions or integration consultant"], proof: "Leads with shipped product work, governed AI workflows, human approval gates, recovery logic, and evidence-backed delivery." },
];

export default function ResumePage() {
  const [recommended, ...alternates] = lanes;

  return <main id="main">
    <section className="subpage-hero resume-hero">
      <div className="shell resume-hero-grid">
        <div>
          <p className="eyebrow">Recommended resume</p>
          <h1>Start with implementation and onboarding.</h1>
          <p className="lede">This is the strongest first screen for hospitality technology, SaaS onboarding, customer training, configuration, and adoption roles.</p>
          <div className="actions"><a className="button primary" href={`/downloads/${recommended.file}`} download>Download recommended resume (PDF) <span aria-hidden="true">↓</span></a></div>
        </div>
        <aside className="recommended-resume-summary">
          <span className="status-dot">{recommended.fit}</span>
          <h2>{recommended.title}</h2>
          <p>{recommended.proof}</p>
          <ul>{recommended.roles.slice(0, 3).map((role) => <li key={role}>{role}</li>)}</ul>
        </aside>
      </div>
    </section>

    <section className="alternate-resume-section">
      <div className="shell">
        <div className="split-head"><div><p className="eyebrow">Role-specific alternatives</p><h2>Use an alternate only when the job calls for it.</h2></div><p>The experience stays consistent. These versions change the proof order for a systems-first or workflow-automation screen.</p></div>
        <div className="alternate-resume-grid">
          {alternates.map((lane) => <article className={`alternate-resume-card ${lane.tone}`} key={lane.number}>
            <div className="lane-number">{lane.number}</div>
            <div><span className="card-tag">{lane.fit}</span><h2>{lane.title}</h2><p>{lane.proof}</p><ul>{lane.roles.slice(0, 3).map((role) => <li key={role}>{role}</li>)}</ul></div>
            <a className="button" href={`/downloads/${lane.file}`} download>Download {lane.title} resume (PDF) <span aria-hidden="true">↓</span></a>
          </article>)}
        </div>
      </div>
    </section>

    <section className="resume-close dark-section">
      <div className="shell application-grid">
        <div><p className="eyebrow light-eyebrow">Next step</p><h2>Continue with proof or start a conversation.</h2><p>Review the shipped product for delivery evidence, or use the hiring brief for the fastest role-fit summary.</p></div>
        <div className="application-links"><Link href="/work/resale-scanner-pro"><span>Review Resale Scanner Pro</span><span>→</span></Link><Link href="/hiring"><span>Open the hiring-team brief</span><span>→</span></Link><a href="mailto:avergara13@me.com"><span>Email Angel</span><span>→</span></a></div>
      </div>
    </section>
  </main>;
}
