import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { branding } from "@/config/branding";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border bg-gradient-to-b from-wash to-paper"
    >
      <div className="absolute inset-x-0 top-0 h-64" />
      <div className="safe-pad mx-auto max-w-content pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12">
          <div className="relative">
           
            <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {t("subtitle")}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {t("questionsLead")}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
              {t("businessLead")}
            </p>
            <br />
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-accent">
              {t("eyebrow")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/playground"
                className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-wash shadow-soft transition-colors hover:bg-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto"
              >
                {t("ctaPlayground")}
              </Link>
              
              <a
                href={branding.links.github}
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg shadow-soft transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("ctaGithub")}
              </a>
              <a
                href={branding.links.npm}
                className="inline-flex w-full items-center justify-center rounded-full border border-border-strong bg-card px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("ctaNpm")}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {(
                [
                  { id: "pill1", label: t("pill1") },
                  { id: "pill2", label: t("pill2") },
                  { id: "pill3", label: t("pill3") },
                ] as const
              ).map(({ id, label }) => (
                <span
                  key={id}
                  className={
                    id === "pill1"
                      ? "rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-accent-fg"
                      : "rounded-full border border-border-strong bg-card px-4 py-2 text-sm font-medium text-ink"
                  }
                  style={
                    id === "pill1"
                      ? { backgroundColor: "var(--color-accent)" }
                      : undefined
                  }
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-border bg-card p-4 shadow-soft sm:inline-block sm:p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-subtle">
                {t("installLabel")}
              </p>
              <code className="mt-2 block font-mono text-sm text-ink">
                {branding.installCommand}
              </code>
            </div>
          </div>

          <div className="rounded-[30px] border border-border bg-card p-4 shadow-soft sm:p-5">
            <div className="rounded-[24px] bg-paper-muted p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-subtle">
                    {t("panelLabel")}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
                    {t("panelTitle")}
                  </h2>
                </div>
                
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Composite", value: "82" },
                  { label: "AEO", value: "88" },
                  { label: "GEO", value: "76" },
                ].map((score) => (
                  <div
                    key={score.label}
                    className="rounded-[20px] border border-border bg-card p-4 text-center sm:text-left"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                      {score.label}
                    </p>
                    <p className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
                      {score.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-[20px] border border-border bg-card p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-subtle">
                    {t("panelBusinessLabel")}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ink-muted">
                    {t("panelBusinessBody")}
                  </p>
                </div>
                <div className="rounded-[20px] border border-border bg-card p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-subtle">
                    {t("panelDeveloperLabel")}
                  </p>
                  <div className="mt-3 space-y-2">
                    {[t("panelDeveloperFix1"), t("panelDeveloperFix2"), t("panelDeveloperFix3")].map(
                      (item) => (
                        <p
                          key={item}
                          className="rounded-xl bg-paper-muted px-3 py-2 text-sm text-ink-muted"
                        >
                          {item}
                        </p>
                      ),
                    )}
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
