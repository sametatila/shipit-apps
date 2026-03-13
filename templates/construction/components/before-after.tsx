"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  title?: string;
}

export function BeforeAfter({
  beforeImage,
  afterImage,
  title,
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSliderPosition(Number(e.target.value));
    },
    []
  );

  return (
    <div className="w-full">
      {title && (
        <h3 className="mb-4 text-xl font-semibold">{title}</h3>
      )}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border">
        {/* Sonrasi (After) - Arka plan */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt="Sonrasi"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          />
        </div>

        {/* Oncesi (Before) - Klipsli on plan */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <Image
            src={beforeImage}
            alt="Oncesi"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          />
        </div>

        {/* Ayirici Cizgi */}
        <div
          className="absolute bottom-0 top-0 z-10 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          {/* Surukleme Tutamagi */}
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18-6-6 6-6" />
              <path d="m15 6 6 6-6 6" />
            </svg>
          </div>
        </div>

        {/* Etiketler */}
        <div className="absolute bottom-4 left-4 z-10 rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white">
          Oncesi
        </div>
        <div className="absolute bottom-4 right-4 z-10 rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white">
          Sonrasi
        </div>

        {/* Range Input - Gorunmez surukleme alani */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Oncesi ve sonrasi karsilastirma surgusu"
        />
      </div>
    </div>
  );
}
