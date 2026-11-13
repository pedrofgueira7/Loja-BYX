import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Collections } from "@/components/sections/Collections";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Catalog } from "@/components/sections/Catalog";
import { About } from "@/components/sections/About";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { Instagram } from "@/components/sections/Instagram";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { getPublishedProducts } from "@/lib/catalog";

export default function Home() {
  const products = getPublishedProducts();
  return (
    <>
      <Hero />
      <Manifesto />
      <Collections />
      <FeaturedProducts />
      <Catalog products={products} />
      <About />
      <Lifestyle />
      <Instagram />
      <FinalCTA />
    </>
  );
}
