import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const output = new URL("../out/", import.meta.url);

const readOutput = (path) => readFile(new URL(path, output), "utf8");

// Scope homepage order checks to <main>: the <head> description and the nav/footer
// repeat hero copy ("Angel Vergara", the value proposition, /resume/), so a
// whole-document indexOf would silently measure the wrong occurrence.
const readHomeMain = async () => {
  const html = await readOutput("index.html");
  const at = html.indexOf('<main id="main"');
  assert.notEqual(at, -1, "homepage <main> landmark is missing");
  return html.slice(at);
};

// Each marker must appear EXACTLY once and in the given order. Uniqueness is part
// of the assertion: a duplicated marker would make the ordering claim meaningless.
const assertOrder = (haystack, markers) => {
  let previous = -1;
  for (const marker of markers) {
    const at = haystack.indexOf(marker);
    assert.notEqual(at, -1, `ordered marker missing from rendered output: ${marker}`);
    assert.equal(haystack.indexOf(marker, at + 1), -1, `ordered marker must be unique: ${marker}`);
    assert.ok(at > previous, `rendered order violated: ${marker} appears too early`);
    previous = at;
  }
};

test("top navigation preserves Work, About, Resume, and Contact", async () => {
  const html = await readOutput("index.html");

  assert.match(html, />Work<\/a>/);
  assert.match(html, />About<\/a>/);
  assert.match(html, />Resume<\/a>/);
  assert.match(html, />Contact<\/a>/);
  assert.match(html, /href="\/work\/"/);
  assert.match(html, /href="\/about\/"/);
});

test("homepage hero leads with identity, a subordinate role family, the value proposition, then CTAs", async () => {
  const main = await readHomeMain();

  // The identity anchor is the page h1 — not the nav wordmark.
  assert.match(main, /<h1 id="hero-title">Angel Vergara<\/h1>/);

  // The role family is carried by a subordinate line, never promoted into a heading.
  assert.match(main, /<p class="hero-role-family">AI Workflow Automation · Systems Implementation · Business Systems<\/p>/);
  assert.doesNotMatch(main, /<h[12][^>]*>[^<]*AI Workflow Automation/);

  // Value proposition. TSK-961 Phase 1 retired the proof cue as redundant with the
  // role family above it, so its absence is pinned rather than left unguarded.
  assert.match(main, /<p class="hero-value">I turn messy operating problems into clear, controlled systems people can actually use\.<\/p>/);
  assert.doesNotMatch(main, /hero-proof-cue|Governed AI systems · Working products · Implementation discipline/);

  // Recruiter CTAs resolve to the flagship case study and the resume, inside the hero.
  const ctas = main.slice(main.indexOf('class="hero-ctas"'), main.indexOf('class="editorial-handoff"'));
  assert.match(ctas, /href="\/work\/loft-os\/"[^>]*>View flagship work/);
  assert.match(ctas, /href="\/resume\/">Resume</);

  assertOrder(main, [
    'id="hero-title"',
    'class="hero-role-family"',
    'class="hero-value"',
    'class="hero-ctas"',
  ]);
});

test("homepage recruiter scan order is hero -> CTAs -> selected work -> story bridge", async () => {
  const html = await readOutput("index.html");
  const main = await readHomeMain();

  assertOrder(main, [
    'id="hero-title"',
    'class="hero-ctas"',
    'class="proof-bridge-list"',
    'id="story-title"',
  ]);

  // TSK-961 Phase 1 moved the interactive demo off HOME and into the Loft OS case
  // study. HOME must not carry the relay surface again, or it re-competes with the
  // recruiter story it was moved to protect.
  assert.doesNotMatch(html, /id="relay-title"|class="relay-/);

  // Locked HOME section title and copy.
  assert.match(main, /<h2 id="proof-bridge-title">Selected work<\/h2>/);
  assert.doesNotMatch(main, /Systems that were built, shipped, and used\./);
  assert.match(main, /<p class="proof-bridge-kind">Flagship · Governed multi-agent workflow system<\/p>/);
  assert.match(main, /<p class="proof-bridge-summary">Scoped work, human authority, independent review, and verified closeout\.<\/p>/);
  assert.match(main, /<p class="proof-bridge-cue">Includes interactive agent workflow demo<span aria-hidden="true"> →<\/span><\/p>/);
  assert.match(main, /<p class="proof-bridge-summary">A mobile workflow for evaluating resale finds with market evidence and human judgment\.<\/p>/);

  // The HOME-only micro-signal list was retired; its concepts live in the case study.
  assert.doesNotMatch(main, /class="proof-signals"/);

  // Locked story bridge.
  assert.match(main, /<h2 id="story-title">Operating reality → systems thinking<\/h2>/);
  assert.match(main, /I learned systems by running the operations they have to support—from kitchens and restaurant leadership to AI workflows and business systems\./);

  // Loft OS is the flagship proof and leads; Resale Scanner Pro follows it.
  const bridge = main.slice(main.indexOf('class="proof-bridge-list"'), main.indexOf('id="story-title"'));
  const loftOs = bridge.indexOf('href="/work/loft-os/"');
  const rsp = bridge.indexOf('href="/work/resale-scanner-pro/"');
  assert.notEqual(loftOs, -1, "Loft OS must appear in the selected-proof bridge");
  assert.notEqual(rsp, -1, "Resale Scanner Pro must appear in the selected-proof bridge");
  assert.ok(loftOs < rsp, "Loft OS must lead the selected-proof bridge");

  // The leading row must actually be labelled Loft OS: pinning link order alone
  // would still pass if the rows kept their hrefs but swapped their identities.
  assert.match(bridge.slice(loftOs, rsp), /<h3>Loft OS<\/h3>/);
  assert.match(bridge.slice(rsp), /<h3>Resale Scanner Pro<\/h3>/);

  // The retired card-heavy homepage layout must not return. "Selected work" is now
  // the locked section title (TSK-961 Phase 1), so only the card markers are barred.
  assert.doesNotMatch(html, /More proof|project-card/);
});

test("Loft OS is marked as the flagship proof and Resale Scanner Pro is not", async () => {
  const main = await readHomeMain();
  const bridge = main.slice(main.indexOf('class="proof-bridge-list"'), main.indexOf('id="story-title"'));

  // The flagship distinction must be structural, not left to reading order alone:
  // the two rows are otherwise identical markup, so CSS needs a hook it can rank on.
  const rows = [...bridge.matchAll(/<a class="(proof-bridge-row[^"]*)" href="([^"]+)"/g)]
    .map(([, cls, href]) => ({ cls, href }));

  assert.equal(rows.length, 2, "the selected-proof bridge must render exactly two rows");
  assert.equal(rows[0].href, "/work/loft-os/");
  assert.equal(rows[1].href, "/work/resale-scanner-pro/");
  assert.match(rows[0].cls, /\bis-flagship\b/, "Loft OS must carry the flagship marker");
  assert.doesNotMatch(rows[1].cls, /\bis-flagship\b/, "only one row may be the flagship");

  // Ordinals stay put.
  assert.match(bridge, /<span class="proof-bridge-number">01<\/span>/);
  assert.match(bridge, /<span class="proof-bridge-number">02<\/span>/);
});

test("homepage visual prominence follows the intended ranking at every width", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");

  // Guards the regression that shipped: .proof-bridge-head h2 used clamp() and floored at
  // 30.4px below ~950px wide, while .story-bridge h2 was a FIXED 2.35rem/2rem. So at
  // 768/430/390 the trailing narrative card out-ranked the flagship proof section even
  // though the DOM order was correct. Sizes that scale with vw must be compared AT THE SAME
  // WIDTH — comparing one clamp's max against another's min mixes two different viewports.
  const declared = (selector) => {
    const rule = new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`, "g");
    const decls = [...css.matchAll(rule)].map((m) => m[1]).filter((b) => /font-size\s*:/.test(b));
    assert.equal(decls.length, 1, `${selector} must declare font-size exactly once — a second override can silently re-invert the hierarchy`);
    const value = decls[0].match(/font-size\s*:\s*([^;]+)/)[1].trim();
    const clamped = value.match(/^clamp\(\s*([\d.]+)rem\s*,\s*([\d.]+)vw\s*,\s*([\d.]+)rem\s*\)$/);
    if (clamped) {
      const [, lo, vw, hi] = clamped.map(Number.parseFloat);
      return (width) => Math.min(Math.max(lo * 16, (vw / 100) * width), hi * 16);
    }
    const rem = value.match(/^([\d.]+)rem$/);
    assert.ok(rem, `${selector}: unsupported font-size form ${value}`);
    return () => parseFloat(rem[1]) * 16;
  };

  const proofHead = declared(".proof-bridge-head h2");
  const flagship = declared(".proof-bridge-row.is-flagship h3");
  const row = declared(".proof-bridge-row h3");
  const story = declared(".story-bridge h2");

  // A rank gap has to be SEEN, not just satisfied numerically: 30.4px over 28px is a
  // 1.09x difference that reads as "same size" and leaves the hierarchy ambiguous.
  const STEP = 1.12;
  const outranks = (bigger, smaller) => bigger >= smaller * STEP;

  for (const width of [1440, 768, 430, 390]) {
    const [ph, fl, rw, st] = [proofHead(width), flagship(width), row(width), story(width)];
    assert.ok(outranks(ph, st), `at ${width}px the selected-proof heading (${ph}px) must visibly out-rank the trailing story section (${st}px)`);
    assert.ok(outranks(ph, fl), `at ${width}px the section heading (${ph}px) must visibly out-rank the flagship row title (${fl}px)`);
    assert.ok(outranks(fl, rw), `at ${width}px the flagship Loft OS row (${fl}px) must visibly out-rank Resale Scanner Pro (${rw}px)`);
  }
});

test("Agent Workflow Demo is a bounded curated demo with visible three-agent and human-refinement structure", async () => {
  const home = await readOutput("index.html");
  const loft = await readOutput("work/loft-os/index.html");
  const component = await readFile(new URL("components/DecisionRelay.tsx", root), "utf8");
  const contract = `${loft}\n${component}`;

  // TSK-961 Phase 2 retired "Decision Relay" as the public label and moved the demo
  // off HOME into the flagship case study.
  assert.match(loft, /<h2 id="relay-title">Agent Workflow Demo<\/h2>/);
  assert.doesNotMatch(loft, /Decision Relay/);
  assert.doesNotMatch(home, /id="relay-title"|Agent Workflow Demo/);

  assert.match(contract, /Curated demo/i);
  assert.match(loft, /<p class="relay-eyebrow">Interactive proof<\/p>/);
  // The truth disclosure is load-bearing: this is a fixture, not a live production run.
  assert.match(loft, /Curated demonstration · deterministic fixture · not a live autonomous production run\./);
  assert.match(contract, /Triage Agent/);
  assert.match(contract, /Planning Agent/);
  assert.match(contract, /Personal Assistant Agent/);
  assert.match(contract, /Refine the plan/);
  assert.match(contract, /Custom input is not processed in this public demo/);
  assert.match(contract, /arbitrary input is never presented as processed/i);
  assert.doesNotMatch(contract, /Mess → Mission|Mess to Mission/i);
});

test("portfolio chooser leads with Loft OS, then RSP, with supporting work subordinate", async () => {
  const html = await readOutput("work/index.html");

  // TSK-961 Phase 4 retired the internal "Evidence Atlas" label for plain language.
  assert.match(html, /<h1>Portfolio<\/h1>/);
  assert.match(html, /Selected products and systems I’ve designed, built, and implemented\./);
  assert.doesNotMatch(html, /Evidence Atlas|Systems Field Manual|proof surface/i);

  // Chooser hierarchy: Loft OS first, RSP second, supporting work after both.
  const loft = html.indexOf("Loft OS");
  const rsp = html.indexOf("Resale Scanner Pro");
  const additional = html.indexOf("Additional work");
  const arp = html.indexOf("Assistant Recruiter Pro");
  const sous = html.indexOf("Sous Chef");
  assert.ok(loft < rsp, "Loft OS must lead the chooser");
  assert.ok(rsp < additional, "Additional work must follow the two primary projects");
  assert.ok(additional < arp && additional < sous, "supporting work sits under Additional work");

  // Locked card contract: label + one sentence + explicit CTA, and no metadata grid.
  assert.match(html, /Flagship · Governed multi-agent workflow system/);
  assert.match(html, /Working product · In operating use/);
  assert.match(html, /View case study/);
  assert.match(html, /View project/);
  assert.doesNotMatch(html, /<dl>|<dt>Type<\/dt>|<dt>Role<\/dt>|<dt>Status<\/dt>/);

  // Lab stays reachable but clearly separate from portfolio proof.
  assert.match(html, /Experiments &amp; explorations/);
});

test("Lab stays explicitly experimental and isolated from production proof", async () => {
  const home = await readOutput("index.html");
  const lab = await readOutput("lab/index.html");
  const work = await readOutput("work/index.html");

  // Experiments must never surface on HOME or in the portfolio chooser.
  assert.doesNotMatch(home, /Gemini Chat|Live Voice|PUBLIC LIVE/i);
  assert.doesNotMatch(work, /Gemini Chat|Live Voice/i);

  // TSK-961 Phase 8 split the combined entry into two named experiments.
  assert.match(lab, /<h2>Gemini Chat<\/h2>/);
  assert.match(lab, /<h2>Live Voice<\/h2>/);
  assert.match(lab, /PUBLIC LIVE NOT ENABLED/);
  assert.match(lab, /EXPERIMENTAL/);

  // The boundary is stated once, at page level.
  assert.match(lab, /intentionally separated from the portfolio’s production and working-product proof/);

  // No private infrastructure detail may leak onto the experimental surface.
  assert.doesNotMatch(lab, /api\/chat|\/live\b|railway|ollama/i);

  // A route back to verified proof always exists.
  assert.match(lab, /href="\/work\/loft-os\/"/);
  assert.match(lab, /href="\/work\/resale-scanner-pro\/"/);
});

test("approved Assistant Recruiter Pro heading is pinned", async () => {
  const html = await readOutput("work/assistant-recruiter-pro/index.html");

  assert.match(html, /From a messy job description to a reviewable search strategy\./);
});

test("assistant recruiter route exists and is client-safe inspectable proof", async () => {
  const html = await readOutput("work/assistant-recruiter-pro/index.html");

  assert.match(html, /Assistant Recruiter Pro/);
  assert.match(html, /AI workflow/);
  assert.match(html, /job description context and recruiter constraints/i);
  assert.match(html, /platform-aware broad and narrow search strings/i);
  assert.match(html, /Recruiter checks relevance, realism, and false-positive risk/i);
  assert.match(html, /Customer identity, candidate information, proprietary prompts, private search data, and internal instructions remain private\./);
  assert.match(html, /This case intentionally excludes customer identity, candidate details, proprietary prompts, and confidential commercial detail/i);

  assert.doesNotMatch(html, /private runtime|WO_ENQ|TSK-\d|credentials|candidate identity/i);
});

test("hiring route is a decision surface whose named proof matches its links", async () => {
  const html = await readOutput("hiring/index.html");

  assert.match(html, /Operations experience\. Systems implementation\. Applied AI\./);
  // Fit lanes must stay labelled as fit, never as held titles.
  assert.match(html, /These are role-fit lanes, not claims of prior paid titles\./);

  // The named proof and the actual proof links must not drift apart again.
  assert.match(html, /Loft OS/);
  assert.match(html, /Resale Scanner Pro/);
  assert.match(html, /href="\/work\/loft-os\/"/);
  assert.match(html, /href="\/work\/resale-scanner-pro\/"/);
  assert.match(html, /href="\/downloads\/Angel_Vergara_Resume_General\.pdf"/);

  // The resume-version rule is stated exactly once (TSK-961 Phase 6). Scope the count to
  // <main>: Next also serialises the same copy into the RSC payload later in the file.
  const mainAt = html.indexOf('<main id="main"');
  assert.notEqual(mainAt, -1, "hiring <main> landmark is missing");
  const main = html.slice(mainAt, html.indexOf("</main>", mainAt));
  const versionRule = main.match(/The General Resume is the baseline\./g) ?? [];
  assert.equal(versionRule.length, 1, "the resume-version rule must be stated once");

  // Retired framing must stay gone.
  assert.doesNotMatch(html, /keeps compatibility/i);
  assert.doesNotMatch(html, /About \/ career bridge/i);
  assert.doesNotMatch(html, /Use this route for additional context/i);
  assert.doesNotMatch(html, /Operations credibility, built for implementation\./i);
  assert.doesNotMatch(html, /Three role families, one consistent skill set/i);
  assert.doesNotMatch(html, /This page is the short version for hiring teams/i);
  assert.doesNotMatch(html, /01 · FIT|02 · PROOF|03 · CONVERSATION/);
});

test("metadata and footer language align with applied AI workflows positioning", async () => {
  const home = await readOutput("index.html");
  const hiring = await readOutput("hiring/index.html");

  assert.match(home, /AI workflows and business systems/i);
  assert.match(home, /Email →/);
  assert.match(home, /LinkedIn ↗/);
  assert.match(home, /GitHub ↗/);
  assert.match(hiring, /og-hiring\.png/);

  const layoutSource = await readFile(new URL("app/layout.tsx", root), "utf8");
  assert.match(layoutSource, /Applied AI Workflow and Business Systems Implementation/);
  assert.doesNotMatch(layoutSource, /Hospitality Operations Leader & Systems Builder/);
});

test("claim-boundary and privacy scan passes across recruiter-facing routes", async () => {
  const pages = await Promise.all([
    readOutput("index.html"),
    readOutput("work/index.html"),
    readOutput("about/index.html"),
    readOutput("lab/index.html"),
    readOutput("resume/index.html"),
    readOutput("hiring/index.html"),
    readOutput("work/resale-scanner-pro/index.html"),
    readOutput("work/loft-os/index.html"),
    readOutput("work/assistant-recruiter-pro/index.html"),
  ]);
  const html = pages.join("\n");

  assert.doesNotMatch(html, /1,000\+|1,100\+/);
  assert.doesNotMatch(html, /placements|revenue|customer scale|paid AI consulting|time savings|performance percentages?/i);
  assert.doesNotMatch(html, /WO_ENQ|TSK-\d|loft_os_architect|Loft_OS_Architect|private runtime topology/i);
  assert.doesNotMatch(html, /github\.com\/avergara13\/resale-scanner-pro/i);
  assert.doesNotMatch(html, /up\.railway\.app/i);
  // Notion identifiers must never reach public output (dashed or bare 32-hex).
  assert.doesNotMatch(html, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  assert.doesNotMatch(html, /notion\.so|app\.notion\.com/i);
  // Absolute local paths must never reach public output.
  assert.doesNotMatch(html, /\/Users\//);
});

test("sitemap and route inventory include formal work, about, lab, and inspectable assistant routes", async () => {
  const sitemap = await readOutput("sitemap.xml");

  assert.match(sitemap, /https:\/\/avergara13\.github\.io\/work\/assistant-recruiter-pro\//);
  assert.match(sitemap, /https:\/\/avergara13\.github\.io\/work\//);
  assert.match(sitemap, /https:\/\/avergara13\.github\.io\/about\//);
  assert.match(sitemap, /https:\/\/avergara13\.github\.io\/lab\//);
  assert.match(sitemap, /https:\/\/avergara13\.github\.io\/hiring\//);
});

test("private application artifacts remain absent", async () => {
  const paths = [
    "public/downloads/Angel_Vergara_Application_Quickstart.pdf",
    "public/downloads/Angel_Vergara_Cover_Letter_Kit.pdf",
    "public/images/portfolio/application-dashboard.png",
    "out/downloads/Angel_Vergara_Application_Quickstart.pdf",
    "out/downloads/Angel_Vergara_Cover_Letter_Kit.pdf",
    "out/images/portfolio/application-dashboard.png",
    "out/application-kit/index.html",
  ];

  for (const path of paths) {
    await assert.rejects(access(new URL(path, root)), undefined, `${path} must not exist`);
  }
});

test("resume PDFs still exist and remain complete", async () => {
  const files = [
    "public/downloads/Angel_Vergara_Resume_General.pdf",
    "public/downloads/Angel_Vergara_Resume_Implementation_Onboarding.pdf",
    "public/downloads/Angel_Vergara_Resume_Business_Systems_Operations.pdf",
    "public/downloads/Angel_Vergara_Resume_AI_Workflow_Automation.pdf",
  ];

  for (const path of files) {
    const details = await stat(new URL(path, root));
    assert.ok(details.size > 4_000, `${path} should be a complete PDF`);
  }
});

test("Loft OS governed-run lifecycle and Failure Lab are pinned", async () => {
  const html = await readOutput("work/loft-os/index.html");

  // 1. the governed-run lifecycle exists, and lives inside the Agent Workflow Demo
  assert.match(html, /id="governed-run"/);
  assert.match(html, /class="proof-chain"/);
  assert.ok(html.indexOf('id="relay-title"') < html.indexOf('id="governed-run"'),
    "the governed run must render inside the Agent Workflow Demo, not as a second lifecycle");

  // 2. the seven locked recruiter-facing stages appear in order
  const stages = [
    "Request",
    "Task",
    "Scoped execution",
    "Agent work",
    "Independent review",
    "Protected release",
    "Verified closeout",
  ];
  const positions = stages.map((stage) => {
    const at = html.indexOf(`<b>${stage}</b>`);
    assert.notEqual(at, -1, `proof stage missing from rendered output: ${stage}`);
    return at;
  });
  for (let i = 1; i < positions.length; i += 1) {
    assert.ok(
      positions[i] > positions[i - 1],
      `proof stages out of order: "${stages[i]}" must render after "${stages[i - 1]}"`,
    );
  }

  // 3. execution authority and release authority remain SEPARATE gates, in that order
  const executionAt = html.indexOf("<b>Scoped execution</b>");
  const releaseAt = html.indexOf("<b>Protected release</b>");
  assert.ok(executionAt < releaseAt, "execution authority must precede release authority");
  assert.match(html, /The party that did the work cannot approve its own merge/);
  const authorityGates = html.match(/authority-gate/g) ?? [];
  assert.ok(authorityGates.length >= 2, "both authority gates must be marked distinctly");

  // 4. the locked section order: control stack -> Failure Lab -> Public boundary
  const stackAt = html.indexOf("The control stack");
  const failureAt = html.indexOf("Failure Lab");
  const boundaryAt = html.indexOf("Public boundary");
  assert.notEqual(stackAt, -1, "control stack section missing");
  assert.notEqual(failureAt, -1, "Failure Lab section missing");
  assert.ok(stackAt < failureAt, "Failure Lab must follow the control stack");
  assert.ok(failureAt < boundaryAt, "Failure Lab must precede the Public Boundary");

  // 5. the Public Boundary survives, with its shown/withheld contract intact
  assert.match(html, /class="boundary-grid"/);
  assert.match(html, />Shown</);
  assert.match(html, />Withheld</);

  // the failure narrative is present and stays honest about the open gap
  assert.match(html, /class="failure-lab"/);
  assert.match(html, /tracked as open work, not described as solved/);

  // The locked recovery progression must not collapse into a falsely complete story:
  // "System hardening" is terminal, so the open-gap truth note sits beside it.
  const beats = ["Active work", "False stale verdict", "Containment", "Preserved evidence", "Root-cause discovery", "Lawful recovery", "System hardening"];
  let prevBeat = -1;
  for (const beat of beats) {
    const at = html.indexOf(`<b>${beat}</b>`);
    assert.notEqual(at, -1, `failure-lab beat missing: ${beat}`);
    assert.ok(at > prevBeat, `failure-lab beat out of order: ${beat}`);
    prevBeat = at;
  }
  assert.match(html, /Any remaining gap stays visible until it is verified closed\./);

  // 6. forbidden absolutes must never appear on the flagship claim surface
  assert.doesNotMatch(html, /do(es)? not hallucinate|hallucinations are eliminated|cannot drift/i);
});

test("resume generator source honors the public claim boundary", async () => {
  const raw = await readFile(new URL("scripts/generate_resumes.py", root), "utf8");
  // Strip comment lines: the module header deliberately NAMES the banned terms to document the boundary.
  const source = raw.split("\n").filter((line) => !line.trimStart().startsWith("#")).join("\n");

  // Uncontrolled-autonomy and commercial claims must never reach a published resume.
  assert.doesNotMatch(source, /autonom/i);
  assert.doesNotMatch(source, /\bSaaS\b/i);
  assert.doesNotMatch(source, /production[- ]ready/i);

  // No private endpoints, repositories, or workspace identifiers in a public generator.
  assert.doesNotMatch(source, /up\.railway\.app/i);
  assert.doesNotMatch(source, /github\.com\/avergara13\/(loft_os|resale-scanner-pro)/i);
  assert.doesNotMatch(source, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
});
