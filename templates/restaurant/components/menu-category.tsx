"use client";

import { useState } from "react";
import type { MenuItem } from "@/types";
import { MenuCard } from "./menu-card";

export interface MenuCategoryProps {
  title: string;
  items: MenuItem[];
}

const FILTER_ALL = "Tumu";

function getUniqueCategories(items: MenuItem[]): string[] {
  const categories = Array.from(new Set(items.map((item) => item.category)));
  return [FILTER_ALL, ...categories];
}

export function MenuCategory({ title, items }: MenuCategoryProps) {
  const [activeFilter, setActiveFilter] = useState<string>(FILTER_ALL);

  const categories = getUniqueCategories(items);
  const filteredItems =
    activeFilter === FILTER_ALL
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    <section className="py-8">
      <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
        {title}
      </h2>

      {/* Filtreleme Tab'lari */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeFilter === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Ogeleri */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <MenuCard
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            isNew={item.isNew}
            isPopular={item.isPopular}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          Bu kategoride henuz urun bulunmamaktadir.
        </p>
      )}
    </section>
  );
}
