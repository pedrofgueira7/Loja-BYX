# BYX — Moda Fitness & Casual

Landing page premium + catálogo local da BYX (*Be Your X*). Vitrine com vendas direcionadas ao WhatsApp.

- Next.js (App Router) · TypeScript · Tailwind CSS · Motion · Lucide
- Sem banco de dados, sem painel, sem checkout: produtos em `src/data/products.ts`
- Deploy na Vercel a cada `git push`

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (valida o catálogo antes) |
| `npm run start` | Serve o build |
| `npm run validate:catalog` | Confere slugs, preços, imagens e dados dos produtos |
| `npm run typecheck` | TypeScript |
| `npm run lint` | ESLint |

## Estrutura

```
src/
  app/            páginas (/, /produto/[slug]), sitemap, robots, 404
  components/     layout/ sections/ products/ ui/
  data/           products.ts · categories.ts · site-content.ts · store-config.ts
  lib/            catalog.ts · whatsapp.ts · format.ts · analytics.ts · validate.ts
  types/          product.ts
public/images/    brand/ hero/ collections/ about/ products/ lifestyle/
scripts/          validate-catalog.mts
```

## Manutenção

- Como cadastrar/editar produtos, trocar imagens e publicar: [CATALOG_GUIDE.md](CATALOG_GUIDE.md)
- Regras permanentes para o Claude Code: [CLAUDE.md](CLAUDE.md)

## Publicação

O catálogo é versionado no repositório. Alterar arquivos localmente **não** muda o site em produção:
faça commit e push para o repositório conectado à Vercel, que gera o novo deploy.
