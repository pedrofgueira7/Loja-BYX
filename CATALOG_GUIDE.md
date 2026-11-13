# Guia do catálogo BYX

O site não tem painel nem banco de dados: **tudo é editado em arquivos** e publicado via Git + Vercel.
Você pode fazer as alterações pedindo ao Claude Code (exemplos de prompts em cada seção).

## Onde fica cada coisa

| O quê | Onde |
| --- | --- |
| Produtos | `src/data/products.ts` |
| Categorias | `src/data/categories.ts` |
| Textos do site e imagens de campanha | `src/data/site-content.ts` |
| WhatsApp, Instagram, SEO, analytics | `src/data/store-config.ts` |
| Fotos dos produtos | `public/images/products/<slug>/` |

## Modelo de produto

```ts
{
  id: "byx-0001",                       // único, nunca reutilizar
  slug: "conjunto-fitness-preto",       // URL: /produto/conjunto-fitness-preto
  name: "Conjunto Fitness Preto",
  sku: "BYX-0001",                      // opcional
  category: "fitness",                  // "fitness" | "casual" (ou categorias novas)
  description: "Texto fornecido pela BYX.",
  shortDescription: "Resumo curto",     // opcional (usado no SEO)
  price: 12990,                         // opcional — CENTAVOS (R$ 129,90)
  promotionalPrice: 9990,               // opcional — CENTAVOS, menor que price
  images: ["/images/products/conjunto-fitness-preto/01.jpg"],
  sizes: ["P", "M", "G"],               // [] = sem seletor de tamanho
  colors: [{ name: "Preto", hex: "#000000" }], // [] = sem seletor de cor
  availability: "available",            // "available" | "sold_out" | "inquiry"
  featured: false,                      // true = aparece em THE BYX EDIT
  published: true,                      // false = some do site
  createdAt: "2026-01-15",              // AAAA-MM-DD
}
```

**Preços sempre em centavos inteiros:** R$ 129,90 → `12990`; R$ 89 → `8900`.

**Regra de ouro:** só informe o que é real. Sem preço informado, o site mostra "Consulte valores". Sem tamanhos/cores, o seletor não aparece.

### Disponibilidade

| Valor | O que o site mostra |
| --- | --- |
| `available` | "Disponível" + botão **COMPRAR PELO WHATSAPP** |
| `inquiry` | "Consulte disponibilidade" + botão de compra |
| `sold_out` | Etiqueta **ESGOTADO** + botão **CONSULTAR REPOSIÇÃO** (mensagem de reposição) |

## Como cadastrar um produto

1. Coloque as fotos em `public/images/products/<slug>/` com nomes `01.jpg`, `02.jpg`, `03.jpg`…
   A `01` é a principal; a `02` aparece quando o cursor passa sobre o card.
   Recomendado: proporção 4:5 (ex.: 1200×1500 px), JPG.
2. Copie o exemplo do topo de `src/data/products.ts` e preencha.
3. Rode `npm run validate:catalog` (confere slug único, preços, imagens existentes).
4. Veja em `npm run dev` → http://localhost:3000.

Prompt para o Claude Code:

> Adicione esta peça ao catálogo da BYX. Fotos: (anexe ou informe a pasta). Nome: Conjunto Fitness Preto. Categoria: fitness. Preço: R$ 129,90. Tamanhos: P, M, G. Cor: Preto. Descrição: "…". Não invente nenhuma informação além dessas.

## Como adicionar fotografias a um produto existente

Copie os arquivos para `public/images/products/<slug>/` (próximo número livre) e inclua o caminho em `images`.

> Adicione estas fotos ao produto "conjunto-fitness-preto" (como 03 e 04).

## Como editar preços

Altere apenas `price` (e `promotionalPrice`, se houver promoção). Para encerrar a promoção, remova `promotionalPrice`.

> Altere o preço do produto "Conjunto Fitness Preto" para R$ 129,90.
> Coloque o produto X em promoção por R$ 99,90.

## Como alterar tamanhos e cores

Edite `sizes` e `colors` do produto.

> No produto X, os tamanhos disponíveis agora são P, M, G e GG.
> Remova a cor Branco do produto X.

## Destaques (seção THE BYX EDIT)

`featured: true` + `published: true`. Sem nenhum destaque, a seção inteira some.

> Coloque o produto X em destaque.
> Tire o produto X dos destaques.

## Despublicar, esgotar e remover

- **Tirar do site:** `published: false`. A página `/produto/<slug>` vira 404 e o produto sai do catálogo, das buscas e do sitemap. Os dados continuam no arquivo para reativar depois.
- **Esgotado:** `availability: "sold_out"`.
- **Exclusão definitiva:** só quando você pedir explicitamente.

> Retire o produto X do site.
> Marque esta peça como esgotada.
> Volte a publicar o produto X.
> Exclua definitivamente o produto X do catálogo.

## Categorias novas

Em `src/data/categories.ts`, acrescente um item (id, label, name, tagline, cta, image, imageAlt) e coloque a foto em `public/images/collections/`.
O filtro do catálogo e o tipo `CategoryId` se atualizam sozinhos. Os cards grandes da seção "ENCONTRE SUA VERSÃO" passam a incluir a nova categoria.

> Crie a categoria "Acessórios" na BYX.

## Textos institucionais

Edite `src/data/site-content.ts` (hero, manifesto, coleções, sobre, lifestyle, Instagram, CTA final, menu).
WhatsApp, Instagram e SEO ficam em `src/data/store-config.ts`.

> Troque o texto da seção Sobre por: "…".

## Imagens de campanha

Hero, sobre, lifestyle e a imagem de compartilhamento ainda são **imagens demonstrativas** (identificadas na própria imagem); as fotos de coleções já são reais. Para trocar qualquer uma, substitua o arquivo mantendo o nome:

| Arquivo | Uso | Tamanho sugerido |
| --- | --- | --- |
| `public/images/hero/hero-desktop.jpg` | Hero (telas ≥ 768px) | 1920×1080 |
| `public/images/hero/hero-mobile.jpg` | Hero (celular) | 1080×1620 |
| `public/images/collections/fitness.jpg` | Card BYX Fitness | 1200×1500 |
| `public/images/collections/casual.jpg` | Card BYX Casual | 1200×1500 |
| `public/images/about/about.jpg` | Seção Sobre | 1200×1500 |
| `public/images/lifestyle/01.jpg … 05.jpg` | Galeria Lifestyle | ver `site-content.ts` (`ratio`) |
| `public/images/brand/og-default.jpg` | Prévia ao compartilhar o link | 1200×630 |
| `public/images/brand/placeholder-produto.jpg` | Produto sem foto | 1200×1500 |

> Troque a imagem do hero desktop por esta foto: (anexe).

A logo original está em `public/images/brand/` (`logo-byx-wordmark.svg` no header, `logo-byx-lockup.svg` no rodapé). A logo é branca e deve ficar sempre sobre fundo preto.

## WhatsApp

Todo botão passa por `createWhatsAppLink` (`src/lib/whatsapp.ts`). Número em `store-config.ts`.

- Compra: "Olá! Vi a peça [NOME] no site da BYX e gostaria de saber mais sobre disponibilidade, tamanhos e valores." + tamanho/cor escolhidos + código (SKU), se houver.
- Reposição (esgotado): "Olá! Vi a peça [NOME] no site da BYX e gostaria de saber se existe previsão de reposição."
- Geral: "Olá! Conheci a BYX pelo site e gostaria de conhecer as peças disponíveis."

## Validação

```bash
npm run validate:catalog   # slugs/ids únicos, preços em centavos, imagens existem
npm run typecheck
npm run lint
npm run build              # já roda validate:catalog antes
```

O `build` falha se o catálogo estiver inválido — assim um erro nunca vai ao ar.

## Publicar na Vercel

O catálogo é local. **Editar arquivos no seu computador não atualiza o site em produção**; é preciso publicar:

1. Edite (ou peça ao Claude Code).
2. Confira com `npm run dev` / `npm run build`.
3. `git add .` → `git commit -m "Adiciona produto X"` → `git push`.
4. A Vercel (conectada ao repositório) gera um novo deploy automaticamente. Quando terminar, o site está atualizado.

Configuração na Vercel (Project → Settings → Environment Variables), todas opcionais:

| Variável | Para quê |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL do domínio (ex.: `https://seudominio.com.br`), usada em canonical, sitemap e Open Graph |
| `NEXT_PUBLIC_GA_ID` | ID do Google Analytics 4 (`G-…`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID do Meta Pixel |

Sem os IDs de analytics, nenhum script de rastreamento é carregado. Com IDs, os scripts só carregam depois que o visitante aceita o aviso de cookies.
Eventos disponíveis: `view_item`, `select_item`, `click_whatsapp`, `view_collection`, `click_instagram`. UTMs da URL de entrada são guardadas na sessão e anexadas aos eventos.
