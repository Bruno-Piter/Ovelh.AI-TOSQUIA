"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navKeys = [
  "home",
  "dashboard",
  "shearing",
  "equipment",
  "breeds",
  "market",
  "about",
] as const;

const paths: Record<(typeof navKeys)[number], string> = {
  home: "",
  dashboard: "/painel",
  shearing: "/tosquia",
  equipment: "/equipamentos",
  breeds: "/racas",
  market: "/mercado",
  about: "/sobre",
};

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const switchLocale = locale === "pt" ? "en" : "pt";
  const pathWithoutLocale = pathname.replace(/^\/(pt|en)/, "") || "/";

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#050a15]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
          <Image
            src="/brand/logo.png"
            alt="Ovelh.AI"
            width={44}
            height={44}
            className="object-contain"
            unoptimized
            priority
          />
          <span className="font-display text-lg font-bold tracking-tight">
            <span className="text-[#00d4ff]">OVELH</span>
            <span className="text-[#39ff14]">.AI</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navKeys.map((key) => {
            const href = `/${locale}${paths[key]}`;
            const active =
              paths[key] === ""
                ? pathname === `/${locale}` || pathname === `/${locale}/`
                : pathname.startsWith(href);
            return (
              <Link
                key={key}
                href={href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-white/8 text-[#00d4ff]"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={`/${switchLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`}
            className="rounded-md border border-white/10 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-[#00d4ff]/50"
            aria-label="Switch language"
          >
            {locale === "pt" ? "EN" : "PT"}
          </Link>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 md:hidden">
        {navKeys.map((key) => (
          <Link
            key={key}
            href={`/${locale}${paths[key]}`}
            className="whitespace-nowrap rounded-md px-2.5 py-1 text-xs text-slate-400"
          >
            {t(key)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
