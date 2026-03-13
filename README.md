# ShipIt Apps

Freelance web geliştirme operasyonu için monorepo yapıda, profesyonel, güvenli ve hızlı website oluşturma altyapısı.

## Teknoloji

- **Framework:** Next.js 16 (App Router + Turbopack)
- **CMS:** Payload CMS 3.75 (Admin: `/admin`)
- **Monorepo:** Turborepo + pnpm workspaces
- **Stil:** Tailwind CSS 4 + shadcn/ui
- **i18n:** next-intl (TR, EN, DE, AR, RU, NL)
- **E-posta:** Resend
- **Analytics:** Google Analytics + GTM + Vercel Analytics
- **Bot Koruması:** Cloudflare Turnstile + Honeypot
- **Test:** Vitest
- **Deploy:** Docker + VPS / Vercel

## Proje Yapısı

```
shipit-apps/
├── apps/
│   ├── web/                  # Ana web uygulaması (base template)
│   └── education-demo/       # Eğitim danışmanlığı demo sitesi
├── packages/
│   ├── ui/                   # shadcn/ui bileşen kütüphanesi
│   ├── seo/                  # SEO metadata + JSON-LD
│   ├── analytics/            # Analytics event tracking (GA + GTM)
│   ├── email/                # E-posta template'leri (Resend)
│   ├── config-tailwind/      # Paylaşımlı Tailwind config
│   ├── config-eslint/        # Paylaşımlı ESLint config
│   └── config-typescript/    # Paylaşımlı TypeScript config
├── templates/                # Sektörel şablonlar
│   ├── restaurant/           # Menü sayfası
│   ├── hotel/                # Odalar sayfası
│   ├── corporate/            # Hizmetler sayfası
│   ├── ecommerce/            # Ürünler sayfası
│   ├── construction/         # Projeler sayfası
│   ├── lawyer/               # Uzmanlık Alanları sayfası
│   └── education/            # Eğitim danışmanlığı sayfaları
├── docker/
│   └── docker-compose.dev.yml # PostgreSQL dev ortamı
└── scripts/
    └── create-client.ts      # Yeni müşteri projesi oluşturucu
```

---

## Kurulum Rehberi (Windows)

Tüm komutlar **ana dizinden** (proje root) çalıştırılır.

### Gereksinimler

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v9+ (`npm install -g pnpm`)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (PostgreSQL için)

### 1. Bağımlılıkları Kur

```bash
pnpm install
```

### 2. PostgreSQL Başlat

Docker Desktop'ın çalıştığından emin olun, sonra:

```bash
docker compose -f docker/docker-compose.dev.yml up -d
```

Bu komut PostgreSQL 16'yı `localhost:5432`'de başlatır (user: `postgres`, pass: `postgres`).

Durumu kontrol etmek için:
```bash
docker compose -f docker/docker-compose.dev.yml ps
```

### 3. Veritabanı Oluştur

Her app'in kendi veritabanı olmalıdır. PostgreSQL konteyneri içinde oluşturun:

```bash
# web app için (varsayılan "shipit" DB zaten docker-compose'da oluşturulur)
# Ek veritabanları için:
docker exec -it docker-db-1 psql -U postgres -c "CREATE DATABASE education_demo;"
```

> Not: Konteyner adı farklı olabilir. `docker ps` ile kontrol edin.

### 4. Ortam Değişkenlerini Ayarla

Her app'in kendi `.env.local` dosyası vardır:

```bash
# web app için
copy .env.example apps\web\.env.local

# education-demo için (zaten mevcut olabilir)
copy .env.example apps\education-demo\.env.local
```

Sonra `.env.local` dosyalarını düzenleyip `DATABASE_URI`'yi kontrol edin:
- **web:** `postgresql://postgres:postgres@localhost:5432/shipit`
- **education-demo:** `postgresql://postgres:postgres@localhost:5432/education_demo`

### 5. Dev Sunucusu Başlat

```bash
# Tüm app'leri aynı anda çalıştır
pnpm dev

# Sadece belirli bir app çalıştır
pnpm --filter @shipit/web dev
pnpm --filter @shipit/education-demo dev
```

### 6. Erişim

| Sayfa | URL |
|-------|-----|
| Web Frontend | http://localhost:3000 |
| Web CMS Admin | http://localhost:3000/admin |
| Education Demo Frontend | http://localhost:3001 |
| Education Demo CMS Admin | http://localhost:3001/admin |

> İlk kez `/admin`'e girerken Payload CMS otomatik olarak admin kullanıcı oluşturmanızı ister.

---

## Yeni Müşteri Oluşturma

```bash
pnpm create-client --name kebapci-ali --template restaurant --domain kebapci-ali.com
```

Bu komut:
1. `apps/web`'i baz alarak `apps/kebapci-ali` oluşturur
2. Seçilen template'in sektörel sayfalarını kopyalar
3. `.env.local` dosyasını tüm gerekli değişkenlerle oluşturur
4. `package.json`'daki ismi günceller

Sonra yeni app için veritabanı oluşturup dev sunucusu başlatmanız yeterli:
```bash
docker exec -it docker-db-1 psql -U postgres -c "CREATE DATABASE kebapci_ali;"
# .env.local'da DATABASE_URI'yi güncelle
pnpm --filter @shipit/kebapci-ali dev
```

---

## Tüm Komutlar (Ana Dizinden)

### Geliştirme

| Komut | Açıklama |
|-------|----------|
| `pnpm dev` | Tüm app'leri çalıştır |
| `pnpm --filter @shipit/web dev` | Sadece web app |
| `pnpm --filter @shipit/education-demo dev` | Sadece education-demo |
| `pnpm build` | Production build (tümü) |
| `pnpm --filter @shipit/web build` | Sadece web build |
| `pnpm lint` | ESLint kontrolü |
| `pnpm type-check` | TypeScript type kontrolü |
| `pnpm clean` | Build çıktılarını temizle |

### Test

| Komut | Açıklama |
|-------|----------|
| `pnpm test` | Testleri çalıştır |
| `pnpm test:watch` | Testleri izle modunda çalıştır |
| `pnpm test:coverage` | Test coverage raporu |

### Veritabanı (Docker)

| Komut | Açıklama |
|-------|----------|
| `docker compose -f docker/docker-compose.dev.yml up -d` | PostgreSQL başlat |
| `docker compose -f docker/docker-compose.dev.yml down` | PostgreSQL durdur |
| `docker compose -f docker/docker-compose.dev.yml logs -f` | PostgreSQL loglarını izle |
| `docker exec -it docker-db-1 psql -U postgres` | PostgreSQL shell |

### Müşteri Yönetimi

| Komut | Açıklama |
|-------|----------|
| `pnpm create-client --name X --template Y --domain Z` | Yeni müşteri oluştur |

---

## Ortam Değişkenleri

`.env.example` dosyasından kopyalanır. Tüm değişkenler:

| Değişken | Zorunlu | Açıklama |
|----------|---------|----------|
| `NEXT_PUBLIC_SITE_URL` | Evet | Site URL'si |
| `SHIPIT_TEMPLATE` | Hayır | Sektör şablonu (restaurant, hotel, vb.) |
| `DATABASE_URI` | Evet | PostgreSQL bağlantısı |
| `PAYLOAD_SECRET` | Evet | Payload güvenlik anahtarı |
| `NEXT_PUBLIC_GA_ID` | Hayır | Google Analytics ID |
| `NEXT_PUBLIC_GTM_ID` | Hayır | Google Tag Manager ID |
| `GOOGLE_SEARCH_CONSOLE_ID` | Hayır | Search Console doğrulama |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Hayır | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Hayır | Cloudflare Turnstile secret key |
| `DISABLE_GRAPHQL` | Hayır | GraphQL endpoint'ini kapat (prod) |
| `RESEND_API_KEY` | Hayır | Resend API anahtarı |
| `EMAIL_FROM` | Hayır | Gönderici e-posta |
| `EMAIL_TO` | Hayır | Alıcı e-posta |
| `NEXTAUTH_URL` | Hayır | NextAuth URL |
| `NEXTAUTH_SECRET` | Hayır | NextAuth secret |

## Sektörel Şablonlar

| Şablon | Açıklama | Özel Sayfalar |
|--------|----------|---------------|
| `restaurant` | Restoran, kebapçı, kafe | Menü |
| `hotel` | Otel, konaklama | Odalar |
| `corporate` | Kurumsal, genel | Hizmetler |
| `ecommerce` | E-ticaret | Ürünler (Snipcart) |
| `construction` | İnşaat, mühendislik | Projeler |
| `lawyer` | Avukat, hukuk bürosu | Uzmanlık Alanları |
| `education` | Eğitim danışmanlığı | Kurslar, Üniversiteler, Başarı Hikayeleri |

## Mimari Özellikler

- **CMS ↔ Frontend Entegrasyonu:** `getSiteConfig()` ile Payload CMS'den dinamik veri çekimi, başarısız olursa statik config'e fallback
- **SEO:** Canonical URL, hreflang, JSON-LD (LocalBusiness, FAQ, Breadcrumb, Article, Course, Product vb.)
- **Dinamik Sitemap:** CMS içeriklerini otomatik dahil eder
- **OG Image:** `next/og` ile otomatik oluşturma
- **Bot Koruması:** Cloudflare Turnstile + Honeypot field
- **Mail Sistemi:** Admin + kullanıcı onay maili, başvuru bildirimleri (i18n destekli)
- **Analytics:** GA4 + GTM + conversion tracking + Search Console

## Güvenlik

- CSP, HSTS ve diğer güvenlik header'ları
- CSRF token koruması (double-submit cookie)
- Cloudflare Turnstile bot koruması
- Honeypot field (form spam önleme)
- IP bazlı rate limiting (API route'lar)
- Zod validation + HTML sanitization (XSS koruması)
- GraphQL endpoint production'da kapatılabilir

## Lisans

Private - Tüm hakları saklıdır.
