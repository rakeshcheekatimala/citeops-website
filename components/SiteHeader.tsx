import { getTranslations } from "next-intl/server";

import { SiteHeaderClient } from "@/components/SiteHeaderClient";
import { branding } from "@/config/branding";

const navKeys = [
  { href: "/#why", key: "why" as const },
  { href: "/#aeo-geo", key: "aeoGeo" as const },
  { href: "/#how", key: "how" as const },
  { href: "/#product", key: "product" as const },
  { href: "/#action", key: "action" as const },
  { href: "/#reviews", key: "reviews" as const },
  { href: "/playground", key: "playground" as const },
];

export async function SiteHeader() {
  const t = await getTranslations("Nav");
  const tBrand = await getTranslations("branding");
  const items = navKeys.map(({ href, key }) => ({ href, label: t(key) }));

  return (
    <SiteHeaderClient
      githubLabel={t("github")}
      githubUrl={branding.links.github}
      logo={branding.logo}
      logoAlt={tBrand("logoAlt")}
      menuCloseLabel={t("closeMenu")}
      menuLabel={t("menu")}
      navItems={items}
      npmLabel={t("npm")}
      npmUrl={branding.links.npm}
    />
  );
}
