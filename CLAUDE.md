@AGENTS.md

# BYX — Moda Fitness & Casual (Be Your X)

Vitrine premium (Next.js App Router + TypeScript + Tailwind) com vendas **somente pelo WhatsApp**.
Sem banco de dados, sem backend de catálogo, sem painel, sem checkout, sem autenticação.
O catálogo vive em arquivos TypeScript versionados no repositório.

## Regras permanentes (obrigatórias)

- Todos os novos produtos devem ser adicionados à estrutura central do catálogo (`src/data/products.ts`). Nunca cadastrar produtos diretamente em componentes JSX.
- Não modificar o layout do site ao realizar simples atualizações de produtos.
- Não inventar dados comerciais não informados pelo usuário.
- Não alterar a identidade visual da BYX sem solicitação.
- Após qualquer alteração, validar TypeScript, caminhos de imagens e integridade do catálogo.
- Preservar URLs e slugs de produtos existentes sempre que possível.

## Dados comerciais: nunca invente

Preço, estoque, material, composição de tecido, tamanhos, cores e descontos só entram se o usuário informou.
Campo não informado = campo opcional omitido (`price`, `promotionalPrice`, `sku`) ou lista vazia (`sizes: []`, `colors: []`).
Se `availability` não foi informado, use `"inquiry"` (consulte disponibilidade).

## Onde mexer em cada tarefa

| Tarefa | Arquivo |
| --- | --- |
| Produtos (criar, preço, destaque, esgotar, despublicar) | `src/data/products.ts` |
| Categorias | `src/data/categories.ts` |
| Textos institucionais e imagens de campanha | `src/data/site-content.ts` |
| WhatsApp, Instagram, SEO base, IDs de analytics | `src/data/store-config.ts` |
| Fotos de produto | `public/images/products/<slug>/01.jpg, 02.jpg…` |
| Fotos de campanha | `public/images/hero|collections|lifestyle/` e `public/videos/` |

Atualizações de produto tocam **apenas** `products.ts` e `public/images/products/`.

## Convenções do catálogo

- `price` e `promotionalPrice` em **centavos inteiros** (R$ 129,90 → `12990`). `promotionalPrice` < `price`.
- `slug`: minúsculas com hifens, único e estável (a URL é `/produto/<slug>`). Não renomear slug publicado; se for inevitável, avisar o usuário.
- `id`: único, nunca reutilizado.
- `images`: caminhos `/images/products/<slug>/NN.jpg`; a 1ª é a principal, a 2ª aparece no hover do card.
- `createdAt`: `AAAA-MM-DD` (ordena "novidades").
- Retirar do site = `published: false`. **Não apagar** o objeto, a menos que o usuário peça exclusão definitiva.
- Destaque = `featured: true` (só aparece se também `published: true`).
- Esgotado = `availability: "sold_out"` (etiqueta ESGOTADO + CTA "CONSULTAR REPOSIÇÃO" automáticos).
- Categoria nova: adicionar em `categories.ts` (o tipo `CategoryId` se atualiza sozinho).

## Fluxo para cadastrar uma peça

1. Analisar as fotos enviadas.
2. Procurar se o produto já existe (nome, slug, sku) — não duplicar.
3. Copiar as imagens para `public/images/products/<slug>/` com nomes `01.jpg`, `02.jpg`… (não alterar os originais além do necessário; otimizar sem perder qualidade visível).
4. Criar slug único.
5. Adicionar o objeto em `products.ts`, preenchendo só o que foi informado.
6. Rodar `npm run validate:catalog` e `npm run typecheck`.
7. Confirmar que aparece no site (`npm run dev` ou `npm run build`).

## Comandos

```bash
npm run dev               # desenvolvimento
npm run validate:catalog  # integridade do catálogo (slugs, preços, imagens existentes)
npm run typecheck         # TypeScript
npm run lint
npm run build             # roda validate:catalog antes (build falha se o catálogo estiver inválido)
```

## Identidade visual

- Cores: `#000000`, `#FFFFFF`, `#F5F5F5`, `#A3A3A3`, `#1A1A1A` (tokens `byx-*` em `globals.css`). Não introduzir cores novas na interface.
- Fontes: Manrope (títulos) e Inter (textos).
- A logo original (`public/images/brand/`) é branca e só pode ficar sobre fundo escuro. Não redesenhar nem recolorir.
- Evitar bordas arredondadas e sombras; layout editorial, preto e branco.
- Respeitar `prefers-reduced-motion` em qualquer animação nova.

## Navegação interna

Links para seções da home usam `SectionLink` (ou `CatalogLink`, para categorias): rolam suavemente sem adicionar `#` à URL, respeitam `prefers-reduced-motion` e o header sticky (`scroll-margin-top` em `globals.css`). Não use `<Link href="/#...">` ou `<a href="#...">` diretamente. Fragmentos recebidos de fora são tratados e removidos por `ScrollIntent`.

## Publicação

O catálogo é local: alterar arquivos **não** atualiza o site em produção.
O fluxo é: editar → `git commit` → `git push` para o repositório conectado → a Vercel gera um novo deploy.

## Imagens demonstrativas

Só o hero (`hero/hero-desktop.jpg` e `hero-mobile.jpg`) ainda usa imagens identificadas como "IMAGEM DEMONSTRATIVA". As fotos de coleções (`collections/fitness.jpg` e `casual.jpg`), da galeria lifestyle (`lifestyle/01.jpg` a `05.jpg`) e o vídeo da seção Sobre (`public/videos/sobre.mp4`) já são reais.
Substitua os arquivos mantendo os mesmos nomes (veja `CATALOG_GUIDE.md`).
