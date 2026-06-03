import { getTranslations, setRequestLocale } from "next-intl/server";
import { shearingContentPt } from "@/content/pt/shearing";
import { shearingContentEn } from "@/content/en/shearing";

type Props = { params: Promise<{ locale: string }> };

export default async function TosquiaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("shearing");
  const c = locale === "pt" ? shearingContentPt : shearingContentEn;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-slate-400">{t("subtitle")}</p>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold text-[#00d4ff]">
          {t("productivity")}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {c.productivity.map((row) => (
            <div key={row.label} className="card-glass p-5">
              <p className="text-sm text-slate-500">{row.label}</p>
              <p className="font-display mt-2 text-2xl font-bold">
                {row.value}
                <span className="ml-1 text-sm font-normal text-slate-400">
                  {row.unit}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="card-glass p-6">
          <h2 className="font-display text-xl font-semibold">{t("season")}</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {c.season.map((s) => (
              <li key={s} className="border-l-2 border-[#22c55e] pl-4">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-glass p-6">
          <h2 className="font-display text-xl font-semibold">{t("safety")}</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {c.safety.map((s) => (
              <li key={s} className="border-l-2 border-[#3b82f6] pl-4">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold">{t("glossary")}</h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {c.glossary.map((g) => (
            <div key={g.term} className="card-glass p-4">
              <dt className="font-semibold text-[#39ff14]">{g.term}</dt>
              <dd className="mt-1 text-sm text-slate-400">{g.def}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
