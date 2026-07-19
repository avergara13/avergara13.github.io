import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="topbar">
      <nav className="shell nav" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="Angel Vergara home">
          Angel Vergara
        </Link>
        <div className="navlinks">
          <Link href="/#work">Work</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/resume">Resumes</Link>
          <Link href="/application-kit">Application kit</Link>
          <a className="button button-small" href="mailto:avergara13@me.com">
            Email Angel <span aria-hidden="true">→</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
