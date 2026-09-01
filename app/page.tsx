import type { Metadata } from "next";
import Link from "next/link";
import { DecisionRelay } from "@/components/DecisionRelay";
import HumanGatedHandoff from "@/components/HumanGatedHandoff";

export const metadata: Metadata = {
  title: "Angel Vergara — AI Workflows & Business Systems",
  description: "I design AI workflows that turn messy operations into clear, usable systems—with visible guardrails and human decision points.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: "Angel Vergara — AI workflows and business systems", description: "Practical AI-assisted workflows, business systems, and implementation proof.", images: [{ url: "/og-home.png", width: 1200, height: 630, alt: "Angel Vergara — AI workflows and business systems." }] },
  twitter: { card: "summary_large_image", title: "Angel Vergara — AI workflows and business systems", description: "Practical AI-assisted workflows, business systems, and implementation proof.", images: ["/og-home.png"] },
};

export default function Home() {
  return <main id="main" data-section="home">
    <section className="editorial-hero shell" aria-labelledby="hero-title">
      <div className="hero-statement">
        <h1 id="hero-title">I design AI workflows that turn messy operations into clear, usable systems.</h1>
        <p>I build the interfaces, guardrails, and human decision points that make them reliable in real work.</p>
        <Link href="/work/">View work <span aria-hidden="true">→</span></Link>
      </div>
      <div className="editorial-handoff" aria-label="Human-gated handoff proof">
        <HumanGatedHandoff />
      </div>
    </section>

    <DecisionRelay />

    <section className="story-bridge shell" aria-labelledby="story-title">
      <h2 id="story-title">Operating Reality → Systems Thinking</h2>
      <p>I learned systems by running the work they have to support. Progressing from hands-on culinary roles to executive chef and general manager taught me to translate operating pressure into clearer workflows and usable systems.</p>
      <Link href="/about/">Read the story <span aria-hidden="true">→</span></Link>
    </section>
  </main>;
}
