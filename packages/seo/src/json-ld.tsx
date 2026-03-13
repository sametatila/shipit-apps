import React from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export interface LocalBusinessData {
  name: string;
  description: string;
  url: string;
  phone?: string;
  email?: string;
  address: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  coordinates?: { lat: number; lng: number };
  openingHours?: string[];
  image?: string;
  priceRange?: string;
}

export function localBusinessJsonLd(data: LocalBusinessData) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.phone,
    email: data.email,
    image: data.image,
    priceRange: data.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.address.street,
      addressLocality: data.address.city,
      addressRegion: data.address.state,
      postalCode: data.address.postalCode,
      addressCountry: data.address.country,
    },
    ...(data.coordinates && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: data.coordinates.lat,
        longitude: data.coordinates.lng,
      },
    }),
    ...(data.openingHours && { openingHours: data.openingHours }),
  };
}

export function restaurantJsonLd(
  data: LocalBusinessData & {
    cuisine?: string;
    menu?: string;
    servesCuisine?: string[];
  }
) {
  return {
    ...localBusinessJsonLd(data),
    "@type": "Restaurant",
    servesCuisine: data.servesCuisine ?? (data.cuisine ? [data.cuisine] : undefined),
    hasMenu: data.menu,
  };
}

export function hotelJsonLd(
  data: LocalBusinessData & {
    starRating?: number;
    amenities?: string[];
  }
) {
  return {
    ...localBusinessJsonLd(data),
    "@type": "Hotel",
    ...(data.starRating && {
      starRating: {
        "@type": "Rating",
        ratingValue: data.starRating,
      },
    }),
    ...(data.amenities && {
      amenityFeature: data.amenities.map((a) => ({
        "@type": "LocationFeatureSpecification",
        name: a,
        value: true,
      })),
    }),
  };
}

export function legalServiceJsonLd(
  data: LocalBusinessData & {
    practiceAreas?: string[];
  }
) {
  return {
    ...localBusinessJsonLd(data),
    "@type": "LegalService",
    ...(data.practiceAreas && {
      knowsAbout: data.practiceAreas,
    }),
  };
}

export function constructionJsonLd(data: LocalBusinessData) {
  return {
    ...localBusinessJsonLd(data),
    "@type": "GeneralContractor",
  };
}

export function organizationJsonLd(
  data: LocalBusinessData & {
    logo?: string;
    sameAs?: string[];
  }
) {
  return {
    ...localBusinessJsonLd(data),
    "@type": "Organization",
    logo: data.logo,
    sameAs: data.sameAs,
  };
}

export function educationalOrganizationJsonLd(
  data: LocalBusinessData & {
    logo?: string;
    sameAs?: string[];
    foundingDate?: string;
    accreditation?: string;
  }
) {
  return {
    ...localBusinessJsonLd(data),
    "@type": "EducationalOrganization",
    logo: data.logo,
    sameAs: data.sameAs,
    ...(data.foundingDate && { foundingDate: data.foundingDate }),
    ...(data.accreditation && {
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: data.accreditation,
      },
    }),
  };
}

export function courseJsonLd(course: {
  name: string;
  description: string;
  provider: { name: string; url: string };
  url?: string;
  duration?: string;
  language?: string;
  price?: number;
  currency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    url: course.url,
    provider: {
      "@type": "Organization",
      name: course.provider.name,
      sameAs: course.provider.url,
    },
    ...(course.duration && { timeRequired: course.duration }),
    ...(course.language && { inLanguage: course.language }),
    ...(course.price !== undefined && {
      offers: {
        "@type": "Offer",
        price: course.price,
        priceCurrency: course.currency ?? "TRY",
      },
    }),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: { name: string; url?: string };
  publisher: { name: string; logo?: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: {
      "@type": "Person",
      name: article.author.name,
      ...(article.author.url && { url: article.author.url }),
    },
    publisher: {
      "@type": "Organization",
      name: article.publisher.name,
      ...(article.publisher.logo && {
        logo: {
          "@type": "ImageObject",
          url: article.publisher.logo,
        },
      }),
    },
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: { name: string; url?: string };
  publisher: { name: string; logo?: string };
  keywords?: string[];
}) {
  return {
    ...articleJsonLd(post),
    "@type": "BlogPosting",
    ...(post.keywords && { keywords: post.keywords.join(", ") }),
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  brand?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    url: product.url,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency ?? "TRY",
      availability: `https://schema.org/${product.availability ?? "InStock"}`,
    },
  };
}
