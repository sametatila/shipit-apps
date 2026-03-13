import type { Metadata } from "next";
import { generatePageMetadata, JsonLd, hotelJsonLd } from "@shipit/seo";
import { getSiteConfig } from "@/lib/get-site-config";
import { Separator } from "@shipit/ui/separator";
import { RoomCard } from "@/components/room-card";
import { BookingWidget } from "@/components/booking-widget";
import type { RoomItem } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return generatePageMetadata(siteConfig, {
    title: "Odalar",
    description:
      "Konforlu ve modern odalarımızı keşfedin. Standart, Deluxe, Suite ve Kral Dairesi seçenekleri ile her bütçeye uygun konaklama.",
    path: "/rooms",
  });
}

const rooms: RoomItem[] = [
  {
    id: "standart-oda",
    name: "Standart Oda",
    description:
      "Şehir manzaralı, modern dekorasyonlu konforlu oda. Çift kişilik yatak, çalışma masası ve özel banyo.",
    price: 1200,
    image: "/images/rooms/standart.jpg",
    capacity: 2,
    amenities: [
      "Ücretsiz Wi-Fi",
      "Klima",
      "LCD TV",
      "Mini Bar",
      "Özel Banyo",
      "Saç Kurutma Makinesi",
    ],
  },
  {
    id: "deluxe-oda",
    name: "Deluxe Oda",
    description:
      "Geniş ve ferah tasarımlı, deniz manzaralı özel oda. King size yatak, oturma alanı ve premium banyo.",
    price: 2000,
    image: "/images/rooms/deluxe.jpg",
    capacity: 2,
    amenities: [
      "Ücretsiz Wi-Fi",
      "Klima",
      "55\" Smart TV",
      "Mini Bar",
      "Özel Banyo",
      "Bornoz & Terlik",
      "Nespresso Makinesi",
      "Balkon",
    ],
  },
  {
    id: "suite-oda",
    name: "Suite Oda",
    description:
      "Ayrı yatak odası ve oturma odası bulunan lüks suite. Panoramik şehir manzarası, jakuzi ve premium hizmetler.",
    price: 3500,
    image: "/images/rooms/suite.jpg",
    capacity: 3,
    amenities: [
      "Ücretsiz Wi-Fi",
      "Klima",
      "65\" Smart TV",
      "Mini Bar",
      "Jakuzi",
      "Bornoz & Terlik",
      "Nespresso Makinesi",
      "Oturma Odası",
      "Balkon",
      "Oda Servisi",
    ],
  },
  {
    id: "kral-dairesi",
    name: "Kral Dairesi",
    description:
      "En üst kat konumlu, 180 derece Boğaziçi manzaralı özel daire. İki yatak odası, özel teras, jakuzi ve VIP hizmetler.",
    price: 6000,
    image: "/images/rooms/kral-dairesi.jpg",
    capacity: 4,
    amenities: [
      "Ücretsiz Wi-Fi",
      "Klima",
      "75\" Smart TV",
      "Premium Mini Bar",
      "Jakuzi",
      "Bornoz & Terlik",
      "Nespresso Makinesi",
      "2 Yatak Odası",
      "Özel Teras",
      "VIP Oda Servisi",
      "Transfer Dahil",
      "Butler Hizmeti",
    ],
  },
];

export default async function RoomsPage() {
  const siteConfig = await getSiteConfig();
  const jsonLd = hotelJsonLd({
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    phone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    image: siteConfig.ogImage
      ? `${siteConfig.url}${siteConfig.ogImage}`
      : undefined,
    address: {
      street: "Harbiye Mah. Cumhuriyet Cad. No:15",
      city: "İstanbul",
      state: "Şişli",
      postalCode: "34367",
      country: "TR",
    },
    coordinates: siteConfig.business.coordinates,
    openingHours: siteConfig.business.openingHours,
    priceRange: siteConfig.business.priceRange,
    starRating: siteConfig.business.starRating,
    amenities: siteConfig.business.amenities,
  });

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Sayfa Başlığı */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Odalarımız
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Her biri özenle tasarlanmış odalarımızda konforlu ve huzurlu bir
            konaklama deneyimi yaşayın. İhtiyacınıza en uygun oda tipini seçin.
          </p>
        </div>

        <Separator className="my-8" />

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Oda Listesi */}
          <div className="grid gap-6 sm:grid-cols-2">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                name={room.name}
                description={room.description}
                price={room.price}
                image={room.image}
                capacity={room.capacity}
                amenities={room.amenities}
              />
            ))}
          </div>

          {/* Rezervasyon Widget */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <BookingWidget />
          </aside>
        </div>
      </div>
    </>
  );
}
