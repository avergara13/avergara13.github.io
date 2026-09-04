import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArchitecturalField } from "@/components/ArchitecturalField";
import { SystemsLattice } from "@/components/SystemsLattice";

export const metadata: Metadata = {
  title: "Angel Vergara — AI Workflows & Business Systems",
  description: "I turn messy operating problems into clear, controlled systems people can actually use—governed AI systems, working products, and implementation discipline.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: "Angel Vergara — AI workflows and business systems", description: "Practical AI-assisted workflows, business systems, and implementation proof.", images: [{ url: "/og-home.png", width: 1200, height: 630, alt: "Angel Vergara — AI workflows and business systems." }] },
  twitter: { card: "summary_large_image", title: "Angel Vergara — AI workflows and business systems", description: "Practical AI-assisted workflows, business systems, and implementation proof.", images: ["/og-home.png"] },
};

// TSK-970: the Proof Stage. HOME is now three deliberate stages — an editorial opening,
// the Loft OS flagship interruption, and the Resale Scanner Pro working-product stage —
// followed by one compact career bridge. The six-step governance strip is gone from HOME
// entirely; governance stays contextual inside the Loft OS case study, where it can be
// explained rather than merely displayed.

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

const evidence: { src: string; title: string; note: string; alt?: string }[] = [
  { src: "/images/rsp/session.png", title: "Capture", note: "An item enters the workflow." },
  { src: "/images/rsp/listings.png", title: "Market evidence", note: "Comparable listings are gathered." },
  // The Sold tab ships as an empty state. It shows where completed sales land, not what
  // anything sold for — the caption must not assert data the screenshot contradicts.
  { src: "/images/rsp/sold.png", title: "Sold", note: "Where completed sales are recorded.", alt: "Resale Scanner Pro — the sold tab, with no sales recorded yet" },
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
          <p className="hero-role-family">AI Workflow Automation · Systems Implementation · Business Systems</p>
          <h1 id="hero-title">I turn messy operating problems into clear, controlled systems people can actually use.</h1>
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
          <h2 id="flagship-title">Loft OS<span className="stage-sub">Governed multi-agent workflow system</span></h2>
          <p className="stage-lede">Scoped work. Independent review. Verified closeout.</p>
          <Link className="stage-cta" href="/work/loft-os/">View case study <span aria-hidden="true">→</span></Link>
        </div>
        <div className="flagship-visual">
          <SystemsLattice />
        </div>
      </div>
    </section>

    <section className="product-stage" aria-labelledby="product-title">
      <div className="shell">
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

        <div className="product-evidence case-screens">
          {evidence.map((shot) => <figure className="phone" key={shot.src}>
            <Image src={shot.src} alt={shot.alt ?? `Resale Scanner Pro — ${shot.title.toLowerCase()} screen`} width={780} height={1688} sizes="(max-width:620px) 31vw, (max-width:960px) 30vw, 320px" />
            <figcaption><b>{shot.title}</b><span>{shot.note}</span></figcaption>
          </figure>)}
        </div>

        <Link className="stage-cta is-ink" href="/work/resale-scanner-pro/">View case study <span aria-hidden="true">→</span></Link>
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
