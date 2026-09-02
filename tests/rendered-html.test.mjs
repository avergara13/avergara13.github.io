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

  // Value proposition and the restrained proof cue.
  assert.match(main, /<p class="hero-value">I turn messy operating problems into clear, controlled systems people can actually use\.<\/p>/);
  assert.match(main, /<p class="hero-proof-cue">Governed AI systems · Working products · Implementation discipline<\/p>/);

  // Recruiter CTAs resolve to the flagship case study and the resume, inside the hero.
  const ctas = main.slice(main.indexOf('class="hero-ctas"'), main.indexOf('class="editorial-handoff"'));
  assert.match(ctas, /href="\/work\/loft-os\/"[^>]*>View flagship work/);
  assert.match(ctas, /href="\/resume\/">Resume</);

  assertOrder(main, [
    'id="hero-title"',
    'class="hero-role-family"',
    'class="hero-value"',
    'class="hero-proof-cue"',
    'class="hero-ctas"',
  ]);
});

test("homepage recruiter scan order is hero -> CTAs -> Decision Relay -> selected proof -> story bridge", async () => {
  const html = await readOutput("index.html");
  const main = await readHomeMain();

  assertOrder(main, [
    'id="hero-title"',
    'class="hero-ctas"',
    'id="relay-title"',
    'class="proof-bridge-list"',
    'id="story-title"',
  ]);

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

  // The retired card-heavy homepage layout must not return.
  assert.doesNotMatch(html, /Selected work|More proof|project-card/);
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

  for (const width of [1440, 768, 430, 390]) {
    const [ph, fl, rw, st] = [proofHead(width), flagship(width), row(width), story(width)];
    assert.ok(ph > st, `at ${width}px the selected-proof heading (${ph}px) must out-rank the trailing story section (${st}px)`);
    assert.ok(ph > fl, `at ${width}px the section heading (${ph}px) must out-rank the flagship row title (${fl}px)`);
    assert.ok(fl > rw, `at ${width}px the flagship Loft OS row (${fl}px) must out-rank Resale Scanner Pro (${rw}px)`);
  }
});

test("Decision Relay is a bounded curated demo with visible three-agent and human-refinement structure", async () => {
  const home = await readOutput("index.html");
  const component = await readFile(new URL("components/DecisionRelay.tsx", root), "utf8");
  const contract = `${home}\n${component}`;

  assert.match(contract, /Decision Relay/);
  assert.match(contract, /Curated demo/i);
  // Framed as secondary interactive proof, and still visibly a curated demo.
  assert.match(home, /<p class="relay-eyebrow">Interactive proof<\/p>/);
  assert.match(contract, /Triage Agent/);
  assert.match(contract, /Planning Agent/);
  assert.match(contract, /Personal Assistant Agent/);
  assert.match(contract, /Refine the plan/);
  assert.match(contract, /Custom input is not processed in this public demo/);
  assert.match(contract, /arbitrary input is never presented as processed/i);
  assert.doesNotMatch(contract, /Mess → Mission|Mess to Mission/i);
});

test("formal work index preserves evidence-backed RSP and Systems Field Manual proof", async () => {
  const html = await readOutput("work/index.html");
  assert.match(html, /Evidence Atlas/);
  assert.match(html, /Resale Scanner Pro/);
  assert.match(html, /Loft OS/);
  assert.match(html, /Systems Field Manual/);
  assert.match(html, /Assistant Recruiter Pro/);
  assert.match(html, /Sous Chef/);
  assert.match(html, /Experiments &amp; explorations/);
});

test("Gemini remains isolated under Lab with truthful public capability boundary", async () => {
  const home = await readOutput("index.html");
  const lab = await readOutput("lab/index.html");
  assert.doesNotMatch(home, /Gemini Chat|Live Voice|PUBLIC LIVE/i);
  assert.match(lab, /Gemini Chat \+ Live Voice/);
  assert.match(lab, /local-private/i);
  assert.match(lab, /public live not enabled/i);
  assert.doesNotMatch(lab, /api\/chat|\/live\b|railway|ollama/i);
});

test("approved Assistant Recruiter Pro heading is pinned", async () => {
  const html = await readOutput("work/assistant-recruiter-pro/index.html");

  assert.match(html, /From a messy job description to a reviewable search strategy\./);
});

test("assistant recruiter route exists and is client-safe inspectable proof", async () => {
  const html = await readOutput("work/assistant-recruiter-pro/index.html");

  assert.match(html, /Assistant Recruiter Pro/);
  assert.match(html, /Recruiter workflow proof/);
  assert.match(html, /job description context and recruiter constraints/i);
  assert.match(html, /platform-aware broad and narrow search strings/i);
  assert.match(html, /Recruiter checks relevance, realism, and false-positive risk/i);
  assert.match(html, /No customer identity, candidate data, proprietary prompts, or confidential commercial detail exposed/i);

  assert.doesNotMatch(html, /private runtime|WO_ENQ|TSK-\d|credentials|candidate identity/i);
});

test("hiring route is a hiring brief whose named proof matches its links", async () => {
  const html = await readOutput("hiring/index.html");

  assert.match(html, /Hiring brief/i);
  assert.match(html, /Applied AI workflows and business systems, grounded in operating reality/i);

  // The named proof and the actual proof links must not drift apart again.
  assert.match(html, /Loft OS \+ Resale Scanner Pro/i);
  assert.match(html, /href="\/work\/loft-os\/"/);
  assert.match(html, /href="\/work\/resale-scanner-pro\/"/);

  // Route-maintenance framing must stay gone.
  assert.doesNotMatch(html, /keeps compatibility/i);
  assert.doesNotMatch(html, /About \/ career bridge/i);
  assert.doesNotMatch(html, /Use this route for additional context/i);
  assert.doesNotMatch(html, /Operations credibility, built for implementation\./i);
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

test("Loft OS flagship proof strip and Failure Lab are pinned", async () => {
  const html = await readOutput("work/loft-os/index.html");

  // 1. the governed-run proof strip exists on the Loft OS case study
  assert.match(html, /id="governed-run"/);
  assert.match(html, /class="proof-chain"/);

  // 2. the seven proof stages appear in order
  const stages = [
    "Request",
    "Scoped work contract",
    "Execution authority",
    "Agent execution",
    "Review",
    "Merge authority",
    "Frozen evidence",
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

  // 3. execution authority and merge authority are represented as SEPARATE authorities
  const executionAt = html.indexOf("<b>Execution authority</b>");
  const mergeAt = html.indexOf("<b>Merge authority</b>");
  assert.ok(executionAt < mergeAt, "execution authority must precede merge authority");
  assert.match(html, /The party that did the work cannot approve its own merge/);
  const authorityGates = html.match(/authority-gate/g) ?? [];
  assert.ok(authorityGates.length >= 2, "both authority gates must be marked distinctly");

  // 4. the Failure Lab appears after CURRENT IMPLEMENTATION and before the Public Boundary
  const implementationAt = html.indexOf("CURRENT IMPLEMENTATION");
  const failureAt = html.indexOf("Failure lab");
  const boundaryAt = html.indexOf("Public boundary");
  assert.notEqual(failureAt, -1, "Failure Lab section missing");
  assert.ok(implementationAt < failureAt, "Failure Lab must follow CURRENT IMPLEMENTATION");
  assert.ok(failureAt < boundaryAt, "Failure Lab must precede the Public Boundary");

  // 5. the Public Boundary survives, with its shown/withheld contract intact
  assert.match(html, /class="boundary-grid"/);
  assert.match(html, />Shown</);
  assert.match(html, />Withheld</);

  // the failure narrative is present and stays honest about the open gap
  assert.match(html, /class="failure-lab"/);
  assert.match(html, /tracked as open work, not described as solved/);
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
