import { getTranslations, setRequestLocale } from "next-intl/server";
import { marketContentPt } from "@/content/pt/market";
import { marketContentEn } from "@/content/en/market";
import Link from "next/link";

type Props = { params: Promise<{ locale: string }> };

export default async function MercadoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("market");
  const c = locale === "pt" ? marketContentPt : marketContentEn;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-slate-400">{t("subtitle")}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="card-glass p-6">
          <h2 className="font-display text-xl font-semibold text-[#00d4ff]">
            {c.woolTrend.title}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {c.woolTrend.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-3">
            {c.woolTrend.links.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#39ff14] hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="card-glass p-6">
          <h2 className="font-display text-xl font-semibold">{c.export.title}</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {c.export.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      </div>

      <p className="mt-10">
        <Link href={`/${locale}/painel`} className="btn-primary inline-block">
          {t("euPrices")} → Painel
        </Link>
      </p>
    </div>
  );
}
