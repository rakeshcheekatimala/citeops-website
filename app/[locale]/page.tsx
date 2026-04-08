import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StructuredData } from "@/components/StructuredData";
import { ActionSection } from "@/components/sections/ActionSection";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { CompatibilitySection } from "@/components/sections/CompatibilitySection";
import { CtaSection } from "@/components/sections/CtaSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { Hero } from "@/components/sections/Hero";
import { HowSection } from "@/components/sections/HowSection";
import { ProductSection } from "@/components/sections/ProductSection";
import { ReportSection } from "@/components/sections/ReportSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { WhySection } from "@/components/sections/WhySection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const baseUrl = "https://citeops.dev";
  const pageUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "CiteOps",
      url: baseUrl,
      description:
        "AEO and GEO audits for teams that need readable reports and developer-grade evidence.",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "CiteOps",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Linux, Windows",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      url: pageUrl,
      description:
        "Open-source audit tooling and playground for Answer Engine Optimization and Generative Engine Optimization.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <>
      <StructuredData data={structuredData} />
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <StatsStrip />
        <WhySection />
        <AudienceSection />
        <EducationSection />
        <HowSection />
        <ReportSection />
        <ProductSection />
        <ActionSection />
        <CompatibilitySection />
        <ReviewsSection locale={locale} />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
