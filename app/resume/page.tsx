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
  return <main id="main">
    <section className="subpage-hero"><div className="shell"><p className="eyebrow">Resume suite · Employer-ready evidence</p><h1>One career.<br />Three clear views.</h1><p className="lede">Start with the implementation and onboarding resume. Use an alternate only when the role’s first screen genuinely calls for a different proof order.</p><div className="actions"><a className="button primary" href="/downloads/Angel_Vergara_Resume_Implementation_Onboarding.pdf" download>Download recommended resume (PDF) <span aria-hidden="true">↓</span></a></div></div></section>
    <section className="resume-lane-section"><div className="shell lane-stack">{lanes.map((lane) => <article className={`lane-card ${lane.tone}`} key={lane.number}><div className="lane-number">{lane.number}</div><div><span className="status-dot">{lane.fit}</span><h2>{lane.title}</h2><p>{lane.proof}</p><ul>{lane.roles.map((role) => <li key={role}>{role}</li>)}</ul></div><div className="lane-download"><div className="resume-paper large-paper" aria-hidden="true"><b>Angel Vergara</b><span>{lane.title}</span><i></i><i></i><i></i><i></i><i></i><i></i></div><a className="button primary" href={`/downloads/${lane.file}`} download>Download {lane.title} resume (PDF) <span aria-hidden="true">↓</span></a></div></article>)}</div></section>
    <section className="truth-section dark-section"><div className="shell split-head"><div><p className="eyebrow">The shared evidence spine</p><h2>Truth stays fixed across every lane.</h2></div><div className="truth-grid"><div><b>Hospitality operations</b><span>Frontline leadership, training, inventory, and service systems</span></div><div><b>English / Español</b><span>Bilingual communication and training</span></div><div><b>Shipped product</b><span>Resale Scanner Pro live and available for review</span></div><div><b>Implementation focus</b><span>Discovery, configuration, adoption, evidence, and recovery</span></div></div></div></section>
    <section className="materials-section"><div className="shell application-grid"><div><p className="eyebrow">For hiring teams</p><h2>Need the short version?</h2><p>Use the hiring-team brief for role fit, working style, the recommended proof sequence, and direct contact information.</p></div><div className="application-links"><Link href="/hiring"><span>Open the hiring-team brief</span><span>→</span></Link><Link href="/work/resale-scanner-pro"><span>Review the featured case study</span><span>→</span></Link><a href="mailto:avergara13@me.com"><span>Contact Angel</span><span>→</span></a></div></div></section>
  </main>;
}
