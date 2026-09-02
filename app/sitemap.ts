import type { MetadataRoute } from "next";
import { projects } from "../components/ProjectCase";

const baseUrl = "https://avergara13.github.io";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/about", "/resume", "/hiring", "/lab"];
  // The Office Chef is a labeled concept, not production proof: reachable by URL, excluded from the primary sitemap.
  const projectRoutes = projects.filter((project) => project.slug !== "office-chef").map((project) => `/work/${project.slug}`);

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: new Date("2026-09-02"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/work/") ? 0.8 : 0.9,
  }));
}
