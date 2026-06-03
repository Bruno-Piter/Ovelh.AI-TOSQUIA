"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { equipmentCatalog, defaultEquipmentCompare } from "@/data/equipment";
import { EquipmentRadarChart } from "@/components/charts/EquipmentRadarChart";
import { formatNumber } from "@/lib/utils";

export function EquipmentPageClient({ locale }: { locale: string }) {
  const t = useTranslations("equipment");
  const [selected, setSelected] = useState<string[]>(defaultEquipmentCompare);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
          ? [...prev, id]
          : [...prev.slice(1), id]
    );
  };

  return (
    <div className="space-y-10">
      <EquipmentRadarChart
        selectedIds={selected}
        title={t("compare")}
        locale={locale}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {equipmentCatalog.map((e) => (
          <article
            key={e.id}
            className={`card-glass p-5 transition-colors ${
              selected.includes(e.id) ? "ring-1 ring-[#00d4ff]/50" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(e.id)}
              className="w-full text-left"
            >
              <p className="text-xs text-[#39ff14]">{e.brand}</p>
              <h3 className="font-display text-lg font-semibold">{e.model}</h3>
              <p className="mt-2 text-xs text-slate-500">
                {locale === "pt" ? e.useCasePt : e.useCaseEn}
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-400">
                <div>
                  <dt>{t("power")}</dt>
                  <dd className="text-white">{e.powerW} W</dd>
                </div>
                <div>
                  <dt>{t("rpm")}</dt>
                  <dd className="text-white">{e.rpm}</dd>
                </div>
                <div>
                  <dt>{t("weight")}</dt>
                  <dd className="text-white">{e.weightG} g</dd>
                </div>
                <div>
                  <dt>{t("noise")}</dt>
                  <dd className="text-white">{e.noiseDb} dB</dd>
                </div>
              </dl>
              <p className="mt-3 text-sm text-[#00d4ff]">
                {t("price")}: R${" "}
                {formatNumber(e.priceBrlMin, locale)} –{" "}
                {formatNumber(e.priceBrlMax, locale)}
              </p>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
