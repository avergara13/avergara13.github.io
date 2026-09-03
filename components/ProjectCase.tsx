import Image from "next/image";
import Link from "next/link";
import HumanGatedHandoff from "@/components/HumanGatedHandoff";
import { DecisionRelay } from "@/components/DecisionRelay";

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
    dek: "A mobile decision system for evaluating resale finds, comparing market evidence, preparing listings, and learning from outcomes.",
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
    eyebrow: "AI-assisted domain workflow",
    title: "Sous Chef",
    dek: "A recipe and kitchen-knowledge workspace that applies AI-assisted workflows to practical culinary work.",
    role: "Domain workflow design · Product implementation · Hospitality / culinary translation",
    boundaryNote: "This is a public application / product-delivery case study, not a commercial customer deployment.",
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
  if (project.slug === "resale-scanner-pro" && kind === "screens") {
    return (
      <div className="case-screens">
        {[
          ["/images/rsp/session.png", "01 · Evaluate", "Sourcing signals and the buy/pass decision."],
          ["/images/rsp/listings.png", "02 · Prepare", "Comparable-market evidence and listing work."],
          ["/images/rsp/sold.png", "03 · Learn", "Sold/outcome evidence for the next decision."],
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
    const items = project.slug === "office-chef"
      ? [["Input", "Invoices & vendor changes"], ["Analysis", "Food cost & menu margin"], ["Review", "Human exception handling"], ["Output", "Owner-ready operating brief"]]
      : [["Kitchen reality", "Prep, service, inventory, and exceptions"], ["Product response", "Recipe structure and visible continuity"], ["Adoption", "Familiar language and useful defaults"], ["Proof", "Public screens and inspectable source"]];
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
      {(project.slug === "sous-chef"
        ? [["Recipes", "Structured creation"], ["Pantry", "Ingredient signals"], ["Cookbooks", "Reusable organization"], ["Sessions", "Cooking continuity"]]
        : [["Inputs", "Role requirements"], ["Strategy", "Boolean search variants"], ["Review", "Recruiter relevance feedback"], ["Loop", "Refined search strategy"]]
      ).map(([a, b]) => <article key={a}><span>{a}</span><h3>{b}</h3></article>)}
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
          <p className="case-descriptor">Governed multi-agent workflow system</p>
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
            <p>Control lives in three boundaries every piece of work passes through: what may change, who may approve it, and what proves the result. The strip below shows where the human gate sits; the full governed lifecycle is named once, in the Agent Workflow Demo.</p>
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
            <p>These screens come from the working application and show the resale workflow in use.</p>
          </div>
          <SectionVisual project={project} kind="screens" />
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
        </div>
      </section>

      <section className="case-section tinted-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">03 &#183; Decision design</p><h2>Useful automation has a stopping rule.</h2></div>
            <p>RSP automates research and preparation, then stops where judgment matters. The user decides whether to buy, reviews the listing, and explicitly approves publication.</p>
          </div>
          <SectionVisual project={project} kind="decision" />
          <p className="case-principle">AI reduces the research and preparation burden. Human judgment remains accountable for the decision and release.</p>
        </div>
      </section>

      <section className="case-section">
        <div className="shell">
          <div className="split-head">
            <div><p className="eyebrow">04 &#183; Learning loop</p><h2>The workflow gets smarter from outcomes.</h2></div>
            <p>RSP carries the decision past research and listing preparation. Outcome evidence can return to the operating record so future evaluations have better context where the current implementation supports it.</p>
          </div>
          <p className="case-principle">I designed the workflow around a real operating decision: capture the item, reduce the research burden, preserve human judgment, prepare the work, and carry the outcome back into the system.</p>
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

export function ProjectCase({ project }: { project: Project }) {
  if (project.slug === "loft-os") return <LoftOsCase project={project} />;
  if (project.slug === "resale-scanner-pro") return <RspCase project={project} />;

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
