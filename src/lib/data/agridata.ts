import marketFallback from "@/data/market-eu-lamb.json";

export type LambPricePoint = {
  week?: string;
  beginDate: string;
  endDate?: string;
  price: number;
  memberStateCode?: string;
};

export async function fetchLambPrices(
  memberState: string,
  product: "EU_H" | "EU_L",
  beginDate: string,
  endDate: string
): Promise<{ data: LambPricePoint[]; source: "live" | "cached" }> {
  const params = new URLSearchParams({
    memberStateCodes: memberState,
    productCodes: product,
    beginDate,
    endDate,
  });
  try {
    const res = await fetch(
      `https://agridata.ec.europa.eu/api/sheepAndGoat/prices?${params}`,
      {
        headers: {
          Accept: "application/json",
          Referer: "https://agridata.ec.europa.eu/",
        },
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) throw new Error("Agridata unavailable");
    const json = (await res.json()) as Array<{
      beginDate: string;
      endDate?: string;
      weekNumber?: number;
      price: string;
      memberStateCode?: string;
    }>;
    const data = json.map((r) => ({
      beginDate: r.beginDate,
      endDate: r.endDate,
      price: Number(r.price),
      memberStateCode: r.memberStateCode,
    }));
    if (data.length === 0) throw new Error("Empty");
    return { data, source: "live" };
  } catch {
    const series = marketFallback.series as Record<
      string,
      Record<string, LambPricePoint[]>
    >;
    const cached = series[memberState]?.[product] ?? [];
    return { data: cached, source: "cached" };
  }
}
