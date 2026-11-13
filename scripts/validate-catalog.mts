/**
 * Valida o catálogo (npm run validate:catalog). Roda automaticamente antes do build.
 * Executado pelo Node (strip-types): por isso usa imports relativos com extensão.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { products } from "../src/data/products.ts";
import { categories } from "../src/data/categories.ts";
import { validateCatalog } from "../src/lib/validate.ts";

const publicDir = join(process.cwd(), "public");
const errors = validateCatalog(
  products,
  categories.map((c) => c.id),
  (publicPath) => existsSync(join(publicDir, publicPath)),
);

const published = products.filter((p) => p.published).length;

if (errors.length) {
  console.error(`\n✖ Catálogo com ${errors.length} problema(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error("");
  process.exit(1);
}

console.log(
  `✔ Catálogo íntegro: ${products.length} produto(s), ${published} publicado(s).`,
);
