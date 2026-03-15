import type { SeoCheckResult, SeoInput } from "./types";

// ============================================
// Title Checks
// ============================================

export function checkTitleLength(title: string): SeoCheckResult {
  const len = title.length;
  if (len >= 50 && len <= 60) {
    return {
      id: "title-length",
      label: "Başlık uzunluğu",
      status: "good",
      message: `Başlık uzunluğu ideal (${len} karakter).`,
      score: 100,
    };
  }
  if ((len >= 30 && len < 50) || (len > 60 && len <= 70)) {
    return {
      id: "title-length",
      label: "Başlık uzunluğu",
      status: "improvement",
      message: `Başlık ${len} karakter. İdeal aralık 50-60 karakter.`,
      score: 60,
    };
  }
  return {
    id: "title-length",
    label: "Başlık uzunluğu",
    status: "poor",
    message: len === 0
      ? "Meta başlık boş. Mutlaka doldurun."
      : `Başlık ${len} karakter. ${len < 30 ? "Çok kısa" : "Çok uzun"} — ideal aralık 50-60 karakter.`,
    score: len === 0 ? 0 : 20,
  };
}

export function checkKeywordInTitle(
  title: string,
  keyword: string,
): SeoCheckResult {
  if (!keyword) {
    return {
      id: "keyword-title",
      label: "Başlıkta anahtar kelime",
      status: "poor",
      message: "Odak anahtar kelime belirlenmemiş.",
      score: 0,
    };
  }
  const lowerTitle = title.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();
  if (lowerTitle.startsWith(lowerKeyword)) {
    return {
      id: "keyword-title",
      label: "Başlıkta anahtar kelime",
      status: "good",
      message: "Anahtar kelime başlığın başında yer alıyor.",
      score: 100,
    };
  }
  if (lowerTitle.includes(lowerKeyword)) {
    return {
      id: "keyword-title",
      label: "Başlıkta anahtar kelime",
      status: "improvement",
      message: "Anahtar kelime başlıkta var ama başta değil.",
      score: 70,
    };
  }
  return {
    id: "keyword-title",
    label: "Başlıkta anahtar kelime",
    status: "poor",
    message: "Anahtar kelime başlıkta bulunamadı.",
    score: 0,
  };
}

// ============================================
// Description Checks
// ============================================

export function checkDescriptionLength(desc: string): SeoCheckResult {
  const len = desc.length;
  if (len >= 120 && len <= 160) {
    return {
      id: "desc-length",
      label: "Meta açıklama uzunluğu",
      status: "good",
      message: `Meta açıklama ideal uzunlukta (${len} karakter).`,
      score: 100,
    };
  }
  if ((len >= 80 && len < 120) || (len > 160 && len <= 200)) {
    return {
      id: "desc-length",
      label: "Meta açıklama uzunluğu",
      status: "improvement",
      message: `Meta açıklama ${len} karakter. İdeal aralık 120-160 karakter.`,
      score: 60,
    };
  }
  return {
    id: "desc-length",
    label: "Meta açıklama uzunluğu",
    status: "poor",
    message: len === 0
      ? "Meta açıklama boş. Mutlaka doldurun."
      : `Meta açıklama ${len} karakter. ${len < 80 ? "Çok kısa" : "Çok uzun"} — ideal aralık 120-160 karakter.`,
    score: len === 0 ? 0 : 20,
  };
}

export function checkKeywordInDescription(
  desc: string,
  keyword: string,
): SeoCheckResult {
  if (!keyword) {
    return {
      id: "keyword-desc",
      label: "Açıklamada anahtar kelime",
      status: "poor",
      message: "Odak anahtar kelime belirlenmemiş.",
      score: 0,
    };
  }
  if (desc.toLowerCase().includes(keyword.toLowerCase())) {
    return {
      id: "keyword-desc",
      label: "Açıklamada anahtar kelime",
      status: "good",
      message: "Anahtar kelime meta açıklamada yer alıyor.",
      score: 100,
    };
  }
  return {
    id: "keyword-desc",
    label: "Açıklamada anahtar kelime",
    status: "poor",
    message: "Anahtar kelime meta açıklamada bulunamadı.",
    score: 0,
  };
}

// ============================================
// Content Checks
// ============================================

export function checkContentLength(wordCount: number): SeoCheckResult {
  if (wordCount >= 300) {
    return {
      id: "content-length",
      label: "İçerik uzunluğu",
      status: "good",
      message: `İçerik yeterli uzunlukta (${wordCount} kelime).`,
      score: 100,
    };
  }
  if (wordCount >= 150) {
    return {
      id: "content-length",
      label: "İçerik uzunluğu",
      status: "improvement",
      message: `İçerik ${wordCount} kelime. En az 300 kelime önerilir.`,
      score: 50,
    };
  }
  return {
    id: "content-length",
    label: "İçerik uzunluğu",
    status: "poor",
    message: wordCount === 0
      ? "İçerik yok. Rich text alanını doldurun."
      : `İçerik sadece ${wordCount} kelime. En az 300 kelime önerilir.`,
    score: wordCount === 0 ? 0 : 20,
  };
}

export function checkKeywordDensity(
  text: string,
  keyword: string,
): SeoCheckResult {
  if (!keyword || !text) {
    return {
      id: "keyword-density",
      label: "Anahtar kelime yoğunluğu",
      status: "poor",
      message: !keyword ? "Odak anahtar kelime belirlenmemiş." : "İçerik yok.",
      score: 0,
    };
  }
  const words = text.toLowerCase().split(/\s+/);
  const keywordWords = keyword.toLowerCase().split(/\s+/);
  const keywordLen = keywordWords.length;

  let count = 0;
  for (let i = 0; i <= words.length - keywordLen; i++) {
    if (words.slice(i, i + keywordLen).join(" ") === keywordWords.join(" ")) {
      count++;
    }
  }

  const totalWords = words.length;
  const density = totalWords > 0 ? (count * keywordLen * 100) / totalWords : 0;

  if (density >= 1 && density <= 3) {
    return {
      id: "keyword-density",
      label: "Anahtar kelime yoğunluğu",
      status: "good",
      message: `Anahtar kelime yoğunluğu ideal (%${density.toFixed(1)}).`,
      score: 100,
    };
  }
  if ((density > 0 && density < 1) || (density > 3 && density <= 4)) {
    return {
      id: "keyword-density",
      label: "Anahtar kelime yoğunluğu",
      status: "improvement",
      message: `Anahtar kelime yoğunluğu %${density.toFixed(1)}. İdeal aralık %1-3.`,
      score: 50,
    };
  }
  if (density === 0) {
    return {
      id: "keyword-density",
      label: "Anahtar kelime yoğunluğu",
      status: "poor",
      message: "Anahtar kelime içerikte hiç geçmiyor.",
      score: 0,
    };
  }
  return {
    id: "keyword-density",
    label: "Anahtar kelime yoğunluğu",
    status: "poor",
    message: `Anahtar kelime yoğunluğu çok yüksek (%${density.toFixed(1)}). Spam olarak algılanabilir.`,
    score: 20,
  };
}

export function checkKeywordInFirstParagraph(
  text: string,
  keyword: string,
): SeoCheckResult {
  if (!keyword) {
    return {
      id: "keyword-first-para",
      label: "İlk paragrafta anahtar kelime",
      status: "poor",
      message: "Odak anahtar kelime belirlenmemiş.",
      score: 0,
    };
  }
  const firstParagraph = text.split(/\n\n?/)[0] || "";
  if (firstParagraph.toLowerCase().includes(keyword.toLowerCase())) {
    return {
      id: "keyword-first-para",
      label: "İlk paragrafta anahtar kelime",
      status: "good",
      message: "Anahtar kelime ilk paragrafta yer alıyor.",
      score: 100,
    };
  }
  return {
    id: "keyword-first-para",
    label: "İlk paragrafta anahtar kelime",
    status: "poor",
    message: "Anahtar kelime ilk paragrafta bulunamadı.",
    score: 0,
  };
}

// ============================================
// Readability Checks
// ============================================

export function checkSentenceLength(text: string): SeoCheckResult {
  if (!text) {
    return {
      id: "sentence-length",
      label: "Cümle uzunluğu",
      status: "poor",
      message: "İçerik yok.",
      score: 0,
    };
  }
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length === 0) {
    return {
      id: "sentence-length",
      label: "Cümle uzunluğu",
      status: "poor",
      message: "İçerikte cümle tespit edilemedi.",
      score: 0,
    };
  }
  const avgWords =
    sentences.reduce(
      (sum, s) => sum + s.trim().split(/\s+/).length,
      0,
    ) / sentences.length;

  if (avgWords <= 20) {
    return {
      id: "sentence-length",
      label: "Cümle uzunluğu",
      status: "good",
      message: `Ortalama cümle uzunluğu iyi (${avgWords.toFixed(0)} kelime).`,
      score: 100,
    };
  }
  if (avgWords <= 25) {
    return {
      id: "sentence-length",
      label: "Cümle uzunluğu",
      status: "improvement",
      message: `Ortalama cümle uzunluğu biraz fazla (${avgWords.toFixed(0)} kelime). 20'nin altı önerilir.`,
      score: 50,
    };
  }
  return {
    id: "sentence-length",
    label: "Cümle uzunluğu",
    status: "poor",
    message: `Cümleler çok uzun (ortalama ${avgWords.toFixed(0)} kelime). Daha kısa cümleler kullanın.`,
    score: 20,
  };
}

// ============================================
// Structure Checks
// ============================================

export function checkHeadingStructure(
  headings: { level: number; text: string }[],
): SeoCheckResult {
  if (headings.length === 0) {
    return {
      id: "heading-structure",
      label: "Başlık yapısı",
      status: "poor",
      message: "İçerikte alt başlık (H2, H3) bulunamadı.",
      score: 0,
    };
  }
  const hasH2 = headings.some((h) => h.level === 2);
  if (hasH2) {
    return {
      id: "heading-structure",
      label: "Başlık yapısı",
      status: "good",
      message: `İçerikte ${headings.length} alt başlık var. Yapı uygun.`,
      score: 100,
    };
  }
  return {
    id: "heading-structure",
    label: "Başlık yapısı",
    status: "improvement",
    message: "H2 başlık bulunamadı. İçeriği H2 alt başlıklarla bölümlendirin.",
    score: 40,
  };
}

export function checkKeywordInHeadings(
  headings: { level: number; text: string }[],
  keyword: string,
): SeoCheckResult {
  if (!keyword) {
    return {
      id: "keyword-headings",
      label: "Başlıklarda anahtar kelime",
      status: "poor",
      message: "Odak anahtar kelime belirlenmemiş.",
      score: 0,
    };
  }
  if (headings.length === 0) {
    return {
      id: "keyword-headings",
      label: "Başlıklarda anahtar kelime",
      status: "poor",
      message: "İçerikte alt başlık yok.",
      score: 0,
    };
  }
  const found = headings.some((h) =>
    h.text.toLowerCase().includes(keyword.toLowerCase()),
  );
  if (found) {
    return {
      id: "keyword-headings",
      label: "Başlıklarda anahtar kelime",
      status: "good",
      message: "Anahtar kelime alt başlıklarda yer alıyor.",
      score: 100,
    };
  }
  return {
    id: "keyword-headings",
    label: "Başlıklarda anahtar kelime",
    status: "improvement",
    message: "Anahtar kelime hiçbir alt başlıkta bulunmuyor.",
    score: 30,
  };
}

// ============================================
// Link Checks
// ============================================

export function checkInternalLinks(
  links: { isInternal: boolean }[],
): SeoCheckResult {
  const internal = links.filter((l) => l.isInternal);
  if (internal.length >= 1) {
    return {
      id: "internal-links",
      label: "İç bağlantılar",
      status: "good",
      message: `${internal.length} iç bağlantı var.`,
      score: 100,
    };
  }
  return {
    id: "internal-links",
    label: "İç bağlantılar",
    status: "improvement",
    message: "İçerikte iç bağlantı yok. Diğer sayfalara link verin.",
    score: 30,
  };
}

// ============================================
// Image Checks
// ============================================

export function checkImageAltText(
  images: { altText: string | null }[],
): SeoCheckResult {
  if (images.length === 0) {
    return {
      id: "image-alt",
      label: "Görsel alt metni",
      status: "improvement",
      message: "İçerikte görsel yok. Görseller SEO'yu güçlendirir.",
      score: 50,
    };
  }
  const missing = images.filter((img) => !img.altText);
  if (missing.length === 0) {
    return {
      id: "image-alt",
      label: "Görsel alt metni",
      status: "good",
      message: `Tüm görsellerin (${images.length}) alt metni var.`,
      score: 100,
    };
  }
  return {
    id: "image-alt",
    label: "Görsel alt metni",
    status: "poor",
    message: `${missing.length}/${images.length} görselin alt metni eksik.`,
    score: Math.round(((images.length - missing.length) / images.length) * 100),
  };
}

// ============================================
// Slug Checks
// ============================================

export function checkKeywordInSlug(
  slug: string,
  keyword: string,
): SeoCheckResult {
  if (!keyword) {
    return {
      id: "keyword-slug",
      label: "URL'de anahtar kelime",
      status: "poor",
      message: "Odak anahtar kelime belirlenmemiş.",
      score: 0,
    };
  }
  const slugWords = slug.toLowerCase().replace(/-/g, " ");
  if (slugWords.includes(keyword.toLowerCase())) {
    return {
      id: "keyword-slug",
      label: "URL'de anahtar kelime",
      status: "good",
      message: "Anahtar kelime URL'de yer alıyor.",
      score: 100,
    };
  }
  return {
    id: "keyword-slug",
    label: "URL'de anahtar kelime",
    status: "improvement",
    message: "Anahtar kelime URL'de bulunamadı.",
    score: 30,
  };
}

export function checkSlugLength(slug: string): SeoCheckResult {
  if (slug.length <= 75) {
    return {
      id: "slug-length",
      label: "URL uzunluğu",
      status: "good",
      message: `URL uygun uzunlukta (${slug.length} karakter).`,
      score: 100,
    };
  }
  return {
    id: "slug-length",
    label: "URL uzunluğu",
    status: "improvement",
    message: `URL uzun (${slug.length} karakter). 75 karakterin altı önerilir.`,
    score: 40,
  };
}
