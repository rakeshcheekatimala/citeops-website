import { getTranslations } from "next-intl/server";

export async function ProductSection() {
  const t = await getTranslations("Product");

  const cards = [
    { title: t("card1Title"), body: t("card1Body") },
    { title: t("card2Title"), body: t("card2Body") },
    { title: t("card3Title"), body: t("card3Body") },
    { title: t("card4Title"), body: t("card4Body") },
    { title: t("card5Title"), body: t("card5Body") },
    { title: t("card6Title"), body: t("card6Body") },
  ];

  return (
    <section
      id="product"
      className="scroll-mt-24 border-b border-border bg-paper-muted py-20 sm:py-24"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">{t("subtitle")}</p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-md"
            >
              <h3 className="font-display text-lg font-semibold text-ink">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
