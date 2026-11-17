import { createFileRoute } from "@tanstack/react-router";
import { PortfolioExperience } from "@/components/portfolio/PortfolioExperience";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Shyam Sunder Maskara — AI & Data Science Student" },
      { name: "description", content: "Meet Shyam Sunder Maskara, an AI and Data Science student, Python programmer, and web developer in Lucknow, India." },
      { property: "og:title", content: "Shyam Sunder Maskara — A mind for what’s next" },
      { property: "og:description", content: "Learning at the edge of AI and possibility. Explore the work and journey of Shyam Sunder Maskara." },
      { property: "og:type", content: "profile" },
      { property: "profile:first_name", content: "Shyam" },
      { property: "profile:last_name", content: "Maskara" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Shyam Sunder Maskara — A mind for what’s next" },
      { name: "twitter:description", content: "AI & Data Science student, Python programmer, and web developer in Lucknow, India." },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Shyam Sunder Maskara",
      jobTitle: "AI & Data Science Student",
      description: "Artificial Intelligence and Data Science student interested in programming, AI, web development, and problem solving.",
      email: "mailto:shyammaskara2006@gmail.com",
      telephone: "+91 7007362181",
      address: { "@type": "PostalAddress", addressLocality: "Lucknow", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "JECRC University" },
      sameAs: ["https://github.com/MythicModulus", "https://www.linkedin.com/in/shyam-maskara-802605332/"],
    }) }],
  }),
  component: PortfolioExperience,
});
