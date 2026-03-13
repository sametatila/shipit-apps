import type { Metadata } from "next";
import { generatePageMetadata } from "@shipit/seo";
import { JsonLd, productJsonLd } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { ProductCard } from "@/components/product-card";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Urunler",
    description:
      "Urun katalogumuzu inceleyin. Kaliteli urunleri uygun fiyatlarla sunuyoruz.",
    path: "/products",
  });
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

// Ornek urun verileri - gercek projede API veya CMS'den cekilecektir
const products: Product[] = [
  {
    id: "urun-1",
    name: "Ornek Urun 1",
    description: "Yuksek kaliteli ornek urun aciklamasi.",
    price: 299.99,
    image: "/images/products/product-1.jpg",
    category: "Elektronik",
    inStock: true,
  },
  {
    id: "urun-2",
    name: "Ornek Urun 2",
    description: "Premium kalitede ikinci ornek urun.",
    price: 499.99,
    image: "/images/products/product-2.jpg",
    category: "Giyim",
    inStock: true,
  },
  {
    id: "urun-3",
    name: "Ornek Urun 3",
    description: "Sinirli sayida ozel urun.",
    price: 799.99,
    image: "/images/products/product-3.jpg",
    category: "Aksesuar",
    inStock: false,
  },
];

const categories = ["Tumu", ...new Set(products.map((p) => p.category))];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const siteConfig = await getSiteConfig();
  // Next.js 15 - searchParams Promise olarak geliyor, server component'te kullanimi
  // Gercek projede await ile cozulecektir. Burada ornek olarak tum urunler gosteriliyor.
  const filteredProducts = products;

  return (
    <>
      {/* JSON-LD - Her urun icin ayri structured data */}
      {products.map((product) => (
        <JsonLd
          key={product.id}
          data={productJsonLd({
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
            currency: "TRY",
            availability: product.inStock ? "InStock" : "OutOfStock",
            url: `${siteConfig.url}/products/${product.id}`,
          })}
        />
      ))}

      <section className="container mx-auto px-4 py-16">
        {/* Sayfa Basligi */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Urunlerimiz</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Kaliteli urunleri uygun fiyatlarla sunuyoruz. Ihtiyaciniza uygun urunu secin.
          </p>
        </div>

        {/* Kategori Filtreleme */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <a
              key={category}
              href={
                category === "Tumu"
                  ? "/products"
                  : `/products?category=${encodeURIComponent(category)}`
              }
              className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {category}
            </a>
          ))}
        </div>

        {/* Urun Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              category={product.category}
              inStock={product.inStock}
            />
          ))}
        </div>

        {/* Bos durum */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              Bu kategoride urun bulunamadi.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
