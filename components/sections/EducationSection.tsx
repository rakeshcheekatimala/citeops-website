import { getTranslations } from "next-intl/server";

export async function EducationSection() {
  const t = await getTranslations("Education");

  return (
    <section
      id="aeo-geo"
      className="scroll-mt-24 border-b border-border bg-wash py-16 sm:py-24"
    >
      <div className="safe-pad mx-auto max-w-content sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-2xl text-base text-ink-muted sm:text-lg">{t("subtitle")}</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <article className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-8">
            <h3 className="font-display text-xl font-semibold text-ink">
              {t("aeoTitle")}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {t("aeoBody")}
            </p>
            <p className="mt-6 text-sm font-medium text-accent">{t("aeoProduct")}</p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-8">
            <h3 className="font-display text-xl font-semibold text-ink">
              {t("geoTitle")}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {t("geoBody")}
            </p>
            <p className="mt-6 text-sm font-medium text-accent">{t("geoProduct")}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
