import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { access, readFile, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

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

test("homepage opening is role family, then the approved concise value proposition, then the architectural field — and no CTA row", async () => {
  const main = await readHomeMain();

  // TSK-973: the VALUE PROPOSITION stays the page h1, with Angel's approved concise copy.
  // Identity remains in the strengthened header wordmark that appears on every route.
  assert.match(main, /<h1 id="hero-title">I turn messy operations into clear, controlled systems people can use\.<\/h1>/);
  assert.doesNotMatch(main, /<h1[^>]*>Angel Vergara<\/h1>/);

  // The role family stays a subordinate mono line and is never promoted into a heading.
  // TSK-974 segments the line so wraps never dangle a separator, so the contract is the
  // READING, not the markup: strip the segment spans and compare the text exactly.
  const roleFamily = main.match(/<p class="hero-role-family">([\s\S]*?)<\/p>/);
  assert.ok(roleFamily, "the role family line is missing");
  const roleText = roleFamily[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  assert.equal(roleText, "Hospitality Technology · AI Workflow Automation · Systems Implementation · Business Systems");
  // Strip tags before testing promotion. Anchoring on the text immediately after ">" stopped
  // working the moment this line was wrapped in <span>s — the guard could no longer see the
  // very markup shape it exists to catch.
  for (const [, , inner] of main.matchAll(/<(h[12])[^>]*>([\s\S]*?)<\/\1>/g)) {
    const heading = inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    assert.doesNotMatch(heading, /Hospitality Technology|AI Workflow Automation/,
      `the role family must stay a subordinate line, never a heading: ${heading}`);
  }
  // The retired proof cue must stay retired, and it must not creep back in prose form.
  // The class pin alone was not enough: a support line reintroduced the same three
  // concepts as a sentence, so the CONCEPTS are pinned too, in any order.
  assert.doesNotMatch(main, /hero-proof-cue/);
  assert.doesNotMatch(main, /Governed AI systems · Working products · Implementation discipline/);
  assert.doesNotMatch(main, /class="hero-support"/);
  const opening = main.slice(0, main.indexOf('class="arch-field"'));
  assert.doesNotMatch(opening, /Governed AI systems/i, "the retired proof cue must not return as prose");
  assert.doesNotMatch(opening, /implementation discipline/i);

  // Locked opening sequence: role -> value proposition -> architectural field. The first
  // project CTA belongs inside the Loft stage, not the opening.
  assert.doesNotMatch(opening, /class="hero-ctas"|class="button/, "the opening carries no CTA row");
  assert.doesNotMatch(opening, /View flagship work/);
  assert.doesNotMatch(opening, /href="\/resume\/"/, "the resume exit belongs lower on HOME, not in the opening");

  assertOrder(main, [
    'class="hero-role-family"',
    'id="hero-title"',
    'class="arch-field"',
    'class="flagship-stage"',
  ]);
});

test("HOME strengthens Angel's identity and presents RSP as one replaceable genuine proof image", async () => {
  const main = await readHomeMain();
  const header = await readFile(new URL("components/SiteHeader.tsx", root), "utf8");
  const css = await readFile(new URL("app/globals.css", root), "utf8");

  assert.match(header, /className="wordmark"[^>]*>[\s\S]*Angel Vergara/);
  assert.match(css, /\.wordmark\s*\{[^}]*font-size:1\.4rem[^}]*font-weight:600/);
  assert.match(css, /@media \(max-width:620px\)[\s\S]*?\.wordmark\s*\{[^}]*font-size:1\.18rem/);

  const product = main.slice(main.indexOf('class="product-stage"'), main.indexOf('class="home-bridge'));
  assert.match(product, /src="\/images\/rsp\/mark-336\.png"/);
  assert.match(product, /data-evidence-slot="rsp-home-overview"/);
  assert.match(product, /\/images\/rsp\/session-overview\.jpg/);
  assert.equal((product.match(/<img/g) ?? []).length, 2, "RSP stage contains one project mark and exactly one screenshot");
  // The retired placeholder and the three-phone strip must both stay gone.
  assert.doesNotMatch(product, /\/images\/rsp\/(?:session|listings|sold|agent)\.png/);
});

test("homepage is three proof stages then one career bridge, with Loft OS first", async () => {
  const html = await readOutput("index.html");
  const main = await readHomeMain();

  assertOrder(main, [
    'id="hero-title"',
    'class="arch-field"',
    'class="flagship-stage"',
    'id="flagship-title"',
    'class="product-stage"',
    'id="product-title"',
    'id="story-title"',
  ]);

  // Audit repair C: the six-step governance strip is gone from HOME entirely. Governance
  // stays contextual inside the Loft OS case study, where it is explained rather than
  // merely displayed. Reintroducing it here must turn this red.
  assert.doesNotMatch(main, /class="handoff|handoff-flow|Human-gated handoff/);
  assert.doesNotMatch(main, /Request \+ Scope|Specialist work|Closeout follows the human decision/);

  // The interactive demo stays on the case study, not HOME.
  assert.doesNotMatch(html, /id="relay-title"|class="relay-/);

  // Loft OS is the flagship and leads; Resale Scanner Pro is the second stage.
  const loft = main.indexOf('id="flagship-title"');
  const rsp = main.indexOf('id="product-title"');
  assert.ok(loft > -1 && rsp > -1 && loft < rsp, "Loft OS must lead Resale Scanner Pro");
  assert.match(main.slice(loft, rsp), /Loft OS/);
  assert.match(main.slice(rsp), /Resale Scanner Pro/);
  assert.match(main, /<p class="eyebrow light-eyebrow">Flagship work<\/p>/);
  // Only ONE surface may claim flagship. Scope the count to the rendered <main>: Next
  // serialises the same copy into the RSC payload later in the file, so counting the
  // whole document would measure the payload rather than the page.
  const rendered = main.slice(0, main.indexOf("</main>"));
  assert.equal((rendered.match(/Flagship work/g) ?? []).length, 1, "exactly one flagship claim on HOME");

  // Locked stage copy. The Proof Stage deliberately REDUCES copy: the explanatory
  // paragraphs that briefly stood on each stage belong in the case studies, so their
  // absence is pinned rather than left unguarded.
  assert.match(main, /Governed multi-agent workflow system/);
  assert.match(main, /Scoped work\. Independent review\. Verified closeout\./);
  assert.match(main, /Working product\. In operating use\./);
  assert.doesNotMatch(main, /class="stage-note"/);
  assert.doesNotMatch(main, /Specialist agents do the work/);
  assert.doesNotMatch(main, /A mobile workflow for evaluating resale finds/);

  // The first project CTA lives inside the Loft stage.
  const flagship = main.slice(main.indexOf('class="flagship-stage"'), main.indexOf('class="product-stage"'));
  assert.match(flagship, /class="stage-cta"[^>]*href="\/work\/loft-os\/"|href="\/work\/loft-os\/"[^>]*class="stage-cta"/);

  // BUY / MAYBE / PASS keeps its labels and marks. The per-verdict sentences were newly
  // authored with no approved-copy authority behind them and must not be canonised here.
  const verdictBlock = main.slice(main.indexOf('class="verdict-row"'), main.indexOf('class="product-evidence'));
  for (const label of ["Buy", "Maybe", "Pass"]) assert.ok(verdictBlock.includes(`<b>${label}</b>`), `verdict label missing: ${label}`);
  assert.equal((verdictBlock.match(/<svg/g) ?? []).length, 3, "each verdict keeps its mark");
  assert.doesNotMatch(verdictBlock, /Clear value against the evidence|Needs more context before acting|Not worth the capital/);
  assert.doesNotMatch(verdictBlock, /<p>/, "verdicts carry a label and a mark, not sentences");

  // Locked career bridge and its exits.
  assert.match(main, /<h2 id="story-title">Operating reality → systems thinking<\/h2>/);
  assert.match(main, /I learned systems by running the operations they have to support—from kitchens and restaurant leadership to AI workflows and business systems\./);
  assert.match(main, /href="\/about\/"/);
  assert.match(main, /href="\/work\/"/);
  assert.match(main, /href="mailto:avergara13@me\.com"/);
});

test("HOME ships no concept evidence and no unsupported identity metadata", async () => {
  const html = await readOutput("index.html");

  // The Canva concept carried invented RSP figures and a different contact identity.
  // None of it is canonical, and none of it may ship.
  for (const banned of ["Nike", "Air Max", "Market Size", "Confidence:", "Profit Potential", "Risk Level", "$110", "hello@angelvergara.com", "Austin"]) {
    assert.ok(!html.includes(banned), `concept evidence must not ship: ${banned}`);
  }
  // The retired concept-only truncation remains unapproved; TSK-973's exact sentence
  // continues through "people can use" and is guarded above.
  assert.doesNotMatch(html, /controlled systems\.<\/h1>/);

  // Audit repair A: the Person schema claimed a jobTitle no held-title authority supports.
  const layout = await readFile(new URL("app/layout.tsx", root), "utf8");
  assert.doesNotMatch(layout, /jobTitle/);
  assert.doesNotMatch(html, /jobTitle/);
  // Positive control — the schema itself is still emitted and still names the person.
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /"name":"Angel Vergara"/);

  // Audit repair D: a hard-coded lastModified asserted a precision the build cannot know.
  const sitemapSource = await readFile(new URL("app/sitemap.ts", root), "utf8");
  assert.doesNotMatch(sitemapSource, /lastModified/);
  const sitemap = await readOutput("sitemap.xml");
  assert.doesNotMatch(sitemap, /<lastmod>/i);
  assert.match(sitemap, /https:\/\/avergara13\.github\.io\//);
});

test("the HOME architectural field is decorative, project-owned, and carries no meaning", async () => {
  const html = await readOutput("index.html");
  const source = await readFile(new URL("components/ArchitecturalField.tsx", root), "utf8");

  // EA unlocked the asset only for an ORIGINAL vector composition. No external image
  // dependency may back the hero, and the SVG must be authored in-repo.
  const heroField = html.slice(html.indexOf('class="arch-field"'), html.indexOf("</section>", html.indexOf('class="arch-field"')));
  assert.match(heroField, /<svg/, "the architectural field must be an inline SVG");
  // url(#…) is an internal gradient reference; only EXTERNAL or raster sources are a
  // licence dependency, so match those rather than every url( token.
  assert.doesNotMatch(heroField, /<img|background-image|url\((?!#)/, "the hero must not depend on a raster or external image");
  assert.match(heroField, /url\(#af-/, "control: the composition does use its own inline gradients");

  // Decorative: hidden from assistive tech, and never given meaning-bearing alt text.
  assert.match(heroField, /aria-hidden="true"/);
  assert.doesNotMatch(heroField, /<title>|aria-label=/);

  // Fixture sanity: the composition is substantial, not an empty placeholder.
  assert.ok((source.match(/<polygon/g) ?? []).length >= 8, "the abstraction should be a real composition");
  assert.match(source, /decorative/i);

  // The Loft lattice is a desktop/tablet explanatory visual only. On phones the locked
  // Loft stage stays compact — mark, title, lede, one CTA — so the lattice is hidden
  // rather than shrunk. Pinned against the phone media block specifically.
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  const phoneBlocks = mediaSegments(css).filter((seg) => seg.max <= 620).map((seg) => seg.body).join("\n");
  assert.ok(phoneBlocks.length > 0, "media scan must find the phone block");
  assert.match(phoneBlocks, /\.flagship-visual\s*\{[^}]*display:\s*none/, "the lattice must be hidden at phone widths");
  // Control: it is still present for desktop/tablet.
  assert.match(css, /\.flagship-visual\s*\{\s*position:relative/, "the lattice remains on wider viewports");

  // And the compact mobile Loft stage keeps its four locked elements.
  const loftHtml = html.slice(html.indexOf('class="flagship-stage"'), html.indexOf('class="product-stage"'));
  assert.match(loftHtml, /class="stage-mark"/);
  assert.match(loftHtml, /id="flagship-title"/);
  assert.match(loftHtml, /Scoped work\. Independent review\. Verified closeout\./);
  assert.match(loftHtml, /class="stage-cta"/);
});

test("the public demo is a curated chooser, never a freeform input", async () => {
  const loft = await readOutput("work/loft-os/index.html");
  const component = await readFile(new URL("components/DecisionRelay.tsx", root), "utf8");

  // Audit repair B: an editable textarea promised that anything typed would be processed.
  // It never was. The capability must be obvious BEFORE the run, not refused after it.
  // Scope the negative assertions to the relay section. Run against the whole page they
  // would fail on any unrelated future form field, which says nothing about whether the
  // demo is still chooser-only — a brittle test that fails for the wrong reason.
  const relayAt = loft.indexOf('id="relay-title"');
  assert.notEqual(relayAt, -1, "fixture sanity: the relay section must be present to scope these checks");
  const relay = loft.slice(relayAt, loft.indexOf("</section>", relayAt));
  assert.doesNotMatch(relay, /<textarea/, "the public demo must not offer a freeform text field");
  assert.doesNotMatch(component, /<textarea/);
  assert.doesNotMatch(loft, /Dump everything here/);

  // The chooser comes first, the loaded example is read-only, and Run is unavailable
  // until an example is chosen.
  assert.match(loft, /Choose a curated example/);
  assert.match(loft, /class="relay-example"/);
  assert.match(loft, /No example selected yet/);
  assert.match(component, /disabled=\{running \|\| !fixtureId\}/);

  // Refinements are presets only — no free-text field implying open-ended replanning.
  // Ban FREEFORM TEXT entry, not every <input>: a hidden or checkbox input says nothing
  // about whether the demo still invites typing, and banning all of them would fail for a
  // reason unrelated to the property this test names.
  const TEXTLIKE = new Set(["text", "search", "email", "url", "tel", "password", "number", "textarea"]);
  const textInputs = [...relay.matchAll(/<input\b[^>]*>/g)].filter((m) => {
    const type = m[0].match(/\btype="([^"]*)"/);
    return !type || TEXTLIKE.has(type[1].toLowerCase()); // an omitted type defaults to text
  });
  assert.deepEqual(textInputs.map((m) => m[0]), [], "the demo must expose no freeform text entry");
  assert.match(component, /These are the refinements this example supports/);

  // Both button clusters must be grouped and named. The presets replaced a labelled text
  // input, so without this they reach assistive tech as an unlabelled set of toggles.
  // The chooser is server-rendered so it is checked in the OUTPUT; the refinements only
  // mount after a run, so they are checked in the SOURCE — asserting them against the
  // rendered HTML would fail for the wrong reason and teach nothing.
  assert.match(loft, /role="group" aria-label="Curated examples"/);
  assert.match(component, /role="group" aria-label="Available refinements"/);
  assert.doesNotMatch(loft, /class="relay-refinement"/, "fixture sanity: the refinement block is not server-rendered, so the source check above is the right layer");
  assert.match(loft, /Curated demonstration · deterministic fixture · not a live autonomous production run\./);
});

// Split a stylesheet into its top-level segment plus each `@media (max-width:N)` block.
// A regex cannot do this reliably — the previous `(?:[^{}]*\\{[^{}]*\\})*` form matched
// none of this file's media blocks, which silently made the prominence check read only
// base rules. Scan braces instead, and assert the scan actually found blocks.
const mediaSegments = (css) => {
  const segments = [{ max: Infinity, body: "" }];
  let i = 0, base = "";
  while (i < css.length) {
    const at = css.indexOf("@media", i);
    if (at === -1) { base += css.slice(i); break; }
    base += css.slice(i, at);
    const open = css.indexOf("{", at);
    let depth = 0, end = open;
    for (; end < css.length; end++) {
      if (css[end] === "{") depth++;
      else if (css[end] === "}") { depth--; if (depth === 0) { end++; break; } }
    }
    const condition = css.slice(at, open);
    const maxWidth = condition.match(/max-width:\s*(\d+)px/);
    // Only a PLAIN `(max-width: N px)` block participates. The earlier form skipped just
    // `min-width`, so `screen and (max-width: …)` would have been folded in despite the
    // comment claiming compound conditions were excluded. Match the whole condition.
    if (maxWidth && /^@media\s*\(\s*max-width:\s*\d+px\s*\)\s*$/.test(condition.trim())) {
      segments.push({ max: Number.parseInt(maxWidth[1], 10), body: css.slice(open + 1, end - 1) });
    }
    i = end;
  }
  segments[0].body = base;
  return segments;
};

test("no stylesheet rule has lost a selector separator", async () => {
  // This pass broke a selector list twice by editing shared rules: once leaving a dangling
  // continuation with no body, and once dropping the comma after `.resume-card`, which
  // silently turned the list into a descendant selector and stripped the Loft OS demo
  // panel of its surface styling. Nothing in the suite could see either — both were caught
  // by human/agent review. CSS fails silently by design, so the structure is pinned here.
  const css = await readFile(new URL("app/globals.css", root), "utf8");

  // Strip comments so prose inside them cannot be mistaken for a selector.
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, "");

  const offenders = [];
  let cursor = 0;
  while (true) {
    const brace = clean.indexOf("{", cursor);
    if (brace === -1) break;
    // A selector starts after the previous rule's brace OR after a statement's semicolon
    // (`@import "…";`), otherwise that statement is read as part of the next selector.
    const prevEnd = Math.max(
      clean.lastIndexOf("}", brace),
      clean.lastIndexOf("{", brace - 1),
      clean.lastIndexOf(";", brace),
    );
    const selector = clean.slice(prevEnd + 1, brace);
    cursor = brace + 1;
    // Skip at-rule preludes and keyframe steps. Keyframe selectors are percentages OR the
    // keywords `from` / `to`; matching only digits would read a future `from {` as a
    // selector and report a phantom missing comma.
    if (/@media|@supports|@keyframes|@font-face/.test(selector)) continue;
    if (/^\s*(?:-?\d|from\b|to\b)/.test(selector.trim())) continue;
    const lines = selector.split("\n").map((l) => l.trim()).filter(Boolean);
    // In this file's convention a multi-line selector list is comma-separated, so every
    // line but the last must end with a comma. An interior line that does not is a lost
    // separator, which silently becomes a descendant combinator.
    for (let i = 0; i < lines.length - 1; i++) {
      if (!lines[i].endsWith(",")) offenders.push(`${lines[i]} ⟶ ${lines[i + 1]}`);
    }
  }

  assert.deepEqual(offenders, [], "a multi-line selector list is missing a separator (this silently becomes a descendant selector)");

  // Fixture sanity: the scan must actually be looking at multi-line selector lists.
  const multiLine = clean.split("\n").filter((l) => l.trim().endsWith(",") && !l.includes("{")).length;
  assert.ok(multiLine >= 5, `expected several multi-line selector lists to scan, found ${multiLine}`);

  // Controls: the scan must tolerate keyframe keywords AND still catch a real omission.
  const withKeyframes = `${clean}\n@keyframes probe { from { opacity:0; } to { opacity:1; } }`;
  const scanFor = (text) => {
    const found = [];
    let at = 0;
    while (true) {
      const brace = text.indexOf("{", at);
      if (brace === -1) break;
      const prev = Math.max(text.lastIndexOf("}", brace), text.lastIndexOf("{", brace - 1), text.lastIndexOf(";", brace));
      const sel = text.slice(prev + 1, brace);
      at = brace + 1;
      if (/@media|@supports|@keyframes|@font-face/.test(sel)) continue;
      if (/^\s*(?:-?\d|from\b|to\b)/.test(sel.trim())) continue;
      const ls = sel.split("\n").map((l) => l.trim()).filter(Boolean);
      for (let i = 0; i < ls.length - 1; i++) if (!ls[i].endsWith(",")) found.push(ls[i]);
    }
    return found;
  };
  assert.deepEqual(scanFor(withKeyframes), [], "a keyframes block with from/to must not be read as selectors");
  assert.ok(scanFor(`${clean}\n.a,\n.b\n.c { color:red; }`).length > 0, "control: the scan must still catch a real missing separator");

  // And braces must balance — the other way an edit to a shared rule fails silently.
  assert.equal((clean.match(/\{/g) ?? []).length, (clean.match(/\}/g) ?? []).length, "unbalanced braces in the stylesheet");
});

test("homepage visual prominence follows the intended ranking at every width", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");

  // Sizes that scale with vw must be compared AT THE SAME WIDTH, and the comparison has
  // to respect breakpoint overrides: the lock floors the stage headings on phones
  // precisely because a fluid h1 and a fixed-floor h2 converged at 390 and inverted the
  // page. Parsing only the base rule would have declared that inversion safe.
  const segments = mediaSegments(css);
  // Harness control: if the scan finds no phone block the comparison below silently
  // degrades to base-rule-only, which is exactly how the 390px inversion slipped through.
  assert.ok(segments.some((seg) => seg.max <= 620), "media scan must find the phone block");

  const sizeAt = (selector, width) => {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let value = null;
    for (const seg of segments) {
      if (width > seg.max) continue;
      for (const rule of seg.body.matchAll(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, "g"))) {
        const found = rule[1].match(/font-size\s*:\s*([^;]+)/);
        if (found) value = found[1].trim();
      }
    }
    assert.ok(value, `${selector} declares no font-size applicable at ${width}px`);
    const clamped = value.match(/^clamp\(\s*([\d.]+)rem\s*,\s*([\d.]+)vw\s*,\s*([\d.]+)rem\s*\)$/);
    if (clamped) {
      const [, lo, vw, hi] = clamped.map(Number.parseFloat);
      return Math.min(Math.max(lo * 16, (vw / 100) * width), hi * 16);
    }
    const rem = value.match(/^([\d.]+)rem$/);
    assert.ok(rem, `${selector}: unsupported font-size form ${value}`);
    return Number.parseFloat(rem[1]) * 16;
  };

  // A rank gap has to be SEEN, not merely satisfied numerically.
  const STEP = 1.12;
  // Sampling only the five acceptance widths left the 621-767 band unchecked, and that is
  // exactly where a breakpoint boundary put the h1 within 2% of the flagship title. Sample
  // just inside every boundary and across the gaps between the acceptance widths.
  for (const width of [1440, 1200, 1024, 961, 960, 900, 800, 768, 720, 700, 680, 640, 621, 620, 600, 520, 470, 430, 414, 390, 360]) {
    const h1 = sizeAt(".proof-hero h1", width);
    const flagship = sizeAt(".flagship-copy h2", width);
    const product = sizeAt(".stage-head h2", width);
    const bridge = sizeAt(".home-bridge h2", width);

    assert.ok(h1 >= flagship * STEP, `at ${width}px the value proposition (${h1}px) must visibly out-rank the flagship stage (${flagship}px)`);
    assert.ok(flagship >= product, `at ${width}px the flagship stage (${flagship}px) must not be out-ranked by the product stage (${product}px)`);
    assert.ok(product >= bridge * STEP, `at ${width}px the product stage (${product}px) must visibly out-rank the career bridge (${bridge}px)`);
  }

  // Control: the phone override must actually be the value used at 390. Reading the base
  // rule there would report 33.6px for the flagship heading instead of the 27.2px the
  // override sets — the precise blindness that let the inversion look safe.
  assert.ok(sizeAt(".flagship-copy h2", 390) < 30, "the 390px flagship size must come from the phone override, not the base rule");
  assert.ok(sizeAt(".flagship-copy h2", 1440) > 40, "the desktop flagship size must come from the base rule");

  // Continuity across every breakpoint boundary. A band can satisfy the ranking on both
  // sides and still drop the heading off a cliff at the boundary itself: at 621 the h1
  // fell 41.6 -> 34.4px in a single pixel because the wider band floored LOWER than the
  // narrower one. Ranking checks alone cannot see that.
  // Guarding only the h1 left the same collision live on two other headings: the product
  // stage and the career bridge each got SMALLER as the viewport grew past 620, because
  // their phone caps exceeded the wider band's floor. Every heading is checked.
  for (const [below, above] of [[620, 621], [960, 961]]) {
    for (const selector of [".proof-hero h1", ".flagship-copy h2", ".stage-head h2", ".home-bridge h2"]) {
      const before = sizeAt(selector, below);
      const after = sizeAt(selector, above);
      const drop = (before - after) / before;
      assert.ok(drop <= 0.05, `${selector} drops ${(drop * 100).toFixed(1)}% across ${below}->${above}px; no heading may step DOWN as the viewport grows`);
    }
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
  // The demo used to warn that custom input is not processed. With the chooser-only
  // surface there is nothing to type, so that warning now contradicts the panel's own
  // copy and its branch is unreachable. Pin the INVARIANT instead of the dead message.
  assert.doesNotMatch(contract, /Custom input is not processed/);
  assert.match(component, /if \(!fixtureId\) return;/, "runDemo must still refuse without a chosen fixture");
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

// Rendered text with tags stripped and the entities React emits decoded, so an
// assertion can compare against the generator's own strings rather than against a
// hand-copied HTML-escaped duplicate of them.
const decodeEntities = (value) => value
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
  .replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&");
const visibleText = (html) => decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

test("hiring route is retired: no artifact, no inbound link, no redirect or stub", async () => {
  // /hiring/ was a static filesystem route, so retirement means app/hiring/ is deleted
  // and the export emits nothing for the path. This is the same OUTCOME as the Office
  // Chef retirement (genuine 404, never a redirect or stub) by a different mechanism:
  // that one filters a dynamic slug out of generateStaticParams.
  await assert.rejects(access(new URL("app/hiring/page.tsx", root)), undefined, "app/hiring/page.tsx must not exist");
  await assert.rejects(access(new URL("out/hiring/index.html", root)), undefined, "out/hiring/index.html must not exist");
  await assert.rejects(access(new URL("public/og-hiring.png", root)), undefined, "the orphaned hiring OG asset must not remain");
  await assert.rejects(access(new URL("out/og-hiring.png", root)), undefined, "the orphaned hiring OG asset must not ship");

  // The genuine 404 depends on this artifact existing; without it Pages would fall
  // back to its own generic page and the retirement claim would be untested.
  await access(new URL("out/404.html", root));

  // Zero internal inbound links or asset references, across every emitted page.
  const routes = [
    "index.html", "work/index.html", "about/index.html", "lab/index.html",
    "resume/index.html", "404.html", "work/loft-os/index.html",
    "work/resale-scanner-pro/index.html", "work/sous-chef/index.html",
    "work/assistant-recruiter-pro/index.html",
  ];
  for (const route of routes) {
    const html = await readOutput(route);
    assert.doesNotMatch(html, /href="\/hiring\/?"/, `${route} still links to /hiring/`);
    assert.doesNotMatch(html, /og-hiring\.png/, `${route} still references the hiring OG asset`);
  }

  const sitemap = await readOutput("sitemap.xml");
  assert.doesNotMatch(sitemap, /\/hiring\//, "a retired route must not be advertised to crawlers");
});

test("resume is the one canonical recruiter surface: readable record, single download, no variant choice", async () => {
  const html = await readOutput("resume/index.html");
  const mainAt = html.indexOf('<main id="main"');
  assert.notEqual(mainAt, -1, "resume <main> landmark is missing");
  const main = html.slice(mainAt, html.indexOf("</main>", mainAt));
  const text = visibleText(main);

  // 1. The General Resume is READABLE as HTML, not merely downloadable. Every field the
  // generator emits must appear in the rendered page, so a stub or a partially wired
  // render cannot pass. Fixture sanity first: an empty artifact would satisfy the loops.
  const data = JSON.parse(await readFile(new URL("app/resume/general-resume.json", root), "utf8"));
  assert.ok(data.profile.length > 200, "fixture sanity: profile should be substantial");
  assert.ok(data.strengths.length >= 8 && data.experience.length >= 4 && data.projects.length >= 4 && data.education.length >= 3 && data.tools.length >= 8, "fixture sanity: the artifact should carry a full record");

  assert.ok(text.includes(data.profile), "the General Resume profile must render in the page");
  for (const item of data.strengths) assert.ok(text.includes(item), `core strength must render: ${item}`);
  for (const tool of data.tools) assert.ok(text.includes(tool), `tool must render: ${tool}`);
  for (const project of data.projects) {
    assert.ok(text.includes(project.name), `project must render: ${project.name}`);
    assert.ok(text.includes(project.summary), `project summary must render: ${project.name}`);
  }
  for (const role of data.experience) {
    assert.ok(text.includes(role.organization), `experience must render: ${role.organization}`);
    for (const line of role.bullets) assert.ok(text.includes(line), `experience bullet must render under ${role.organization}`);
  }
  for (const entry of data.education) assert.ok(text.includes(entry.institution), `education must render: ${entry.institution}`);

  // 2. Exactly ONE download, and it is the General Resume.
  const downloads = main.match(/href="\/downloads\/[^"]+"/g) ?? [];
  assert.deepEqual(downloads, ['href="/downloads/Angel_Vergara_Resume_General.pdf"'], "the recruiter surface offers exactly one resume download");

  // 3. The three targeted variants are absent from recruiter choice architecture.
  for (const file of [
    "Angel_Vergara_Resume_Implementation_Onboarding.pdf",
    "Angel_Vergara_Resume_Business_Systems_Operations.pdf",
    "Angel_Vergara_Resume_AI_Workflow_Automation.pdf",
  ]) {
    assert.ok(!html.includes(file), `${file} must not be offered as a recruiter choice`);
  }
  assert.doesNotMatch(html, /Targeted versions|Compare resume versions|The General Resume is the baseline\.|Best for/i);

  // 4. The four approved role-fit lanes survive concisely -- as context, never as cards,
  // CTAs or downloads, and never as claims of held titles.
  const fitAt = main.indexOf('class="fit-list"');
  assert.notEqual(fitAt, -1, "the role-fit lanes are missing");
  const fitBlock = main.slice(fitAt, main.indexOf("</section>", fitAt));
  for (const lane of ["AI Workflow & Automation", "Systems Implementation", "Business Systems & Operations", "Hospitality Technology"]) {
    assert.ok(visibleText(fitBlock).includes(lane), `approved role-fit lane missing: ${lane}`);
  }
  assert.doesNotMatch(fitBlock, /<a[\s>]/, "role-fit lanes must not become links, CTAs, or downloads");
  assert.match(main, /These are role-fit lanes, not claims of prior paid titles\./);

  // 5. Direct exits, and no Resume -> Hiring edge.
  assert.match(main, /href="\/work\/"/);
  assert.match(main, /href="mailto:avergara13@me\.com"/);
  assert.doesNotMatch(html, /href="\/hiring\/?"/);

  // 6. Privacy: the resume PDFs carry a phone number and city; the public HTML must not.
  // The institution name is the positive control proving this sweep sees real content.
  assert.match(html, /Florida International University/);
  assert.doesNotMatch(html, /407-432-6959/);
  assert.doesNotMatch(html, /\bOrlando\b|\bDavie\b|\bMassachusetts\b/);
});

test("the committed General Resume artifact matches generator output (single writer)", async () => {
  // The readable HTML and the downloadable PDF must both derive from RESUMES[0]. This
  // re-runs the emitter and fails on any byte difference, so the artifact cannot drift
  // into a second, hand-maintained source of truth. A missing python3 fails the test
  // rather than skipping it -- a skipped control reads as a pass.
  const committed = await readFile(new URL("app/resume/general-resume.json", root), "utf8");
  const emitted = execFileSync("python3", ["scripts/generate_resumes.py", "--emit-json", "--stdout"], {
    cwd: fileURLToPath(root),
    encoding: "utf8",
  });
  assert.ok(emitted.length > 2000, "fixture sanity: the emitter should produce a full document");
  assert.equal(emitted, committed, "app/resume/general-resume.json is stale — run: python3 scripts/generate_resumes.py --emit-json");
  // Control: prove the comparison is capable of failing at all.
  assert.notEqual(emitted.replace("Angel Vergara", "Angel Vergarra"), committed, "control: byte comparison must be able to detect drift");
});

test("the General Resume is mechanically RESUMES[0], and the artifact says so truthfully", async () => {
  // The artifact records its provenance as "RESUMES[0] / <file>", and the page comment,
  // the generator header and design-qa all repeat that claim. Selecting the resume by
  // filename would keep working after a reorder and quietly turn every one of those into
  // a false statement about where the published content came from. So index 0 is used
  // directly, its identity is asserted, and the provenance string is derived from the
  // object actually used rather than hand-typed beside it.
  const data = JSON.parse(await readFile(new URL("app/resume/general-resume.json", root), "utf8"));
  assert.equal(data.pdf, "Angel_Vergara_Resume_General.pdf");
  assert.equal(data.source, `RESUMES[0] / ${data.pdf}`, "recorded provenance must name index 0 and the file actually used");

  // The page must download the very file the artifact names — provenance that disagrees
  // with what a recruiter receives would be worse than no provenance at all.
  const html = await readOutput("resume/index.html");
  assert.ok(html.includes(`href="/downloads/${data.pdf}"`), "the page must offer the file the artifact names");

  // Executable control: reorder RESUMES in a throwaway copy and the generator must refuse.
  const dir = mkdtempSync(join(tmpdir(), "resume-order-"));
  try {
    mkdirSync(join(dir, "scripts"));
    const source = await readFile(new URL("scripts/generate_resumes.py", root), "utf8");
    const anchor = 'if __name__ == "__main__":';
    assert.ok(source.includes(anchor), "fixture sanity: generator entry point not found");

    // Positive control FIRST: an unmodified copy in the same temp harness must succeed,
    // so a failure below is attributable to the reorder and not to the copy itself.
    const clean = join(dir, "scripts", "clean.py");
    writeFileSync(clean, source);
    const ok = execFileSync("python3", [clean, "--emit-json", "--stdout"], { encoding: "utf8" });
    assert.ok(ok.includes('"source": "RESUMES[0]'), "control: an unmodified copy must emit normally");

    const reordered = join(dir, "scripts", "reordered.py");
    writeFileSync(reordered, source.replace(anchor, `RESUMES.reverse()\n\n${anchor}`));
    let threw = false;
    let message = "";
    try {
      execFileSync("python3", [reordered, "--emit-json", "--stdout"], { encoding: "utf8", stdio: "pipe" });
    } catch (error) {
      threw = true;
      message = `${error.stderr ?? ""}${error.stdout ?? ""}`;
    }
    assert.ok(threw, "the generator must refuse when the General Resume is not RESUMES[0]");
    assert.match(message, /RESUMES\[0\] is/, "the refusal must name the index-0 invariant");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("the production build path refuses to publish a stale resume artifact", async () => {
  // The drift test above proves the artifact CAN be checked. This proves the check is
  // actually WIRED to the path that produces publishable output -- a gate nothing calls
  // is capability, not enforcement. Pinning the wiring here means a future edit cannot
  // silently unhook it and still ship green.
  const pkg = JSON.parse(await readFile(new URL("package.json", root), "utf8"));
  const verify = pkg.scripts["verify:resume-artifact"];
  assert.ok(verify, "verify:resume-artifact script is missing");
  assert.match(verify, /generate_resumes\.py/, "the verification must invoke the generator");
  assert.match(verify, /--check/, "the verification must be the verify-only mode, never a silent rewrite");
  assert.doesNotMatch(verify, /--stdout/, "the gate must compare the committed artifact, not print to stdout");

  // Every build entry point must pass through the gate before next build runs. Resolve
  // one level of npm indirection so "build:pages": "npm run build" still counts.
  const resolve = (name, depth = 0) => {
    const body = pkg.scripts[name] ?? "";
    if (depth > 3) return body;
    return body.replace(/npm run ([\w:-]+)/g, (_, ref) => resolve(ref, depth + 1));
  };
  for (const entry of ["build", "build:pages"]) {
    const resolved = resolve(entry);
    assert.match(resolved, /generate_resumes\.py[^&|]*--check/, `${entry} must run the artifact gate`);
    const gateAt = resolved.indexOf("--check");
    const buildAt = resolved.indexOf("next build");
    assert.notEqual(buildAt, -1, `${entry} must actually build`);
    assert.ok(gateAt < buildAt, `${entry} must gate BEFORE building, not after`);
    assert.match(resolved.slice(gateAt, buildAt), /&&/, `${entry} must fail closed: chain the gate with &&, never ; or ||`);
  }
});

test("the resume social card does not advertise the retired variant choice", async () => {
  // The OG card is the pre-click impression when /resume/ is shared. It previously read
  // "RESUME SUITE / One career. Three clear views." and named all three targeted lanes --
  // exactly the choice architecture this pass removed. The HTML sweep could not catch it
  // because the claim lives in a PNG, so the card's writer is pinned here instead.
  const cards = await readFile(new URL("scripts/generate_og_images.swift", root), "utf8");
  const line = cards.split("\n").find((l) => l.includes('filename: "og-resume.png"'));
  assert.ok(line, "the og-resume card definition is missing");

  assert.doesNotMatch(line, /RESUME SUITE|Three clear views/i, "the card must not sell a resume suite");
  for (const lane of ["Implementation & Onboarding", "Business Systems & Operations", "AI Workflow & Automation"]) {
    assert.ok(!line.includes(lane), `the card must not name the retired variant: ${lane}`);
  }
  // Positive control: the definition still exists and still carries real copy, so this
  // cannot pass by deleting the card.
  assert.match(line, /title: "[^"]{12,}"/);
  assert.match(line, /subtitle: "[^"]{12,}"/);

  // The generator must not define a card for the retired route either: running it would
  // recreate public/og-hiring.png byte-for-byte and undo the asset retirement two other
  // tests pin. og-office-chef stays on purpose -- that concept still ships on /lab/.
  assert.ok(!cards.includes('filename: "og-hiring.png"'), "the generator must not recreate the retired hiring card");
  assert.ok(cards.includes('filename: "og-office-chef.png"'), "control: the Office Chef card is deliberately retained");

  // And the asset the page actually references is still shipped.
  const html = await readOutput("resume/index.html");
  assert.match(html, /og-resume\.png/);
  await access(new URL("out/og-resume.png", root));
});

test("resume experience entries never render an empty metadata element", async () => {
  const html = await readOutput("resume/index.html");
  const data = JSON.parse(await readFile(new URL("app/resume/general-resume.json", root), "utf8"));

  // Fixture sanity: this guard is only meaningful while the record actually contains an
  // entry with neither a role nor dates. If that stops being true, this test is inert
  // and should be revisited rather than silently passing.
  const bare = data.experience.filter((role) => !role.role && role.dates.length === 0);
  const withMeta = data.experience.filter((role) => role.role || role.dates.length > 0);
  assert.ok(bare.length >= 1, "fixture sanity: expected an entry with no role and no dates");
  assert.ok(withMeta.length >= 1, "fixture sanity: expected entries that DO carry metadata");

  assert.doesNotMatch(html, /<p class="resume-role-meta">\s*<\/p>/, "an entry with no metadata must render no metadata element");

  // Positive control: the element is still emitted for entries that do have metadata, so
  // this cannot pass by removing the line entirely.
  const metas = html.match(/<p class="resume-role-meta">/g) ?? [];
  assert.equal(metas.length, withMeta.length, "one metadata line per entry that has metadata, and no more");
});

test("metadata and footer language align with applied AI workflows positioning", async () => {
  const home = await readOutput("index.html");
  const resume = await readOutput("resume/index.html");

  assert.match(home, /AI workflows and business systems/i);
  assert.match(home, /Email →/);
  assert.match(home, /LinkedIn ↗/);
  assert.match(home, /GitHub ↗/);
  assert.match(resume, /og-resume\.png/);

  const layoutSource = await readFile(new URL("app/layout.tsx", root), "utf8");
  // TSK-970 audit repair A retired the Person schema's jobTitle: no held-title authority
  // supported it. The positioning it used to carry lives in the page metadata instead,
  // which is asserted above, so this now pins the ABSENCE.
  assert.doesNotMatch(layoutSource, /jobTitle/);
  assert.doesNotMatch(layoutSource, /Hospitality Operations Leader & Systems Builder/);
  assert.match(layoutSource, /"@type": "Person"/);
});

test("claim-boundary and privacy scan passes across recruiter-facing routes", async () => {
  const pages = await Promise.all([
    readOutput("index.html"),
    readOutput("work/index.html"),
    readOutput("about/index.html"),
    readOutput("lab/index.html"),
    readOutput("resume/index.html"),
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
  assert.match(sitemap, /https:\/\/avergara13\.github\.io\/resume\//);
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

// ── TSK-974: RSP evidence spread ──────────────────────────────────────────────
// The published captures are the case study's actual argument, so the contract worth
// pinning is about EVIDENCE, not layout: which captures ship, in what narrative order,
// that each one is described, and that the defective/identifying captures never leak.

// A Next static export repeats every image path three times: a <head> preload for the
// priority image, the real <img>, and the RSC flight payload inside a <script>. Only the
// rendered markup is the contract, so scripts are stripped before anything is asserted.
const readRspMain = async () => {
  const html = await readOutput("work/resale-scanner-pro/index.html");
  const markup = html.replace(/<script[\s\S]*?<\/script>/g, "");
  const at = markup.indexOf('<main id="main"');
  assert.notEqual(at, -1, "RSP case study <main> landmark is missing");
  const end = markup.indexOf("</main>", at);
  assert.notEqual(end, -1, "RSP case study <main> is never closed");
  return markup.slice(at, end);
};

const rspEvidenceOrder = [
  "/images/rsp/session-overview.jpg",
  "/images/rsp/capture-ai-lens.jpg",
  "/images/rsp/analysis-buy.jpg",
  "/images/rsp/decision-pass.jpg",
  "/images/rsp/listing-preparation.jpg",
  "/images/rsp/agent-scans.jpg",
  "/images/rsp/agent-recap.jpg",
];

test("RSP case study tells the evidence story in capability order, once each", async () => {
  const main = await readRspMain();

  // capture -> analysis -> decision -> listing -> agent support. Each marker must also be
  // unique, so a duplicated screenshot cannot satisfy the ordering claim.
  assertOrder(main, rspEvidenceOrder);

  // The retired three-phone strip and its placeholder assets stay retired.
  assert.doesNotMatch(main, /\/images\/rsp\/(?:session|listings|sold|agent)\.png/);
  assert.doesNotMatch(main, /class="case-screens"/);

  const frames = main.match(/class="rsp-proof-frame/g) ?? [];
  assert.equal(frames.length, rspEvidenceOrder.length, "every evidence frame is accounted for");
});

test("every published RSP capture carries alt text and a caption", async () => {
  const main = await readRspMain();

  // Parse the figures FIRST, then ask which one owns each image. Locating the nearest
  // <figure> around an offset instead let an <img> that sits OUTSIDE any figure borrow the
  // neighbouring figure's alt and caption, so an image with no alt at all passed.
  const figures = [...main.matchAll(/<figure class="rsp-proof-frame[^"]*">([\s\S]*?)<\/figure>/g)].map((m) => m[1]);
  assert.equal(figures.length, rspEvidenceOrder.length, "every evidence frame is accounted for");
  const inside = figures.join("");

  for (const src of rspEvidenceOrder) {
    const owning = figures.filter((body) => body.includes(src));
    assert.equal(owning.length, 1, `exactly one evidence figure must contain ${src}`);
    const [frame] = owning;
    assert.equal((frame.match(/<img/g) ?? []).length, 1, `one image per evidence figure: ${src}`);
    const alt = frame.match(/alt="([^"]*)"/);
    assert.ok(alt && alt[1].trim().length > 20, `evidence image needs descriptive alt: ${src}`);
    assert.match(frame, /<figcaption>/, `evidence image needs a caption: ${src}`);

    // An evidence image may not render anywhere except inside its frame.
    const needle = new RegExp(src.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    assert.equal((main.match(needle) ?? []).length, (inside.match(needle) ?? []).length,
      `${src} must appear only inside an evidence figure`);
  }
});

test("RSP evidence frames are never cropped, so a caption cannot outrun the image", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");

  // Reading only the FIRST `.rsp-proof-frame img` rule made this guard decorative: a crop
  // introduced by a media override, a more specific selector, a later duplicate, or a fixed
  // height on the frame (which crops through the frame's own overflow:hidden without naming
  // object-fit at all) all passed, while a harmless reformat failed. Scan every segment and
  // every rule that touches an evidence frame instead.
  const segments = mediaSegments(css);
  assert.ok(segments.some((seg) => seg.max <= 900), "media scan must find the single-column block");

  let sawRatio = false;
  for (const seg of segments) {
    for (const [, selector, body] of seg.body.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
      if (!selector.includes("rsp-proof-")) continue;
      const where = `${selector.trim()} (max-width:${seg.max})`;

      const fit = body.match(/object-fit\s*:\s*([\w-]+)/);
      assert.ok(!fit || fit[1] === "fill", `evidence frame must not crop — ${where} sets object-fit:${fit?.[1]}`);

      // `line-height` must not be mistaken for `height`, hence the boundary before the prop.
      for (const prop of ["height", "max-height"]) {
        const found = body.match(new RegExp(`(?:^|[;{\\s])${prop}\\s*:\\s*([^;]+)`));
        const value = found?.[1].trim();
        assert.ok(!value || value === "auto" || value === "none",
          `evidence frame must not clamp ${prop} — ${where} sets ${prop}:${value}`);
      }

      const ratio = body.match(/aspect-ratio\s*:\s*([\d.]+)\s*\/\s*([\d.]+)/);
      if (ratio) {
        sawRatio = true;
        // Compare numerically: an equivalent ratio or a reformat is not a defect.
        assert.ok(Math.abs(Number(ratio[1]) / Number(ratio[2]) - 900 / 1950) < 1e-6,
          `evidence frames must keep the capture's own ratio — ${where} sets ${ratio[1]}/${ratio[2]}`);
      }
    }
  }
  // Harness control: without this, a scan that matched nothing would pass vacuously.
  assert.ok(sawRatio, "scan found no aspect-ratio rule for an evidence frame — it is not reading the stylesheet");
});

test("withheld RSP captures never reach the public build", async () => {
  // IMG_0550 exposes an order identifier and a ZIP; IMG_0527 renders "Invalid Date".
  // Enforcement is by CONTENT, not by name: a filename check let the same bytes through as
  // `recent-sales.jpg`, or from a subdirectory `readdir` never descended into.
  const { readdir } = await import("node:fs/promises");
  const { createHash } = await import("node:crypto");

  const provenance = await readFile(new URL("rsp-evidence-provenance.md", root), "utf8");
  const published = new Set([...provenance.matchAll(/\|\s*`[a-z0-9-]+\.jpg`\s*\|[^|]*\|[^|]*\|\s*`([0-9a-f]{32})`\s*\|/g)].map((m) => m[1]));
  // Scope to the withheld table: the published table also names an IMG_ source per row, and
  // a document-wide scan swept all seven originals in as if they were withheld.
  const withheldSection = provenance.slice(provenance.indexOf("## Withheld captures"));
  assert.ok(withheldSection.length > 0, "provenance is missing its withheld-captures section");
  const withheld = new Map([...withheldSection.matchAll(/\|\s*`(IMG_\d+\.jpg)`\s*\|\s*`([0-9a-f]{32})`\s*\|/g)].map((m) => [m[2], m[1]]));
  // Harness control: a table this scan failed to read would make every assertion below vacuous.
  assert.equal(published.size, 7, "provenance must list an md5 for all 7 published derivatives");
  assert.equal(withheld.size, 2, "provenance must list an md5 for both withheld captures");

  const walk = async (dir) => {
    const found = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const child = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, dir);
      if (entry.isDirectory()) found.push(...await walk(child));
      else found.push(child);
    }
    return found;
  };

  for (const base of ["public/", "out/"]) {
    for (const file of await walk(new URL(base, root))) {
      const path = decodeURIComponent(file.pathname);
      const name = path.split("/").pop();
      assert.doesNotMatch(name, /^IMG_/i, `raw camera-roll capture must not ship: ${base}…/${name}`);

      const bytes = await readFile(file);
      const md5 = createHash("md5").update(bytes).digest("hex");
      assert.ok(!withheld.has(md5), `withheld capture ${withheld.get(md5)} is published as ${base}…/${name}`);

      // Allowlist: every evidence binary must be one this table vouches for.
      if (/images\/rsp\/.+\.jpe?g$/i.test(path)) {
        assert.ok(published.has(md5), `unvouched evidence binary ${base}…/${name} (md5 ${md5}) — add it to rsp-evidence-provenance.md or remove it`);
      }
    }
  }

  const pages = (await walk(new URL("out/", root))).filter((f) => f.pathname.endsWith(".html"));
  assert.ok(pages.length > 5, "export should contain several HTML pages");
  for (const page of pages) {
    const html = await readFile(page, "utf8");
    for (const name of withheld.values()) {
      assert.ok(!html.includes(name.replace(/\.jpg$/, "")), `withheld capture referenced in ${page.pathname}: ${name}`);
    }
  }
});

test("RSP captions claim only what the captures show", async () => {
  const main = await readRspMain();

  // No supplied capture proves QR scanning, autonomous purchase, autonomous publication,
  // customers, or guaranteed return. None of those may appear as a claim.
  for (const banned of [/\bQR\b/, /automatically (?:buys|purchases|lists|publishes)/i,
    /guaranteed (?:profit|return)/i, /\bcustomers\b/i, /on your behalf/i]) {
    assert.doesNotMatch(main, banned, `unsupported claim in RSP case study: ${banned}`);
  }

  // The stopping rule is the page's core claim and must stay stated.
  assert.match(main, /does not publish or purchase anything/);
});
