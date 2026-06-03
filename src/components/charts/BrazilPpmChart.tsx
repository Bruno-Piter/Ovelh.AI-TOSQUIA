"use client";

import { useMemo } from "react";
import { ChartBase, chartTheme, baseGrid } from "./ChartBase";
import type { EChartsOption } from "echarts";
import ppm from "@/data/brazil-ppm.json";

type Props = { title: string; locale: string };

export function BrazilPpmChart({ title, locale }: Props) {
  const years = ppm.national.ovinos.map((o) => o.year);
  const ovinos = ppm.national.ovinos.map((o) => o.value);
  const tosquiados = ppm.national.tosquiados.map((o) => o.value);

  const option: EChartsOption = useMemo(
    () => ({
      animationDurationUpdate: 600,
      title: {
        text: title,
        left: 0,
        textStyle: { color: chartTheme.text, fontSize: 13, fontWeight: 500 },
      },
      legend: {
        top: 4,
        right: 0,
        textStyle: { color: chartTheme.text },
      },
      tooltip: { trigger: "axis" },
      grid: baseGrid(),
      xAxis: {
        type: "category",
        data: years.map(String),
        axisLabel: { color: chartTheme.text },
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: chartTheme.split } },
        axisLabel: {
          color: chartTheme.text,
          formatter: (v: number) => `${(v / 1e6).toFixed(1)}M`,
        },
      },
      series: [
        {
          name: locale === "pt" ? "Ovinos" : "Sheep flock",
          type: "bar",
          itemStyle: { color: chartTheme.cyan },
          data: ovinos,
        },
        {
          name: locale === "pt" ? "Tosquiados" : "Shorn",
          type: "bar",
          itemStyle: { color: chartTheme.green },
          data: tosquiados,
        },
      ],
    }),
    [title, locale, years, ovinos, tosquiados]
  );

  return (
    <div className="card-glass p-4">
      <ChartBase option={option} height={300} />
      <p className="mt-2 text-xs text-slate-500">IBGE PPM · {ppm.note}</p>
    </div>
  );
}
