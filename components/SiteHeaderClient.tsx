"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { MobileMenu } from "@/components/MobileMenu";

type NavItem = {
  href: string;
  label: string;
};

type Props = {
  githubLabel: string;
  githubUrl: string;
  logo: {
    src: string;
    width: number;
    height: number;
  };
  logoAlt: string;
  menuCloseLabel: string;
  menuLabel: string;
  navItems: NavItem[];
  npmLabel: string;
  npmUrl: string;
};

export function SiteHeaderClient({
  githubLabel,
  githubUrl,
  logo,
  logoAlt,
  menuCloseLabel,
  menuLabel,
  navItems,
  npmLabel,
  npmUrl,
}: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b border-border/80 bg-paper/96 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-content px-4 py-3 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-visible rounded-[24px] border border-border bg-paper shadow-soft transition-all duration-300 ${
            scrolled ? "shadow-[0_10px_28px_rgba(26,26,26,0.08)]" : ""
          }`}
        >
          <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div
            className={`flex items-center justify-between gap-4 px-4 sm:px-6 ${
              scrolled ? "py-2.5" : "py-3.5"
            }`}
          >
            <Link
              href="/#top"
              className="flex items-center rounded-2xl bg-paper-muted px-3 py-2 shadow-[inset_0_0_0_1px_rgba(212,204,192,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Image
                src={logo.src}
                alt={logoAlt}
                width={logo.width}
                height={logo.height}
                priority
                className={`${scrolled ? "h-9" : "h-10"} w-auto transition-all duration-300`}
              />
            </Link>

            <nav
              className="-mx-1 hidden max-w-[min(100%,34rem)] flex-1 items-center justify-center gap-1 overflow-x-auto px-1 md:flex"
              aria-label="Primary"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="shrink-0 rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-paper-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <a
                href={npmUrl}
                className="inline-flex items-center justify-center rounded-full border border-border-strong bg-card px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-accent hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                {npmLabel}
              </a>
              <a
                href={githubUrl}
                className="inline-flex items-center justify-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-wash transition-colors hover:bg-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                {githubLabel}
              </a>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <a
                href={githubUrl}
                className="inline-flex items-center justify-center rounded-full bg-ink px-3 py-2 text-sm font-medium text-wash transition-colors hover:bg-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                {githubLabel}
              </a>
              <MobileMenu
                closeLabel={menuCloseLabel}
                menuLabel={menuLabel}
                items={navItems}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
