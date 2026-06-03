# Ovelh.AI — Portal de Tosquia Inteligente

Site institucional e painel analítico sobre tosquia ovina, equipamentos e raças. Dados de **IBGE PPM**, **GBADs/FAOSTAT**, **EU Agridata** e **SMARTER-database**.

## Requisitos

- Node.js 20+
- npm 10+

## Instalação

```bash
cd C:\PROJETOS\Ovelh.AI-TOSQUIA
npm install
npm run dev
```

Abra [http://localhost:3000/pt](http://localhost:3000/pt) (português) ou `/en` (inglês).

## Scripts

| Comando        | Descrição              |
|----------------|------------------------|
| `npm run dev`  | Servidor de desenvolvimento |
| `npm run build`| Build de produção      |
| `npm run start`| Servir build           |
| `npm run lint` | ESLint                 |

## Estrutura

- `src/app/[locale]/` — páginas (PT/EN)
- `src/app/api/` — proxies BFF para APIs externas
- `src/data/` — JSON curado (IBGE, mercado UE, equipamentos)
- `src/components/charts/` — gráficos ECharts com animação nos filtros
- `public/brand/logo.svg` — logo (substitua por `logo.png` da marca se preferir)

## Fontes de dados

| Fonte | Uso |
|-------|-----|
| [IBGE PPM](https://sidra.ibge.gov.br/pesquisa/ppm) | Rebanho e ovinos tosquiados no Brasil |
| [GBADs](https://gbadske.org/api/dataportal/) | População ovina por país (FAOSTAT) |
| [EU Agridata](https://agridata.ec.europa.eu/) | Preços de cordeiro na UE |
| [SMARTER](https://webserver.ibba.cnr.it/smarter-api/docs/) | Raças e amostras genômicas |

## GitHub

Repositório: [Bruno-Piter/Ovelh.AI-TOSQUIA](https://github.com/Bruno-Piter/Ovelh.AI-TOSQUIA)

```bash
git remote add origin https://github.com/Bruno-Piter/Ovelh.AI-TOSQUIA.git
git push -u origin main
```

## Licença

Projeto de demonstração Ovelh.AI — Bruno Piter.
