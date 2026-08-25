import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const output = new URL("../out/", import.meta.url);

const readOutput = (path) => readFile(new URL(path, output), "utf8");

test("top navigation is locked to the TSK-924 contract", async () => {
  const html = await readOutput("index.html");

  assert.match(html, />Case Studies<\/a>/);
  assert.match(html, />About<\/a>/);
  assert.match(html, />Resume<\/a>/);
  assert.match(html, />Contact<\/a>/);
  assert.match(html, /Download Resume/);

  assert.doesNotMatch(html, />For hiring teams<\/a>/i);
  assert.doesNotMatch(html, />Home<\/a>/i);
});

test("homepage recruiter scan order is hero -> capabilities -> proof -> about -> contact", async () => {
  const html = await readOutput("index.html");

  const hero = html.indexOf("Practical AI workflows and business systems.");
  const capabilities = html.indexOf("AI / engineering capabilities");
  const featured = html.indexOf("Selected work");
  const about = html.indexOf("About / career bridge");
  const contact = html.indexOf("Fast review path");

  assert.ok(hero !== -1 && capabilities !== -1 && featured !== -1 && about !== -1 && contact !== -1);
  assert.ok(hero < capabilities);
  assert.ok(capabilities < featured);
  assert.ok(featured < about);
  assert.ok(about < contact);
});

test("capability section is concise and materially explicit", async () => {
  const html = await readOutput("index.html");

  assert.match(html, /AI workflow \/ role design/);
  assert.match(html, /Implementation \/ usable delivery/);
  assert.match(html, /Reliability \/ human control \/ evaluation/);
  assert.match(html, /PROOF · Loft OS/);
  assert.match(html, /PROOF · Resale Scanner Pro/);

  assert.doesNotMatch(html, /LangGraph|Kubernetes|AWS|RAG\b|Python\b/i);
});

test("featured proof keeps RSP primary and elevates Loft OS with inspectable Assistant Recruiter Pro route", async () => {
  const home = await readOutput("index.html");

  assert.match(home, /Resale Scanner Pro/);
  assert.match(home, /In real operating use/);
  assert.match(home, /Loft OS/);
  assert.match(home, /First-tier proof/);
  assert.match(home, /Assistant Recruiter Pro/);
  assert.match(home, /href="\/work\/assistant-recruiter-pro\/"/);
  assert.match(home, /Open workflow proof/);
  assert.match(home, /01 · Evaluate/);
  assert.match(home, /02 · Act/);
  assert.match(home, /03 · Learn/);
  assert.match(home, /Human-gated handoff/);
  assert.equal((home.match(/class="project-card dark-card wide-card"/g) || []).length, 1);
  assert.match(home, /SIMPLIFIED PUBLIC-SAFE VIEW/);
  assert.doesNotMatch(home, /hero-bottom/);
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
  assert.match(home, /Applied AI Workflows · Business Systems · Implementation · Human-Controlled Automation/);
  assert.match(hiring, /og-home\.png/);

  const layoutSource = await readFile(new URL("app/layout.tsx", root), "utf8");
  assert.match(layoutSource, /Applied AI Workflow and Business Systems Implementation/);
  assert.doesNotMatch(layoutSource, /Hospitality Operations Leader & Systems Builder/);
});

test("claim-boundary and privacy scan passes across recruiter-facing routes", async () => {
  const pages = await Promise.all([
    readOutput("index.html"),
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

test("sitemap and route inventory include the new inspectable assistant route", async () => {
  const sitemap = await readOutput("sitemap.xml");

  assert.match(sitemap, /https:\/\/avergara13\.github\.io\/work\/assistant-recruiter-pro\//);
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
