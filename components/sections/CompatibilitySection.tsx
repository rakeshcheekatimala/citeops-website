import { getTranslations } from "next-intl/server";

export async function CompatibilitySection() {
  const t = await getTranslations("Compatibility");

  const items = [t("node"), t("npm"), t("ci"), t("os")];

  return (
    <section className="border-b border-border bg-paper py-14 sm:py-20">
      <div className="safe-pad mx-auto max-w-content sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-2 max-w-xl text-ink-muted">{t("subtitle")}</p>
        <ul className="mt-10 flex flex-wrap gap-3">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-border-strong bg-card px-4 py-2 text-sm font-medium text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
