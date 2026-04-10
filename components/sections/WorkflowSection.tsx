import { getTranslations } from "next-intl/server";

export async function WorkflowSection() {
  const t = await getTranslations("Workflow");

  const items = [
    { title: t("card1Title"), body: t("card1Body") },
    { title: t("card2Title"), body: t("card2Body") },
    { title: t("card3Title"), body: t("card3Body") },
  ];

  return (
    <section className="border-b border-border bg-paper py-16 sm:py-24">
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

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-[24px] border border-border bg-paper-muted p-5 shadow-soft sm:p-6"
            >
              <h3 className="font-display text-xl font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-8 text-ink-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
