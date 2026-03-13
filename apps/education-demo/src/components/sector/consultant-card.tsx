import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@shipit/ui/card";
import { Badge } from "@shipit/ui/badge";

interface ConsultantCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties?: string[];
}

export function ConsultantCard({
  name,
  role,
  image,
  bio,
  specialties,
}: ConsultantCardProps) {
  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="text-center">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="text-sm font-medium text-primary">
          {role}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
          {bio}
        </p>
        {specialties && specialties.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
