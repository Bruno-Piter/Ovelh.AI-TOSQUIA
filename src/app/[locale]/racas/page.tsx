import { getTranslations, setRequestLocale } from "next-intl/server";
import { BreedsGrid } from "@/components/breeds/BreedsGrid";

type Props = { params: Promise<{ locale: string }> };

export default async function RacasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("breeds");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-slate-400">{t("subtitle")}</p>
      <p className="mt-2 text-xs text-amber-400/80">{t("priceDisclaimer")}</p>
      <div className="mt-10">
        <BreedsGrid locale={locale} />
      </div>
    </div>
  );
}
