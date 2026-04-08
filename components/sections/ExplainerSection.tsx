import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { branding } from "@/config/branding";

export async function ExplainerSection() {
  const t = await getTranslations("Explainer");

  return (
    <section className="border-b border-border bg-paper py-14 sm:py-20">
      <div className="safe-pad mx-auto max-w-content sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
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

        <div className="mt-10 rounded-[32px] border border-border bg-card p-4 shadow-soft sm:p-6">
          <div className="overflow-hidden rounded-[28px] border border-border bg-paper-muted">
            <a
              href={branding.explainerImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              aria-label={t("openImage")}
            >
              <Image
                src={branding.explainerImageUrl}
                alt={t("imageAlt")}
                width={1440}
                height={1600}
                priority={false}
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 72rem"
              />
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[t("point1"), t("point2"), t("point3")].map((item) => (
            <p
              key={item}
              className="rounded-2xl border border-border bg-paper-muted px-4 py-4 text-sm leading-7 text-ink-muted"
            >
              {item}
            </p>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={branding.explainerImageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full border border-border-strong bg-card px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent sm:w-auto"
          >
            {t("openImage")}
          </a>
          <Link
            href="/playground"
            className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-wash transition hover:bg-ink-muted sm:w-auto"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
