<div align="center">

# 🐑 Ovelh.AI — Tosquia Inteligente

**Do rebanho ao gráfico: dados ovinos com cara de futuro.**

Portal institucional + painel analítico sobre tosquia, equipamentos, raças e mercado — em **PT** e **EN**, com visual cyber-agro e fontes públicas confiáveis.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ECharts](https://img.shields.io/badge/ECharts-6-AA344D?style=flat-square)](https://echarts.apache.org/)
[![License](https://img.shields.io/badge/Licença-Demo-39ff14?style=flat-square)](#licença)

[Abrir em PT](http://localhost:3000/pt) · [Open in EN](http://localhost:3000/en) · [Repositório](https://github.com/Bruno-Piter/Ovelh.AI-TOSQUIA)

</div>

---
https://github.com/user-attachments/assets/ae5eaf5e-f890-478e-bc1b-6bc998273d3f
## Por que existe?

A cadeia ovina merece mais do que planilhas soltas. O **Ovelh.AI** junta contexto de tosquia, catálogo de máquinas, perfil de raças e indicadores de mercado num só lugar — com gráficos animados, i18n e APIs agregadas num BFF em Next.js.

> *Tosquia não é só lâmina: é rebanho, genética, preço e tendência.*

---

## O que você encontra

| Área | Rota | O que faz |
|------|------|-----------|
| 🏠 Início | `/pt` · `/en` | Hero, KPIs nacionais (IBGE) |
| 📊 Painel | `/painel` | Dashboard com múltiplos gráficos |
| ✂️ Tosquia | `/tosquia` | Conteúdo técnico e boas práticas |
| ⚙️ Equipamentos | `/equipamentos` | Catálogo + radar comparativo |
| 🧬 Raças | `/racas` | Grid de raças + SMARTER |
| 💶 Mercado | `/mercado` | Preços de cordeiro na UE |
| ℹ️ Sobre | `/sobre` | Créditos e visão do projeto |

---

## Stack

- **Framework:** Next.js 16 (App Router) + React 19  
- **i18n:** next-intl (`pt` / `en`)  
- **Gráficos:** ECharts + echarts-for-react  
- **Estilo:** Tailwind CSS 4, tema escuro neon  
- **Dados:** BFF em `src/app/api/` + JSON curado em `src/data/`

---

## Começar em 3 passos

```bash
git clone https://github.com/Bruno-Piter/Ovelh.AI-TOSQUIA.git
cd Ovelh.AI-TOSQUIA
npm install
npm run dev
```

Abra **[http://localhost:3000/pt](http://localhost:3000/pt)** ou troque para `/en`.

### Scripts úteis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servir o build |
| `npm run lint` | ESLint |

---

## Fontes de dados (BFF)

| Fonte | Uso no projeto |
|-------|----------------|
| [IBGE PPM](https://sidra.ibge.gov.br/pesquisa/ppm) | Rebanho e ovinos tosquiados no Brasil |
| [GBADs](https://gbadske.org/api/dataportal/) | População ovina por país (FAOSTAT) |
| [EU Agridata](https://agridata.ec.europa.eu/) | Preços de cordeiro na UE |
| [SMARTER](https://webserver.ibba.cnr.it/smarter-api/docs/) | Raças e amostras genômicas |

---

## Estrutura do repositório

```
src/
├── app/[locale]/     # páginas por idioma
├── app/api/          # rotas BFF (proxies + cache)
├── components/       # charts, layout, UI
├── content/          # textos longos PT/EN
├── data/             # JSON estático (IBGE, mercado, equipamentos)
└── lib/data/         # clientes das APIs externas

public/
└── brand/logo.png    # mascote Ovelh.AI (fundo transparente)
```

---

## Marca

- **Logo do site:** `public/brand/logo.png`  
- **Favicon (aba do navegador):** 🐑 em `public/favicon.svg` + `public/favicon-32.png`

---

## Contribuir

Issues e PRs são bem-vindos no [GitHub](https://github.com/Bruno-Piter/Ovelh.AI-TOSQUIA). Antes de abrir PR, rode `npm run lint` e `npm run build`.

```bash
git remote add origin https://github.com/Bruno-Piter/Ovelh.AI-TOSQUIA.git
git push -u origin master
```

---

## Licença

Projeto de demonstração **Ovelh.AI** — Bruno Piter.

<div align="center">

*Feito com 🐑 e muita lã digital.*

</div>
