import { getTranslations } from "next-intl/server";

export async function ComparisonSection() {
  const t = await getTranslations("Comparison");

  const rows = [
    [t("row1Label"), t("row1CiteOps"), t("row1Manual"), t("row1Generic")],
    [t("row2Label"), t("row2CiteOps"), t("row2Manual"), t("row2Generic")],
    [t("row3Label"), t("row3CiteOps"), t("row3Manual"), t("row3Generic")],
    [t("row4Label"), t("row4CiteOps"), t("row4Manual"), t("row4Generic")],
  ];

  return (
    <section
      id="comparison"
      className="scroll-mt-24 border-b border-border bg-paper py-16 sm:py-24"
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

        <div className="mt-8 overflow-x-auto rounded-[28px] border border-border bg-card shadow-soft">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-paper-muted">
              <tr>
                {[t("col1"), t("col2"), t("col3"), t("col4")].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-4 font-semibold text-ink sm:px-6"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  {row.map((cell, index) => (
                    <td
                      key={`${row[0]}-${index}`}
                      className={`px-4 py-4 align-top leading-7 sm:px-6 ${
                        index === 1 ? "font-medium text-ink" : "text-ink-muted"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
