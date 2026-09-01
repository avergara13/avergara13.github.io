import type { MetadataRoute } from "next";
import { projects } from "../components/ProjectCase";

const baseUrl = "https://avergara13.github.io";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/about", "/resume", "/hiring", "/lab"];
  const projectRoutes = projects.map((project) => `/work/${project.slug}`);

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: new Date("2026-08-17"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/work/") ? 0.8 : 0.9,
  }));
}
