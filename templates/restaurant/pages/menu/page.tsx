import type { Metadata } from "next";
import { generatePageMetadata, JsonLd, restaurantJsonLd } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Separator } from "@shipit/ui/separator";
import { MenuCategory } from "@/components/menu-category";
import type { MenuItem } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Menu",
    description:
      "Restoranmizin zengin menusu. Kebaplar, pideler, lahmacunlar, salatalar, tatlilar ve icecekler. Geleneksel Turk mutfaginin en sevilen lezzetleri.",
    path: "/menu",
  });
}

const menuItems: MenuItem[] = [
  // Kebaplar
  {
    id: "adana-kebap",
    name: "Adana Kebap",
    description: "El kiymasi acili kebap, lavash ve garnitur ile servis edilir.",
    price: 350,
    image: "/images/menu/adana-kebap.jpg",
    category: "Kebaplar",
    isPopular: true,
  },
  {
    id: "urfa-kebap",
    name: "Urfa Kebap",
    description: "El kiymasi acisiz kebap, lavash ve garnitur ile servis edilir.",
    price: 350,
    image: "/images/menu/urfa-kebap.jpg",
    category: "Kebaplar",
  },
  {
    id: "iskender",
    name: "Iskender Kebap",
    description:
      "Ince dilimlenmiş doner, tereyagli domates sosu ve yogurt ile.",
    price: 400,
    image: "/images/menu/iskender.jpg",
    category: "Kebaplar",
    isPopular: true,
  },
  {
    id: "karisik-kebap",
    name: "Karisik Izgara",
    description:
      "Adana, urfa, pirzola, kanat ve kofteden olusan ozel tabak.",
    price: 500,
    image: "/images/menu/karisik-izgara.jpg",
    category: "Kebaplar",
    isNew: true,
  },

  // Pideler
  {
    id: "kiymali-pide",
    name: "Kiymali Pide",
    description: "Taze kiymali geleneksel pide.",
    price: 200,
    image: "/images/menu/kiymali-pide.jpg",
    category: "Pideler",
  },
  {
    id: "kasarli-pide",
    name: "Kasarli Pide",
    description: "Bol kasarli firin pide.",
    price: 180,
    image: "/images/menu/kasarli-pide.jpg",
    category: "Pideler",
  },
  {
    id: "kusbasi-pide",
    name: "Kusbasili Pide",
    description: "Dana kusbasili ozel pide.",
    price: 250,
    image: "/images/menu/kusbasi-pide.jpg",
    category: "Pideler",
    isPopular: true,
  },

  // Icecekler
  {
    id: "ayran",
    name: "Ayran",
    description: "Taze yapim geleneksel ayran.",
    price: 30,
    image: "/images/menu/ayran.jpg",
    category: "Icecekler",
  },
  {
    id: "salgam",
    name: "Salgam Suyu",
    description: "Aci veya tatlı salgam suyu.",
    price: 35,
    image: "/images/menu/salgam.jpg",
    category: "Icecekler",
  },
  {
    id: "kola",
    name: "Kola",
    description: "330ml kutu.",
    price: 40,
    category: "Icecekler",
  },

  // Tatlilar
  {
    id: "kunefe",
    name: "Kunefe",
    description: "Antep fistigiyla suslu sicak kunefe, dondurma ile servis edilir.",
    price: 180,
    image: "/images/menu/kunefe.jpg",
    category: "Tatlilar",
    isPopular: true,
  },
  {
    id: "baklava",
    name: "Fistikli Baklava",
    description: "Gaziantep usulu ince yaprak baklava (4 dilim).",
    price: 200,
    image: "/images/menu/baklava.jpg",
    category: "Tatlilar",
    isNew: true,
  },
];

export default async function MenuPage() {
  const siteConfig = await getSiteConfig();
  const jsonLd = restaurantJsonLd({
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    phone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    image: siteConfig.ogImage
      ? `${siteConfig.url}${siteConfig.ogImage}`
      : undefined,
    address: {
      street: "Ataturk Mah. Cumhuriyet Cad. No:42",
      city: "İstanbul",
      postalCode: "34000",
      country: "TR",
    },
    coordinates: siteConfig.business.coordinates,
    openingHours: siteConfig.business.openingHours,
    priceRange: siteConfig.business.priceRange,
    servesCuisine: siteConfig.business.servesCuisine,
    menu: `${siteConfig.url}/menu`,
  });

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Sayfa Basligi */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Menumuz
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Geleneksel Turk mutfaginin en sevilen lezzetlerini sizler icin
            ozenle hazirliyoruz. Taze malzemeler ve usta eller ile sofraniza
            en iyisini sunuyoruz.
          </p>
        </div>

        <Separator className="my-8" />

        {/* Menu Kategorileri */}
        <MenuCategory title="Tum Menu" items={menuItems} />
      </div>
    </>
  );
}
