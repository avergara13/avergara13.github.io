import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Angel Vergara — Implementation & Onboarding",
  description: "Bilingual hospitality operations leader and implementation-focused systems builder with shipped product and workflow-delivery proof.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Angel Vergara — Systems teams can actually adopt.",
    description: "Bilingual operations leadership, practical implementation systems, and shipped product proof.",
    images: [{ url: "/og-home.png", width: 1200, height: 630, alt: "Angel Vergara — Systems teams can actually adopt." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Vergara — Systems teams can actually adopt.",
    description: "Bilingual operations leadership, practical implementation systems, and shipped product proof.",
    images: ["/og-home.png"],
  },
};

const implementationResume = "/downloads/Angel_Vergara_Resume_Implementation_Onboarding.pdf";

const proofItems = [
  ["English + Spanish", "Bilingual communication"],
  ["Operations → systems", "Workflow translation"],
  ["Live product", "Shipped delivery proof"],
];

export default function Home() {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="shell hero-shell">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="desktop-only">Implementation & onboarding · operations systems</span><span className="mobile-only">Implementation & onboarding</span></p>
              <h1 id="hero-title"><span className="desktop-only">Operations leader building systems teams can actually adopt.</span><span className="mobile-only">Operations leadership built for adoption.</span></h1>
              <p className="lede"><span className="desktop-only">I turn frontline complexity into clear workflows, usable tools, and accountable implementation—grounded in hospitality operations and hands-on product building.</span><span className="mobile-only">Bilingual hospitality operator and systems builder turning frontline complexity into workflows teams can use.</span></p>
              <div className="actions hero-actions">
                <a className="button primary" href={implementationResume} download>
                  Download implementation resume <span aria-hidden="true">↓</span>
                </a>
                <Link className="button" href="/work/resale-scanner-pro">
                  <span className="desktop-only">View Resale Scanner Pro</span><span className="mobile-only">View featured work</span> <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="hero-proof-strip" aria-label="Career proof points">
                {proofItems.map(([title, label]) => <div key={title}><b>{title}</b><span>{label}</span></div>)}
              </div>
            </div>
            <aside className="hero-product" aria-label="Featured live product">
              <span className="status-dot"><span className="desktop-only">Featured live product</span><span className="mobile-only">Live product</span></span>
              <h2>Resale Scanner Pro</h2>
              <p><span className="desktop-only">A working decision-support product that turns item research into a repeatable evidence workflow.</span><span className="mobile-only">One clear proof point, with a safe live product and outcome-focused case study.</span></p>
              <div className="hero-workflow">
                <div><b>01 · Capture</b><span>Collect item evidence</span></div>
                <div><b>02 · Research</b><span>Compare market signals</span></div>
                <div><b>03 · Decide</b><span>Score opportunity</span></div>
                <div><b>04 · Act</b><span>Export the next step</span></div>
              </div>
              <div className="proof-note"><b>Public proof boundary</b><span>Product behavior and safe sample outputs are public. Internal workspace and infrastructure details stay private.</span></div>
            </aside>
          </div>
          <div className="hero-bottom">
            <div><b>Recommended path</b><span>Resume → strongest case study → direct contact</span></div>
            <div><b>Clear labels</b><span>Live product · public source · concept</span></div>
            <div><b>Fast scan</b><span>Identity, fit, proof, and action above the fold</span></div>
          </div>
        </div>
      </section>

      <section id="experience" className="career-bridge-section" aria-labelledby="career-bridge-title">
        <div className="shell career-bridge-grid">
          <div>
            <p className="eyebrow">Operations to systems</p>
            <h2 id="career-bridge-title">I learned systems by running the work they have to support.</h2>
          </div>
          <div className="career-bridge-copy">
            <p>My path into implementation and systems work started on restaurant floors and in kitchens, where adoption is not theoretical: training has to hold, handoffs have to survive rushes, and tools have to help people make the next decision.</p>
            <p>Progressing from hands-on culinary roles to executive chef and general manager taught me to translate operating pressure into clearer workflows, visible ownership, and usable systems.</p>
          </div>
        </div>
        <div className="shell operations-translation" aria-label="How operations experience translates into systems work">
          <article>
            <p className="eyebrow">Operating reality</p>
            <h3>Messy handoffs, hidden exceptions, and pressure that exposes weak systems.</h3>
            <ul><li>Inventory and vendor pressure</li><li>Training and staffing variability</li><li>Cost, quality, and readiness signals</li></ul>
          </article>
          <span aria-hidden="true">→</span>
          <article>
            <p className="eyebrow">Systems response</p>
            <h3>Clear workflows, visible ownership, and human-controlled automation.</h3>
            <ul><li>Requirements and process mapping</li><li>Training, configuration, and adoption</li><li>Evidence, recovery, and reporting</li></ul>
          </article>
        </div>
      </section>

      <section id="work" className="featured-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Selected work</p><h2>Proof you can inspect.</h2></div><p>Lead with shipped work. Follow with sanitized architecture and clearly labeled supporting projects—no inflated claims and no mystery metrics.</p></div>
          <article className="featured-case">
            <div className="featured-copy">
              <span className="status-dot green">Shipped and operational</span>
              <h3>Resale Scanner Pro</h3>
              <p>A mobile-first AI-assisted resale workflow connecting capture, market research, human judgment, listing preparation, and operating records.</p>
              <dl className="facts">
                <div><dt>Role</dt><dd>Product design, workflow architecture, implementation, delivery</dd></div>
                <div><dt>Operator</dt><dd>Reseller making sourcing, pricing, and listing decisions</dd></div>
                <div><dt>System</dt><dd>React, TypeScript, Node, Postgres, AI and marketplace integrations</dd></div>
                <div><dt>Proof</dt><dd>Live product and employer-facing case study</dd></div>
              </dl>
              <div className="actions"><Link className="button primary" href="/work/resale-scanner-pro">Open case study <span aria-hidden="true">→</span></Link><a className="button" href="https://resale-scanner-pro-production.up.railway.app" target="_blank" rel="noreferrer">Open live product <span aria-hidden="true">↗</span></a></div>
            </div>
            <div className="featured-screens">
              {[["/images/rsp/session.png", "Session decisions", "Session signals and estimated profit"], ["/images/rsp/listings.png", "Listing research", "Human-reviewed optimization queue"], ["/images/rsp/sold.png", "Outcome tracking", "Sales and fulfillment evidence"]].map(([src, label, caption], index) => (
                <figure className={`phone phone-${index + 1}`} key={src}><Image src={src} alt={`Resale Scanner Pro ${label}`} width={780} height={1470} sizes="(max-width: 620px) 46vw, 18vw" /><figcaption><b>{label}</b><span>{caption}</span></figcaption></figure>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="supporting-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Supporting proof</p><h2>Architecture, domain judgment, and workflow discipline.</h2></div><p>Each project adds a different proof layer while keeping shipped work, public source, and concepts clearly separated.</p></div>
          <div className="project-grid">
            <Link className="project-card dark-card wide-card" href="/work/loft-os"><span className="card-tag">Sanitized architecture case study</span><h3>Loft OS</h3><p>Governed AI-assisted work focused on scope, authority, evidence, and repair—without exposing private implementation details.</p><div className="mini-workflow">{["Intake", "Scope", "Execute", "Review", "Authorize", "Closeout"].map((item, index) => <div key={item}><span>0{index + 1}</span><b>{item}</b></div>)}</div><span className="card-link">Open case study →</span></Link>
            <Link className="project-card" href="/work/sous-chef"><span className="card-tag">Public source case study</span><h3>Sous Chef</h3><p>An AI-assisted culinary workspace for recipe workflows, pantry signals, cookbooks, and cooking-session continuity.</p><div className="capability-grid"><div><b>Recipes</b><span>Structured creation</span></div><div><b>Pantry</b><span>Ingredient signals</span></div><div><b>Cookbooks</b><span>Reusable organization</span></div><div><b>Sessions</b><span>Cooking continuity</span></div></div><span className="card-link">Open case study →</span></Link>
          </div>
          <Link className="concept-link" href="/work/office-chef">
            <span><b>Additional concept:</b> The Office Chef · simulated data</span>
            <span>Review supporting concept →</span>
          </Link>
        </div>
      </section>

      <section id="contact" className="review-section">
        <div className="shell application-grid">
          <div>
            <p className="eyebrow light-eyebrow">Fast review path · Remote U.S. roles</p>
            <h2>Resume. Strongest proof. Direct conversation.</h2>
            <p>Start with the implementation resume, inspect the shipped product, then connect about the operating problem your team needs to solve.</p>
            <div className="review-meta">
              <Link href="/hiring">Hiring-team brief →</Link>
              <a href="https://linkedin.com/in/angel-vergara-83861540" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://github.com/avergara13" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>
          <div className="application-links">
            <a href={implementationResume} download><span>Download the recommended resume</span><span>↓</span></a>
            <Link href="/work/resale-scanner-pro"><span>Review Resale Scanner Pro</span><span>→</span></Link>
            <a href="mailto:avergara13@me.com"><span>Email Angel</span><span>→</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
