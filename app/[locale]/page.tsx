import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ActionSection } from "@/components/sections/ActionSection";
import { CompatibilitySection } from "@/components/sections/CompatibilitySection";
import { CtaSection } from "@/components/sections/CtaSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { Hero } from "@/components/sections/Hero";
import { HowSection } from "@/components/sections/HowSection";
import { ProductSection } from "@/components/sections/ProductSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { WhySection } from "@/components/sections/WhySection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <StatsStrip />
        <WhySection />
        <EducationSection />
        <HowSection />
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
