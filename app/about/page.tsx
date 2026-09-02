import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About — Angel Vergara", description: "From hospitality operations leadership to applied AI workflows and business systems.", alternates: { canonical: "/about/" }, openGraph: { type: "website", url: "/about/", title: "About — Angel Vergara", description: "From hospitality operations leadership to applied AI workflows and business systems.", images: [{ url: "/og-home.png", width: 1200, height: 630, alt: "About Angel Vergara" }] }, twitter: { card: "summary_large_image", title: "About — Angel Vergara", description: "From hospitality operations leadership to applied AI workflows and business systems.", images: ["/og-home.png"] } };

export default function About() {
  return <main id="main" data-section="about">
    <section className="about-page shell">
      <header><p className="eyebrow">About / career bridge</p><h1>Systems thinking grounded in operating reality.</h1><p>My path into implementation started in kitchens and restaurant operations, where workflows have to survive pressure, handoffs have to stay clear, and adoption is never theoretical.</p></header>
      <div className="about-story">
        <article><span>01</span><h2>Run the operation</h2><p>Progressing from culinary roles to executive chef and general manager built practical judgment across inventory, vendors, scheduling, training, reporting, payroll-data review, and customer experience.</p></article>
        <article><span>02</span><h2>Translate the friction</h2><p>Messy handoffs, hidden exceptions, and weak signals became requirements, process maps, decision rules, and clearer ownership.</p></article>
        <article><span>03</span><h2>Build usable systems</h2><p>Today I turn that operating context into AI-assisted workflows, inspectable interfaces, evidence-backed case studies, and practical human-in-the-loop controls.</p></article>
      </div>
      <div className="actions"><Link className="button primary" href="/work/">Browse formal work <span aria-hidden="true">→</span></Link><Link className="button" href="/resume/">Review resume <span aria-hidden="true">→</span></Link><a className="button" href="mailto:avergara13@me.com">Contact <span aria-hidden="true">→</span></a></div>
    </section>
  </main>;
}
