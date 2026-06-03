"use client";

import { useEffect, useMemo, useState } from "react";
import { ChartBase, chartTheme, baseGrid } from "./ChartBase";
import type { EChartsOption } from "echarts";

type Breed = { code: string; name: string; nIndividuals: number };

type Props = { search: string; title: string };

export function BreedsChart({ search, title }: Props) {
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    const q = search ? `&search=${encodeURIComponent(search)}` : "";
    fetch(`/api/breeds?page=1&size=12${q}`)
      .then((r) => r.json())
      .then((json) => setBreeds(json.breeds ?? []));
  }, [search]);

  const sorted = [...breeds].sort((a, b) => b.nIndividuals - a.nIndividuals);

  const option: EChartsOption = useMemo(
    () => ({
      animationDurationUpdate: 600,
      title: {
        text: title,
        left: 0,
        textStyle: { color: chartTheme.text, fontSize: 13, fontWeight: 500 },
      },
      tooltip: { trigger: "axis" },
      grid: { ...baseGrid(), left: 100 },
      xAxis: {
        type: "value",
        splitLine: { lineStyle: { color: chartTheme.split } },
        axisLabel: { color: chartTheme.text },
      },
      yAxis: {
        type: "category",
        data: sorted.map((b) => b.name).reverse(),
        axisLabel: { color: chartTheme.text, fontSize: 10 },
      },
      series: [
        {
          type: "bar",
          data: sorted.map((b) => b.nIndividuals).reverse(),
          itemStyle: { color: chartTheme.cyan },
        },
      ],
    }),
    [sorted, title]
  );

  return (
    <div className="card-glass p-4">
      <ChartBase option={option} height={320} />
      <p className="mt-2 text-xs text-slate-500">SMARTER-database · genomic samples</p>
    </div>
  );
}
