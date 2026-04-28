import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/finance",
        "/sales",
        "/customers",
        "/reports",
        "/settings",
        "/sante",
        "/commerce",
        "/api/",
      ],
    },
    sitemap: "https://synkro.app/sitemap.xml",
  }
}
