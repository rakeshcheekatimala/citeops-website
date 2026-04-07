import { getTranslations } from "next-intl/server";

import { getReviews } from "@/lib/reviews";

type Props = {
  locale: string;
};

export async function ReviewsSection({ locale }: Props) {
  const t = await getTranslations("Reviews");
  const { items } = getReviews(locale);

  return (
    <section
      id="reviews"
      className="scroll-mt-24 border-b border-border bg-paper-muted py-20 sm:py-24"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">{t("subtitle")}</p>

        {items.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-border-strong bg-card/80 px-8 py-16 text-center">
            <p className="font-display text-xl font-semibold text-ink">
              {t("emptyTitle")}
            </p>
            <p className="mx-auto mt-4 max-w-lg text-ink-muted">{t("emptyBody")}</p>
          </div>
        ) : (
          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {items.map((review, index) => (
              <li
                key={`${review.author}-${index}`}
                className="rounded-xl border border-border bg-card p-6 shadow-soft"
              >
                <blockquote className="text-base leading-relaxed text-ink">
                  “{review.quote}”
                </blockquote>
                <footer className="mt-4 text-sm text-ink-muted">
                  <span className="font-medium text-ink">{review.author}</span>
                  {review.role ? ` · ${review.role}` : null}
                  {review.source ? (
                    <span className="block text-xs text-ink-subtle">
                      {review.source}
                    </span>
                  ) : null}
                </footer>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
