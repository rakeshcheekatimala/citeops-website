import { getTranslations } from "next-intl/server";

export async function StatsStrip() {
  const t = await getTranslations("Stats");

  const items = [
    { label: t("reports"), value: t("reportsValue") },
    { label: t("inputs"), value: t("inputsValue") },
    { label: t("ci"), value: t("ciValue") },
  ];

  return (
    <div className="border-b border-border bg-paper-muted">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-subtle">
              {item.label}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-ink">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
