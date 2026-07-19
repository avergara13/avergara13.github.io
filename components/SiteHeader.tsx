"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const resumeHref = "/downloads/Angel_Vergara_Resume_Implementation_Onboarding.pdf";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="topbar">
      <nav className="shell nav" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="Angel Vergara home" onClick={closeMenu}>
          Angel Vergara
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((current) => !current)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            {isOpen ? (
              <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
            )}
          </svg>
        </button>
        <div id="primary-navigation" className={`navlinks ${isOpen ? "is-open" : ""}`}>
          <Link href="/#work" onClick={closeMenu}>Work</Link>
          <Link href="/resume" onClick={closeMenu}>Resume</Link>
          <Link href="/hiring" onClick={closeMenu}>For hiring teams</Link>
          <Link href="/#contact" onClick={closeMenu}>Contact</Link>
          <a className="button button-small nav-cta" href={resumeHref} download onClick={closeMenu}>
            Download resume <span aria-hidden="true">↓</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
