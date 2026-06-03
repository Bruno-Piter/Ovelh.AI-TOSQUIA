import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ppm from "@/data/brazil-ppm.json";
import { formatNumber } from "@/lib/utils";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const lastOvinos = ppm.national.ovinos.at(-1)!;
  const lastTosq = ppm.national.tosquiados.at(-1)!;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
      <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#00d4ff]">
            {t("tagline")}
          </p>
          <h1 className="font-display mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-slate-400 leading-relaxed">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`/${locale}/painel`} className="btn-primary">
              {t("ctaDashboard")}
            </Link>
            <Link href={`/${locale}/racas`} className="btn-ghost">
              {t("ctaBreeds")}
            </Link>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute inset-0 rounded-full bg-[#00d4ff]/10 blur-3xl" />
          <Image
            src="/brand/logo.svg"
            alt="Ovelh.AI"
            width={320}
            height={320}
            className="relative z-10 drop-shadow-[0_0_40px_rgba(0,212,255,0.35)]"
            priority
          />
        </div>
      </section>

      <section className="mt-20 grid gap-4 sm:grid-cols-3">
        {[
          {
            label: t("kpiSheep"),
            value: formatNumber(lastOvinos.value, locale),
            sub: t("kpiYear", { year: String(lastOvinos.year) }),
          },
          {
            label: t("kpiShorn"),
            value: formatNumber(lastTosq.value, locale),
            sub: t("kpiYear", { year: String(lastTosq.year) }),
          },
          {
            label: t("kpiWool"),
            value: locale === "pt" ? "Estável +" : "Stable +",
            sub: "AWI EMI · ref.",
          },
        ].map((kpi) => (
          <div key={kpi.label} className="card-glass p-6">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              {kpi.label}
            </p>
            <p className="font-display mt-2 text-3xl font-bold text-gradient-brand">
              {kpi.value}
            </p>
            <p className="mt-1 text-xs text-slate-500">{kpi.sub}</p>
          </div>
        ))}
      </section>

      <section className="mt-24">
        <h2 className="font-display text-2xl font-bold">{t("sectionInsights")}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { title: t("insight1Title"), text: t("insight1Text") },
            { title: t("insight2Title"), text: t("insight2Text") },
            { title: t("insight3Title"), text: t("insight3Text") },
          ].map((item) => (
            <article key={item.title} className="card-glass p-6">
              <h3 className="font-display font-semibold text-[#00d4ff]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
