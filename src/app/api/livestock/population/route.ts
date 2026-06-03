import { NextRequest, NextResponse } from "next/server";
import { fetchSheepPopulation } from "@/lib/data/gbads";

export const revalidate = 86400;

export async function GET(request: NextRequest) {
  const country = request.nextUrl.searchParams.get("country") ?? "Brazil";
  const year = request.nextUrl.searchParams.get("year") ?? "*";

  try {
    const data = await fetchSheepPopulation(country, year);
    return NextResponse.json({ data, source: "gbads", country, year });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
