import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://avergara13.github.io"),
  title: { default: "Angel Vergara — AI Workflows & Business Systems", template: "%s" },
  description: "I design and build practical AI-assisted workflows and business systems that turn messy operational problems into usable, testable tools.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/favicon.svg" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: "/", title: "Angel Vergara — AI workflows and business systems", description: "Practical AI-assisted workflows, business systems, and implementation proof.", images: [{ url: "/og.png", width: 1732, height: 909, alt: "Angel Vergara — AI workflows and business systems." }] },
  twitter: { card: "summary_large_image", title: "Angel Vergara — AI workflows and business systems", description: "Practical AI-assisted workflows, business systems, and implementation proof.", images: ["/og.png"] },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Angel Vergara",
  url: "https://avergara13.github.io/",
  email: "mailto:avergara13@me.com",
  jobTitle: "Applied AI Workflow and Business Systems Implementation",
  knowsLanguage: ["English", "Spanish"],
  sameAs: [
    "https://linkedin.com/in/angel-vergara-83861540",
    "https://github.com/avergara13",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}><a className="skip-link" href="#main">Skip to main content</a><SiteHeader />{children}<SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} /></body></html>;
}
