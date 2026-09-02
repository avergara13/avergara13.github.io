import type { Metadata } from "next";
import Link from "next/link";
import { DecisionRelay } from "@/components/DecisionRelay";
import HumanGatedHandoff from "@/components/HumanGatedHandoff";

export const metadata: Metadata = {
  title: "Angel Vergara — AI Workflows & Business Systems",
  description: "I turn messy operating problems into clear, controlled systems people can actually use—governed AI systems, working products, and implementation discipline.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: "Angel Vergara — AI workflows and business systems", description: "Practical AI-assisted workflows, business systems, and implementation proof.", images: [{ url: "/og-home.png", width: 1200, height: 630, alt: "Angel Vergara — AI workflows and business systems." }] },
  twitter: { card: "summary_large_image", title: "Angel Vergara — AI workflows and business systems", description: "Practical AI-assisted workflows, business systems, and implementation proof.", images: ["/og-home.png"] },
};

const selectedProof = [
  {
    number: "01",
    title: "Loft OS",
    href: "/work/loft-os/",
    kind: "Flagship systems proof · Governed multi-agent workflow orchestration",
    summary: "Scoped intake, role-separated execution, human approval, evidence, and accountable closeout.",
  },
  {
    number: "02",
    title: "Resale Scanner Pro",
    href: "/work/resale-scanner-pro/",
    kind: "Working product · In operating use",
    summary: "A real mobile workflow connecting capture, research, human judgment, and operating evidence.",
  },
];

export default function Home() {
  return <main id="main" data-section="home">
    <section className="editorial-hero shell" aria-labelledby="hero-title">
      <div className="hero-statement">
        <h1 id="hero-title">Angel Vergara</h1>
        <p className="hero-role-family">AI Workflow Automation · Systems Implementation · Business Systems</p>
        <p className="hero-value">I turn messy operating problems into clear, controlled systems people can actually use.</p>
        <p className="hero-proof-cue">Governed AI systems · Working products · Implementation discipline</p>
        <div className="hero-ctas">
          <Link className="button primary" href="/work/loft-os/">View flagship work <span aria-hidden="true">→</span></Link>
          <Link className="button" href="/resume/">Resume</Link>
        </div>
      </div>
      <div className="editorial-handoff" aria-label="Human-gated handoff proof">
        <HumanGatedHandoff />
      </div>
    </section>

    <DecisionRelay />

    <section className="proof-bridge shell" aria-labelledby="proof-bridge-title">
      <div className="proof-bridge-head">
        <p className="eyebrow">Selected proof</p>
        <h2 id="proof-bridge-title">Systems that were built, shipped, and used.</h2>
      </div>
      <div className="proof-bridge-list">
        {selectedProof.map((item) => <Link className="proof-bridge-row" href={item.href} key={item.href}>
          <span className="proof-bridge-number">{item.number}</span>
          <div>
            <h3>{item.title}</h3>
            <p className="proof-bridge-kind">{item.kind}</p>
            <p>{item.summary}</p>
          </div>
          <span className="proof-bridge-arrow" aria-hidden="true">→</span>
        </Link>)}
      </div>
      <Link className="lab-link" href="/work/">See the full work index <span aria-hidden="true">→</span></Link>
    </section>

    <section className="story-bridge shell" aria-labelledby="story-title">
      <h2 id="story-title">Operating Reality → Systems Thinking</h2>
      <p>I learned systems by running the work they have to support. Progressing from hands-on culinary roles to executive chef and general manager taught me to translate operating pressure into clearer workflows and usable systems.</p>
      <Link href="/about/">Read the story <span aria-hidden="true">→</span></Link>
    </section>
  </main>;
}
