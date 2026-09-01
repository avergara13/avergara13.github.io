import type { Metadata } from "next";

export const metadata: Metadata = { title: "Lab — Angel Vergara", description: "Experimental and local-private portfolio explorations separated from production proof.", alternates: { canonical: "/lab/" }, robots: { index: true, follow: true } };

export default function Lab() {
  return <main id="main" data-section="lab">
    <section className="lab-page shell">
      <header><p className="eyebrow">Lab</p><h1>Experiments & Explorations</h1><p>Concepts and local-private directions separated from production proof.</p></header>
      <div className="lab-list">
        <article><span>Local API experiment</span><h2>Gemini Chat + Live Voice</h2><p>Local-private chat and low-latency voice exploration using the Gemini API. It is kept outside the recruiter proof surfaces and is not presented as a deployed service.</p><strong>Experimental · no external actions · public live not enabled</strong></article>
        <article><span>Concept prototype</span><h2>The Office Chef</h2><p>A clearly labeled product concept for turning invoices, vendor changes, inventory signals, and menu performance into an owner-ready operating brief using simulated data.</p></article>
        <article><span>Exploration direction</span><h2>Agentic Orchestration</h2><p>Exploring multi-agent collaboration with bounded roles, delegated work, explicit human decisions, and accountable closeout.</p></article>
      </div>
    </section>
  </main>;
}
