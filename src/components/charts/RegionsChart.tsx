"use client";

import { useMemo } from "react";
import { ChartBase, chartTheme, baseGrid } from "./ChartBase";
import type { EChartsOption } from "echarts";
import ppm from "@/data/brazil-ppm.json";

type Props = { title: string; locale: string };

export function RegionsChart({ title, locale }: Props) {
  const regions = ppm.byRegion.map((r) => r.region);
  const values = ppm.byRegion.map((r) => r.ovinos);

  const option: EChartsOption = useMemo(
    () => ({
      animationDurationUpdate: 600,
      title: {
        text: title,
        left: 0,
        textStyle: { color: chartTheme.text, fontSize: 13, fontWeight: 500 },
      },
      tooltip: { trigger: "axis" },
      grid: { ...baseGrid(), left: 120 },
      xAxis: {
        type: "value",
        splitLine: { lineStyle: { color: chartTheme.split } },
        axisLabel: { color: chartTheme.text },
      },
      yAxis: {
        type: "category",
        data: regions,
        axisLabel: { color: chartTheme.text, fontSize: 11 },
      },
      series: [
        {
          type: "bar",
          data: values,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: chartTheme.blue },
                { offset: 1, color: chartTheme.green },
              ],
            },
          },
        },
      ],
    }),
    [title, regions, values]
  );

  return (
    <div className="card-glass p-4">
      <ChartBase option={option} height={280} />
      <p className="mt-2 text-xs text-slate-500">IBGE PPM 2024 · estimativa regional</p>
    </div>
  );
}
