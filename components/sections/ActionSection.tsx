import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { branding } from "@/config/branding";

export async function ActionSection() {
  const t = await getTranslations("Action");

  return (
    <section
      id="action"
      className="scroll-mt-24 border-b border-border bg-wash py-16 sm:py-24"
    >
      <div className="safe-pad mx-auto max-w-content sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-2xl text-base text-ink-muted sm:text-lg">{t("subtitle")}</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-ink shadow-soft">
            <Image
              src={branding.overviewImageUrl}
              alt={t("imageAlt")}
              width={1200}
              height={720}
              className="block h-auto w-full max-w-full object-cover object-top"
              sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1024px) calc(100vw - 3rem), 50vw"
            />
          </div>
          <div className="min-w-0">
            <div className="min-w-0 rounded-[24px] border border-border bg-card p-5 shadow-soft sm:p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-subtle">
                {t("codeCaption")}
              </p>
              <pre className="mt-3 max-w-full overflow-x-auto rounded-xl border border-border bg-paper-muted p-4 text-sm leading-relaxed text-ink">
                <code className="block w-max min-w-full whitespace-pre">
                  {t("codeBlock")}
                </code>
              </pre>
              <div className="mt-5 space-y-3">
                {[t("detail1"), t("detail2"), t("detail3")].map((item) => (
                  <p
                    key={item}
                    className="rounded-2xl bg-paper-muted px-4 py-3 text-sm leading-7 text-ink-muted"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
