/**
 * Textos institucionais e imagens de campanha da landing page.
 * Para trocar um texto ou imagem do site, edite aqui — sem mexer nos componentes.
 */

export const navItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Fitness", href: "/#fitness", category: "fitness" },
  { label: "Casual", href: "/#casual", category: "casual" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Instagram", href: "/#instagram" },
  { label: "Contato", href: "/#contato" },
] as const;

export const hero = {
  title: "BE YOUR X.",
  subtitle: "Seu estilo. Seu movimento. Sua essência.",
  description: "Moda fitness e casual para acompanhar todas as suas versões.",
  primaryCta: { label: "EXPLORAR COLEÇÕES", href: "/#colecoes" },
  secondaryCta: { label: "CONHEÇA A BYX", href: "/#sobre" },
  imageDesktop: "/images/hero/hero-desktop.jpg",
  imageMobile: "/images/hero/hero-mobile.jpg",
  imageAlt: "Campanha BYX — moda fitness e casual",
} as const;

export const manifesto = {
  text: "MORE THAN STYLE. IT'S YOUR IDENTITY.",
} as const;

export const collections = {
  title: "ENCONTRE SUA VERSÃO.",
  description: "Do treino à rotina. Peças que acompanham seu ritmo.",
} as const;

export const featured = {
  title: "THE BYX EDIT.",
  description: "Uma seleção para quem vive o próprio estilo.",
} as const;

export const catalog = {
  title: "EXPLORE A BYX.",
  emptyTitle: "Novas peças chegando em breve.",
  emptyDescription:
    "Estamos preparando a vitrine. Fale com a BYX no WhatsApp e conheça as peças disponíveis.",
  emptyCta: "FALE COM A BYX",
} as const;

export const about = {
  title: "BE YOUR OWN VERSION.",
  text: "Acreditamos que o estilo é uma forma de expressão. Cada escolha revela uma versão única de quem somos. A BYX nasce para acompanhar seus movimentos, seus momentos e sua maneira de estar no mundo.",
  /** Vídeo em loop (mudo). Para trocar, substitua public/videos/sobre.mp4. */
  video: "/videos/sobre.mp4",
  videoAlt: "Vídeo da BYX — a essência da marca",
} as const;

export const lifestyle = {
  title: "THE BYX LIFESTYLE.",
  /**
   * Imagens demonstrativas. Substitua os arquivos em /public/images/lifestyle/
   * mantendo os mesmos nomes (ou atualize os caminhos abaixo).
   */
  // col: coluna da composição no desktop (0 larga, 1 média, 2 estreita).
  // ratio: proporção da foto. mobileFull: ocupa a largura toda no mobile.
  images: [
    { src: "/images/lifestyle/01.jpg", alt: "Look BYX em movimento", ratio: "4/5", col: 0, mobileFull: true },
    { src: "/images/lifestyle/05.jpg", alt: "Lifestyle BYX", ratio: "1/1", col: 0, mobileFull: false },
    { src: "/images/lifestyle/02.jpg", alt: "Detalhe de peça BYX", ratio: "4/3", col: 1, mobileFull: false },
    { src: "/images/lifestyle/04.jpg", alt: "Look fitness BYX", ratio: "4/5", col: 1, mobileFull: false },
    { src: "/images/lifestyle/03.jpg", alt: "Estilo casual BYX", ratio: "4/5", col: 2, mobileFull: false },
  ],
} as const;

export const instagram = {
  title: "FOLLOW YOUR X.",
  description: "Acompanhe lançamentos, bastidores e looks da BYX.",
  cta: "SEGUIR NO INSTAGRAM",
} as const;

export const finalCta = {
  title: "YOUR STYLE. YOUR RULES.",
  description: "Descubra peças que acompanham seu ritmo.",
  cta: "FALE COM A BYX",
} as const;
