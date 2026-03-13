import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shipit/ui/card";
import { Badge } from "@shipit/ui/badge";

export interface MenuCardProps {
  name: string;
  description?: string;
  price: number;
  image?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

export function MenuCard({
  name,
  description,
  price,
  image,
  isNew,
  isPopular,
}: MenuCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      {image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute right-2 top-2 flex gap-1.5">
            {isNew && (
              <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                Yeni
              </Badge>
            )}
            {isPopular && (
              <Badge variant="default" className="bg-orange-600 hover:bg-orange-700">
                Populer
              </Badge>
            )}
          </div>
        </div>
      )}

      <CardHeader className={image ? "pb-2" : "pb-2"}>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{name}</CardTitle>
          <span className="shrink-0 text-lg font-bold text-primary">
            {price.toLocaleString("tr-TR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}{" "}
            TL
          </span>
        </div>
      </CardHeader>

      {description && (
        <CardContent className="pt-0">
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
          {!image && (isNew || isPopular) && (
            <div className="mt-2 flex gap-1.5">
              {isNew && (
                <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                  Yeni
                </Badge>
              )}
              {isPopular && (
                <Badge variant="default" className="bg-orange-600 hover:bg-orange-700">
                  Populer
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
