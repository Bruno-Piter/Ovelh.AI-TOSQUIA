export type PopulationRow = {
  iso3: string;
  country: string;
  year: number;
  species: string;
  population: number;
};

export function parseGbadsCsv(csv: string): PopulationRow[] {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];
  const rows: PopulationRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const parts = line.match(/("([^"]*)"|[^,]+)/g);
    if (!parts || parts.length < 5) continue;
    const clean = parts.map((p) => p.replace(/^"|"$/g, "").trim());
    rows.push({
      iso3: clean[0],
      country: clean[1],
      year: Number(clean[2]),
      species: clean[3],
      population: Number(clean[4]),
    });
  }
  return rows.filter((r) => r.species === "Sheep" && !Number.isNaN(r.population));
}

export async function fetchSheepPopulation(
  country: string,
  year: string = "*"
): Promise<PopulationRow[]> {
  const params = new URLSearchParams({
    species: "Sheep",
    year,
    country,
    format: "file",
  });
  const res = await fetch(
    `https://gbadske.org/api/GBADsLivestockPopulation/faostat?${params}`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error(`GBADs ${res.status}`);
  const text = await res.text();
  if (text.includes('"detail"')) {
    const err = JSON.parse(text) as { detail?: string };
    throw new Error(err.detail ?? "No data");
  }
  return parseGbadsCsv(text);
}
