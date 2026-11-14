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
   * Fotos da galeria em /public/images/lifestyle/ (01 a 05).
   * Para trocar, substitua os arquivos mantendo os nomes (ou atualize os caminhos abaixo).
   */
  // col: coluna da composição no desktop (0 larga, 1 média, 2 estreita).
  // ratio: proporção exibida (a foto é cortada para caber).
  // position: parte da foto que fica em foco no corte (objectPosition CSS).
  // mobileFull: ocupa a largura toda no mobile.
  images: [
    { src: "/images/lifestyle/01.jpg", alt: "Duas jaquetas BYX, azul-claro e verde-petróleo, penduradas em cabides", ratio: "4/5", position: "center", col: 0, mobileFull: true },
    { src: "/images/lifestyle/05.jpg", alt: "Detalhe do top e da legging bordô BYX com acabamento branco", ratio: "1/1", position: "center 45%", col: 0, mobileFull: false },
    { src: "/images/lifestyle/02.jpg", alt: "Modelo alongando os braços usando conjunto fitness bordô BYX ao ar livre", ratio: "4/5", position: "center", col: 1, mobileFull: false },
    { src: "/images/lifestyle/04.jpg", alt: "Modelo em movimento usando conjunto fitness bordô BYX", ratio: "4/5", position: "center", col: 1, mobileFull: false },
    { src: "/images/lifestyle/03.jpg", alt: "Modelo de costas mostrando as alças e o acabamento do top bordô BYX", ratio: "1/1", position: "center 20%", col: 2, mobileFull: false },
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
