import { NextRequest, NextResponse } from "next/server";
import { fetchLambPrices } from "@/lib/data/agridata";

export const revalidate = 86400;

export async function GET(request: NextRequest) {
  const memberState = request.nextUrl.searchParams.get("memberState") ?? "PT";
  const product =
    (request.nextUrl.searchParams.get("product") as "EU_H" | "EU_L") ?? "EU_H";
  const beginDate =
    request.nextUrl.searchParams.get("beginDate") ?? "01/01/2024";
  const endDate =
    request.nextUrl.searchParams.get("endDate") ?? "31/12/2025";

  const result = await fetchLambPrices(
    memberState,
    product,
    beginDate,
    endDate
  );
  return NextResponse.json({
    data: result.data,
    source: result.source,
    memberState,
    product,
  });
}
