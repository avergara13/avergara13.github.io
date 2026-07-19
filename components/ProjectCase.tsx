import Image from "next/image";
import Link from "next/link";

export type Project = {
  slug: string;
  eyebrow: string;
  title: string;
  dek: string;
  status: string;
  statusTone: "green" | "cobalt" | "copper";
  proof: string[];
  links?: { label: string; href: string; primary?: boolean }[];
  facts: { label: string; value: string }[];
  workflow: { number: string; title: string; copy: string }[];
  sections: {
    number: string;
    label: string;
    title: string;
    copy: string;
    kind: "screens" | "decision" | "controls" | "system" | "domain" | "boundary";
  }[];
};

const projectData: Record<string, Project> = {
  "resale-scanner-pro": {
    slug: "resale-scanner-pro",
    eyebrow: "Shipped product · Visual case study",
    title: "Resale Scanner Pro",
    dek: "A mobile-first decision system that turns a thrift-store photo into a structured resale workflow: identify the item, research comparable sales, evaluate margin and risk, prepare a listing, and track the result.",
    status: "Public and operational",
    statusTone: "green",
    proof: ["Photo → decision", "Human gates", "Market evidence", "Live product"],
    links: [
      { label: "Open live product", href: "https://resale-scanner-pro-production.up.railway.app", primary: true },
      { label: "View source repository", href: "https://github.com/avergara13/resale-scanner-pro" },
    ],
    facts: [
      { label: "Role", value: "Product design, workflow architecture, implementation, and delivery" },
      { label: "Primary user", value: "Reseller making sourcing, pricing, and listing decisions" },
      { label: "Constraint", value: "Uncertainty stays visible and the operator keeps the final decision" },
      { label: "Delivered outcome", value: "Working public product with an evidence-focused employer case study" },
    ],
    workflow: [
      { number: "01", title: "Capture", copy: "Photograph the item and start a session." },
      { number: "02", title: "Research", copy: "Identify the item and review comparable market signals." },
      { number: "03", title: "Decide", copy: "Compare cost, fees, margin, risk, and confidence." },
      { number: "04", title: "Prepare", copy: "Create and approve the listing before publication." },
      { number: "05", title: "Track", copy: "Record outcomes and feed evidence back into judgment." },
    ],
    sections: [
      { number: "02", label: "Shipped interface", title: "Evidence, not a concept rendering.", copy: "These screens come from the public application. They show the live session, listing research, and sold-item evidence loop.", kind: "screens" },
      { number: "03", label: "Decision design", title: "Useful automation has a stopping rule.", copy: "The product is designed around a buy-or-pass decision, not around producing more output. Uncertainty remains visible and the operator stays in control.", kind: "decision" },
    ],
  },
  "loft-os": {
    slug: "loft-os",
    eyebrow: "Architecture and operations case study",
    title: "Loft OS",
    dek: "A governed operating model for moving AI-assisted work from intake to verified closeout. The design treats scope, authority, evidence, and recoverability as product requirements—not administrative afterthoughts.",
    status: "Sanitized by design",
    statusTone: "copper",
    proof: ["Scoped execution", "Human authority", "Evidence chain", "Repair loops"],
    facts: [
      { label: "Role", value: "Systems architecture, governance design, and operating-model documentation" },
      { label: "Primary user", value: "Teams coordinating bounded AI-assisted work" },
      { label: "Constraint", value: "Explain the operating pattern without exposing private implementation details" },
      { label: "Delivered outcome", value: "An inspectable employer-facing pattern for accountable delivery" },
    ],
    workflow: [
      { number: "01", title: "Intake & scope", copy: "Capture the request, owner, outcome, allowed surfaces, and red lines." },
      { number: "02", title: "Execute", copy: "Change only the authorized, traceable surfaces." },
      { number: "03", title: "Review", copy: "Inspect behavior, quality, and scope compliance." },
      { number: "04", title: "Authorize", copy: "Keep high-impact decisions under explicit human control." },
      { number: "05", title: "Close out", copy: "Freeze evidence, reconcile state, and confirm ownership." },
    ],
    sections: [
      { number: "02", label: "Control design", title: "Governance expressed as usable product behavior.", copy: "Each control answers a delivery question: what may change, who may approve it, and what proves the result.", kind: "controls" },
      { number: "03", label: "Public boundary", title: "What this portfolio shows—and protects.", copy: "The case study explains the operating pattern without exposing private systems, repository details, identifiers, or sensitive implementation evidence.", kind: "boundary" },
    ],
  },
  "sous-chef": {
    slug: "sous-chef",
    eyebrow: "Hospitality-domain application",
    title: "Sous Chef",
    dek: "An AI-assisted culinary workspace that organizes recipe creation, pantry and ingredient signals, cookbooks, and cooking-session continuity around the way a real kitchen thinks.",
    status: "Public application repository",
    statusTone: "cobalt",
    proof: ["Domain-first UX", "Recipe workflows", "Pantry signals", "AI-assisted creation"],
    links: [{ label: "View public repository", href: "https://github.com/avergara13/sous-chef-app", primary: true }],
    facts: [
      { label: "Role", value: "Product design, domain translation, and implementation" },
      { label: "Primary user", value: "Cooks organizing recipes, pantry context, and cooking sessions" },
      { label: "Constraint", value: "Use culinary language and sequences that feel familiar to operators" },
      { label: "Delivered outcome", value: "Inspectable product work grounded in hospitality-domain judgment" },
    ],
    workflow: [
      { number: "01", title: "Discover & create", copy: "Start with a cooking goal and shape a structured recipe." },
      { number: "02", title: "Organize", copy: "Save reusable work into cookbooks and collections." },
      { number: "03", title: "Prepare", copy: "Connect recipes to pantry and shopping context." },
      { number: "04", title: "Cook", copy: "Carry the recipe through a focused cooking session." },
      { number: "05", title: "Remember", copy: "Preserve history so the next session begins with context." },
    ],
    sections: [
      { number: "02", label: "Product surface", title: "A culinary workspace, not a chat box.", copy: "The interface gives recipes, cookbooks, pantry state, and cooking continuity visible places to live.", kind: "screens" },
      { number: "03", label: "Domain translation", title: "Operational experience becomes product judgment.", copy: "Years of kitchen leadership inform the information hierarchy, preparation sequence, and exception handling.", kind: "domain" },
    ],
  },
  "office-chef": {
    slug: "office-chef",
    eyebrow: "Restaurant back-office concept",
    title: "The Office Chef",
    dek: "A clearly labeled product concept for turning invoices, vendor changes, inventory signals, and menu performance into an owner-ready operating brief.",
    status: "Concept in design · simulated data",
    statusTone: "copper",
    proof: ["Invoice intake", "Vendor deltas", "Food-cost review", "Owner briefing"],
    facts: [
      { label: "Role", value: "Product concept, workflow design, and future-state requirements" },
      { label: "Primary user", value: "Restaurant owner or operator reviewing back-office signals" },
      { label: "Constraint", value: "Demonstrate the workflow without implying a launch or customer deployment" },
      { label: "Delivered outcome", value: "Employer-facing concept showing discovery and requirements thinking" },
    ],
    workflow: [
      { number: "01", title: "Collect", copy: "Bring invoices into one intake and normalize vendor data." },
      { number: "02", title: "Compare", copy: "Surface price changes and unusual purchasing signals." },
      { number: "03", title: "Analyze & review", copy: "Connect costs to menu assumptions while keeping human approval." },
      { number: "04", title: "Brief", copy: "Produce a concise operating summary with next actions." },
    ],
    sections: [
      { number: "02", label: "Operating problem", title: "Back-office signals arrive too late and in too many places.", copy: "The concept begins with the actual friction: invoice piles, price surprises, manual spreadsheets, and no shared daily picture.", kind: "domain" },
      { number: "03", label: "Concept dashboard", title: "Make the exception visible before it becomes a surprise.", copy: "The sample view uses simulated data to demonstrate a future-state operating experience without implying a launched product or customer deployment.", kind: "decision" },
    ],
  },
};

export const projects = Object.values(projectData);

export function getProject(slug: string) {
  return projectData[slug];
}

function SectionVisual({ project, kind }: { project: Project; kind: Project["sections"][number]["kind"] }) {
  if (project.slug === "resale-scanner-pro" && kind === "screens") {
    return (
      <div className="case-screens">
        {[
          ["/images/rsp/session.png", "Live session", "Session-level signals and sourcing decisions."],
          ["/images/rsp/listings.png", "Market research", "Comparable listings beside the item decision."],
          ["/images/rsp/sold.png", "Outcome tracking", "Sold evidence closes the loop."],
        ].map(([src, label, caption]) => (
          <figure className="phone" key={src}>
            <Image src={src} alt={`${project.title} ${label} screen`} width={780} height={1688} sizes="(max-width: 620px) 46vw, 28vw" />
            <figcaption><b>{label}</b><span>{caption}</span></figcaption>
          </figure>
        ))}
      </div>
    );
  }

  if (project.slug === "sous-chef" && kind === "screens") {
    return (
      <div className="sous-visual">
        <Image className="sous-desktop" src="/images/sous-chef/desktop.png" alt="Sous Chef desktop application showing recipe and culinary workspace" width={1440} height={1000} sizes="(max-width: 620px) 75vw, 900px" />
        <Image className="sous-mobile" src="/images/sous-chef/mobile.png" alt="Sous Chef mobile application" width={390} height={913} sizes="(max-width: 620px) 130px, 260px" />
      </div>
    );
  }

  if (kind === "controls") {
    return (
      <div className="three-cards">
        <article><span>01</span><h3>Scope boundary</h3><ul><li>Named surfaces</li><li>Explicit acceptance criteria</li><li>Clear red lines</li></ul></article>
        <article><span>02</span><h3>Authority boundary</h3><ul><li>Clear roles</li><li>Human approval for material release</li><li>Custody rules for handoffs</li></ul></article>
        <article><span>03</span><h3>Evidence boundary</h3><ul><li>Preflight state checks</li><li>Repeatable verification</li><li>Known-good closeout</li></ul></article>
      </div>
    );
  }

  if (kind === "boundary") {
    return (
      <div className="boundary-grid">
        <article><h3>Shown</h3><ul><li>Workflow stages and role separation</li><li>Approval, verification, and repair patterns</li><li>How operational risk maps to controls</li><li>Employer-relevant systems thinking</li></ul></article>
        <article><h3>Withheld</h3><ul><li>Private source and repository details</li><li>Live infrastructure and internal links</li><li>Secrets, security posture, and customer data</li><li>Internal identifiers and release evidence</li></ul></article>
      </div>
    );
  }

  if (kind === "domain") {
    const items = project.slug === "office-chef"
      ? [["Input", "Invoices & vendor changes"], ["Analysis", "Food cost & menu margin"], ["Review", "Human exception handling"], ["Output", "Owner-ready operating brief"]]
      : [["Kitchen reality", "Prep, service, inventory, and exceptions"], ["Product response", "Recipe structure and visible continuity"], ["Adoption", "Familiar language and useful defaults"], ["Proof", "Public screens and inspectable source"]];
    return <div className="domain-strip">{items.map(([label, value]) => <article key={label}><span>{label}</span><b>{value}</b></article>)}</div>;
  }

  if (kind === "decision") {
    const rows = project.slug === "office-chef"
      ? [["Atlantic Produce", "Roma tomatoes", "+18%", "Review menu assumptions"], ["Harbor Foods", "Canola oil", "+9%", "Compare alternate vendor"], ["Green Valley", "Avocado", "-4%", "No action required"]]
      : project.slug === "loft-os"
        ? [["Wrong work executed", "Materialized scope + explicit allowed surfaces"], ["Hidden unrelated changes", "Clean-state preflight"], ["Premature release", "Authorization gate"], ["Weak completion claims", "Verification evidence"]]
        : [["Estimated resale value", "$64–$82"], ["Acquisition cost", "$18"], ["Fee + shipping allowance", "$24"], ["Expected contribution", "$22–$40"]];
    return (
      <div className={`decision-board ${project.slug === "office-chef" ? "table-board" : ""}`}>
        {rows.map((row) => <div key={row[0]}>{row.map((cell, index) => index === 0 ? <span key={cell}>{cell}</span> : <b key={cell}>{cell}</b>)}</div>)}
      </div>
    );
  }

  return (
    <div className="system-grid">
      {project.slug === "resale-scanner-pro"
        ? [["Interface", "Mobile workflow"], ["Orchestration", "Agent session"], ["Evidence", "Market signals"], ["Learning loop", "Tracked results"]].map(([a, b]) => <article key={a}><span>{a}</span><h3>{b}</h3></article>)
        : project.slug === "sous-chef"
          ? [["Recipes", "Structured creation"], ["Pantry", "Ingredient signals"], ["Cookbooks", "Reusable organization"], ["Sessions", "Cooking continuity"]].map(([a, b]) => <article key={a}><span>{a}</span><h3>{b}</h3></article>)
          : [["Discover", "Current-state work"], ["Define", "Future-state workflow"], ["Prepare", "Implementation requirements"], ["Adopt", "Operator-ready handoff"]].map(([a, b]) => <article key={a}><span>{a}</span><h3>{b}</h3></article>)}
    </div>
  );
}

export function ProjectCase({ project }: { project: Project }) {
  return (
    <main id="main">
      <section className="case-hero">
        <div className="shell case-hero-grid">
          <div>
            <p className="eyebrow">{project.eyebrow}</p>
            <h1>{project.title}</h1>
            <p className="lede">{project.dek}</p>
            {project.links && <div className="actions">{project.links.map((link) => <a key={link.href} className={`button ${link.primary ? "primary" : ""}`} href={link.href} target="_blank" rel="noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}</div>}
          </div>
          <aside className={`case-note ${project.statusTone}`}>
            <span className="status-dot">{project.status}</span>
            <h2>{project.slug === "resale-scanner-pro" ? "Built for the decision at the shelf." : project.slug === "loft-os" ? "Public pattern, private implementation." : project.slug === "sous-chef" ? "Domain fluency shaped into product behavior." : "Concept proof without inflated claims."}</h2>
          </aside>
        </div>
      </section>

      <section id="project-facts" className="case-evidence-section" aria-label={`${project.title} evidence summary`}>
        <div className="shell">
          <div className="case-evidence-head">
            <p className="eyebrow">Evidence summary</p>
            <div className="case-proof-list">{project.proof.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
          <div className="case-facts-grid">
            {project.facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><b>{fact.value}</b></div>)}
          </div>
        </div>
      </section>

      <section id="workflow" className="workflow-section dark-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">01 · Product workflow</p><h2>{project.slug === "resale-scanner-pro" ? "From uncertainty to an informed listing." : project.slug === "loft-os" ? "A workflow that knows when to stop." : project.slug === "sous-chef" ? "From inspiration to kitchen continuity." : "From paperwork to an operating signal."}</h2></div><p>The sequence separates observation, assisted work, and human judgment. Each stage produces usable context for the next.</p></div>
          <div className="workflow-steps">{project.workflow.map((step, index) => <article className={index === Math.floor(project.workflow.length / 2) ? "active-step" : ""} key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
        </div>
      </section>

      {project.sections.map((section, index) => (
        <section className={`case-section ${index === 1 && section.kind !== "boundary" ? "tinted-section" : ""} ${section.kind === "boundary" ? "blue-section" : ""}`} key={section.number}>
          <div className="shell">
            <div className="split-head"><div><p className="eyebrow">{section.number} · {section.label}</p><h2>{section.title}</h2></div><p>{section.copy}</p></div>
            <SectionVisual project={project} kind={section.kind} />
          </div>
        </section>
      ))}

      <section id="next-step" className="case-next-step">
        <div className="shell case-next-step-grid"><div><p className="eyebrow">Next step</p><h2>Connect the proof to the role.</h2><p>Use the recommended resume for the fastest review, or start a direct conversation about the operating problem your team needs to solve.</p></div><div className="actions"><Link className="button primary" href="/resume">Review the recommended resume <span aria-hidden="true">→</span></Link><a className="button" href="mailto:avergara13@me.com">Email Angel <span aria-hidden="true">→</span></a></div></div>
      </section>
    </main>
  );
}
