import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function SobrePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const vision =
    locale === "pt"
      ? "A Ovelh.AI nasce da interseção entre pecuária ovina e decisão baseada em dados. O objetivo é apoiar tosquiadores, cooperativas e criadores com indicadores confiáveis — rebanho, equipamento, raça e mercado — em uma interface pensada para o campo, não para slides genéricos."
      : "Ovelh.AI sits at the intersection of sheep production and data-driven decisions. We support shearers, cooperatives and breeders with reliable indicators — flock, gear, breed and market — in an interface built for the shed, not generic slides.";

  const sources = [
    { name: "IBGE — PPM", url: "https://sidra.ibge.gov.br/pesquisa/ppm" },
    { name: "GBADs / FAOSTAT", url: "https://gbadske.org/api/dataportal/" },
    { name: "EU Agri-food Data", url: "https://agridata.ec.europa.eu/" },
    { name: "SMARTER-database", url: "https://webserver.ibba.cnr.it/smarter/" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-slate-400">{t("subtitle")}</p>

      <section className="mt-10 card-glass p-6">
        <h2 className="font-display text-xl font-semibold text-[#00d4ff]">
          {t("vision")}
        </h2>
        <p className="mt-4 text-slate-400 leading-relaxed">{vision}</p>
      </section>

      <section className="mt-8 card-glass p-6">
        <h2 className="font-display text-xl font-semibold">{t("dataSources")}</h2>
        <ul className="mt-4 space-y-2">
          {sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#39ff14] hover:underline"
              >
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-sm text-slate-500">
        {locale === "pt"
          ? "Repositório: github.com/Bruno-Piter/Ovelh.AI-TOSQUIA"
          : "Repository: github.com/Bruno-Piter/Ovelh.AI-TOSQUIA"}
      </p>
    </div>
  );
}
