"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@shipit/ui/button";
import { Input } from "@shipit/ui/input";
import { Label } from "@shipit/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shipit/ui/card";

export function BookingWidget() {
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams({
      subject: "reservation",
      checkIn,
      checkOut,
      guests: String(guests),
    });

    router.push(`/contact?${params.toString()}`);
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-xl">Rezervasyon</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Giris Tarihi */}
          <div className="space-y-2">
            <Label htmlFor="check-in">Giris Tarihi</Label>
            <Input
              id="check-in"
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (e.target.value >= checkOut) {
                  const nextDay = new Date(e.target.value);
                  nextDay.setDate(nextDay.getDate() + 1);
                  setCheckOut(nextDay.toISOString().split("T")[0]);
                }
              }}
              required
            />
          </div>

          {/* Cikis Tarihi */}
          <div className="space-y-2">
            <Label htmlFor="check-out">Cikis Tarihi</Label>
            <Input
              id="check-out"
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>

          {/* Kisi Sayisi */}
          <div className="space-y-2">
            <Label htmlFor="guests">Kisi Sayisi</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                disabled={guests <= 1}
                aria-label="Kisi sayisini azalt"
              >
                <span className="text-lg font-bold">-</span>
              </Button>
              <Input
                id="guests"
                type="number"
                value={guests}
                min={1}
                max={10}
                onChange={(e) =>
                  setGuests(
                    Math.min(10, Math.max(1, parseInt(e.target.value) || 1))
                  )
                }
                className="text-center"
                required
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setGuests((prev) => Math.min(10, prev + 1))}
                disabled={guests >= 10}
                aria-label="Kisi sayisini artir"
              >
                <span className="text-lg font-bold">+</span>
              </Button>
            </div>
          </div>

          {/* Gonder Butonu */}
          <Button type="submit" className="w-full" size="lg">
            Musaitlik Sorgula
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
