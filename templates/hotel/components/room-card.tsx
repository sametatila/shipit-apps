import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shipit/ui/card";
import { Button } from "@shipit/ui/button";
import { Badge } from "@shipit/ui/badge";

export interface RoomCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
  amenities: string[];
}

function CapacityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M5 13a10 10 0 0 1 14 0" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <line x1="12" x2="12.01" y1="20" y2="20" />
    </svg>
  );
}

function AmenityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function RoomCard({
  name,
  description,
  price,
  image,
  capacity,
  amenities,
}: RoomCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      {/* Oda Görseli */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{name}</CardTitle>
          <div className="shrink-0 text-right">
            <span className="text-xl font-bold text-primary">
              {price.toLocaleString("tr-TR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}{" "}
              TL
            </span>
            <span className="block text-xs text-muted-foreground">/ gece</span>
          </div>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Kapasite */}
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <CapacityIcon />
          <span>Maksimum {capacity} kişi</span>
        </div>

        {/* Oda Özellikleri */}
        <div className="flex flex-wrap gap-1.5">
          {amenities.slice(0, 4).map((amenity) => (
            <Badge
              key={amenity}
              variant="secondary"
              className="flex items-center gap-1 text-xs"
            >
              {amenity.toLowerCase().includes("wi-fi") ? (
                <WifiIcon />
              ) : (
                <AmenityIcon />
              )}
              {amenity}
            </Badge>
          ))}
          {amenities.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{amenities.length - 4} özellik
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full" size="lg">
          <Link href="/contact?subject=reservation">Rezervasyon Yap</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
