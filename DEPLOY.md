# Deploy Rehberi

ShipIt Apps iki farklı yöntemle deploy edilebilir:

---

## Opsiyon 1: Vercel + Neon (Ücretsiz Demo)

Hızlı ve ücretsiz. Demo ve küçük projeler için ideal.

### 1. Neon PostgreSQL Veritabanı

1. [neon.tech](https://neon.tech) → yeni proje oluştur
2. **Pooled connection string**'i kopyala (önemli: `-pooler` endpoint)
3. Örnek: `postgresql://user:pass@ep-xyz-123-pooler.eu-central-1.aws.neon.tech/education_demo?sslmode=require`

### 2. Vercel'e Deploy

1. [vercel.com](https://vercel.com) → "Import Project" → GitHub repo'yu bağla
2. **Framework Preset**: Next.js
3. **Root Directory**: `apps/education-demo` (veya `apps/web`)
4. **Build Command**: `cd ../.. && npx turbo build --filter=@shipit/education-demo`
5. **Install Command**: `cd ../.. && pnpm install`
6. **Output Directory**: `.next`

### 3. Environment Variables (Vercel Dashboard → Settings → Environment Variables)

| Variable | Değer | Zorunlu |
|----------|-------|---------|
| `DATABASE_URI` | Neon pooled connection string | ✅ |
| `PAYLOAD_SECRET` | 32+ karakter random string | ✅ |
| `NEXT_PUBLIC_SITE_URL` | `https://your-app.vercel.app` | ✅ |
| `RESEND_API_KEY` | Resend API key | ❌ |
| `EMAIL_FROM` | `info@yourdomain.com` | ❌ |
| `EMAIL_TO` | `admin@yourdomain.com` | ❌ |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | ❌ |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key | ❌ |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret | ❌ |
| `DISABLE_GRAPHQL` | `true` | ❌ |

### 4. Deploy Sonrası

```bash
# Admin panel: https://your-app.vercel.app/admin
# İlk açılışta admin kullanıcı oluşturmanız istenecek
```

### Limitler (Ücretsiz Plan)

- **Vercel Hobby**: 100GB bandwidth/ay, serverless function 10s timeout
- **Neon Free**: 0.5GB storage, 190 compute hours/ay
- **Media**: Local disk yok — Payload S3/Cloudinary adapter eklenebilir (opsiyonel)

---

## Opsiyon 2: Docker + VPS (DigitalOcean Droplet)

Tam kontrol. Production ve ölçeklendirme için ideal.

### 1. Droplet Oluştur

- **Image**: Ubuntu 24.04 LTS
- **Plan**: Basic $6/ay (1 vCPU, 1GB RAM) yeterli başlangıç için
- **Region**: Frankfurt (FRA1) — Türkiye ve Almanya'ya yakın

### 2. Sunucu Kurulumu

```bash
# SSH ile bağlan
ssh root@YOUR_DROPLET_IP

# Docker & Docker Compose kur
curl -fsSL https://get.docker.com | sh
apt install -y docker-compose-plugin

# Deploy kullanıcısı oluştur
adduser deploy
usermod -aG docker deploy
su - deploy

# Repo'yu klonla
git clone https://github.com/YOUR_USERNAME/shipit-apps.git
cd shipit-apps
```

### 3. Environment Ayarları

```bash
# Docker env dosyasını oluştur
cp docker/.env.example docker/.env
nano docker/.env
```

Minimum gerekli değişkenler:
```env
APP_NAME=education-demo
DB_PASSWORD=super-guclu-sifre-buraya
PAYLOAD_SECRET=en-az-32-karakter-random-string
SITE_URL=https://yourdomain.com
```

### 4. Build & Çalıştır

```bash
# Education demo'yu başlat
cd shipit-apps
APP_NAME=education-demo docker compose -f docker/docker-compose.yml up -d --build

# Logları kontrol et
docker compose -f docker/docker-compose.yml logs -f app

# Durumu kontrol et
docker compose -f docker/docker-compose.yml ps
```

### 5. SSL Sertifikası (Let's Encrypt)

```bash
# Nginx'i production profili ile başlat
docker compose -f docker/docker-compose.yml --profile production up -d nginx certbot

# SSL sertifikası al
docker compose -f docker/docker-compose.yml --profile production run certbot \
  certonly --webroot -w /var/www/certbot -d yourdomain.com

# nginx.conf'ta HTTPS bloğunu aktif et, domain'i değiştir
nano docker/nginx.conf

# Nginx'i yeniden başlat
docker compose -f docker/docker-compose.yml --profile production restart nginx
```

### 6. SSL Otomatik Yenileme

```bash
# Crontab'a ekle (deploy kullanıcısı ile)
crontab -e

# Her ay otomatik yenile
0 3 1 * * cd /home/deploy/shipit-apps && docker compose -f docker/docker-compose.yml --profile production run certbot renew && docker compose -f docker/docker-compose.yml --profile production restart nginx
```

### 7. Güncelleme

```bash
cd /home/deploy/shipit-apps
git pull origin main
docker compose -f docker/docker-compose.yml up -d --build
```

### 8. Backup

```bash
# PostgreSQL backup
docker compose -f docker/docker-compose.yml exec db pg_dump -U postgres education_demo > backup_$(date +%Y%m%d).sql

# Restore
cat backup_20260313.sql | docker compose -f docker/docker-compose.yml exec -T db psql -U postgres education_demo
```

---

## Farklı App Deploy Etme

Her iki yöntemde de `APP_NAME` değiştirerek farklı app deploy edebilirsiniz:

```bash
# Docker ile web app
APP_NAME=web docker compose -f docker/docker-compose.yml up -d --build

# Docker ile education-demo
APP_NAME=education-demo docker compose -f docker/docker-compose.yml up -d --build
```

Vercel'de ise **Root Directory**'yi `apps/web` veya `apps/education-demo` olarak değiştirin.

---

## DNS Ayarları

| Kayıt | Tür | Değer |
|-------|-----|-------|
| `@` | A | Droplet IP adresi |
| `www` | CNAME | `yourdomain.com` |

Vercel kullanıyorsanız Vercel Dashboard → Domains kısmından ekleyin.
