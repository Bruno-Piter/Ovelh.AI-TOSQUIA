import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { breedsCatalog } from "@/data/breeds";
import { formatNumber } from "@/lib/utils";

export async function BreedsGrid({ locale }: { locale: string }) {
  const t = await getTranslations("breeds");

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {breedsCatalog.map((b) => (
        <article key={b.id} className="card-glass overflow-hidden">
          <div className="relative h-40 bg-[#0b1220]">
            <Image
              src={b.image}
              alt={locale === "pt" ? b.namePt : b.nameEn}
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="p-5">
            <h3 className="font-display text-xl font-semibold">
              {locale === "pt" ? b.namePt : b.nameEn}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {t("origin")}: {locale === "pt" ? b.originPt : b.originEn}
            </p>
            <p className="mt-3 text-sm text-slate-400">
              {locale === "pt" ? b.descriptionPt : b.descriptionEn}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {b.purpose.map((p) => (
                <span
                  key={p}
                  className="rounded bg-white/5 px-2 py-0.5 text-xs text-[#00d4ff]"
                >
                  {p === "wool"
                    ? t("wool")
                    : p === "meat"
                      ? t("meat")
                      : "dual"}
                </span>
              ))}
            </div>
            {b.woolMicron && (
              <p className="mt-2 text-xs text-slate-500">
                {b.woolMicron}
              </p>
            )}
            <p className="mt-4 text-sm">
              <span className="text-slate-500">{t("priceRange")}: </span>
              <span className="text-[#39ff14]">
                R$ {formatNumber(b.priceBrlMin, locale)} –{" "}
                {formatNumber(b.priceBrlMax, locale)}
              </span>
            </p>
            {b.smarterCode && (
              <p className="mt-1 text-xs text-slate-600">
                {t("samples")}: {b.smarterCode}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
