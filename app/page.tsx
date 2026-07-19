import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Angel Vergara — Implementation, Operations Systems & AI Workflows",
  description: "Bilingual implementation and operations-systems portfolio with shipped product work, human-controlled AI workflows, and 15+ years of hospitality leadership.",
};

const resumeLanes = [
  { title: "Implementation & Onboarding", copy: "Hospitality technology, SaaS onboarding, customer training, configuration, adoption, and implementation support.", href: "/downloads/Angel_Vergara_Resume_Implementation_Onboarding.pdf", tone: "cobalt" },
  { title: "Business Systems & Operations", copy: "Process discovery, requirements, reporting, workforce optimization, operations intelligence, and systems analysis.", href: "/downloads/Angel_Vergara_Resume_Business_Systems_Operations.pdf", tone: "ink" },
  { title: "AI Workflow & Automation", copy: "Agentic workflows, LLM implementation, human review, product delivery, recovery logic, and technical documentation.", href: "/downloads/Angel_Vergara_Resume_AI_Workflow_Automation.pdf", tone: "copper" },
];

export default function Home() {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Implementation · Operations Systems · AI Workflows</p>
            <h1 id="hero-title">I turn messy operations into systems people can actually use.</h1>
            <p className="lede">Bilingual hospitality-operations leader with 15+ years of frontline experience, now building customer-ready implementation systems, shipped products, and governed AI workflows.</p>
            <div className="actions">
              <Link className="button primary" href="/work/resale-scanner-pro">View shipped product <span aria-hidden="true">→</span></Link>
              <Link className="button" href="/resume">Choose a resume <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className="hero-art" aria-label="Resale Scanner Pro product screens and systems note">
            <figure className="project-frame main-frame"><figcaption><span>Resale Scanner Pro</span><span>Shipped</span></figcaption><img src="/images/rsp/agent.png" alt="Resale Scanner Pro agent workspace" /></figure>
            <figure className="project-frame secondary-frame"><figcaption><span>Decision workflow</span><span>Live</span></figcaption><img src="/images/rsp/listings.png" alt="Resale Scanner Pro listing queue" /></figure>
            <div className="system-note"><b>Governed by design.</b><span>Scope, human review, evidence, recovery, and clear handoffs stay visible throughout the workflow.</span></div>
          </div>
        </div>
      </section>

      <div className="proofbar" aria-label="Career proof points"><div className="shell proof-grid"><div><b>15+ years</b><span>Hospitality operations</span></div><div><b>English / Español</b><span>Bilingual communication</span></div><div><b>Shipped public product</b><span>Inspectable delivery proof</span></div><div><b>Remote U.S.</b><span>Orlando, Florida</span></div></div></div>

      <section id="work" className="featured-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Selected work</p><h2>Proof you can inspect.</h2></div><p>Lead with shipped, public work. Follow with sanitized architecture and clearly labeled supporting projects—no inflated claims and no mystery metrics.</p></div>
          <article className="featured-case">
            <div className="featured-copy"><span className="status-dot green">Shipped and public</span><h3>Resale Scanner Pro</h3><p>A mobile-first AI-assisted resale workflow that connects capture, identification, market research, BUY / MAYBE / PASS decisions, listing preparation, marketplace publishing, and operating records.</p><dl className="facts"><div><dt>Role</dt><dd>Product design, workflow architecture, implementation, delivery</dd></div><div><dt>Operator</dt><dd>Reseller making fast sourcing, pricing, and listing decisions</dd></div><div><dt>System</dt><dd>React, TypeScript, Node / Express, Supabase / Postgres, AI and marketplace integrations</dd></div><div><dt>Proof</dt><dd>Public production application and public repository</dd></div></dl><div className="actions"><Link className="button primary" href="/work/resale-scanner-pro">Open case study <span aria-hidden="true">→</span></Link><a className="button" href="https://resale-scanner-pro-production.up.railway.app" target="_blank" rel="noreferrer">Try live app <span aria-hidden="true">↗</span></a></div></div>
            <div className="featured-screens">{[["/images/rsp/session.png", "Session decisions"], ["/images/rsp/listings.png", "Listing research"], ["/images/rsp/sold.png", "Outcome tracking"]].map(([src, label], index) => <figure className={`phone phone-${index + 1}`} key={src}><img src={src} alt={`Resale Scanner Pro ${label}`} /><figcaption><b>{label}</b><span>{index === 0 ? "Session signals and estimated profit" : index === 1 ? "Human-reviewed optimization queue" : "Sales and fulfillment evidence"}</span></figcaption></figure>)}</div>
          </article>
        </div>
      </section>

      <section className="supporting-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Supporting proof</p><h2>Architecture, domain judgment, and workflow discipline.</h2></div><p>Each project adds a different proof layer: governed systems thinking, hospitality-domain product judgment, and practical process discovery.</p></div>
          <div className="project-grid">
            <Link className="project-card dark-card wide-card" href="/work/loft-os"><span className="card-tag">Sanitized architecture case study</span><h3>Loft OS</h3><p>Governed AI-assisted work that can move forward without running unchecked. The case focuses on scope, human authority, evidence, and repair—not private source internals.</p><div className="mini-workflow">{["Intake", "Scope", "Execute", "Review", "Authorize", "Closeout"].map((item, index) => <div key={item}><span>0{index + 1}</span><b>{item}</b></div>)}</div><span className="card-link">Open case study →</span></Link>
            <Link className="project-card" href="/work/sous-chef"><span className="card-tag">Hospitality-domain application</span><h3>Sous Chef</h3><p>An AI-assisted culinary workspace for recipe workflows, pantry signals, cookbooks, and cooking-session continuity.</p><div className="capability-grid"><div><b>Recipes</b><span>Structured creation</span></div><div><b>Pantry</b><span>Ingredient signals</span></div><div><b>Cookbooks</b><span>Reusable organization</span></div><div><b>Sessions</b><span>Cooking continuity</span></div></div><span className="card-link">Open case study →</span></Link>
            <Link className="project-card office-card full-card" href="/work/office-chef"><div><span className="card-tag">Concept · in design</span><h3>The Office Chef</h3></div><div><span>Input</span><b>Invoices & vendor changes</b></div><div><span>Analysis</span><b>Food cost & menu margin</b></div><div><span>Output</span><b>Owner-ready operating brief</b></div></Link>
          </div>
        </div>
      </section>

      <section id="experience" className="experience-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Experience</p><h2>Operations first. Systems by necessity.</h2></div><p>The technical work is stronger because it comes from years of running real operations—people, inventory, vendors, costs, training, service, and exceptions.</p></div>
          <div className="timeline"><div className="year">2018–2024</div><article><h3>General Manager / Chef · Cafe Linger</h3><p>Full-scope operations across production, purchasing, vendors, inventory, payroll coordination, bookkeeping support, staff training, reporting, and customer experience.</p></article><div className="year">2015–2018</div><article><h3>Chef de Cuisine · Farm-Haus</h3><p>Production, inventory ordering, quality, team coordination, and direct partnership with ownership on consistent operating systems and growth support.</p></article><div className="year">2008–2015</div><article><h3>Culinary Leadership</h3><p>Progressed through culinary roles across Miami Beach, Cape Cod, Miami, and Orlando, building prep, ordering, food-count, training, and quality-control routines.</p></article></div>
          <div className="translation-grid"><article><p className="eyebrow">Operating reality</p><h3>Messy handoffs, missing standards, hidden exceptions.</h3><ul><li>Inventory and vendor pressure</li><li>Training and staffing variability</li><li>Cost, margin, and readiness signals</li></ul></article><span aria-hidden="true">→</span><article><p className="eyebrow">Systems response</p><h3>Clear workflows, visible ownership, human-controlled automation.</h3><ul><li>Requirements and process mapping</li><li>Training, configuration, and adoption</li><li>Evidence, recovery, and reporting</li></ul></article></div>
        </div>
      </section>

      <section id="resumes" className="resume-section">
        <div className="shell"><div className="split-head"><div><p className="eyebrow">Employer-ready resumes</p><h2>Choose the version that matches the work.</h2></div><p>One verified career, three employer-ready views. Each version changes positioning and proof order—not the underlying facts.</p></div><div className="resume-grid">{resumeLanes.map((lane) => <article className={`resume-card ${lane.tone}`} key={lane.title}><div className="resume-paper" aria-hidden="true"><b>Angel Vergara</b><span>{lane.title}</span><i></i><i></i><i></i><i></i></div><h3>{lane.title}</h3><p>{lane.copy}</p><a href={lane.href} download>Download PDF <span aria-hidden="true">↓</span></a></article>)}</div><div className="center-link"><Link className="button" href="/resume">Compare all resumes and materials <span aria-hidden="true">→</span></Link></div></div>
      </section>

      <section className="application-section"><div className="shell application-grid"><div><p className="eyebrow light-eyebrow">Application operating system</p><h2>From target role to tailored package—in one controlled workflow.</h2><p>Verified role links, role-lane selection, truthful proof ordering, tailored materials, submission logging, and follow-up live in the same system.</p></div><div className="application-links"><Link href="/application-kit"><span>View the application system</span><span>→</span></Link><a href="/downloads/Angel_Vergara_Application_Quickstart.pdf" download><span>Download application quickstart</span><span>↓</span></a><a href="/downloads/Angel_Vergara_Cover_Letter_Kit.pdf" download><span>Download cover-letter kit</span><span>↓</span></a></div></div></section>

      <section id="contact" className="contact-section"><div className="shell contact-grid"><div><p className="eyebrow">Open to remote U.S. roles and Orlando opportunities</p><h2>Let’s build systems people trust.</h2><a className="button ink-button" href="mailto:avergara13@me.com">Email Angel <span aria-hidden="true">→</span></a></div><div className="contact-links"><a href="https://linkedin.com/in/angel-vergara-83861540" target="_blank" rel="noreferrer"><span>LinkedIn</span><span>↗</span></a><a href="https://github.com/avergara13" target="_blank" rel="noreferrer"><span>GitHub</span><span>↗</span></a><a href="mailto:avergara13@me.com"><span>avergara13@me.com</span><span>→</span></a></div></div></section>
    </main>
  );
}
