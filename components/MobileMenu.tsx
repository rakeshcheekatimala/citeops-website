"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

type Props = {
  closeLabel: string;
  menuLabel: string;
  items: NavItem[];
};

export function MobileMenu({ closeLabel, menuLabel, items }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? closeLabel : menuLabel}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center justify-center rounded-full border border-border-strong bg-card px-3.5 py-2 text-sm font-medium text-ink transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {open ? closeLabel : menuLabel}
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-ink/12 backdrop-blur-[1px]"
          />
          <nav
            id="mobile-nav-panel"
            aria-label="Mobile"
            className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(20rem,calc(100vw-2rem))] rounded-[24px] border border-border bg-card p-3 shadow-[0_18px_50px_rgba(26,26,26,0.16)]"
          >
            <div className="grid gap-2">
              {items.map((item) => {
                const isCurrent =
                  item.href === "/playground"
                    ? pathname?.endsWith("/playground")
                    : false;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-ink transition hover:bg-paper-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </>
      ) : null}
    </div>
  );
}
