"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { PopulationChart } from "@/components/charts/PopulationChart";
import { BrazilPpmChart } from "@/components/charts/BrazilPpmChart";
import { RegionsChart } from "@/components/charts/RegionsChart";
import { LambPricesChart } from "@/components/charts/LambPricesChart";
import { BreedsChart } from "@/components/charts/BreedsChart";
import { EquipmentRadarChart } from "@/components/charts/EquipmentRadarChart";
import { populationCountries } from "@/data/breeds";
import { equipmentCatalog, defaultEquipmentCompare } from "@/data/equipment";

export function DashboardPanel() {
  const t = useTranslations("dashboard");
  const locale = useLocale();

  const [country, setCountry] = useState("Brazil");
  const [yearFrom, setYearFrom] = useState(1990);
  const [yearTo, setYearTo] = useState(2022);
  const [euState, setEuState] = useState("PT");
  const [product, setProduct] = useState<"EU_H" | "EU_L">("EU_H");
  const [breedSearch, setBreedSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [equipmentIds, setEquipmentIds] = useState<string[]>(
    defaultEquipmentCompare
  );

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(breedSearch), 300);
    return () => clearTimeout(id);
  }, [breedSearch]);

  const toggleEquipment = (id: string) => {
    setEquipmentIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  return (
    <div className="space-y-8">
      <div className="card-glass p-4 sm:p-6">
        <h2 className="font-display text-sm font-semibold text-slate-300">
          {t("filters")}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-1 text-xs text-slate-500">
            {t("country")}
            <select
              className="input-field"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {populationCountries.map((c) => (
                <option key={c.name} value={c.name}>
                  {locale === "pt" ? c.namePt : c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-500">
            {t("yearFrom")}
            <input
              type="number"
              className="input-field"
              value={yearFrom}
              min={1960}
              max={yearTo}
              onChange={(e) => setYearFrom(Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-500">
            {t("yearTo")}
            <input
              type="number"
              className="input-field"
              value={yearTo}
              min={yearFrom}
              max={2024}
              onChange={(e) => setYearTo(Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-500">
            {t("euState")}
            <select
              className="input-field"
              value={euState}
              onChange={(e) => setEuState(e.target.value)}
            >
              <option value="PT">Portugal</option>
              <option value="ES">España</option>
              <option value="FR">France</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-500">
            {t("product")}
            <select
              className="input-field"
              value={product}
              onChange={(e) =>
                setProduct(e.target.value as "EU_H" | "EU_L")
              }
            >
              <option value="EU_H">{t("heavyLamb")}</option>
              <option value="EU_L">{t("lightLamb")}</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-500 sm:col-span-2">
            {t("breedSearch")}
            <input
              className="input-field"
              value={breedSearch}
              onChange={(e) => setBreedSearch(e.target.value)}
              placeholder="Merino, Texel…"
            />
          </label>
        </div>
        <div className="mt-4">
          <p className="text-xs text-slate-500">{t("equipmentCompare")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {equipmentCatalog.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => toggleEquipment(e.id)}
                className={`rounded-md border px-2 py-1 text-xs transition-colors ${
                  equipmentIds.includes(e.id)
                    ? "border-[#00d4ff] bg-[#00d4ff]/10 text-[#00d4ff]"
                    : "border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                {e.brand} {e.model}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PopulationChart
          country={country}
          yearFrom={yearFrom}
          yearTo={yearTo}
          title={t("chartPopulation")}
          locale={locale}
        />
        <BrazilPpmChart title={t("chartBrazil")} locale={locale} />
        <RegionsChart title={t("chartRegions")} locale={locale} />
        <LambPricesChart
          memberState={euState}
          product={product}
          title={t("chartLambPrices")}
        />
        <BreedsChart search={debouncedSearch} title={t("chartBreeds")} />
        <EquipmentRadarChart
          selectedIds={equipmentIds}
          title={t("chartEquipment")}
          locale={locale}
        />
      </div>
    </div>
  );
}
