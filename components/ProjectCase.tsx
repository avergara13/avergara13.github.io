import Image from "next/image";
import Link from "next/link";
import HumanGatedHandoff from "@/components/HumanGatedHandoff";
import { DecisionRelay } from "@/components/DecisionRelay";
import { KitchenPass } from "@/components/KitchenPass";

export type Project = {
  slug: string;
  eyebrow: string;
  title: string;
  dek: string;
  ogImage?: string;
  status: string;
  statusTone: "green" | "cobalt" | "copper";
  proof: string[];
  links?: { label: string; href: string; primary?: boolean }[];
  facts: { label: string; value: string }[];
  role?: string;
  boundaryNote?: string;
  workflow: { number: string; title: string; copy: string }[];
  sections: {
    number: string;
    label: string;
    title: string;
    copy: string;
    kind: "screens" | "decision" | "controls" | "system" | "domain" | "boundary" | "evidence" | "implementation" | "failure";
  }[];
};

const projectData: Record<string, Project> = {
  "resale-scanner-pro": {
    slug: "resale-scanner-pro",
    eyebrow: "Working product · In operating use",
    title: "Resale Scanner Pro",
    dek: "A mobile decision system for evaluating resale finds, comparing market evidence, and preparing listings.",
    status: "In real operating use",
    statusTone: "green",
    proof: ["Photo → decision", "Human gates", "Market evidence", "Real operating use"],
    facts: [
      { label: "Role", value: "Product design, workflow architecture, implementation, and delivery" },
      { label: "Primary user", value: "Reseller making sourcing, pricing, and listing decisions" },
      { label: "Constraint", value: "Uncertainty stays visible and the operator keeps the final decision" },
      { label: "Source", value: "Private by design" },
      { label: "Proof", value: "Sanitized case study from a working family resale workflow" },
      { label: "Delivered outcome", value: "Working product in real operating use, with a sanitized employer-facing case study" },
    ],
    workflow: [
      { number: "01", title: "Evaluate", copy: "Collect item evidence and compare market signals." },
      { number: "02", title: "Act", copy: "Prepare the next listing action with human review." },
      { number: "03", title: "Learn", copy: "Track outcomes so the next decision starts with context." },
    ],
    sections: [
      { number: "02", label: "Working interface", title: "Evidence, not a concept rendering.", copy: "These screens come from the working application in real operating use. They show the session, listing research, and sold-item evidence loop.", kind: "screens" },
      { number: "03", label: "Decision design", title: "Useful automation has a stopping rule.", copy: "The product is designed around a buy-or-pass decision, not around producing more output. Uncertainty remains visible and the operator stays in control.", kind: "decision" },
    ],
  },
  "loft-os": {
    slug: "loft-os",
    eyebrow: "Flagship case study",
    title: "Loft OS",
    dek: "Loft OS coordinates specialized AI agents from request to verified closeout, with scope, review, and release authority built into the workflow.",
    status: "Sanitized by design",
    statusTone: "copper",
    proof: ["Scoped execution", "Human authority", "Evidence chain", "Repair loops"],
    facts: [
      { label: "Role", value: "Systems architecture, governance design, and operating-model documentation" },
      { label: "Primary user", value: "Teams coordinating bounded AI-assisted work" },
      { label: "Constraint", value: "Explain the operating pattern without exposing private implementation details" },
      { label: "Delivered outcome", value: "Coordinated AI-assisted workflows with human review, evidence, recovery, and accountable closeout" },
    ],
    workflow: [
      { number: "01", title: "Governed handoff", copy: "Request, scope, and role boundaries stay explicit." },
      { number: "02", title: "Specialist work", copy: "The assigned work changes only authorized surfaces." },
      { number: "03", title: "Review + evidence", copy: "Inspect behavior, quality, and recoverability." },
      { number: "04", title: "Human decision", copy: "Keep high-impact choices under explicit human control." },
      { number: "05", title: "Closeout", copy: "Reconcile evidence and confirm accountable ownership." },
    ],
    sections: [
      { number: "02", label: "Control design", title: "Governance expressed as usable product behavior.", copy: "Each control answers a delivery question: what may change, who may approve it, and what proves the result.", kind: "controls" },
      { number: "03", label: "Evidence continuity", title: "A public-safe rail from request to closeout.", copy: "The visible pattern keeps scope, review, verification, and completion connected without exposing private implementation details.", kind: "evidence" },
      { number: "04", label: "CURRENT IMPLEMENTATION", title: "The operating layer in use now.", copy: "A compact view of the implemented control surfaces represented by this case study, with no speculative future system claims.", kind: "implementation" },
      { number: "05", label: "Failure lab", title: "When the system was wrong about itself.", copy: "A real containment failure, kept on the record. The verdict was wrong, the evidence was preserved rather than corrected, and the gap it exposed is still tracked as open work.", kind: "failure" },
      { number: "06", label: "Public boundary", title: "What this portfolio shows—and protects.", copy: "The case study explains the operating pattern without exposing private systems, repository details, identifiers, or sensitive implementation evidence.", kind: "boundary" },
    ],
  },
  "sous-chef": {
    slug: "sous-chef",
    eyebrow: "Working product · Public source",
    title: "Sous Chef",
    dek: "A culinary workspace where the recipe is a protected, versioned record — and the assistant can only propose changes a person accepts.",
    role: "Product design · Hospitality-domain translation · Implementation",
    status: "Working product · public source",
    statusTone: "copper",
    proof: ["Structured recipes", "Locked + versioned", "Deterministic scaling", "Propose-only AI"],
    links: [{ label: "View public repository", href: "https://github.com/avergara13/sous-chef-app", primary: true }],
    facts: [
      { label: "Role", value: "Product design, domain translation, and implementation" },
      { label: "Primary user", value: "A cook working from a recipe, against a real pantry, under time pressure" },
      { label: "Constraint", value: "The kitchen has to be able to trust the record; the assistant may never quietly change it" },
      { label: "Delivered outcome", value: "A working authenticated product whose source is public and directly inspectable" },
    ],
    workflow: [
      { number: "01", title: "Capture", copy: "Bring a recipe in from a link, a description, or the structured editor." },
      { number: "02", title: "Structure", copy: "Ingredients, steps, yield and timings become addressable fields." },
      { number: "03", title: "Protect", copy: "Lock the recipe once it is right; every later transition snapshots first." },
      { number: "04", title: "Cook", copy: "Scale to the covers on hand and work the steps against the pantry." },
      { number: "05", title: "Revise", copy: "The assistant proposes a change; the cook decides whether it lands." },
    ],
    sections: [],
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
  "assistant-recruiter-pro": {
    slug: "assistant-recruiter-pro",
    eyebrow: "AI workflow",
    title: "Assistant Recruiter Pro",
    dek: "A recruiter-focused AI assistant for turning role requirements into structured Boolean search strategies and refining them through user feedback.",
    role: "AI assistant design · Workflow design · Requirements translation · Evaluation / feedback loop",
    boundaryNote: "Customer identity, candidate information, proprietary prompts, private search data, and internal instructions remain private.",
    ogImage: "/og-home.png",
    status: "Workflow proof · public-safe framing",
    statusTone: "cobalt",
    proof: ["Role map", "Boolean strategy", "Human review", "Refinement loop"],
    facts: [
      { label: "User problem", value: "Recruiters need faster, more realistic Boolean strategy from messy job descriptions" },
      { label: "Role", value: "Workflow design, assistant configuration, iterative search strategy refinement" },
      { label: "Human control", value: "Recruiter evaluates relevance, false positives, and platform realism" },
      { label: "Boundary", value: "No customer identity, candidate data, proprietary prompts, or confidential commercial detail exposed" },
      { label: "Delivered outcome", value: "Inspectable workflow proof for search-strategy generation and iterative quality improvement" },
    ],
    workflow: [
      { number: "01", title: "Intake", copy: "Capture job description context and recruiter constraints." },
      { number: "02", title: "Role map", copy: "Translate responsibilities into title families and required concepts." },
      { number: "03", title: "Boolean strategy", copy: "Generate platform-aware broad and narrow search strings." },
      { number: "04", title: "Human review", copy: "Recruiter checks relevance, realism, and false-positive risk." },
      { number: "05", title: "Refinement", copy: "Revise exclusions, concepts, and syntax based on structured feedback." },
    ],
    sections: [
      { number: "02", label: "Workflow design", title: "From a messy job description to a reviewable search strategy.", copy: "The workflow keeps each step explicit so recruiters can understand and refine the output rather than accept opaque suggestions.", kind: "system" },
      { number: "03", label: "Evaluation loop", title: "Human judgment improves the strategy over time.", copy: "Feedback is treated as a first-class input: relevance, false positives, and platform realism directly shape the next strategy iteration.", kind: "decision" },
      { number: "04", label: "Public boundary", title: "Proof without sensitive recruiting data.", copy: "This case intentionally excludes customer identity, candidate details, proprietary prompts, and confidential commercial detail.", kind: "boundary" },
    ],
  },
};

export const projects = Object.values(projectData);

export function getProject(slug: string) {
  return projectData[slug];
}

function SectionVisual({ project, kind }: { project: Project; kind: Project["sections"][number]["kind"] }) {
  if (kind === "controls") {
    return (
      <div className="loft-controls">
        <HumanGatedHandoff variant="dark" />
        <div className="three-cards">
        <article><span>01</span><h3>Scope boundary</h3><ul><li>Named surfaces</li><li>Explicit acceptance criteria</li><li>Clear red lines</li></ul></article>
        <article><span>02</span><h3>Authority boundary</h3><ul><li>Clear roles</li><li>Human approval for material release</li><li>Custody rules for handoffs</li></ul></article>
        <article><span>03</span><h3>Evidence boundary</h3><ul><li>Preflight state checks</li><li>Repeatable verification</li><li>Known-good closeout</li></ul></article>
        </div>
      </div>
    );
  }

  if (kind === "failure") {
    const beats: [string, string, string][] = [
      ["01", "Active work", "An execution lane was working normally. Inside a ninety-minute window it produced two commits folding reviewer findings, resolved seven review threads, and stood with an open change and all required checks passing."],
      ["02", "False stale verdict", "A liveness watchdog concluded the lane was dead. Its stated reason: the lane\u2019s heartbeat signal had aged past its threshold, with no corroborating evidence of activity."],
      ["03", "Containment", "The system did what it is designed to do with a dead lane. It closed the work timer, set the task aside, and returned the execution lock to its owner \u2014 while the lane was mid-review with open, passing work."],
      ["04", "Preserved evidence", "The containment record was left intact. It was not edited, deleted, or explained away. The timer had been closed with an end time equal to its start time, recording zero duration for roughly two hours of real work, and that false record was preserved as evidence."],
      ["05", "Root-cause discovery", "The signal was stale about the heartbeat, never about the lane. The heartbeat is created when work starts and finalized when it ends, and no automated path in the production flow refreshes it in between. A refresh command exists, but nothing in production calls it."],
      ["06", "Lawful recovery", "The lane resumed the way the rules require: a fresh start record, the heartbeat recreated, the lock re-claimed with the full reason recorded. The lost time was not backfilled with an invented duration. A contained lane also cannot revive itself \u2014 reversing a containment requires a separate party, by design."],
      ["07", "System hardening", "The fix is not to weaken the watchdog. Two corrections are specified: require positive evidence of death, and never close a timer to zero duration. This is tracked as open work, not described as solved."],
    ];
    return (
      <div className="failure-lab" role="group" aria-label="Documented failure and recovery">
        {beats.map(([n, title, copy]) => (
          <article key={n}><span>{n}</span><b>{title}</b><p>{copy}</p></article>
        ))}
      </div>
    );
  }

  if (kind === "boundary") {
    const [shown, withheld] = project.slug === "assistant-recruiter-pro"
      ? [["Workflow stages and the recruiter review step", "Requirements translation into search strategy", "The refinement loop", "Evaluation criteria in plain terms"],
         ["Customer and client identity", "Candidate information", "Proprietary prompts and internal instructions", "Private search data"]]
      : [["Workflow stages and role separation", "Approval, verification, and repair patterns", "How operational risk maps to controls", "Employer-relevant systems thinking"],
         ["Private source and repository details", "Live infrastructure and internal links", "Secrets, security posture, and customer data", "Internal identifiers and release evidence"]];
    return (
      <div className="boundary-grid">
        <article><h3>Shown</h3><ul>{shown.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article><h3>Withheld</h3><ul>{withheld.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </div>
    );
  }

  if (project.slug === "loft-os" && kind === "evidence") {
    return <div className="evidence-rail" role="group" aria-label="Public-safe evidence continuity"><article><span>01</span><b>Request</b><p>Intent and scope become explicit.</p></article><i aria-hidden="true">→</i><article><span>02</span><b>Work</b><p>Authorized surfaces stay bounded.</p></article><i aria-hidden="true">→</i><article><span>03</span><b>Review</b><p>Human judgment remains visible.</p></article><i aria-hidden="true">→</i><article><span>04</span><b>Close</b><p>Evidence confirms the result.</p></article></div>;
  }

  if (project.slug === "loft-os" && kind === "implementation") {
    return <div className="implementation-strip"><article><span>Control</span><b>Scoped work</b><p>Named boundaries and acceptance criteria.</p></article><article><span>Authority</span><b>Human review</b><p>Material decisions stay explicit.</p></article><article><span>Evidence</span><b>Verified closeout</b><p>Recovery and completion remain inspectable.</p></article></div>;
  }

  if (kind === "domain") {
    const items = [["Input", "Invoices & vendor changes"], ["Analysis", "Food cost & menu margin"], ["Review", "Human exception handling"], ["Output", "Owner-ready operating brief"]];
    return <div className="domain-strip">{items.map(([label, value]) => <article key={label}><span>{label}</span><b>{value}</b></article>)}</div>;
  }

  if (kind === "decision") {
    if (project.slug === "assistant-recruiter-pro") {
      const rows = [
        ["Title coverage", "Expand seniority variants"],
        ["Concept precision", "Tighten must-have skills"],
        ["False positives", "Add exclusions and context terms"],
        ["Platform realism", "Adjust syntax to target ATS/search engine"],
      ];
      return (
        <div className="decision-board">
          {rows.map((row) => <div key={row[0]}><span>{row[0]}</span><b>{row[1]}</b></div>)}
        </div>
      );
    }

    // Resale Scanner Pro renders its own evidence spread in RspCase and never reaches here.
    const rows = project.slug === "office-chef"
      ? [["Atlantic Produce", "Roma tomatoes", "+18%", "Review menu assumptions"], ["Harbor Foods", "Canola oil", "+9%", "Compare alternate vendor"], ["Green Valley", "Avocado", "-4%", "No action required"]]
      : project.slug === "loft-os"
        ? [["Wrong work executed", "Materialized scope + explicit allowed surfaces"], ["Hidden unrelated changes", "Clean-state preflight"], ["Premature release", "Authorization gate"], ["Weak completion claims", "Verification evidence"]]
        : [];
    if (rows.length === 0) return null;
    return (
      <div className={`decision-board ${project.slug === "office-chef" ? "table-board" : ""}`}>
        {rows.map((row) => <div key={row[0]}>{row.map((cell, index) => index === 0 ? <span key={cell}>{cell}</span> : <b key={cell}>{cell}</b>)}</div>)}
      </div>
    );
  }

  return (
    <div className="system-grid">
      {[["Inputs", "Role requirements"], ["Strategy", "Boolean search variants"], ["Review", "Recruiter relevance feedback"], ["Loop", "Refined search strategy"]]
        .map(([a, b]) => <article key={a}><span>{a}</span><h3>{b}</h3></article>)}
    </div>
  );
}

// TSK-961 Phase 2 locked sequence: hero -> my role -> architecture -> how control works
// -> Agent Workflow Demo -> control stack -> Failure Lab -> Public Boundary.
const controlIdeas: [string, string, string][] = [
  ["01", "Scoped", "Explicit objective, boundaries, and acceptance criteria."],
  ["02", "Authorized", "Execution begins only through the required authority path."],
  ["03", "Independently reviewed", "The executor does not approve its own protected release."],
  ["04", "Verified", "Completion requires evidence and closeout, not merely generated output."],
];

const controlStack: [string, string, string][] = [
  ["01", "Work-state integrity", "Task lifecycle automation keeps execution state, timers, and closeout synchronized."],
  ["02", "Bounded execution", "Scoped work orders, clean-state checks, allowlisted surfaces, and capability boundaries limit what an executor may change."],
  ["03", "Durable authorization", "Execution authority is recorded through the governed Agent SDK path\u2014not inferred from a prompt, message, or session."],
  ["04", "Independent review", "Automated review and PR custody inspect the work before protected release."],
  ["05", "Fail-closed gates", "Missing authority, evidence, capability, or expected state stops the protected action instead of letting the agent guess through ambiguity."],
  ["06", "Verified closeout", "Completion requires the lane\u2019s full evidence and delivery chain\u2014not simply generated output or a passing local build."],
];

function LoftOsCase({ project }: { project: Project }) {
  return (
    <main id="main" data-section="work-loft-os">
      <section className="case-hero">
        <div className="shell case-hero-single case-hero-marked">
          {/* Web-delivery derivative of Angel's supplied project mark, generated from the
              canonical original by scripts/generate_mark_derivatives.py. The canonical
              binary is unchanged at /images/loft-os/logo.png. alt is empty by design: the
              adjacent h1 already names Loft OS, so a described image would duplicate it. */}
          <Image className="case-mark" src="/images/loft-os/logo-336.png" alt="" width={336} height={336} />
          <div>
          <p className="eyebrow">{project.eyebrow}</p>
          <h1>🛋️ Loft OS</h1>
          <p className="case-descriptor">Governed Multi-Agent Workflow System</p>
          <p className="lede">{project.dek}</p>
          <p className="case-support">Agents can keep work moving autonomously without gaining unchecked authority.</p>
          </div>
        </div>
      </section>

      <section className="case-role-band" aria-label="Contribution">
        <div className="shell">
          <p className="case-role"><span>My role</span>Systems architecture &#183; Governance design &#183; Workflow implementation</p>
        </div>
      </section>

      <section className="case-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">01 &#183; Architecture</p><h2>How Loft OS is structured</h2></div>
            <p>Control lives in three boundaries every piece of work passes through: what may change, who may approve it, and what proves the result. The strip below shows how work is handed between roles and where the human gate sits; the full governed lifecycle is named once, in the Agent Workflow Demo.</p>
          </div>
          <SectionVisual project={project} kind="controls" />
        </div>
      </section>

      <section className="case-section tinted-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">02 &#183; Control model</p><h2>How control works</h2></div>
            <p>Autonomy does not mean unchecked authority.</p>
          </div>
          <div className="control-grid">
            {controlIdeas.map(([n, title, copy]) => <article key={n}><span>{n}</span><b>{title}</b><p>{copy}</p></article>)}
          </div>
          <p className="case-principle">The party that did the work cannot approve its own merge.</p>
        </div>
      </section>

      <DecisionRelay />

      <section className="case-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">03 &#183; Control stack</p><h2>The control stack</h2></div>
            <p>The automation behind safe autonomous work.</p>
          </div>
          <div className="control-stack">
            {controlStack.map(([n, title, copy]) => <article key={n}><span>{n}</span><b>{title}</b><p>{copy}</p></article>)}
          </div>
          <p className="case-principle">The goal isn&#8217;t to assume agents are always right. It&#8217;s to make unsupported action difficult, detectable, reviewable, and recoverable.</p>
        </div>
      </section>

      <section className="case-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">04 &#183; Failure lab</p><h2>Failure Lab</h2></div>
            <p>What happens when the system gets the state wrong?</p>
          </div>
          <SectionVisual project={project} kind="failure" />
          <p className="case-gap-note">Any remaining gap stays visible until it is verified closed.</p>
          <p className="case-principle">Loft OS is designed not only to execute governed work, but to fail safely, preserve evidence, recover lawfully, and improve after failure.</p>
        </div>
      </section>

      <section className="case-section blue-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">05 &#183; Public boundary</p><h2>Public Boundary</h2></div>
            <p>The case study shows the operating pattern, not the private operating environment. Public proof is intentionally sanitized. It shows the workflow, control model, architecture, curated Agent Workflow Demo, and failure-recovery pattern without exposing private runtime infrastructure, credentials, internal identifiers, non-public data, or protected operating details.</p>
          </div>
          <SectionVisual project={project} kind="boundary" />
          <p className="case-gap-note">The Agent Workflow Demo is curated and deterministic. It demonstrates the governed interaction model; it is not a direct public interface to the private Loft OS runtime.</p>
          <p className="case-principle">Enough is public to evaluate the system. The private boundary stays intact.</p>
        </div>
      </section>

      <section id="next-step" className="case-next-step">
        <div className="shell case-next-step-grid"><div><p className="eyebrow">Next step</p><h2>Connect the proof to the role.</h2><p>Use the recommended resume for the fastest review, or start a direct conversation about the operating problem your team needs to solve.</p></div><div className="actions"><Link className="button primary" href="/resume/">Review the resume <span aria-hidden="true">&#8594;</span></Link><a className="button" href="mailto:avergara13@me.com">Email Angel <span aria-hidden="true">&#8594;</span></a></div></div>
      </section>
    </main>
  );
}

// TSK-961 Phase 3 locked sequence: hero -> my role -> product proof -> workflow ->
// stopping rule -> outcome loop -> contribution -> Public Boundary.
const rspFlow: [string, string, string, boolean][] = [
  ["01", "Capture", "Photograph or scan the item and record the purchase context.", false],
  ["02", "Research", "AI-assisted identification and comparable-market research.", false],
  ["03", "Decide", "The user makes the BUY / MAYBE / PASS judgment.", true],
  ["04", "Prepare", "Approved items move into listing preparation with photos, description, category, pricing, and item details enriched where supported.", false],
  ["05", "Review", "Required checks and warnings are surfaced before publication.", false],
  ["06", "List", "Publication is explicitly reviewed and confirmed by the operator.", false],
  ["07", "Learn", "Sold and outcome evidence updates the operating record where the current implementation supports it.", false],
];

type RspEvidenceFigureProps = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  className?: string;
  sizes: string;
};

function RspEvidenceFigure({ src, alt, label, caption, className = "", sizes }: RspEvidenceFigureProps) {
  return (
    <figure className={`rsp-proof-frame ${className}`.trim()}>
      <Image src={src} alt={alt} width={900} height={1950} sizes={sizes} />
      <figcaption>
        <span>{label}</span>
        <p>{caption}</p>
      </figcaption>
    </figure>
  );
}

function RspCase({ project }: { project: Project }) {
  return (
    <main id="main" data-section="work-resale-scanner-pro">
      <section className="case-hero">
        <div className="shell case-hero-single case-hero-marked">
          {/* Web-delivery derivative of Angel's supplied RSP project mark, generated from
              the canonical original by scripts/generate_mark_derivatives.py. The canonical
              binary is unchanged at /images/rsp/mark.png. alt is empty by design: the
              adjacent h1 already names the product, and the mark asserts no product claim. */}
          <Image className="case-mark" src="/images/rsp/mark-336.png" alt="" width={336} height={336} />
          <div>
          <p className="eyebrow">{project.eyebrow}</p>
          <h1>&#128241; Resale Scanner Pro</h1>
          <p className="lede">{project.dek}</p>
          <p className="case-support">AI helps with research and preparation. Human judgment controls the buy decision and final listing.</p>
          </div>
        </div>
      </section>

      <section className="case-role-band" aria-label="Contribution">
        <div className="shell">
          <p className="case-role"><span>My role</span>Product design &#183; Workflow architecture &#183; Implementation &#183; Delivery</p>
        </div>
      </section>

      <section className="case-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">01 &#183; Product proof</p><h2>A working product, not a concept rendering.</h2></div>
            <p>Current screens from the working application show the operating context first, then the capture flow that begins each evaluation.</p>
          </div>
          <div className="rsp-editorial rsp-opening-spread">
            <RspEvidenceFigure
              src="/images/rsp/session-overview.jpg"
              alt="Resale Scanner Pro overview showing an open session with buy, maybe, and pass decisions"
              label="Operating overview"
              caption="A live session brings the decision mix, active items, and session state into one view."
              className="rsp-proof-dominant"
              sizes="(max-width:620px) calc(100vw - 24px), (max-width:900px) 520px, 460px"
            />
            <RspEvidenceFigure
              src="/images/rsp/capture-ai-lens.jpg"
              alt="Resale Scanner Pro capture screen framing an item with AI Lens active alongside Scan, Listing, and Quick Draft modes"
              label="Capture · AI Lens"
              caption="The capture screen frames the item with AI Lens active, and keeps Scan, Listing and Quick Draft available alongside it."
              className="rsp-proof-offset"
              sizes="(max-width:620px) calc(100vw - 24px), (max-width:900px) 520px, 320px"
            />
          </div>
        </div>
      </section>

      <section className="workflow-section dark-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">02 &#183; Product workflow</p><h2>From find to listing</h2></div>
            <p>The sequence separates observation, assisted work, and human judgment. Each stage produces usable context for the next.</p>
          </div>
          <div className="workflow-steps">
            {rspFlow.map(([n, title, copy, active]) => <article className={active ? "active-step" : ""} key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <div className="rsp-editorial rsp-analysis-feature">
            <RspEvidenceFigure
              src="/images/rsp/analysis-buy.jpg"
              alt="Resale Scanner Pro completed analysis pipeline with market velocity and a buy decision"
              label="Analysis · Market signal · BUY"
              caption="Item identification, market velocity, analysis status, and the final BUY decision remain visible in one completed scan."
              className="rsp-proof-analysis"
              sizes="(max-width:620px) calc(100vw - 24px), (max-width:900px) 520px, 440px"
            />
            <div className="rsp-feature-note">
              <p className="eyebrow light-eyebrow">Research attached to action</p>
              <h3>The evidence stays beside the decision.</h3>
              <p>The completed pipeline exposes its stages and market signal before the operator chooses what happens next.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="case-section tinted-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">03 &#183; Decision design</p><h2>Useful automation has a stopping rule.</h2></div>
            <p>RSP automates research and preparation, then stops where judgment matters. The user decides whether to buy, reviews the listing, and explicitly approves publication.</p>
          </div>
          <div className="rsp-editorial rsp-decision-feature">
            <div className="rsp-feature-note is-ink">
              <p className="eyebrow">Human decision</p>
              <h3>A completed analysis can still end in PASS.</h3>
              <p>The result does not publish or purchase anything. The operator can re-analyze, pass, hold the item as maybe, or move an approved item into the queue.</p>
            </div>
            <RspEvidenceFigure
              src="/images/rsp/decision-pass.jpg"
              alt="Resale Scanner Pro completed analysis ending in a pass decision"
              label="Decision proof · PASS"
              caption="A finished analysis returns PASS, and Re-analyze, Pass, Maybe and Add to Queue all stay on screen underneath it."
              className="rsp-proof-pass"
              sizes="(max-width:620px) calc(100vw - 24px), (max-width:900px) 520px, 410px"
            />
          </div>
          <p className="case-principle">AI reduces the research and preparation burden. Human judgment remains accountable for the decision and release.</p>
        </div>
      </section>

      <section className="case-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">04 &#183; Listing + agent support</p><h2>The decision becomes reviewable work.</h2></div>
            <p>Approved items move into listing preparation. Session context stays available to the in-app agent as supporting evidence, while review and release remain explicit.</p>
          </div>
          <div className="rsp-editorial rsp-operations-spread">
            <RspEvidenceFigure
              src="/images/rsp/listing-preparation.jpg"
              alt="Resale Scanner Pro listing editor showing photos, title, subtitle, condition, and description fields with a Review and Push action"
              label="Listing preparation"
              caption="The listing editor keeps photos, title, condition and description together, and the draft is marked Ready behind an explicit Review &amp; Push."
              className="rsp-proof-listing"
              sizes="(max-width:620px) calc(100vw - 24px), (max-width:900px) 520px, 460px"
            />
            <div className="rsp-agent-stack">
              <RspEvidenceFigure
                src="/images/rsp/agent-scans.jpg"
                alt="Resale Scanner Pro agent scan list showing evaluated items with buy, maybe, and pass decisions"
                label="Agent · Evaluated items"
                caption="Scanned items keep their decision, category and buy-to-sell figures, with the buy or pass choice still open on the card."
                className="rsp-proof-scans"
                sizes="(max-width:620px) calc(100vw - 24px), (max-width:900px) 520px, 330px"
              />
              <RspEvidenceFigure
                src="/images/rsp/agent-recap.jpg"
                alt="Resale Scanner Pro agent chat summarizing the current session and the item still awaiting a decision"
                label="Agent · Session recap"
                caption="Asked for a recap, the agent reports scan count, buy rate and the item still undecided, and recommends rather than decides."
                className="rsp-proof-agent"
                sizes="(max-width:620px) calc(100vw - 24px), (max-width:900px) 520px, 330px"
              />
            </div>
          </div>
          <p className="case-principle">I designed the workflow around a real operating decision: capture the item, reduce the research burden, preserve human judgment, prepare the work, and keep the operating context visible.</p>
        </div>
      </section>

      <section className="case-section blue-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">05 &#183; Public boundary</p><h2>Public Boundary</h2></div>
            <p>The case study shows the product workflow and sanitized operating proof without exposing the private operating environment.</p>
          </div>
          <div className="boundary-grid">
            <article><h3>Shown</h3><ul><li>The mobile workflow and decision model</li><li>Sanitized product screenshots</li><li>The human approval boundary</li><li>The implementation pattern</li></ul></article>
            <article><h3>Withheld</h3><ul><li>Credentials and deployment details</li><li>Internal identifiers and database records</li><li>Non-public inventory or customer data</li><li>Protected operating details</li></ul></article>
          </div>
        </div>
      </section>

      <section id="next-step" className="case-next-step">
        <div className="shell case-next-step-grid"><div><p className="eyebrow">Next step</p><h2>Connect the proof to the role.</h2><p>Use the recommended resume for the fastest review, or start a direct conversation about the operating problem your team needs to solve.</p></div><div className="actions"><Link className="button primary" href="/resume/">Review the resume <span aria-hidden="true">&#8594;</span></Link><a className="button" href="mailto:avergara13@me.com">Email Angel <span aria-hidden="true">&#8594;</span></a></div></div>
      </section>
    </main>
  );
}

// Sous Chef — seven evidence moments, in the order the work actually happened:
// operator -> requirements -> domain model -> the record as source of truth ->
// deterministic logic -> bounded AI -> architecture + verification -> planned direction.
//
// EVIDENCE RULE FOR THIS PAGE. Two kinds of proof, and they check each other. The captures
// are genuine current product screens supplied by Angel, downscaled and re-encoded with no
// crop (sous-chef-evidence-provenance.md records the md5 of both sides of every pair). The
// prose alongside them names files in the PUBLIC application repository, so a reader who
// distrusts a screenshot can open the source instead.
//
// Three captions were written against verified source rather than against the pixels,
// because the pixels are misleading on their own: HOME's "Kitchen Status" and "Inventory
// Status" tiles are hard-coded display strings and are NOT described as live state; the
// Pantry stat tiles ARE computed from inventory and are described as such; and the
// assistant capture shows the panel's stated scope, not a completed request, so it is not
// offered as evidence that an authenticated AI call succeeded.
//
// CLAIM LAW. Nothing here asserts adoption, customers, savings, or scale. The Pro section
// is planned direction and is deliberately rendered as prose in a dashed panel — never as
// a product screen. Three things verified NOT to be true of the shipped product are
// excluded on purpose: the Home status tiles are hard-coded display strings rather than
// telemetry, the "Working v{n}" library badge is derived from title length rather than
// version history, and the intent-classifier/orchestrator layer has no importer and does
// not run. None of them appears on this page.

type SousFigureProps = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  height: number;
  className?: string;
  sizes: string;
};

// The same shape as RspEvidenceFigure — exactly an <img> and a <figcaption>, so the
// no-crop-surface assertion holds here too. Height is per-image rather than pinned: the
// supplied captures are not all one ratio, and a shared aspect-ratio would distort one.
function SousEvidenceFigure({ src, alt, label, caption, height, className = "", sizes }: SousFigureProps) {
  return (
    <figure className={`sous-proof-frame ${className}`.trim()}>
      <Image src={src} alt={alt} width={900} height={height} sizes={sizes} />
      <figcaption>
        <span>{label}</span>
        <p>{caption}</p>
      </figcaption>
    </figure>
  );
}

const sousDomainModel: [string, string, string][] = [
  ["Ingredients", "Addressable rows, not a text blob", "Each ingredient carries its own id, amount, unit, preparation and sort order — which is what makes a precise edit possible at all."],
  ["Steps", "Numbered, timed, and temperature-aware", "A step holds its instruction, duration and temperature, so the kitchen surface can turn a written duration into a running timer."],
  ["Yield and timings", "The basis every scale is computed from", "Yield amount and unit, prep and cook minutes: the fields the scaling engine divides against."],
  ["Lifecycle", "Working, locked, archived", "Status is a two-value union backed by a database constraint, paired with a lock timestamp; archiving is a soft delete, so nothing is destroyed."],
];

const sousDeterministic: [string, string, string, string][] = [
  [
    "Scaling",
    "lib/scaling.ts",
    "Culinary scaling, not multiplication",
    "Above 2×, leavening and salt are reduced to 0.75, spices to 0.80, baking sugar to 0.90; below 0.5×, salt is raised by 1.25. Every corrected line carries the reason in plain words.",
  ],
  [
    "Rounding",
    "roundToPractical",
    "Amounts a cook can actually measure",
    "Cups round to the quarter, tablespoons to the half, teaspoons to the quarter — and render as ¼ ½ ¾ ⅓ ⅔ rather than as decimals.",
  ],
  [
    "Matching",
    "normalizeIngredientName",
    "The pantry knows what it has",
    "Names are lowercased, stripped of descriptors like fresh, dried and large, de-pluralised, then matched by equality or containment. No model is consulted.",
  ],
  [
    "Cookability",
    "detectAlmostCookableRecipes",
    "What could be cooked tonight",
    "A pure function scores every recipe against the pantry and keeps those missing at most two ingredients, sorted by fewest missing first.",
  ],
  [
    "Signals",
    "generateAndSavePantrySignals",
    "Stated formulas, not vibes",
    "High-velocity, staple and restock signals each carry an explicit confidence formula, so a reader can check the arithmetic instead of trusting a score.",
  ],
  [
    "Versioning",
    "saveRecipeVersion",
    "A snapshot before anything is lost",
    "Full snapshots are written before lock, before unlock, before an AI replace and before archive — every transition that could lose work.",
  ],
];

const sousBoundedAI: [string, string, string][] = [
  ["01", "It proposes; it does not write", "A model response is a structured envelope — content, citations, confidence, assumptions, and an optional edit proposal. No model call reaches the database."],
  ["02", "A closed list of operations", "Proposals are expressed as typed operations over a fixed union: set a field, add, edit, remove, reorder or swap an ingredient or step. An operation outside the list is dropped, not guessed at."],
  ["03", "A preview, then a decision", "Accepting a recipe proposal computes the next version in memory and shows it. Nothing is saved until the cook chooses: save as a new draft, or replace the current recipe."],
  ["04", "A locked recipe refuses", "Edit intent against a locked or archived recipe is refused before any model call is made, and the refusal is repeated at three further layers behind it."],
  ["05", "Uncertainty is shown, not hidden", "Confidence, sources and the assumptions behind an answer are rendered next to it, so the person approving the change can see what it rests on."],
];

// Every line below was rewritten after an adversarial review refuted the stronger version
// of each. The pattern in all four refutations was the same: the engineering was real, the
// wording claimed more than the source can show. So each is now scoped to what a reader can
// re-derive from the public repository — a change made on a branch, not a state proven in a
// running system. The three things deliberately NOT said: that a deployed bundle was
// inspected (none was), that the server verifies the token (those functions live outside the
// repository), and that the credential itself was retired or invalidated (unestablished).
const sousFound: [string, string, string][] = [
  ["Found", "A provider key was being compiled into the browser build", "The Vite config read a Gemini API key out of the build environment and inlined it into every browser chunk. That is the defect; it shipped, and it is on the record here rather than left out."],
  ["Contained", "The injection was removed at its source", "The build-time injection is gone, and both client-side provider integrations and their SDK dependencies were deleted with it. No module in the client reads a provider credential today."],
  ["Re-routed", "AI requests carry the caller's own session", "Every remaining AI request goes through one call to a server-side endpoint with the signed-in user's access token attached, and returns a typed auth error instead of a result when there is no session."],
  ["Declared", "The deploy configuration was made explicit", "A start command, and a build config pinning the deploy output to the built front end plus the small Node server that serves it with a health check and an SPA fallback."],
];

const sousOpen: [string, string][] = [
  ["Verified at source, not in a running system", "All of the above is verified by reading the source on the main branch. No built bundle or deployed artifact was inspected, and the server-side endpoint implementations are not in this repository — so the client half is shown here and the server half is not. The authenticated path has not been proven end to end."],
  ["Deployment rules are not in the repository", "The rules that decide when this project redeploys are not declared in the repository, so they cannot be reviewed alongside the code they govern. Tracked as open work, not repaired here."],
];

function SousChefCase({ project }: { project: Project }) {
  const repo = project.links?.[0];
  return (
    <main id="main" data-section="work-sous-chef">
      <section className="case-hero">
        <div className="shell case-hero-single case-hero-marked">
          {/* Web-delivery derivative of Angel's supplied Sous Chef app icon, generated from
              the canonical original by scripts/generate_mark_derivatives.py. The canonical
              binary is unchanged at /images/sous-chef/mark.jpeg. alt is empty by design:
              the adjacent h1 already names the product, and the mark asserts no capability. */}
          <Image className="case-mark" src="/images/sous-chef/mark-336.png" alt="" width={336} height={336} />
          <div>
            <p className="eyebrow">{project.eyebrow}</p>
            <h1>&#127821; Sous Chef</h1>
            <p className="case-descriptor">AI-assisted culinary workspace</p>
            <p className="lede">{project.dek}</p>
            <p className="case-support">I ran kitchens before I built software. This is what that experience says a kitchen tool has to get right.</p>
            {repo && <div className="actions"><a className="button primary" href={repo.href} target="_blank" rel="noreferrer">{repo.label} <span aria-hidden="true">&#8599;</span></a></div>}
          </div>
        </div>
      </section>

      <section className="case-role-band" aria-label="Contribution">
        <div className="shell">
          <p className="case-role"><span>My role</span>{project.role}</p>
        </div>
      </section>

      <section className="case-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">01 &#183; Operator</p><h2>The requirements came from running the kitchen.</h2></div>
            <p>Executive Chef to General Manager. Hospitality is where I learned that a process has to survive real operating pressure — and that the thing a kitchen cannot tolerate is a record it is not sure it can trust. Sous Chef is that observation built into a product: five surfaces, one of which is the record itself.</p>
          </div>
          <div className="sous-editorial sous-open-spread">
            <div className="sous-note is-ink">
              <p className="eyebrow">The working product</p>
              <h3>Five surfaces, one of which is the record.</h3>
              <p>Home opens on the workspaces a cook actually moves between — inventory, development, planning, inspiration — with a single field that takes either a link or a description. The library, the studio, the pantry and the account sit behind one persistent bar. It is a workspace with state, not a chat box with a recipe in it.</p>
            </div>
            <SousEvidenceFigure
              src="/images/sous-chef/home-command-center.jpg"
              alt="Sous Chef home screen: an evening greeting above Inventory, Development, Planning and Inspiration workspaces, a recipe input field, three summary tiles, and a cooking session log card"
              label="Home"
              caption="The home screen lays out four culinary workspaces and a recipe-input field above three summary tiles and the cooking session log."
              height={1827}
              className="sous-proof-hero"
              sizes="(max-width:900px) calc(100vw - 40px), 430px"
            />
          </div>
          <p className="case-principle">A kitchen tool earns its place by being right about small things under pressure, not by being clever.</p>
        </div>
      </section>

      <section className="case-section tinted-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">02 &#183; Domain model</p><h2>A recipe is a record, not a note.</h2></div>
            <p>Most recipe tools store prose. Sous Chef stores structure, because everything useful downstream — scaling, timers, pantry matching, a precise AI edit — depends on the parts being individually addressable.</p>
          </div>
          <div className="sous-editorial sous-pair">
            <SousEvidenceFigure
              src="/images/sous-chef/recipe-library.jpg"
              alt="Sous Chef recipe library: full-width food photographs with the recipe name, total time and ingredient count beneath each, and a Locked badge on every card"
              label="Library"
              caption="Each recipe carries its photograph, its total time and its ingredient count — and a Locked badge, which is the recipe's protection state rather than a paywall."
              height={1815}
              sizes="(max-width:900px) calc(100vw - 40px), 42vw"
            />
            <SousEvidenceFigure
              src="/images/sous-chef/collections.jpg"
              alt="Sous Chef collections view: a grain bowl photograph tagged Active Recipe above a prompt to reopen it, with a Signature Collection card below"
              label="Collections"
              caption="The same records, grouped. An active recipe stays picked up where it was left, and collections gather the rest."
              height={1827}
              className="sous-pair-step"
              sizes="(max-width:900px) calc(100vw - 40px), 42vw"
            />
          </div>

          <div className="sous-record">
            {sousDomainModel.map(([label, title, copy]) => (
              <article key={label}><span>{label}</span><b>{title}</b><p>{copy}</p></article>
            ))}
            <article className="is-truth">
              <span>Why it matters</span>
              <b>The recipe is the operational source of truth for the kitchen.</b>
              <p>Everything else in the product defers to it: the pantry answers against it, the assistant proposes against it, and the version history exists to protect it.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="case-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">03 &#183; The record</p><h2>Lock it, and the product starts defending it.</h2></div>
            <p>A recipe that is right gets locked. From that point the product treats it as something to be protected rather than edited freely: the lock carries a timestamp, archiving is a soft delete rather than a destruction, and every transition that could lose work writes a full snapshot first.</p>
          </div>
          <div className="sous-editorial sous-record-spread">
            <SousEvidenceFigure
              src="/images/sous-chef/recipe-record.jpg"
              alt="Sous Chef recipe detail for Spicy Arrabbiata with Fresh Basil: a pasta photograph above Unlock Recipe, Locked and Archive Recipe controls, an italic origin story, and prep and cook times"
              label="The record · identity"
              caption="Unlock, Locked and Archive sit at the top of the recipe, above its origin story and its timings. The lock is the first thing the screen offers, not a setting buried in a menu."
              height={1827}
              sizes="(max-width:900px) calc(100vw - 40px), 42vw"
            />
            <SousEvidenceFigure
              src="/images/sous-chef/recipe-structure.jpg"
              alt="Sous Chef recipe detail continued: a servings stepper set to four, a seven-item checkable ingredient list under The Pantry, and the first numbered method step with its cook time highlighted"
              label="The record · structure"
              caption="The same recipe, further down: a servings stepper, seven checkable ingredients with their measures, and numbered method steps whose written durations become timers."
              height={1851}
              sizes="(max-width:900px) calc(100vw - 40px), 42vw"
            />
          </div>

          <div className="sous-deterministic">
            <article><span>Lock</span><b>Protected, with a timestamp</b><code>protectRecipe</code><p>Status moves to locked and records when. Editing intent is refused from here until the recipe is explicitly unlocked.</p></article>
            <article><span>Unlock</span><b>A round trip, not a one-way door</b><code>unlockRecipe</code><p>Unlocking snapshots first, then steers the cook back toward re-locking once the edit is done.</p></article>
            <article><span>Archive</span><b>A soft delete</b><code>deleted_at</code><p>Archived recipes stay queryable and restorable rather than being destroyed.</p></article>
          </div>
          <p className="case-principle">The kitchen has to be able to trust the record. That is a product property, not a promise.</p>
        </div>
      </section>

      <section className="case-section tinted-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">04 &#183; Deterministic logic</p><h2>The parts a kitchen relies on do not ask a model.</h2></div>
            <p>The work that has to be right every time is ordinary, inspectable code. It runs the same way twice, it can be read in the public repository, and it does not depend on a network call or a provider being available.</p>
          </div>
          <div className="sous-deterministic">
            {sousDeterministic.map(([label, ref, title, copy]) => (
              <article key={label}><span>{label}</span><b>{title}</b><code>{ref}</code><p>{copy}</p></article>
            ))}
          </div>

          <div className="sous-editorial sous-open-spread">
            <SousEvidenceFigure
              src="/images/sous-chef/pantry-inventory.jpg"
              alt="Sous Chef pantry inventory: Scan Receipt and Manual Entry actions above four stat tiles reading one total item, zero low stock, zero expiring soon and a pantry value, then Inventory, Shopping List and AI Insights tabs"
              label="Pantry"
              caption="These four tiles are computed from the inventory itself, unlike the summary tiles on Home. The value shown is a household grocery total — not a food cost, and not a costing feature."
              height={1827}
              className="sous-proof-hero"
              sizes="(max-width:900px) calc(100vw - 40px), 430px"
            />
            <div className="sous-note">
              <p className="eyebrow">Where the kitchen state lives</p>
              <h3>The pantry answers against the recipe.</h3>
              <p>Matching an ingredient to a pantry item is a normalisation pipeline, not string equality — lowercase, strip descriptors like <em>fresh</em> and <em>large</em>, drop a trailing plural, then match on equality or containment. That is what lets the product say which recipes are short by two ingredients rather than merely listing what is in the cupboard.</p>
            </div>
          </div>
          <p className="case-principle">Doubling a recipe is not doubling the salt. A cook knows that; the product has to know it too.</p>
        </div>
      </section>

      <section className="case-section dark-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">05 &#183; Bounded AI</p><h2>The assistant proposes. A person accepts.</h2></div>
            <p>The AI surface is bounded by construction rather than by instruction: the shape of the code, not the wording of a prompt, is what prevents the model from changing the record on its own.</p>
          </div>
          <div className="sous-editorial sous-pair">
            <SousEvidenceFigure
              src="/images/sous-chef/assistant-in-context.jpg"
              alt="Sous Chef assistant panel opened over a recipe, headed Smart Sous Chef with a Technique and Scaling Expert subtitle, a context line naming the recipe, and a list of the tasks it offers"
              label="Assistant · in context"
              caption="The panel opens over a recipe and names it. What it offers is scoped and stated up front — scaling, technique, timing — rather than an open-ended prompt with a kitchen attached."
              height={1815}
              sizes="(max-width:900px) calc(100vw - 40px), 42vw"
            />
            <SousEvidenceFigure
              src="/images/sous-chef/research-desk.jpg"
              alt="Sous Chef research workspace with Research, Recipe and Journal tabs above four actions — Analyze Ingredients, Suggest Pairings, Find Origins, Smart Substitutes — and Fast, Balanced and Deep effort settings"
              label="Assistant · research"
              caption="The separate research surface offers named culinary operations rather than a blank box, and exposes the effort setting behind them."
              height={1827}
              className="sous-pair-step"
              sizes="(max-width:900px) calc(100vw - 40px), 42vw"
            />
          </div>

          <div className="control-stack">
            {sousBoundedAI.map(([n, title, copy]) => (
              <article key={n}><span>{n}</span><b>{title}</b><p>{copy}</p></article>
            ))}
          </div>
          <p className="case-gap-note">Bounded by construction and by a closed type union — not by an automated test suite. The product ships no tests asserting it. These two captures show the assistant&#8217;s stated scope; neither is offered as proof that a request completed.</p>
          <p className="case-principle">Useful assistance ends where the record begins.</p>
        </div>
      </section>

      <section className="case-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">06 &#183; Architecture &amp; security</p><h2>I shipped a key into the browser. Here is the whole story.</h2></div>
            <p>The interesting part of a security incident is not the fix. It is what you can still not prove afterwards — so this section carries both, and the open half is the half that is usually missing.</p>
          </div>
          <div className="sous-editorial sous-open-spread">
            <div className="sous-note">
              <p className="eyebrow">The shape of it</p>
              <h3>Pantry in, record at the centre, one human gate out.</h3>
              <p>A diagram rather than a screen: the recipe sits at the middle because everything else defers to it. Pantry state feeds in, prep runs out through a gate that stays human, and what was cooked returns to the record.</p>
            </div>
            <figure className="sous-diagram" data-diagram-slot="sous-architecture">
              <KitchenPass />
            </figure>
          </div>

          <div className="sous-ledger">
            {sousFound.map(([stage, title, copy]) => (
              <article key={stage}><span>{stage}</span><b>{title}</b><p>{copy}</p></article>
            ))}
            {sousOpen.map(([title, copy]) => (
              <article className="is-open" key={title}><span>Still open</span><b>{title}</b><p>{copy}</p></article>
            ))}
          </div>
          <p className="case-gap-note">The only values that still reach the browser are the public Supabase URL and anonymous key, which are designed to ship there. The status of the credential the removed build path once used is not established, and is not claimed either way.</p>
          <p className="case-principle">A security story that lists only what was fixed is half a story.</p>
        </div>
      </section>

      <section className="case-section tinted-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">07 &#183; Planned direction</p><h2>Sous Chef Pro.</h2></div>
            <p>Where the same domain model points if it is taken back into the professional kitchen it came from. None of this is built.</p>
          </div>
          <div className="sous-pro">
            <p className="sous-pro-chip">Planned &#183; not built</p>
            <ul className="sous-pro-list">
              <li><b>Recipe costing</b><p>Attach cost to the ingredient rows the recipe already stores, so a plate cost falls out of the record rather than out of a spreadsheet.</p></li>
              <li><b>Menu builder</b><p>Compose menus from costed recipes, with the same lock-and-version discipline applied to the menu itself.</p></li>
              <li><b>Live menu economics</b><p>Let a change in an ingredient cost surface where it lands across the menu, while the decision stays with the operator.</p></li>
            </ul>
            <p className="case-gap-note">Written as direction, not as a commitment: no dates, no delivery promise, and no claim about who would use it.</p>
          </div>
        </div>
      </section>

      <section className="case-section blue-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">08 &#183; Public boundary</p><h2>Public Boundary</h2></div>
            <p>The application source is public, so this case study can point at implementation rather than describe it. What stays private is the operating account behind the sign-in — and two supplied captures were withheld rather than published, one of them because it renders a personal email address.</p>
          </div>
          <div className="boundary-grid">
            <article><h3>Shown</h3><ul><li>Genuine current product screens, uncropped</li><li>The deterministic engines, by name, in public source</li><li>The AI boundary and where the human gate sits</li><li>A security defect I shipped, and its unclosed verification</li></ul></article>
            <article><h3>Withheld</h3><ul><li>Credentials, environment values, and deployment detail</li><li>The account screen — it carries a personal email address and a city</li><li>Server-side function source and infrastructure state</li><li>The sign-in screen, whose copy describes an arrangement since changed</li></ul></article>
          </div>
          <p className="case-principle">Every capture on this page is the whole screen. Nothing here was cropped to remove something.</p>
        </div>
      </section>

      <section id="next-step" className="case-next-step">
        <div className="shell case-next-step-grid"><div><p className="eyebrow">Next step</p><h2>Connect the proof to the role.</h2><p>Use the recommended resume for the fastest review, or start a direct conversation about the operating problem your team needs to solve.</p></div><div className="actions"><Link className="button primary" href="/resume/">Review the resume <span aria-hidden="true">&#8594;</span></Link><a className="button" href="mailto:avergara13@me.com">Email Angel <span aria-hidden="true">&#8594;</span></a></div></div>
      </section>
    </main>
  );
}

export function ProjectCase({ project }: { project: Project }) {
  if (project.slug === "loft-os") return <LoftOsCase project={project} />;
  if (project.slug === "resale-scanner-pro") return <RspCase project={project} />;
  if (project.slug === "sous-chef") return <SousChefCase project={project} />;

  return (
    <main id="main" data-section={`work-${project.slug}`}>
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
            <h2>{project.slug === "resale-scanner-pro" ? "Built for the decision at the shelf." : project.slug === "loft-os" ? "Public pattern, private implementation." : project.slug === "sous-chef" ? "Domain fluency shaped into product behavior." : project.slug === "assistant-recruiter-pro" ? "Inspectable workflow, with the recruiter in control." : "Concept proof without inflated claims."}</h2>
          </aside>
        </div>
      </section>

      {project.role && (
        <section className="case-role-band" aria-label="Contribution">
          <div className="shell">
            <p className="case-role"><span>My role</span>{project.role}</p>
          </div>
        </section>
      )}

      <section id="workflow" className="workflow-section dark-section">
        <div className="shell">
          <div className="split-head"><div><p className="eyebrow">01 · Product workflow</p><h2>{project.slug === "sous-chef" ? "From inspiration to kitchen continuity." : "From intake to a refined strategy."}</h2></div><p>The sequence separates observation, assisted work, and human judgment. Each stage produces usable context for the next.</p></div>
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

      {project.boundaryNote && (
        <section className="case-section tinted-section" aria-label="Public boundary">
          <div className="shell">
            <p className="case-principle">{project.boundaryNote}</p>
          </div>
        </section>
      )}

      <section id="next-step" className="case-next-step">
        <div className="shell case-next-step-grid"><div><p className="eyebrow">Next step</p><h2>Connect the proof to the role.</h2><p>Use the recommended resume for the fastest review, or start a direct conversation about the operating problem your team needs to solve.</p></div><div className="actions"><Link className="button primary" href="/resume/">Review the resume <span aria-hidden="true">→</span></Link><a className="button" href="mailto:avergara13@me.com">Email Angel <span aria-hidden="true">→</span></a></div></div>
      </section>
    </main>
  );
}
