export type EquipmentItem = {
  id: string;
  brand: string;
  model: string;
  type: "shearing" | "clipping";
  powerW: number;
  rpm: number;
  weightG: number;
  noiseDb: number;
  priceBrlMin: number;
  priceBrlMax: number;
  useCasePt: string;
  useCaseEn: string;
  url?: string;
};

export const equipmentCatalog: EquipmentItem[] = [
  {
    id: "heiniger-xpert",
    brand: "Heiniger",
    model: "Xpert",
    type: "shearing",
    powerW: 320,
    rpm: 2500,
    weightG: 1100,
    noiseDb: 78,
    priceBrlMin: 4200,
    priceBrlMax: 5800,
    useCasePt: "Tosquia profissional — rebanhos médios e grandes",
    useCaseEn: "Professional shearing — medium to large flocks",
    url: "https://www.heiniger.com",
  },
  {
    id: "heiniger-handy",
    brand: "Heiniger",
    model: "Handy",
    type: "clipping",
    powerW: 200,
    rpm: 2400,
    weightG: 900,
    noiseDb: 75,
    priceBrlMin: 2800,
    priceBrlMax: 3900,
    useCasePt: "Acabamento e tosquia leve em propriedades menores",
    useCaseEn: "Finishing and light shearing on smaller farms",
    url: "https://www.heiniger.com",
  },
  {
    id: "oster-shearmaster",
    brand: "Oster",
    model: "Shearmaster",
    type: "shearing",
    powerW: 350,
    rpm: 2500,
    weightG: 1200,
    noiseDb: 80,
    priceBrlMin: 2500,
    priceBrlMax: 3400,
    useCasePt: "Uso contínuo — boa relação custo/desempenho",
    useCaseEn: "Continuous use — solid cost/performance ratio",
  },
  {
    id: "premier-4000s",
    brand: "Premier 1",
    model: "4000s",
    type: "shearing",
    powerW: 380,
    rpm: 2600,
    weightG: 1350,
    noiseDb: 82,
    priceBrlMin: 3100,
    priceBrlMax: 4500,
    useCasePt: "Alta produtividade — equipes de tosquia",
    useCaseEn: "High throughput — shearing crews",
    url: "https://www.premier1supplies.com",
  },
  {
    id: "kerbl-farmclipper",
    brand: "Kerbl",
    model: "FarmClipper Profi",
    type: "shearing",
    powerW: 350,
    rpm: 2400,
    weightG: 1490,
    noiseDb: 87,
    priceBrlMin: 2200,
    priceBrlMax: 3200,
    useCasePt: "Animais sujos — velocidade ajustável",
    useCaseEn: "Dirty animals — adjustable speed",
    url: "https://www.kerbl.com",
  },
  {
    id: "aesculap-econom",
    brand: "Aesculap",
    model: "Econom CL",
    type: "shearing",
    powerW: 300,
    rpm: 2300,
    weightG: 1050,
    noiseDb: 76,
    priceBrlMin: 4800,
    priceBrlMax: 6500,
    useCasePt: "Precisão e durabilidade — salões e competição",
    useCaseEn: "Precision and durability — shows and competition",
  },
  {
    id: "wahl-xperience",
    brand: "Wahl",
    model: "Xperience",
    type: "clipping",
    powerW: 220,
    rpm: 2500,
    weightG: 850,
    noiseDb: 74,
    priceBrlMin: 1800,
    priceBrlMax: 2600,
    useCasePt: "Tosquia de precisão e apresentação",
    useCaseEn: "Precision and show clipping",
  },
  {
    id: "pet-hq-380w",
    brand: "Pet & Livestock HQ",
    model: "380W Pro",
    type: "shearing",
    powerW: 380,
    rpm: 2500,
    weightG: 1500,
    noiseDb: 79,
    priceBrlMin: 650,
    priceBrlMax: 950,
    useCasePt: "Entrada — até 8–10 ovelhas/hora",
    useCaseEn: "Entry level — up to 8–10 sheep/hour",
  },
];

export const defaultEquipmentCompare = [
  "heiniger-xpert",
  "oster-shearmaster",
  "kerbl-farmclipper",
];
