import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://avergara13.github.io"),
  title: { default: "Angel Vergara — Portfolio", template: "%s" },
  description: "Implementation, operations systems, and human-controlled AI workflow portfolio by Angel Vergara.",
  openGraph: { type: "website", title: "Angel Vergara — Systems people can actually use.", description: "Shipped products, practical implementation systems, and human-controlled AI workflows.", images: [{ url: "/og.png", width: 1732, height: 909, alt: "Angel Vergara — Systems people can actually use." }] },
  twitter: { card: "summary_large_image", title: "Angel Vergara — Systems people can actually use.", description: "Shipped products, practical implementation systems, and human-controlled AI workflows.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}><a className="skip-link" href="#main">Skip to main content</a><SiteHeader />{children}<SiteFooter /></body></html>;
}
