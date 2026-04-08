import { getTranslations } from "next-intl/server";

import { branding } from "@/config/branding";

export async function CtaSection() {
  const t = await getTranslations("Cta");

  return (
    <section className="bg-gradient-to-b from-paper to-paper-muted py-16 sm:py-28">
      <div className="safe-pad mx-auto max-w-content text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-balance text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-ink-muted sm:text-lg">
          {t("subtitle")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[t("pill1"), t("pill2"), t("pill3")].map((item) => (
            <span
              key={item}
              className="rounded-full border border-border-strong bg-card px-4 py-2 text-sm font-medium text-ink"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={branding.links.github}
            className="inline-flex w-full items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-fg shadow-soft transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("ctaGithub")}
          </a>
          <a
            href={`${branding.links.github}#readme`}
            className="inline-flex w-full items-center justify-center rounded-full border border-border-strong bg-card px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("ctaDocs")}
          </a>
        </div>
        <div className="mt-10 rounded-xl border border-border bg-card px-4 py-4 shadow-soft sm:mx-auto sm:inline-block sm:px-6">
          <code className="block overflow-x-auto font-mono text-sm text-ink">{branding.installCommand}</code>
        </div>
      </div>
    </section>
  );
}
