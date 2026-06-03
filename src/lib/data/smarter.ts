export type SmarterBreed = {
  code: string;
  name: string;
  nIndividuals: number;
  species: string;
};

type SmarterResponse = {
  items: Array<{
    code: string;
    name: string;
    n_individuals: number;
    species: string;
  }>;
  total: number;
  page: number;
  pages: number;
};

export async function fetchSmarterBreeds(
  search = "",
  page = 1,
  size = 20
): Promise<{ breeds: SmarterBreed[]; total: number; pages: number }> {
  const fetchSize = search.trim() ? Math.max(size, 80) : size;
  const params = new URLSearchParams({
    species: "Sheep",
    page: String(page),
    size: String(fetchSize),
  });
  const url = `https://webserver.ibba.cnr.it/smarter-api/breeds?${params}`;
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`SMARTER ${res.status}`);
  const data = (await res.json()) as SmarterResponse;
  let breeds = data.items.map((b) => ({
    code: b.code,
    name: b.name,
    nIndividuals: b.n_individuals,
    species: b.species,
  }));
  if (search.trim()) {
    const q = search.toLowerCase();
    breeds = breeds.filter(
      (b) =>
        b.name.toLowerCase().includes(q) || b.code.toLowerCase().includes(q)
    );
  }
  return { breeds, total: data.total, pages: data.pages };
}
