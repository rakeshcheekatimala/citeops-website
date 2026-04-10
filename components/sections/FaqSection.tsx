import { getTranslations } from "next-intl/server";

export async function FaqSection() {
  const t = await getTranslations("Faq");

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
  ];

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-b border-border bg-wash py-16 sm:py-24"
    >
      <div className="safe-pad mx-auto max-w-content sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.q}
              className="rounded-[24px] border border-border bg-card p-5 shadow-soft sm:p-6"
            >
              <h3 className="font-display text-xl font-semibold text-ink">
                {faq.q}
              </h3>
              <p className="mt-3 text-base leading-8 text-ink-muted">{faq.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
