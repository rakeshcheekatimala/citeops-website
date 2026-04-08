import { getTranslations } from "next-intl/server";

export async function WhySection() {
  const t = await getTranslations("Why");
  const problems = [
    { title: t("card1Title"), body: t("card1Body") },
    { title: t("card2Title"), body: t("card2Body") },
    { title: t("card3Title"), body: t("card3Body") },
  ];

  return (
    <section
      id="why"
      className="scroll-mt-24 border-b border-border bg-paper py-16 sm:py-24"
    >
      <div className="safe-pad mx-auto max-w-content sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {t("lead")}
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <p className="text-base leading-relaxed text-ink-muted">{t("p1")}</p>
          <p className="text-base leading-relaxed text-ink-muted">{t("p2")}</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {problems.map((problem) => (
            <article
              key={problem.title}
              className="rounded-[24px] border border-border bg-paper-muted p-6"
            >
              <h3 className="font-display text-xl font-semibold text-ink">
                {problem.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-ink-muted">
                {problem.body}
              </p>
            </article>
          ))}
        </div>
        <blockquote className="mt-12 border-l-4 border-accent pl-6 font-display text-xl font-medium italic leading-snug text-ink sm:text-2xl">
          {t("quote")}
        </blockquote>
      </div>
    </section>
  );
}
