import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bdolapci.github.io/sitemap.xml"
  const locales = ["en", "de"]

  const routes = ["", "#experience", "#skills", "#education", "#projects", "#contact"]

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "monthly" : "monthly",
      priority: route === "" ? 1 : 0.8,
    })),
  )
}
