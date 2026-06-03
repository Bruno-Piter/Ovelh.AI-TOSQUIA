"use client";

import dynamic from "next/dynamic";
import type { EChartsOption } from "echarts";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type ChartBaseProps = {
  option: EChartsOption;
  height?: number;
  className?: string;
};

export function ChartBase({ option, height = 320, className }: ChartBaseProps) {
  return (
    <ReactECharts
      className={className}
      style={{ height, width: "100%" }}
      option={option}
      notMerge={false}
      lazyUpdate
      opts={{ renderer: "canvas" }}
    />
  );
}

export const chartTheme = {
  text: "#94a3b8",
  axis: "#334155",
  split: "rgba(255,255,255,0.06)",
  blue: "#3b82f6",
  cyan: "#00d4ff",
  green: "#22c55e",
  neon: "#39ff14",
};

export function baseGrid() {
  return {
    left: 48,
    right: 24,
    top: 40,
    bottom: 32,
    containLabel: true,
  };
}
