import { getTranslations } from "next-intl/server";

import { branding } from "@/config/branding";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border bg-gradient-to-b from-wash to-paper"
    >
      <div className="mx-auto max-w-content px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-accent">
          {t("eyebrow")}
        </p>
        <h1 className="font-display text-balance text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {t("subtitle")}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={branding.links.github}
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg shadow-soft transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("ctaGithub")}
          </a>
          <a
            href={branding.links.npm}
            className="inline-flex items-center justify-center rounded-full border border-border-strong bg-card px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("ctaNpm")}
          </a>
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
    </section>
  );
}
