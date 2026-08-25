import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HumanGatedHandoff from "@/components/HumanGatedHandoff";

export const metadata: Metadata = {
  title: "Angel Vergara — AI Workflows & Business Systems",
  description: "I design and build practical AI-assisted workflows and business systems that turn messy operational problems into usable, testable tools.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Angel Vergara — AI workflows and business systems",
    description: "Practical AI-assisted workflows, business systems, and implementation proof.",
    images: [{ url: "/og-home.png", width: 1200, height: 630, alt: "Angel Vergara — AI workflows and business systems." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Vergara — AI workflows and business systems",
    description: "Practical AI-assisted workflows, business systems, and implementation proof.",
    images: ["/og-home.png"],
  },
};

const generalResume = "/downloads/Angel_Vergara_Resume_General.pdf";

const proofItems = [
  ["AI workflows", "Designed for real work"],
  ["Human controls", "Review stays visible"],
  ["Tested delivery", "Evidence over promises"],
];

export default function Home() {
  return (
    <main id="main" data-section="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="shell hero-shell">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="desktop-only">AI-assisted workflows · business systems · implementation</span><span className="mobile-only">AI workflows · business systems</span></p>
              <h1 id="hero-title"><span className="desktop-only">I design and build practical AI-assisted workflows and business systems.</span><span className="mobile-only">Practical AI workflows and business systems.</span></h1>
              <p className="lede"><span className="desktop-only">I turn messy operational problems into usable, testable tools—with clear human control points and evidence-backed delivery.</span><span className="mobile-only">Turning messy operational problems into usable, testable tools.</span></p>
              <div className="actions hero-actions">
                <a className="button primary" href={generalResume} download>
                  Download resume (PDF) <span aria-hidden="true">↓</span>
                </a>
                <Link className="button" href="/work/resale-scanner-pro">
                  <span className="desktop-only">View Resale Scanner Pro</span><span className="mobile-only">View featured work</span> <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="hero-proof-strip" aria-label="Career proof points">
                {proofItems.map(([title, label]) => <div key={title}><b>{title}</b><span>{label}</span></div>)}
              </div>
            </div>
            <aside className="hero-product hero-handoff" aria-label="Human-gated handoff">
              <span className="status-dot">Human-gated handoff</span>
              <h2>Useful automation keeps the decision visible.</h2>
              <HumanGatedHandoff />
            </aside>
          </div>
        </div>
      </section>

      <section id="capabilities" className="capabilities-section" aria-labelledby="capabilities-title">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">AI / engineering capabilities</p><h2 id="capabilities-title">Useful systems, with the controls left in.</h2></div><p>Demonstrated workflow capability signals, kept concise and evidence-safe.</p></div>
          <div className="field-manual">
            <article><span>01</span><h3>AI workflow / role design</h3><p>Define a useful role, its boundaries, and its handoff points.</p><Link href="/work/loft-os">PROOF · Loft OS →</Link></article>
            <article><span>02</span><h3>Implementation / usable delivery</h3><p>Turn a workflow into a practical interface people can use and inspect.</p><Link href="/work/resale-scanner-pro">PROOF · Resale Scanner Pro →</Link></article>
            <article><span>03</span><h3>Reliability / human control / evaluation</h3><p>Keep review, recovery, and human decisions visible in consequential work.</p><Link href="/work/loft-os">PROOF · Loft OS + ARP →</Link></article>
          </div>
        </div>
      </section>

      <section id="work" className="featured-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">Selected work</p><h2>Proof you can inspect.</h2></div><p>Lead with a working product in real use. Follow with sanitized architecture and clearly labeled supporting projects—no inflated claims and no mystery metrics.</p></div>
          <article className="featured-case">
            <div className="featured-copy">
              <span className="status-dot green">In real operating use</span>
              <h3>Resale Scanner Pro</h3>
              <p>A mobile-first AI-assisted resale workflow—built for a real family resale operation—connecting capture, market research, human judgment, listing preparation, and operating records.</p>
              <dl className="facts">
                <div><dt>Role</dt><dd>Product design, workflow architecture, implementation, delivery</dd></div>
                <div><dt>Operator</dt><dd>Reseller making sourcing, pricing, and listing decisions</dd></div>
                <div><dt>System</dt><dd>React, TypeScript, Node, Postgres, AI and marketplace integrations</dd></div>
                <div><dt>Source</dt><dd>Private by design</dd></div>
                <div><dt>Proof</dt><dd>Sanitized employer-facing case study from real operating use</dd></div>
              </dl>
              <div className="actions"><Link className="button primary" href="/work/resale-scanner-pro">Open case study <span aria-hidden="true">→</span></Link></div>
            </div>
            <div className="featured-screens">
              {[['/images/rsp/session.png', '01 · Evaluate', 'Session signals and estimated profit'], ['/images/rsp/listings.png', '02 · Act', 'Human-reviewed optimization queue'], ['/images/rsp/sold.png', '03 · Learn', 'Sales and fulfillment evidence']].map(([src, label, caption], index) => (
                <figure className={`phone phone-${index + 1}`} key={src}><Image src={src} alt={`Resale Scanner Pro ${label}`} width={780} height={1470} sizes="(max-width: 620px) 46vw, 18vw" /><figcaption><b>{label}</b><span>{caption}</span></figcaption></figure>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="supporting-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">More proof</p><h2>Systems thinking you can inspect.</h2></div><p>RSP is the flagship. Loft OS is first-tier proof of role-specific agent workflows, human control, and accountable delivery patterns.</p></div>
          <div className="project-grid">
              <Link className="project-card dark-card wide-card" href="/work/loft-os"><span className="card-tag">First-tier proof · sanitized architecture case study</span><h3>Loft OS</h3><p>Role-specific AI workflows coordinated through clear handoffs, human review, evidence, recovery, and accountable closeout.</p><HumanGatedHandoff variant="dark" /><span className="card-link">Open case study →</span></Link>
            <Link className="project-card recruiter-card" href="/work/assistant-recruiter-pro"><span className="card-tag">Recruiter workflow · inspectable proof</span><h3>Assistant Recruiter Pro</h3><p>Designed/customized a recruiter-focused AI assistant that generates and refines Boolean search strategies and uses structured user feedback to improve search quality and platform realism.</p><div className="capability-grid"><div><b>JD map</b><span>Role and constraint intake</span></div><div><b>Boolean strategy</b><span>Platform-aware query variants</span></div><div><b>Human review</b><span>Relevance and realism checks</span></div><div><b>Iteration</b><span>Structured refinement loop</span></div></div><span className="card-link">Open workflow proof →</span></Link>
            <Link className="project-card" href="/work/sous-chef"><span className="card-tag">Public source case study</span><h3>Sous Chef</h3><p>An AI-assisted culinary workspace for recipe workflows, pantry signals, cookbooks, and cooking-session continuity.</p><div className="capability-grid"><div><b>Recipes</b><span>Structured creation</span></div><div><b>Pantry</b><span>Ingredient signals</span></div><div><b>Cookbooks</b><span>Reusable organization</span></div><div><b>Sessions</b><span>Cooking continuity</span></div></div><span className="card-link">Open case study →</span></Link>
          </div>
          <Link className="concept-link" href="/work/office-chef">
            <span><b>Additional concept:</b> The Office Chef · simulated data</span>
            <span>Review supporting concept →</span>
          </Link>
        </div>
      </section>

      <section id="experience" className="career-bridge-section" aria-labelledby="career-bridge-title">
        <div className="shell career-bridge-grid">
          <div>
            <p className="eyebrow">About / career bridge</p>
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

      <section id="contact" className="review-section">
        <div className="shell application-grid">
          <div>
            <p className="eyebrow light-eyebrow">Fast review path · Remote U.S. roles</p>
            <h2>Resume. Proof. Direct conversation.</h2>
            <p>Start with the resume, inspect RSP and Loft OS, then connect about the operating problem your team needs to solve.</p>
            <div className="review-meta">
              <Link href="/#experience">About / career bridge →</Link>
              <a href="https://linkedin.com/in/angel-vergara-83861540" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://github.com/avergara13" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>
          <div className="application-links">
            <a href={generalResume} download><span>Download the resume (PDF)</span><span>↓</span></a>
            <Link href="/work/resale-scanner-pro"><span>Review Resale Scanner Pro</span><span>→</span></Link>
            <a href="mailto:avergara13@me.com"><span>Email Angel</span><span>→</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
