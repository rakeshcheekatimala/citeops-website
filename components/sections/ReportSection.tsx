import { getTranslations } from "next-intl/server";

export async function ReportSection() {
  const t = await getTranslations("Report");

  return (
    <section className="border-b border-border bg-paper-muted py-16 sm:py-24">
      <div className="safe-pad mx-auto max-w-content sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {t("subtitle")}
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <article className="rounded-[24px] border border-border bg-card p-5 shadow-soft sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
                  {t("businessLabel")}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
                  {t("businessTitle")}
                </h3>
                <div className="mt-4 space-y-3">
                  {[t("business1"), t("business2"), t("business3")].map((item) => (
                    <p
                      key={item}
                      className="rounded-2xl bg-paper-muted px-4 py-3 text-sm leading-7 text-ink-muted"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </article>

              <article className="rounded-[24px] border border-border bg-card p-5 shadow-soft sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
                  {t("developerLabel")}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
                  {t("developerTitle")}
                </h3>
                <div className="mt-4 space-y-3">
                  {[t("developer1"), t("developer2"), t("developer3")].map((item) => (
                    <p
                      key={item}
                      className="rounded-2xl bg-paper-muted px-4 py-3 text-sm leading-7 text-ink-muted"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          </div>

          <div className="rounded-[30px] border border-border bg-card p-4 shadow-soft sm:p-6">
            <div className="rounded-[24px] bg-ink p-4 text-paper sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
                    {t("sampleLabel")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold sm:text-2xl">
                    {t("sampleTitle")}
                  </h3>
                </div>
                <span className="rounded-full bg-paper/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                  {t("sampleStatus")}
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Composite", value: "74" },
                  { label: "AEO", value: "81" },
                  { label: "GEO", value: "68" },
                ].map((score) => (
                  <div
                    key={score.label}
                    className="rounded-2xl border border-paper/10 bg-paper/5 p-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/60">
                      {score.label}
                    </p>
                    <p className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                      {score.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-paper/10 bg-paper/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">
                    {t("summaryLabel")}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-paper/85">
                    {t("summaryBody")}
                  </p>
                </div>
                <div className="rounded-2xl border border-paper/10 bg-paper/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">
                    {t("fixesLabel")}
                  </p>
                  <div className="mt-3 space-y-3">
                    {[t("fix1"), t("fix2"), t("fix3")].map((item) => (
                      <p
                        key={item}
                        className="rounded-xl bg-paper/5 px-3 py-2 text-sm text-paper/85"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
