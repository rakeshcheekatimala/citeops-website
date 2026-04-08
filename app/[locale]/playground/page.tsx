import { StructuredData } from "@/components/StructuredData";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PlaygroundClient } from "@/components/playground/PlaygroundClient";

export default function PlaygroundPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "CiteOps Playground",
      url: "https://citeops.dev/playground",
      description:
        "Interactive AEO and GEO audit playground with downloadable reports.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://citeops.dev/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Playground",
          item: "https://citeops.dev/playground",
        },
      ],
    },
  ];

  return (
    <>
      <StructuredData data={structuredData} />
      <SiteHeader />
      <main
        id="main-content"
        className="min-h-screen bg-gradient-to-b from-wash via-paper to-paper-muted"
      >
        <PlaygroundClient />
      </main>
      <SiteFooter />
    </>
  );
}
