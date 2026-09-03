import type { Metadata } from "next";
import Link from "next/link";
import resume from "./general-resume.json";

export const metadata: Metadata = {
  title: "Resume — Angel Vergara",
  description: "The full career record in one place: hospitality and operations leadership, systems implementation, business-process work, and current AI-assisted workflow proof.",
  alternates: { canonical: "/resume/" },
  openGraph: {
    type: "website",
    url: "/resume/",
    title: "Angel Vergara — Resume",
    description: "One readable career record, with the same evidence available as a PDF.",
    images: [{ url: "/og-resume.png", width: 1200, height: 630, alt: "Angel Vergara resume" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Vergara — Resume",
    description: "One readable career record, with the same evidence available as a PDF.",
    images: ["/og-resume.png"],
  },
};

// TSK-966: /resume/ is the single canonical recruiter surface. The record below is
// rendered from app/resume/general-resume.json, which scripts/generate_resumes.py
// emits from the same RESUMES[0] data that builds the PDF — one writer, no second
// hand-maintained copy. Do not transcribe resume content into this file.
//
// The three targeted resume variants remain application assets under
// public/downloads/. They are deliberately NOT offered here: a recruiter gets one
// stable career record, not a choice between four versions.

// Role fit, not held titles. Labels are the four EA-approved lanes; the copy is
// carried over from the retired /hiring/ decision surface and the canonical resume
// strengths, so it introduces no new claim.
const fitLanes: [string, string][] = [
  ["AI Workflow & Automation", "Applied AI workflows, automation, human decision points, evaluation, and practical controls."],
  ["Systems Implementation", "Requirements, process mapping, onboarding, rollout, adoption, and the handoff between business needs and technical teams."],
  ["Business Systems & Operations", "Process discovery, operational reporting, operating controls, vendor coordination, and the systems judgment behind them."],
  ["Hospitality Technology", "Restaurant and hospitality systems where operating knowledge strengthens implementation, product, onboarding, and AI-workflow decisions."],
];

export default function ResumePage() {
  return <main id="main" data-section="resume">
    <section className="subpage-hero resume-hero">
      <div className="shell resume-hero-single">
        <p className="eyebrow">Resume</p>
        <h1>The whole career record, in one place.</h1>
        <p className="lede">One concise view of my hospitality and operations leadership, systems implementation, business-process work, and current AI-assisted workflow proof.</p>
        <p className="resume-support">Looking for a role-specific version? I tailor the same verified experience to the position when applying.</p>
        <div className="actions"><a className="button primary" href={`/downloads/${resume.pdf}`} download>Download PDF <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>

    <section className="resume-record-section">
      <div className="shell resume-record">
        <p className="resume-record-headline">{resume.headline.split("|").map((part) => part.trim()).join(" · ")}</p>

        <section className="resume-block">
          <h2>Profile</h2>
          <p>{resume.profile}</p>
        </section>

        <section className="resume-block">
          <h2>Core strengths</h2>
          <ul className="resume-taglist">{resume.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="resume-block">
          <h2>Selected product and systems work</h2>
          <dl className="resume-projects">
            {resume.projects.map((project) => <div key={project.name}>
              <dt>{project.name}</dt>
              <dd>{project.summary}</dd>
            </div>)}
          </dl>
        </section>

        <section className="resume-block">
          <h2>Selected professional experience</h2>
          {resume.experience.map((role) => {
            // Not every entry carries a role or dates (the summarised earlier-experience
            // row carries neither), so the meta line is rendered only when it has content
            // -- an empty <p> is markup noise a screen reader still walks into.
            const meta = [role.role, ...role.dates].filter(Boolean).join(" · ");
            return <article className="resume-role" key={role.organization}>
              <h3>{role.organization}</h3>
              {meta ? <p className="resume-role-meta">{meta}</p> : null}
              <ul>{role.bullets.map((line) => <li key={line}>{line}</li>)}</ul>
            </article>;
          })}
        </section>

        <section className="resume-block">
          <h2>Education</h2>
          <dl className="resume-projects">
            {resume.education.map((entry) => <div key={entry.institution}>
              <dt>{entry.institution}</dt>
              <dd>{entry.credential}</dd>
            </div>)}
          </dl>
        </section>

        <section className="resume-block">
          <h2>Tools</h2>
          <ul className="resume-taglist">{resume.tools.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>
    </section>

    <section className="resume-fit-section">
      <div className="shell">
        <div className="split-head"><div><p className="eyebrow">Role fit</p><h2>Where I fit</h2></div><p>These are role-fit lanes, not claims of prior paid titles.</p></div>
        <div className="fit-list">
          {fitLanes.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>

    <section className="resume-close dark-section">
      <div className="shell application-grid">
        <div><p className="eyebrow light-eyebrow">Next step</p><h2>Want the proof behind the résumé?</h2></div>
        <div className="application-links">
          <Link href="/work/"><span>View work</span><span aria-hidden="true">→</span></Link>
          <a href="mailto:avergara13@me.com"><span>Contact</span><span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  </main>;
}
