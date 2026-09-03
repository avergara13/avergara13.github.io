import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Lab — Angel Vergara", description: "Experiments, prototypes, and interface studies, kept separate from production proof.", alternates: { canonical: "/lab/" }, robots: { index: true, follow: true }, openGraph: { type: "website", url: "/lab/", title: "Lab — Angel Vergara", description: "Experiments, prototypes, and interface studies, kept separate from production proof.", images: [{ url: "/og-home.png", width: 1200, height: 630, alt: "Angel Vergara lab and experiments" }] }, twitter: { card: "summary_large_image", title: "Lab — Angel Vergara", description: "Experiments, prototypes, and interface studies, kept separate from production proof.", images: ["/og-home.png"] } };

// TSK-961 Phase 8: "Explore here. Prove elsewhere." The experimental boundary is stated
// once at page level, so individual entries do not repeat the disclaimer.
const experiments = [
  ["EXPERIMENTAL", "Gemini Chat", "A conversational interface exploration for testing interaction patterns and AI-assisted workflow ideas."],
  ["EXPERIMENTAL", "Live Voice", "A voice-interface exploration for studying how spoken input could fit into future workflow experiences."],
  ["CONCEPT", "The Office Chef", "A clearly labeled product concept for turning invoices, vendor changes, inventory signals, and menu performance into an owner-ready operating brief using simulated data."],
];

export default function Lab() {
  return <main id="main" data-section="lab">
    <section className="lab-page shell">
      <header>
        <p className="eyebrow">Lab</p>
        <h1>Experiments, prototypes, and interface studies.</h1>
        <p>This is where I explore ideas before they become portfolio proof. Some experiments are curated, local, private, mocked, incomplete, or intentionally not publicly live.</p>
        <p className="lab-status"><strong>EXPERIMENTAL</strong><strong>PUBLIC LIVE NOT ENABLED</strong></p>
      </header>

      <div className="lab-list">
        {experiments.map(([label, title, copy]) => <article key={title}><span>{label}</span><h2>{title}</h2><p>{copy}</p></article>)}
      </div>

      <p className="lab-boundary">Lab work may use curated fixtures, local/private services, mocked states, or incomplete experiments. It is intentionally separated from the portfolio’s production and working-product proof.</p>

      <div className="actions">
        <Link className="button primary" href="/work/">View portfolio <span aria-hidden="true">→</span></Link>
        <Link className="button" href="/work/loft-os/">View Loft OS <span aria-hidden="true">→</span></Link>
        <Link className="button" href="/work/resale-scanner-pro/">View Resale Scanner Pro <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  </main>;
}
