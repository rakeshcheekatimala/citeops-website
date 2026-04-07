import { getTranslations } from "next-intl/server";

export async function WhySection() {
  const t = await getTranslations("Why");

  return (
    <section
      id="why"
      className="scroll-mt-24 border-b border-border bg-paper py-20 sm:py-24"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted">
          {t("lead")}
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <p className="text-base leading-relaxed text-ink-muted">{t("p1")}</p>
          <p className="text-base leading-relaxed text-ink-muted">{t("p2")}</p>
        </div>
        <blockquote className="mt-12 border-l-4 border-accent pl-6 font-display text-xl font-medium italic leading-snug text-ink sm:text-2xl">
          {t("quote")}
        </blockquote>
      </div>
    </section>
  );
}
