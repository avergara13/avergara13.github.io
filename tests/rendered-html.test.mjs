import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const output = new URL("../out/", import.meta.url);

const readOutput = (path) => readFile(new URL(path, output), "utf8");

test("home leads with recruiter-first positioning and an above-fold resume action", async () => {
  const html = await readOutput("index.html");

  assert.match(html, /Operations leader building systems teams can actually adopt\./);
  assert.match(html, /Download resume \(PDF\)/);
  assert.match(html, /Angel_Vergara_Resume_General\.pdf/);
  assert.doesNotMatch(html, /Download implementation resume/);
  assert.match(html, /Featured live product/);
  assert.match(html, /Public proof boundary/);
  assert.match(html, /I learned systems by running the work they have to support./);
  assert.match(html, /executive chef and general manager/);
  assert.match(html, /Fast review path/);
  assert.match(html, /href="\/hiring\/"/);
  assert.match(html, /aria-controls="primary-navigation"/);
  assert.match(html, /aria-label="Open navigation menu"/);
  assert.doesNotMatch(html, />Experience<\/a>/);
  assert.doesNotMatch(html, /Compare all resume options/);
});

test("public pages keep private application systems out while exposing the approved product repository", async () => {
  const pages = await Promise.all([
    readOutput("index.html"),
    readOutput("resume/index.html"),
    readOutput("hiring/index.html"),
    readOutput("work/resale-scanner-pro/index.html"),
  ]);
  const html = pages.join("\n");

  assert.doesNotMatch(html, /application-kit|Application quickstart|Cover-letter kit|application-dashboard/i);
  assert.match(html, /github\.com\/avergara13\/resale-scanner-pro/);
  assert.doesNotMatch(html, /15\+ years|FIU · CIA · Valencia/i);
});

test("retired claim formulations are absent from every employer-facing page", async () => {
  const pages = await Promise.all([
    readOutput("index.html"),
    readOutput("resume/index.html"),
    readOutput("hiring/index.html"),
    readOutput("work/resale-scanner-pro/index.html"),
    readOutput("work/loft-os/index.html"),
    readOutput("work/sous-chef/index.html"),
    readOutput("work/office-chef/index.html"),
  ]);
  const html = pages.join("\n");

  assert.doesNotMatch(html, /shipped/i);
  assert.doesNotMatch(html, /Public and operational/);
  assert.doesNotMatch(html, /customers|revenue|conversion rate|deployment count|enterprise/i);
});

test("RSP framing carries the working-personal-product truth", async () => {
  const [home, caseStudy] = await Promise.all([
    readOutput("index.html"),
    readOutput("work/resale-scanner-pro/index.html"),
  ]);

  assert.match(home, /Live and in real use/);
  assert.match(home, /built for a real family resale operation/);
  assert.match(caseStudy, /Working live product · Visual case study/);
  assert.match(caseStudy, /Live and in real use/);
  assert.match(caseStudy, /built for a real family resale operation/);
});

test("Loft OS case carries the verified governed-delivery proof without private identifiers", async () => {
  const [home, loftOs] = await Promise.all([
    readOutput("index.html"),
    readOutput("work/loft-os/index.html"),
  ]);

  assert.match(home, /1,000\+ governed pull requests/);
  assert.match(loftOs, /1,000\+ governed pull requests/);
  assert.match(loftOs, /Sanitized by design/);
  assert.doesNotMatch(loftOs, /loft_os_architect|Loft_OS_Architect|WO_ENQ|TSK-\d/);
});

test("case studies expose confirmed project facts without invented metrics", async () => {
  const html = await readOutput("work/resale-scanner-pro/index.html");

  assert.match(html, /Product design, workflow architecture, implementation, and delivery/);
  assert.match(html, /Working public product with an evidence-focused employer case study/);
  assert.match(html, /View source repository/);
  assert.match(html, /Evidence summary/);
  assert.match(html, /Connect the proof to the role/);
  assert.doesNotMatch(html, /A product workflow with an evidence spine/);
  assert.doesNotMatch(html, /customers|revenue|conversion rate|deployment count/i);
});

test("resume links are explicit and the recommended lane is unmistakable", async () => {
  const html = (await readOutput("resume/index.html")).replaceAll("<!-- -->", "");

  assert.match(html, /Start with the General Resume/);
  assert.match(html, /Default — start here/);
  assert.match(html, /Download General Resume \(PDF\)/);
  assert.match(html, /Angel_Vergara_Resume_General\.pdf/);
  assert.match(html, /Download Implementation &amp; Onboarding resume \(PDF\)/);
  assert.match(html, /Download Business Systems &amp; Operations resume \(PDF\)/);
  assert.match(html, /Download AI Workflow &amp; Automation resume \(PDF\)/);
  assert.match(html, /href="\/hiring\/"/);
  assert.doesNotMatch(html, /The shared evidence spine|Need the short version/);
});

test("hiring brief provides role fit, proof sequence, and direct contact", async () => {
  const html = await readOutput("hiring/index.html");

  assert.match(html, /Where the experience converts fastest\./);
  assert.match(html, /Implementation &amp; onboarding/i);
  assert.match(html, /Business systems &amp; operations/i);
  assert.match(html, /Technical customer success/i);
  assert.match(html, /Recommended proof path/);
  assert.match(html, /Resale Scanner Pro/);
  assert.match(html, /mailto:avergara13@me\.com/);
  assert.doesNotMatch(html, /Recommended review path/);
});

test("section identity: per-route accents and an active navigation state", async () => {
  const [home, resume, hiring, caseStudy] = await Promise.all([
    readOutput("index.html"),
    readOutput("resume/index.html"),
    readOutput("hiring/index.html"),
    readOutput("work/resale-scanner-pro/index.html"),
  ]);

  assert.match(home, /data-section="home"/);
  assert.match(resume, /data-section="resume"/);
  assert.match(hiring, /data-section="hiring"/);
  assert.match(caseStudy, /data-section="work-resale-scanner-pro"/);
  assert.match(resume, /aria-current="page"/);
  assert.match(hiring, /aria-current="page"/);
  assert.match(caseStudy, /aria-current="page"/);
  assert.doesNotMatch(home, /aria-current="page"/);
});

test("search metadata is complete and canonical", async () => {
  const [home, resume, hiring, caseStudy, robots, sitemap] = await Promise.all([
    readOutput("index.html"),
    readOutput("resume/index.html"),
    readOutput("hiring/index.html"),
    readOutput("work/resale-scanner-pro/index.html"),
    readOutput("robots.txt"),
    readOutput("sitemap.xml"),
  ]);

  assert.match(home, /rel="canonical" href="https:\/\/avergara13\.github\.io\/"/);
  assert.match(resume, /rel="canonical" href="https:\/\/avergara13\.github\.io\/resume\/"/);
  assert.match(hiring, /rel="canonical" href="https:\/\/avergara13\.github\.io\/hiring\/"/);
  assert.match(caseStudy, /rel="canonical" href="https:\/\/avergara13\.github\.io\/work\/resale-scanner-pro\/"/);
  assert.match(home, /property="og:url" content="https:\/\/avergara13\.github\.io\/"/);
  assert.match(resume, /property="og:url" content="https:\/\/avergara13\.github\.io\/resume\/"/);
  assert.match(hiring, /property="og:url" content="https:\/\/avergara13\.github\.io\/hiring\/"/);
  assert.match(caseStudy, /property="og:url" content="https:\/\/avergara13\.github\.io\/work\/resale-scanner-pro\/"/);
  assert.match(home, /og-home\.png/);
  assert.match(resume, /og-resume\.png/);
  assert.match(hiring, /og-hiring\.png/);
  assert.match(caseStudy, /og-resale-scanner-pro\.png/);
  assert.match(home, /application\/ld\+json/);
  assert.match(home, /"@type":"Person"/);
  assert.match(robots, /Sitemap: https:\/\/avergara13\.github\.io\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/avergara13\.github\.io\/hiring\//);
  assert.match(sitemap, /2026-08-17/);
});

test("private application artifacts are absent from source and export", async () => {
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

test("starter-template residue stays removed from the source tree", async () => {
  const paths = [
    "app/chatgpt-auth.ts",
    "db/schema.ts",
    "drizzle.config.ts",
    "worker/index.ts",
    "examples/d1/db/schema.ts",
    "vite.config.ts",
    ".openai/hosting.json",
  ];

  for (const path of paths) {
    await assert.rejects(access(new URL(path, root)), undefined, `${path} must not exist`);
  }

  const pkg = JSON.parse(await readFile(new URL("package.json", root), "utf8"));
  assert.equal(pkg.name, "avergara13-portfolio");
});

test("downloadable resumes carry the corrected canonical evidence spine", async () => {
  const generator = await readFile(new URL("scripts/generate_resumes.py", root), "utf8");
  const files = [
    "public/downloads/Angel_Vergara_Resume_General.pdf",
    "public/downloads/Angel_Vergara_Resume_Implementation_Onboarding.pdf",
    "public/downloads/Angel_Vergara_Resume_Business_Systems_Operations.pdf",
    "public/downloads/Angel_Vergara_Resume_AI_Workflow_Automation.pdf",
  ];

  assert.match(generator, /HOSPITALITY TECHNOLOGY & OPERATIONS \| IMPLEMENTATION, BUSINESS SYSTEMS & AI WORKFLOWS/);
  assert.match(generator, /Angel_Vergara_Resume_General\.pdf/);
  assert.match(generator, /Hobbyst Resale - Active family resale venture/);
  assert.match(generator, /HOSPITALITY OPERATIONS LEADER \| IMPLEMENTATION & ONBOARDING/);
  assert.match(generator, /OPERATIONS LEADER \| BUSINESS SYSTEMS & OPERATIONS/);
  assert.match(generator, /OPERATIONS-TO-AI WORKFLOW BUILDER \| APPLIED AI WORKFLOWS & GOVERNED SYSTEMS/);
  assert.match(generator, /Cafe Linger - Executive Chef to General Manager \| Orlando, FL \| May 2018-Dec 2022/);
  assert.match(generator, /General Manager in Jan 2019/);
  assert.match(generator, /through Jan 2024/);
  assert.match(generator, /Farm-Haus \/ Farm & Haus - Chef de Cuisine \| Greater Orlando \| Sep 2015-Apr 2018/);
  assert.match(generator, /Southern Swank Kitchen - Head Chef \| Davie, FL \| Jul 2013-May 2014/);
  assert.match(generator, /Minor, Beverage Management/);
  assert.match(generator, /The Culinary Institute of America - A\.S\., Culinary Arts; May 2007-Apr 2010/);
  assert.match(generator, /Valencia Community College - A\.A\., General Studies/);
  assert.doesNotMatch(generator, /15\+ years|bookkeeping support|Phi Theta Kappa/i);
  assert.doesNotMatch(generator, /2009[-–]2023|SHIPPED PRODUCT/);
  assert.doesNotMatch(generator, /[-–—]\s*Present|\| Present/i);
  assert.doesNotMatch(generator, /github\.com\/avergara13\/resale-scanner-pro/i);

  for (const path of files) {
    const details = await stat(new URL(path, root));
    assert.ok(details.size > 4_000, `${path} should be a complete PDF`);
  }
});
