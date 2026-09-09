import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArchitecturalField } from "@/components/ArchitecturalField";
import { SystemsLattice } from "@/components/SystemsLattice";

export const metadata: Metadata = {
  title: "Angel Vergara — AI Workflows & Business Systems",
  description: "I turn messy operations into clear, controlled systems people can use.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: "Angel Vergara — AI workflows and business systems", description: "Practical AI-assisted workflows, business systems, and implementation proof.", images: [{ url: "/og-home.png", width: 1200, height: 630, alt: "Angel Vergara — AI workflows and business systems." }] },
  twitter: { card: "summary_large_image", title: "Angel Vergara — AI workflows and business systems", description: "Practical AI-assisted workflows, business systems, and implementation proof.", images: ["/og-home.png"] },
};

// TSK-970: the Proof Stage. HOME is an editorial opening, the Loft OS flagship
// interruption, then the two working-product stages — Resale Scanner Pro and Sous Chef —
// followed by one compact career bridge. The six-step governance strip is gone from HOME
// entirely; governance stays contextual inside the Loft OS case study, where it can be
// explained rather than merely displayed.
//
// Sous Chef sits directly below RSP and reuses .product-stage, .stage-head and
// .product-evidence-slot VERBATIM, so the two products carry identical heading prominence
// and identical evidence framing at every width — the parity is structural rather than a
// hand-tuned size, and the ranking test measures the one shared selector. Only the surface
// differs: a warm culinary stage (.sous-stage) against RSP's white.
//
// The capture is the recipe library — a genuine current product screen, chosen because the
// homepage stage should lead with the food rather than with a dashboard. Recorded in
// sous-chef-evidence-provenance.md. It replaces two binaries that were live on this site
// showing the SIGN-IN screen while the alt text called them the culinary workspace.
// The stage carries no caption by design, exactly as RSP's does not, so the alt text is
// the only description a screen reader gets and is asserted by the test suite.

// RSP's own decision vocabulary, already carried by the case study ("BUY / MAYBE / PASS
// judgment"). Labels and mark only: the per-verdict explanatory sentences that briefly
// stood here were newly authored, and no approved-copy authority covers them, so they are
// not canonised on a public surface. Meaning belongs in the case study.
type VerdictKind = "buy" | "maybe" | "pass";

const verdicts: { key: VerdictKind; label: string }[] = [
  { key: "buy", label: "Buy" },
  { key: "maybe", label: "Maybe" },
  { key: "pass", label: "Pass" },
];

// Typed to the three real variants: as `string` a typo compiled fine and rendered an
// empty <svg>, so a mislabelled verdict would have shipped with no mark at all.
function VerdictMark({ kind }: { kind: VerdictKind }) {
  return (
    <svg viewBox="0 0 44 44" className="verdict-mark" role="presentation" aria-hidden="true" focusable="false">
      {kind === "buy" && (
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
          <path d="M6 15V8h7M38 15V8h-7M6 29v7h7M38 29v7h-7" />
          <path d="M14 22h16" />
        </g>
      )}
      {kind === "maybe" && (
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
          <circle cx="22" cy="22" r="15" />
          <path d="M15 19h14M15 26h14" />
        </g>
      )}
      {kind === "pass" && (
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
          <circle cx="22" cy="22" r="15" />
          <path d="M16 16l12 12M28 16L16 28" />
        </g>
      )}
    </svg>
  );
}

export default function Home() {
  return <main id="main" data-section="home">
    <section className="proof-hero" aria-labelledby="hero-title">
      <div className="shell proof-hero-grid">
        <div className="proof-hero-copy">
          {/* TSK-974: each separator binds to the phrase before it and each phrase is
              unbreakable, so a wrap can only fall AFTER a "·" — never starting a line with a
              dangling separator, never splitting a capability. The reading is unchanged:
              "Hospitality Technology · AI Workflow Automation · Systems Implementation · Business Systems". */}
          <p className="hero-role-family">
            <span>Hospitality Technology ·</span> <span>AI Workflow Automation ·</span> <span>Systems Implementation ·</span> <span>Business Systems</span>
          </p>
          <h1 id="hero-title">I turn messy operations into clear, controlled systems people can use.</h1>
        </div>
      </div>
      {/* Decorative only — the copy above carries the meaning. See ArchitecturalField. */}
      <div className="arch-field"><ArchitecturalField /></div>
    </section>

    <section className="flagship-stage" aria-labelledby="flagship-title">
      <div className="shell flagship-grid">
        <div className="flagship-copy">
          <Image className="stage-mark" src="/images/loft-os/logo-336.png" alt="" width={336} height={336} sizes="(max-width:960px) 64px, 56px" />
          <p className="eyebrow light-eyebrow">Flagship work</p>
          <h2 id="flagship-title">Loft OS{" "}<span className="stage-sub">Governed Multi-Agent Workflow System</span></h2>
          <p className="stage-lede">An execution harness for coordinating AI agents, approvals, evidence, and controlled handoffs.</p>
          <Link className="stage-cta" href="/work/loft-os/">View case study <span aria-hidden="true">→</span></Link>
        </div>
        <div className="flagship-visual">
          <SystemsLattice />
        </div>
      </div>
    </section>

    <section className="product-stage" aria-labelledby="product-title">
      <div className="shell product-stage-grid">
        <div className="product-stage-copy">
          <Image className="stage-mark product-stage-mark" src="/images/rsp/mark-336.png" alt="" width={336} height={336} sizes="(max-width:800px) 64px, 72px" />
          <div className="stage-head">
            <p className="eyebrow">Product</p>
            <h2 id="product-title">Resale Scanner Pro</h2>
            <p className="stage-lede">Working product. In operating use.</p>
          </div>

          <ul className="verdict-row">
            {verdicts.map((verdict) => <li key={verdict.key}>
              <span className="verdict-icon"><VerdictMark kind={verdict.key} /></span>
              <b>{verdict.label}</b>
            </li>)}
          </ul>

          <Link className="stage-cta is-ink" href="/work/resale-scanner-pro/">View case study <span aria-hidden="true">→</span></Link>
        </div>

        <figure className="product-evidence-slot" data-evidence-slot="rsp-home-overview">
          <Image
            src="/images/rsp/session-overview.jpg"
            alt="Resale Scanner Pro session overview: an open session showing four scans with two buy, one maybe, and one pass decisions"
            width={900}
            height={1950}
            sizes="(max-width:800px) calc(100vw - 40px), (max-width:1180px) 52vw, 560px"
          />
        </figure>
      </div>
    </section>

    <section className="product-stage sous-stage" aria-labelledby="sous-title">
      <div className="shell product-stage-grid">
        <div className="product-stage-copy">
          {/* Web-delivery derivative of Angel's supplied Sous Chef app icon, generated from
              the canonical original by scripts/generate_mark_derivatives.py. The canonical
              binary is unchanged at /images/sous-chef/mark.jpeg. alt is empty by design:
              the adjacent h2 already names the product, exactly as on the RSP stage. */}
          <Image className="stage-mark product-stage-mark" src="/images/sous-chef/mark-336.png" alt="" width={336} height={336} sizes="(max-width:800px) 64px, 72px" />
          <div className="stage-head">
            <p className="eyebrow">Product</p>
            <h2 id="sous-title">Sous Chef</h2>
            <p className="stage-lede">Working product. Public source.</p>
          </div>

          <ul className="sous-domain-row">
            <li><b>Operator</b><p>Built from running the kitchen.</p></li>
            <li><b>Structured</b><p>The recipe is a record, not a note.</p></li>
            <li><b>Bounded AI</b><p>It proposes. A person accepts.</p></li>
          </ul>

          <Link className="stage-cta is-ink" href="/work/sous-chef/">View case study <span aria-hidden="true">→</span></Link>
        </div>

        <figure className="product-evidence-slot" data-evidence-slot="sous-home-overview">
          <Image
            src="/images/sous-chef/recipe-library.jpg"
            alt="Sous Chef recipe library: full-width photographs of a shrimp and soft-egg noodle bowl and avocado toast, each card carrying the recipe name, its total time, its ingredient count and a locked badge"
            width={900}
            height={1815}
            sizes="(max-width:800px) calc(100vw - 40px), (max-width:1180px) 52vw, 560px"
          />
        </figure>
      </div>
    </section>

    <section className="home-bridge shell" aria-labelledby="story-title">
      <div>
        <h2 id="story-title">Operating reality → systems thinking</h2>
        <p>I learned systems by running the operations they have to support—from kitchens and restaurant leadership to AI workflows and business systems.</p>
      </div>
      <div className="home-exits">
        <Link href="/about/">Read the story <span aria-hidden="true">→</span></Link>
        <Link href="/work/">View portfolio <span aria-hidden="true">→</span></Link>
        <a href="mailto:avergara13@me.com">Contact <span aria-hidden="true">→</span></a>
      </div>
    </section>
  </main>;
}
