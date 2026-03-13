import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@shipit/ui/card";
import { Button } from "@shipit/ui/button";
import { Badge } from "@shipit/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  inStock?: boolean;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  }).format(price);
}

export function ProductCard({
  id,
  name,
  description,
  price,
  image,
  category,
  inStock = true,
}: ProductCardProps) {
  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Badge variant="destructive" className="text-sm px-4 py-1">
              Stokta Yok
            </Badge>
          </div>
        )}
        {category && (
          <Badge
            variant="secondary"
            className="absolute left-3 top-3"
          >
            {category}
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1 text-lg">{name}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-primary">{formatPrice(price)}</p>
      </CardContent>
      <CardFooter>
        <Button
          className="snipcart-add-item w-full"
          disabled={!inStock}
          data-item-id={id}
          data-item-price={price}
          data-item-url={`/products/${id}`}
          data-item-name={name}
          data-item-image={image}
          data-item-description={description}
        >
          {inStock ? "Sepete Ekle" : "Stokta Yok"}
        </Button>
      </CardFooter>
    </Card>
  );
}
