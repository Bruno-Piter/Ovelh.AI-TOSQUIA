"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/8 bg-[#0b1220]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          {t("sources")}
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-400">
          <li>
            <a
              href="https://sidra.ibge.gov.br/pesquisa/ppm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00d4ff]"
            >
              IBGE PPM
            </a>
          </li>
          <li>
            <a
              href="https://gbadske.org/api/dataportal/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00d4ff]"
            >
              GBADs / FAOSTAT
            </a>
          </li>
          <li>
            <a
              href="https://agridata.ec.europa.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00d4ff]"
            >
              EU Agridata
            </a>
          </li>
          <li>
            <a
              href="https://webserver.ibba.cnr.it/smarter-api/docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00d4ff]"
            >
              SMARTER
            </a>
          </li>
        </ul>
        <p className="mt-6 text-sm text-slate-500">
          {t("rights", { year: String(year) })}
        </p>
      </div>
    </footer>
  );
}
