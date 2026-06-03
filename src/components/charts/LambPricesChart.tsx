"use client";

import { useEffect, useMemo, useState } from "react";
import { ChartBase, chartTheme, baseGrid } from "./ChartBase";
import type { EChartsOption } from "echarts";

type Point = { beginDate: string; price: number };

type Props = {
  memberState: string;
  product: "EU_H" | "EU_L";
  title: string;
};

export function LambPricesChart({ memberState, product, title }: Props) {
  const [data, setData] = useState<Point[]>([]);
  const [source, setSource] = useState<"live" | "cached">("cached");

  useEffect(() => {
    fetch(
      `/api/market/lamb-prices?memberState=${memberState}&product=${product}&beginDate=01/01/2024&endDate=31/12/2025`
    )
      .then((r) => r.json())
      .then((json) => {
        setData(json.data ?? []);
        setSource(json.source ?? "cached");
      });
  }, [memberState, product]);

  const option: EChartsOption = useMemo(
    () => ({
      animationDurationUpdate: 600,
      title: {
        text: title,
        left: 0,
        textStyle: { color: chartTheme.text, fontSize: 13, fontWeight: 500 },
      },
      tooltip: { trigger: "axis" },
      grid: baseGrid(),
      xAxis: {
        type: "category",
        data: data.map((d) => d.beginDate),
        axisLabel: { color: chartTheme.text, rotate: 35, fontSize: 10 },
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: chartTheme.split } },
        axisLabel: { color: chartTheme.text },
      },
      series: [
        {
          type: "line",
          smooth: true,
          data: data.map((d) => d.price),
          lineStyle: { color: chartTheme.neon, width: 2 },
          itemStyle: { color: chartTheme.neon },
        },
      ],
    }),
    [data, title]
  );

  return (
    <div className="card-glass p-4">
      <ChartBase option={option} height={300} />
      <p className="mt-2 text-xs text-slate-500">
        EU Agridata · {memberState} · {product} ·{" "}
        <span className={source === "live" ? "text-[#39ff14]" : "text-amber-400/80"}>
          {source}
        </span>
      </p>
    </div>
  );
}
