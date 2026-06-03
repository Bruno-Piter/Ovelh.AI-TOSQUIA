import { NextRequest, NextResponse } from "next/server";
import { fetchSmarterBreeds } from "@/lib/data/smarter";

export const revalidate = 86400;

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") ?? "";
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
  const size = Number(request.nextUrl.searchParams.get("size") ?? "15");

  try {
    const result = await fetchSmarterBreeds(search, page, size);
    return NextResponse.json({ ...result, source: "smarter" });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
