import { getTranslations, setRequestLocale } from "next-intl/server";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";

type Props = { params: Promise<{ locale: string }> };

export default async function PainelPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("dashboard");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-slate-400">{t("subtitle")}</p>
      <div className="mt-10">
        <DashboardPanel />
      </div>
    </div>
  );
}
