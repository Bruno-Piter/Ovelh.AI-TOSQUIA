"use client";

import { useMemo } from "react";
import { ChartBase, chartTheme } from "./ChartBase";
import type { EChartsOption } from "echarts";
import { equipmentCatalog } from "@/data/equipment";

type Props = {
  selectedIds: string[];
  title: string;
  locale: string;
};

const maxVals = { power: 400, rpm: 2700, weight: 1600, noise: 90, price: 7000 };

export function EquipmentRadarChart({ selectedIds, title, locale }: Props) {
  const items = equipmentCatalog.filter((e) => selectedIds.includes(e.id));

  const option: EChartsOption = useMemo(() => {
    const indicator = [
      { name: locale === "pt" ? "Potência" : "Power", max: 100 },
      { name: "RPM", max: 100 },
      { name: locale === "pt" ? "Peso⁻¹" : "Weight⁻¹", max: 100 },
      { name: locale === "pt" ? "Silêncio" : "Quiet", max: 100 },
      { name: locale === "pt" ? "Preço⁻¹" : "Price⁻¹", max: 100 },
    ];

    const series = items.map((e, i) => ({
      name: `${e.brand} ${e.model}`,
      type: "radar" as const,
      animationDurationUpdate: 600,
      data: [
        {
          value: [
            (e.powerW / maxVals.power) * 100,
            (e.rpm / maxVals.rpm) * 100,
            (1 - e.weightG / maxVals.weight) * 100,
            (1 - e.noiseDb / maxVals.noise) * 100,
            (1 - (e.priceBrlMax / maxVals.price)) * 100,
          ],
        },
      ],
      lineStyle: {
        color: [chartTheme.cyan, chartTheme.green, chartTheme.blue][i % 3],
      },
      areaStyle: { opacity: 0.12 },
    }));

    return {
      title: {
        text: title,
        left: 0,
        textStyle: { color: chartTheme.text, fontSize: 13, fontWeight: 500 },
      },
      legend: {
        bottom: 0,
        textStyle: { color: chartTheme.text, fontSize: 10 },
      },
      radar: {
        indicator,
        axisName: { color: chartTheme.text, fontSize: 10 },
        splitLine: { lineStyle: { color: chartTheme.split } },
        splitArea: { show: false },
      },
      series,
    };
  }, [items, title, locale]);

  return (
    <div className="card-glass p-4">
      <ChartBase option={option} height={340} />
      <p className="mt-2 text-xs text-slate-500">
        {locale === "pt" ? "Catálogo técnico Ovelh.AI" : "Ovelh.AI technical catalog"}
      </p>
    </div>
  );
}
