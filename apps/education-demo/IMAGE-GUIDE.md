# Görsel Rehberi - Almanya Eğitim Danışmanlığı

Placeholder SVG görselleri gerçek fotoğraflarla değiştirmek için bu rehberi kullanın.
Her görselin dosya yolu, alt metni ve önerilen fotoğraf açıklaması verilmiştir.

---

## Hero Görseli

| Dosya | Boyut | Format |
|-------|-------|--------|
| `public/images/hero/almanya-egitim.svg` | 1200×800px | JPG/WebP önerilir |

**Alt metin:** "Almanya'da eğitim - Üniversite kampüsünde uluslararası öğrenciler"

**Önerilen görsel:** Alman üniversite kampüsünde yürüyen, gülümseyen uluslararası öğrenci grubu. Arka planda modern üniversite binası. Parlak, pozitif ve profesyonel hava. Yüksek çözünürlük (min 1200px genişlik).

---

## Galeri Görselleri

Tüm galeri görselleri `public/images/gallery/` dizinindedir. Önerilen boyut: **800×600px**, format: **JPG/WebP**.

### 1. gallery-1.svg
**Alt metin:** "Alman üniversite kampüsü - Modern mimari, geniş avlu ve yürüyen öğrenciler"

**Önerilen görsel:** Tanınmış bir Alman üniversite kampüsünün dış görünümü (ör. LMU München, Humboldt Üniversitesi, TU Berlin). Modern veya tarihi mimari, yeşil alan, öğrenciler.

---

### 2. gallery-2.svg
**Alt metin:** "Studienkolleg dersi - Sınıf ortamında eğitmen ve uluslararası öğrenciler"

**Önerilen görsel:** Sınıf ortamında ders anı. Whiteboard veya projeksiyon, küçük grup (10-15 kişi), farklı milletlerden öğrenciler, eğitmen ders anlatırken.

---

### 3. gallery-3.svg
**Alt metin:** "Berlin şehir manzarası - Brandenburg Kapısı veya Reichstag binası önünde öğrenciler"

**Önerilen görsel:** Berlin'in ikonik yapılarından biri (Brandenburg Kapısı, Reichstag, Berlin Duvarı) önünde poz veren genç öğrenciler. Turistik ama eğitim temalı.

---

### 4. gallery-4.svg
**Alt metin:** "Alman üniversite kütüphanesi - Modern kütüphanede çalışan öğrenciler, kitaplıklar ve bilgisayarlar"

**Önerilen görsel:** Modern üniversite kütüphanesi iç mekanı. Açık, aydınlık, geniş masalar, dizüstü bilgisayarlar, kitaplıklar. Çalışan öğrenciler.

---

### 5. gallery-5.svg
**Alt metin:** "Mezuniyet töreni - Almanya'da mezun olan Türk öğrenciler, kep atma anı"

**Önerilen görsel:** Mezuniyet töreni. Akademik cüppe ve kep giyen öğrenciler, kep havaya atma veya diploma alma anı. Mutlu, kutlama havası.

---

### 6. gallery-6.svg
**Alt metin:** "Danışmanlık ofisi - Öğrenci ve danışman arasında birebir görüşme, profesyonel ortam"

**Önerilen görsel:** Profesyonel ofis ortamında danışman ve öğrenci arasında birebir görüşme. Masada belgeler, dizüstü bilgisayar. Sıcak, güven veren atmosfer.

---

### 7. gallery-7.svg
**Alt metin:** "Almanca dil kursu - Küçük grup dersi, interaktif whiteboard ve konuşma pratiği"

**Önerilen görsel:** Almanca dil kursu sınıfı. Küçük grup (5-8 kişi), interaktif whiteboard'da Almanca kelimeler/gramer, konuşma pratiği yapan öğrenciler.

---

### 8. gallery-8.svg
**Alt metin:** "München şehir manzarası - Marienplatz meydanı veya Englischer Garten parkında öğrenci hayatı"

**Önerilen görsel:** Münih'in Marienplatz meydanı veya Englischer Garten parkında günlük hayat. Öğrenciler, kafe ortamı veya park aktiviteleri. Almanya'daki yaşam kalitesini yansıtan görsel.

---

## Takım Fotoğrafları

Tüm takım görselleri `public/images/team/` dizinindedir. Önerilen boyut: **400×400px** (kare), format: **JPG/WebP**.

### 1. elif-kaya.svg
**İsim:** Dr. Elif Kaya - Kurucu & Genel Müdür
**Önerilen görsel:** Profesyonel kadın portre fotoğrafı. Kurumsal giyim, güler yüzlü, güven veren. Düz veya bulanık arka plan.

---

### 2. ahmet-schneider.svg
**İsim:** Ahmet Schneider - Üniversite Yerleştirme Uzmanı
**Önerilen görsel:** Profesyonel erkek portre fotoğrafı. Türk-Alman kökenli olduğunu yansıtabilecek. Kurumsal veya smart casual giyim.

---

### 3. selin-yilmaz.svg
**İsim:** Selin Yılmaz - Vize & İdari İşlemler Uzmanı
**Önerilen görsel:** Profesyonel kadın portre fotoğrafı. Genç, enerjik, güler yüzlü. Kurumsal giyim.

---

### 4. markus-weber.svg
**İsim:** Markus Weber - Almanca Eğitim Koordinatörü
**Önerilen görsel:** Profesyonel erkek portre fotoğrafı. Alman kökenli, Goethe-Institut deneyimli. Akademik veya smart casual giyim.

---

## Görsel Değiştirme Talimatları

1. Gerçek fotoğrafı hazırlayın (önerilen boyut ve formatta)
2. Dosya adını aynı tutun, sadece uzantıyı değiştirin (ör. `gallery-1.svg` → `gallery-1.jpg`)
3. Kod dosyalarında `.svg` uzantısını yeni uzantıyla güncelleyin:
   - **Hero:** `apps/education-demo/src/app/[locale]/page.tsx` → `image` prop
   - **Galeri:** `apps/education-demo/src/app/[locale]/(marketing)/gallery/page.tsx` → `images` dizisi
   - **Takım:** `apps/education-demo/src/app/[locale]/(marketing)/about/page.tsx` → `members` dizisi
4. WebP formatı en iyi performans/kalite oranını sağlar

## Görsel Kaynakları

Lisanssız stok fotoğraf siteleri:
- [Unsplash](https://unsplash.com) - "german university", "students germany", "berlin campus"
- [Pexels](https://pexels.com) - "education germany", "university library"
- [Pixabay](https://pixabay.com) - "studium deutschland", "universität"

Takım fotoğrafları için:
- Gerçek ekip üyeleri varsa profesyonel fotoğraf çektirin
- Stok kullanılacaksa tutarlı stil ve arka plan seçin
