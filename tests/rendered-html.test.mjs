import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const output = new URL("../out/", import.meta.url);

const readOutput = (path) => readFile(new URL(path, output), "utf8");

test("top navigation preserves Work, About, Resume, and Contact", async () => {
  const html = await readOutput("index.html");

  assert.match(html, />Work<\/a>/);
  assert.match(html, />About<\/a>/);
  assert.match(html, />Resume<\/a>/);
  assert.match(html, />Contact<\/a>/);
  assert.match(html, /href="\/work\/"/);
  assert.match(html, /href="\/about\/"/);
});

test("homepage recruiter scan order is hero -> Decision Relay -> story bridge", async () => {
  const html = await readOutput("index.html");

  const hero = html.indexOf("I design AI workflows that turn messy operations into clear, usable systems.");
  const relay = html.indexOf("Decision Relay");
  const story = html.indexOf("Operating Reality");

  assert.ok(hero !== -1 && relay !== -1 && story !== -1);
  assert.ok(hero < relay && relay < story);
  assert.doesNotMatch(html, /Selected work|More proof|project-card/);
});

test("Decision Relay is a bounded curated demo with visible three-agent and human-refinement structure", async () => {
  const home = await readOutput("index.html");
  const component = await readFile(new URL("components/DecisionRelay.tsx", root), "utf8");
  const contract = `${home}\n${component}`;

  assert.match(contract, /Decision Relay/);
  assert.match(contract, /Curated demo/i);
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

test("hiring route is compatibility about/career-bridge and no longer dominates with old positioning", async () => {
  const html = await readOutput("hiring/index.html");

  assert.match(html, /About \/ career bridge/i);
  assert.match(html, /Applied AI workflows and business systems, grounded in operating reality/i);
  assert.match(html, /Return to homepage/);

  assert.doesNotMatch(html, /Operations credibility, built for implementation\./i);
  assert.doesNotMatch(html, /For hiring teams/i);
});

test("metadata and footer language align with applied AI workflows positioning", async () => {
  const home = await readOutput("index.html");
  const hiring = await readOutput("hiring/index.html");

  assert.match(home, /AI workflows and business systems/i);
  assert.match(home, /Email →/);
  assert.match(home, /LinkedIn ↗/);
  assert.match(home, /GitHub ↗/);
  assert.match(hiring, /og-home\.png/);

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
