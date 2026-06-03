"use client";

import { useEffect, useMemo, useState } from "react";
import { ChartBase, chartTheme, baseGrid } from "./ChartBase";
import type { EChartsOption } from "echarts";

type Row = { year: number; population: number; country: string };

type Props = {
  country: string;
  yearFrom: number;
  yearTo: number;
  title: string;
  locale: string;
};

export function PopulationChart({
  country,
  yearFrom,
  yearTo,
  title,
  locale,
}: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/livestock/population?country=${encodeURIComponent(country)}&year=*`)
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (json.error) {
          setError(true);
          setRows([]);
        } else {
          setError(false);
          setRows(
            (json.data as Row[]).filter(
              (d) => d.year >= yearFrom && d.year <= yearTo
            )
          );
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [country, yearFrom, yearTo]);

  const option: EChartsOption = useMemo(
    () => ({
      animationDurationUpdate: 600,
      title: {
        text: title,
        left: 0,
        textStyle: { color: chartTheme.text, fontSize: 13, fontWeight: 500 },
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "#0b1220",
        borderColor: chartTheme.axis,
        textStyle: { color: "#f8fafc" },
      },
      grid: baseGrid(),
      xAxis: {
        type: "category",
        data: rows.map((r) => String(r.year)),
        axisLine: { lineStyle: { color: chartTheme.axis } },
        axisLabel: { color: chartTheme.text },
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: chartTheme.split } },
        axisLabel: {
          color: chartTheme.text,
          formatter: (v: number) =>
            locale === "pt"
              ? `${(v / 1e6).toFixed(1)}M`
              : `${(v / 1e6).toFixed(1)}M`,
        },
      },
      series: [
        {
          name: country,
          type: "line",
          smooth: true,
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(0, 212, 255, 0.35)" },
                { offset: 1, color: "rgba(0, 212, 255, 0)" },
              ],
            },
          },
          lineStyle: { color: chartTheme.cyan, width: 2 },
          itemStyle: { color: chartTheme.cyan },
          data: rows.map((r) => r.population),
        },
      ],
    }),
    [rows, country, title, locale]
  );

  if (loading) {
    return (
      <div className="card-glass flex h-[320px] items-center justify-center text-sm text-slate-500">
        …
      </div>
    );
  }

  return (
    <div className="card-glass p-4">
      {error && (
        <p className="mb-2 text-xs text-amber-400/90">GBADs — sem dados para este país</p>
      )}
      <ChartBase option={option} height={300} />
      <p className="mt-2 text-xs text-slate-500">GBADs / FAOSTAT · Sheep</p>
    </div>
  );
}
