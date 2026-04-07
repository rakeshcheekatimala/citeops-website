import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { branding } from "@/config/branding";

const navKeys = [
  { href: "#why", key: "why" as const },
  { href: "#aeo-geo", key: "aeoGeo" as const },
  { href: "#how", key: "how" as const },
  { href: "#product", key: "product" as const },
  { href: "#action", key: "action" as const },
  { href: "#reviews", key: "reviews" as const },
];

export async function SiteHeader() {
  const t = await getTranslations("Nav");
  const tBrand = await getTranslations("branding");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Image
            src={branding.logo.src}
            alt={tBrand("logoAlt")}
            width={branding.logo.width}
            height={branding.logo.height}
            priority
            className="h-9 w-auto"
          />
        </a>
        <nav
          className="-mx-1 flex max-w-[min(100%,28rem)] flex-1 items-center gap-0.5 overflow-x-auto px-1 md:max-w-none md:flex-none md:justify-center"
          aria-label="Primary"
        >
          {navKeys.map(({ href, key }) => (
            <a
              key={key}
              href={href}
              className="shrink-0 rounded-md px-2.5 py-1.5 text-sm text-ink-muted transition-colors hover:bg-paper-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t(key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={branding.links.npm}
            className="hidden rounded-md px-2.5 py-1.5 text-sm text-ink-muted transition-colors hover:text-ink sm:block"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("npm")}
          </a>
          <a
            href={branding.links.github}
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-wash transition-colors hover:bg-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("github")}
          </a>
        </div>
      </div>
    </header>
  );
}
