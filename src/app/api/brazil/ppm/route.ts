import { NextResponse } from "next/server";
import ppm from "@/data/brazil-ppm.json";

export const revalidate = 86400;

export async function GET() {
  return NextResponse.json(ppm);
}
