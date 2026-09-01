import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Work Index — Angel Vergara", description: "Evidence-backed project and case-study index for Angel Vergara.", alternates: { canonical: "/work/" } };

const work = [
  { number: "01", title: "Resale Scanner Pro", href: "/work/resale-scanner-pro/", type: "Working product", role: "Product / workflow / implementation", status: "In operating use", proof: "Real mobile workflow connecting capture, research, human judgment, and operating evidence.", image: "/images/rsp/session.png", alt: "Resale Scanner Pro mobile session interface" },
  { number: "02", title: "Loft OS", href: "/work/loft-os/", type: "Governed AI system", role: "Architecture / orchestration / governance", status: "Sanitized case study", proof: "Systems Field Manual: scoped intake, role-separated execution, human approval, evidence, recovery, and accountable closeout.", image: "/og-loft-os.png", alt: "Loft OS public-safe systems architecture card" },
  { number: "03", title: "Assistant Recruiter Pro", href: "/work/assistant-recruiter-pro/", type: "AI workflow", role: "Search strategy / evaluation logic", status: "Inspectable workflow proof", proof: "Turns job constraints and human relevance feedback into an iteratively refined search strategy.", image: "/og-hiring.png", alt: "Assistant Recruiter Pro workflow card" },
  { number: "04", title: "Sous Chef", href: "/work/sous-chef/", type: "Supporting implementation", role: "Domain workflow translation", status: "Public source case study", proof: "Translates culinary operating knowledge into a usable AI-assisted workspace.", image: "/images/sous-chef/desktop.png", alt: "Sous Chef desktop workspace" },
];

export default function WorkIndex() {
  return <main id="main" data-section="work-index">
    <section className="work-index shell">
      <header><h1>Evidence Atlas</h1><p>Formal proof surfaces showing product implementation, governed AI systems, workflow logic, and domain translation.</p></header>
      <div className="work-index-list">
        {work.map((item) => <Link className="work-index-row" href={item.href} key={item.href}>
          <span>{item.number}</span><div><h2>{item.title}</h2><dl><div><dt>Type</dt><dd>{item.type}</dd></div><div><dt>Role</dt><dd>{item.role}</dd></div><div><dt>Status</dt><dd>{item.status}</dd></div></dl><p>{item.proof}</p></div><Image src={item.image} alt={item.alt} width={780} height={780} sizes="(max-width: 760px) 100vw, 260px" />
        </Link>)}
      </div>
      <Link className="lab-link" href="/lab/">Experiments & explorations <span aria-hidden="true">→</span></Link>
    </section>
  </main>;
}
