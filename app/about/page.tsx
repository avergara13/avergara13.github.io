import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About — Angel Vergara", description: "From hospitality operations to systems and AI: workflow design, implementation, automation, and human-controlled AI workflows.", alternates: { canonical: "/about/" }, openGraph: { type: "website", url: "/about/", title: "About — Angel Vergara", description: "From hospitality operations to systems and AI: workflow design, implementation, automation, and human-controlled AI workflows.", images: [{ url: "/og-home.png", width: 1200, height: 630, alt: "About Angel Vergara" }] }, twitter: { card: "summary_large_image", title: "About — Angel Vergara", description: "From hospitality operations to systems and AI: workflow design, implementation, automation, and human-controlled AI workflows.", images: ["/og-home.png"] } };

// TSK-961 Phase 5 locked arc: hospitality foundation -> operating leadership -> systems
// thinking -> technology & AI -> value -> working approach -> proof -> conversation.
const transfers = [
  ["Operations → requirements", "Years of running real workflows taught me how to find the actual problem: where handoffs fail, where exceptions appear, what users need, and what cannot be automated blindly."],
  ["Leadership → implementation", "Training teams, coordinating vendors, managing priorities, and keeping operations moving translate directly into onboarding, stakeholder communication, rollout, adoption, and implementation work."],
  ["Business ownership → systems judgment", "Inventory, labor, purchasing, reporting, margin, and P&L-aware decisions taught me to evaluate technology by whether it improves the operation—not by how impressive the feature sounds."],
  ["Hospitality → AI opportunity", "Hospitality is full of repetitive research, purchasing, inventory, costing, scheduling, reporting, training, and decision workflows. That gives me a strong domain lens for hospitality technology and AI automation while the same systems thinking transfers to other operational industries."],
];

const value = [
  ["AI workflow & automation", "I can help turn repetitive or fragmented work into structured AI-assisted workflows with clear inputs, human decision points, verification, and practical operating controls."],
  ["Implementation & business systems", "I bring an operator’s perspective to requirements discovery, process mapping, onboarding, system rollout, workflow improvement, adoption, and the handoff between business needs and technical teams."],
  ["Hospitality technology", "This is where my background becomes especially differentiated. I understand restaurant and hospitality operations from the inside and can help technology teams build, implement, or improve systems for inventory, purchasing, labor, reporting, training, back-office workflows, and AI-assisted operations."],
  ["Consulting & contract work", "For operators and smaller teams, I can help map a broken workflow, identify where automation or AI actually makes sense, prototype the solution, and translate the operating problem into an implementable system."],
];

const approach = [
  ["Understand the real operation", "I start with the people, decisions, tools, constraints, and exceptions that make up the actual workflow—not an idealized version of it."],
  ["Make the system understandable", "I translate that operating reality into clear requirements, process logic, responsibilities, interfaces, and decision points people can follow."],
  ["Automate with judgment", "I use automation and AI where they reduce friction or improve visibility, while keeping consequential decisions and appropriate controls with people."],
  ["Carry it through implementation", "A good design is only useful if it can be adopted. I care about the handoffs, testing, feedback, documentation, and operational details that turn an idea into a usable system."],
];

const proof = [
  { title: "🛋️ Loft OS", label: "Flagship systems work", href: "/work/loft-os/", copy: "A governed multi-agent workflow system that shows how I approach scope, authority, workflow design, human oversight, independent review, and verified closeout.", cta: "View Loft OS" },
  { title: "📱 Resale Scanner Pro", label: "Working product", href: "/work/resale-scanner-pro/", copy: "A mobile decision system built around a real operating workflow, combining market evidence and AI-assisted research with human judgment.", cta: "View Resale Scanner Pro" },
  { title: "Hospitality-domain work", label: "Applied range", href: "/work/", copy: "Additional projects show how the same systems thinking can be applied back into hospitality operations and other practical business workflows.", cta: "View portfolio" },
];

function Points({ id, eyebrow, heading, items }: { id: string; eyebrow: string; heading: string; items: string[][] }) {
  return (
    <section className="about-section" aria-labelledby={id}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{heading}</h2>
      <div className="about-points">
        {items.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
    </section>
  );
}

export default function About() {
  return <main id="main" data-section="about">
    <section className="about-page shell">
      <header>
        <p className="eyebrow">About</p>
        <h1>From hospitality operations to systems and AI.</h1>
        <p>I build systems for real operations, combining years of hospitality and business leadership with workflow design, implementation, automation, and human-controlled AI.</p>
        <p className="about-support">What began in kitchens grew into operating businesses, improving workflows, building software, and designing AI-assisted systems that help people work with more clarity and control.</p>
        <p className="about-rail">Hospitality Technology · AI Workflow Automation · Systems Implementation · Business Systems</p>
      </header>

      <section className="about-section" aria-labelledby="career-bridge">
        <p className="eyebrow">Career bridge</p>
        <h2 id="career-bridge">The kitchen taught me how systems really behave.</h2>
        <div className="about-bridge">
          <p>Hospitality is where I learned that processes have to survive real operating pressure. Growing from culinary work into Executive Chef and General Manager responsibilities expanded the work into purchasing, inventory, vendors, scheduling, training, reporting, payroll-data review, financial workflows, compliance, customer experience, and broader business operations.</p>
          <p>As responsibility grew, the focus increasingly shifted to the systems beneath the operation: information loss, broken handoffs, repetitive work, unclear ownership, and opportunities for better tools and workflows. That progression led naturally into implementation, automation, software, and AI-assisted workflows.</p>
        </div>
      </section>

      <Points id="why-it-transfers" eyebrow="Why it transfers" heading="Operating experience became implementation skill." items={transfers} />

      <Points id="where-i-add-value" eyebrow="Where I can add value" heading="I work best where operations and technology meet." items={value} />
      <p className="about-close-bridge">The industry can change. The core problem usually doesn’t: understand the operation, find the friction, design the workflow, implement the system, and make sure people can actually use it.</p>

      <Points id="how-i-work" eyebrow="How I approach the work" heading="Start with the workflow, not the technology." items={approach} />
      <p className="about-rhythm">Understand → Clarify → Automate → Implement</p>

      <section className="about-section" aria-labelledby="see-the-work">
        <p className="eyebrow">See the work</p>
        <h2 id="see-the-work">The progression is visible in the systems I’ve built.</h2>
        <div className="work-additional-list">
          {proof.map((item) => <Link className="work-additional-row" href={item.href} key={item.href}>
            <div>
              <h3>{item.title}</h3>
              <p className="work-index-label">{item.label}</p>
              <p>{item.copy}</p>
            </div>
            <p className="work-index-cta">{item.cta}<span aria-hidden="true"> →</span></p>
          </Link>)}
        </div>
      </section>

      <section className="about-section" aria-labelledby="lets-connect">
        <p className="eyebrow">Let’s connect</p>
        <h2 id="lets-connect">Building better systems starts with understanding the work.</h2>
        <p className="about-support">I’m interested in roles and projects where operating knowledge, implementation, automation, and AI can make real workflows clearer, more useful, and easier to run.</p>
        <div className="actions"><Link className="button primary" href="/work/">View portfolio <span aria-hidden="true">→</span></Link><Link className="button" href="/resume/">Review resume <span aria-hidden="true">→</span></Link><a className="button" href="mailto:avergara13@me.com">Contact <span aria-hidden="true">→</span></a></div>
      </section>
    </section>
  </main>;
}
