import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { branding } from "@/config/branding";

export async function ActionSection() {
  const t = await getTranslations("Action");

  return (
    <section
      id="action"
      className="scroll-mt-24 border-b border-border bg-wash py-20 sm:py-24"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">{t("subtitle")}</p>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-xl border border-border bg-ink shadow-soft">
            <Image
              src={branding.overviewImageUrl}
              alt={t("imageAlt")}
              width={1200}
              height={720}
              className="h-auto w-full object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-subtle">
              {t("codeCaption")}
            </p>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-ink shadow-soft">
              <code>{t("codeBlock")}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
