import type { Payload } from "payload";
import { blogPosts } from "./seed-blog-data";

export async function seed(payload: Payload) {
  console.log("🌱 Seeding başlatılıyor...");

  // ============================================
  // 1. USERS (Admin + Danışmanlar)
  // ============================================
  console.log("👤 Kullanıcılar oluşturuluyor...");

  const admin = await payload.create({
    collection: "users",
    data: {
      email: "admin@almanya-egitim.com",
      password: "admin123",
      name: "Dr. Elif Kaya",
      role: "admin",
    },
  });

  const consultant1 = await payload.create({
    collection: "users",
    data: {
      email: "ahmet@almanya-egitim.com",
      password: "editor123",
      name: "Ahmet Schneider",
      role: "editor",
    },
  });

  const consultant2 = await payload.create({
    collection: "users",
    data: {
      email: "selin@almanya-egitim.com",
      password: "editor123",
      name: "Selin Yılmaz",
      role: "editor",
    },
  });

  const consultant3 = await payload.create({
    collection: "users",
    data: {
      email: "markus@almanya-egitim.com",
      password: "editor123",
      name: "Markus Weber",
      role: "editor",
    },
  });

  console.log(`  ✓ ${4} kullanıcı oluşturuldu`);

  // ============================================
  // 2. UNIVERSITIES (8 Alman Üniversitesi)
  // ============================================
  console.log("🏛️  Üniversiteler oluşturuluyor...");

  const uniTUM = await payload.create({
    collection: "universities",
    data: {
      name: "Technische Universität München (TUM)",
      slug: "tu-muenchen",
      city: "München",
      bundesland: "bayern",
      type: "tu",
      shortDescription:
        "Almanya'nın en prestijli teknik üniversitelerinden biri. Mühendislik, doğa bilimleri ve bilgisayar bilimleri alanlarında dünya çapında tanınır. 1868 yılında kurulmuştur.",
      websiteUrl: "https://www.tum.de",
      ranking: {
        qsWorld: 37,
        theWorld: 30,
      },
      stats: {
        totalStudents: 50000,
        internationalPercent: 24,
        semesterFee: "~155€/dönem",
      },
      founded: 1868,
      conditionalAcceptance: "yes",
      conditionalAcceptanceLevel: "b1",
      studienkolleg: true,
      applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
      programs: [
        { name: "Makine Mühendisliği (B.Sc.)", degree: "bachelor", language: "de" },
        { name: "Bilgisayar Bilimleri (B.Sc.)", degree: "bachelor", language: "de-en" },
        { name: "Elektrik Mühendisliği (M.Sc.)", degree: "master", language: "en" },
        { name: "Veri Mühendisliği (M.Sc.)", degree: "master", language: "en" },
        { name: "Mimarlık (B.A.)", degree: "bachelor", language: "de" },
      ],
      isPartner: true,
      sortOrder: 1,
    },
  });

  const uniLMU = await payload.create({
    collection: "universities",
    data: {
      name: "Ludwig-Maximilians-Universität München (LMU)",
      slug: "lmu-muenchen",
      city: "München",
      bundesland: "bayern",
      type: "public-uni",
      shortDescription:
        "Almanya'nın en köklü ve en büyük üniversitelerinden biri. Tıp, hukuk, işletme ve beşeri bilimler alanlarında mükemmeliyet merkezi. 1472 yılında kurulmuştur.",
      websiteUrl: "https://www.lmu.de",
      ranking: {
        qsWorld: 54,
        theWorld: 38,
      },
      stats: {
        totalStudents: 52000,
        internationalPercent: 18,
        semesterFee: "~155€/dönem",
      },
      founded: 1472,
      conditionalAcceptance: "yes",
      conditionalAcceptanceLevel: "b1",
      studienkolleg: true,
      applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
      programs: [
        { name: "Tıp (Staatsexamen)", degree: "bachelor", language: "de" },
        { name: "Hukuk (Staatsexamen)", degree: "bachelor", language: "de" },
        { name: "İşletme (B.Sc.)", degree: "bachelor", language: "de" },
        { name: "Psikoloji (M.Sc.)", degree: "master", language: "de-en" },
      ],
      isPartner: true,
      sortOrder: 2,
    },
  });

  const uniHeidelberg = await payload.create({
    collection: "universities",
    data: {
      name: "Ruprecht-Karls-Universität Heidelberg",
      slug: "uni-heidelberg",
      city: "Heidelberg",
      bundesland: "baden-wuerttemberg",
      type: "public-uni",
      shortDescription:
        "Almanya'nın en eski üniversitesi (1386). Tıp ve doğa bilimleri alanında dünyaca ünlü. Heidelberg şehrinin tarihi atmosferi ile eşsiz bir öğrenci deneyimi sunar.",
      websiteUrl: "https://www.uni-heidelberg.de",
      ranking: {
        qsWorld: 47,
        theWorld: 43,
      },
      stats: {
        totalStudents: 31000,
        internationalPercent: 20,
        semesterFee: "~172€/dönem",
      },
      founded: 1386,
      conditionalAcceptance: "yes",
      conditionalAcceptanceLevel: "b2",
      studienkolleg: true,
      applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
      programs: [
        { name: "Tıp (Staatsexamen)", degree: "bachelor", language: "de" },
        { name: "Fizik (B.Sc.)", degree: "bachelor", language: "de" },
        { name: "Moleküler Biyoloji (M.Sc.)", degree: "master", language: "en" },
      ],
      isPartner: true,
      sortOrder: 3,
    },
  });

  const uniHumboldt = await payload.create({
    collection: "universities",
    data: {
      name: "Humboldt-Universität zu Berlin",
      slug: "humboldt-berlin",
      city: "Berlin",
      bundesland: "berlin",
      type: "public-uni",
      shortDescription:
        "Berlin'in en prestijli üniversitesi, 1810 yılında Wilhelm von Humboldt tarafından kurulmuştur. Sosyal bilimler, felsefe ve doğa bilimleri alanlarında güçlüdür. 29 Nobel ödüllü mezun.",
      websiteUrl: "https://www.hu-berlin.de",
      ranking: {
        qsWorld: 120,
        theWorld: 87,
      },
      stats: {
        totalStudents: 35000,
        internationalPercent: 19,
        semesterFee: "~316€/dönem",
      },
      founded: 1810,
      conditionalAcceptance: "yes",
      conditionalAcceptanceLevel: "b2",
      studienkolleg: false,
      applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
      programs: [
        { name: "Sosyoloji (B.A.)", degree: "bachelor", language: "de" },
        { name: "Felsefe (B.A.)", degree: "bachelor", language: "de" },
        { name: "Uluslararası İlişkiler (M.A.)", degree: "master", language: "de-en" },
      ],
      isPartner: false,
      sortOrder: 4,
    },
  });

  const uniTUBerlin = await payload.create({
    collection: "universities",
    data: {
      name: "Technische Universität Berlin",
      slug: "tu-berlin",
      city: "Berlin",
      bundesland: "berlin",
      type: "tu",
      shortDescription:
        "Berlin'in önde gelen teknik üniversitesi. Mühendislik, bilgisayar bilimleri ve şehir planlaması alanlarında güçlü. Startup ekosistemi ile ünlü.",
      websiteUrl: "https://www.tu.berlin",
      ranking: {
        qsWorld: 154,
        theWorld: 140,
      },
      stats: {
        totalStudents: 34000,
        internationalPercent: 25,
        semesterFee: "~316€/dönem",
      },
      founded: 1879,
      conditionalAcceptance: "yes",
      conditionalAcceptanceLevel: "b1",
      studienkolleg: true,
      applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
      programs: [
        { name: "Bilgisayar Mühendisliği (B.Sc.)", degree: "bachelor", language: "de" },
        { name: "Endüstri Mühendisliği (B.Sc.)", degree: "bachelor", language: "de" },
        { name: "İnşaat Mühendisliği (M.Sc.)", degree: "master", language: "en" },
        { name: "Yapay Zekâ (M.Sc.)", degree: "master", language: "en" },
      ],
      isPartner: true,
      sortOrder: 5,
    },
  });

  const uniHamburg = await payload.create({
    collection: "universities",
    data: {
      name: "Universität Hamburg",
      slug: "uni-hamburg",
      city: "Hamburg",
      bundesland: "hamburg",
      type: "public-uni",
      shortDescription:
        "Kuzey Almanya'nın en büyük araştırma üniversitesi. Liman şehrinin dinamik atmosferi, güçlü uluslararası bağlantılar ve geniş program yelpazesi ile öne çıkar.",
      websiteUrl: "https://www.uni-hamburg.de",
      ranking: {
        qsWorld: 205,
        theWorld: 127,
      },
      stats: {
        totalStudents: 43000,
        internationalPercent: 13,
        semesterFee: "~335€/dönem",
      },
      founded: 1919,
      conditionalAcceptance: "yes",
      conditionalAcceptanceLevel: "b2",
      studienkolleg: true,
      applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
      programs: [
        { name: "İşletme (B.Sc.)", degree: "bachelor", language: "de" },
        { name: "Denizcilik Mühendisliği (M.Sc.)", degree: "master", language: "de-en" },
      ],
      isPartner: false,
      sortOrder: 6,
    },
  });

  const uniFH = await payload.create({
    collection: "universities",
    data: {
      name: "Hochschule München (HM)",
      slug: "hs-muenchen",
      city: "München",
      bundesland: "bayern",
      type: "fh",
      shortDescription:
        "Almanya'nın en büyük uygulamalı bilimler üniversitelerinden biri. Pratik odaklı eğitim, güçlü sanayi bağlantıları ve yüksek istihdam oranı ile bilinir.",
      websiteUrl: "https://www.hm.edu",
      ranking: {
        qsWorld: 0,
        theWorld: 0,
      },
      stats: {
        totalStudents: 18000,
        internationalPercent: 15,
        semesterFee: "~130€/dönem",
      },
      founded: 1971,
      conditionalAcceptance: "yes",
      conditionalAcceptanceLevel: "b1",
      studienkolleg: false,
      applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
      programs: [
        { name: "Mekatronik (B.Eng.)", degree: "bachelor", language: "de" },
        { name: "Uygulama Geliştirme (B.Sc.)", degree: "bachelor", language: "de" },
        { name: "Endüstriyel Tasarım (M.A.)", degree: "master", language: "en" },
      ],
      isPartner: true,
      sortOrder: 7,
    },
  });

  const uniKIT = await payload.create({
    collection: "universities",
    data: {
      name: "Karlsruher Institut für Technologie (KIT)",
      slug: "kit-karlsruhe",
      city: "Karlsruhe",
      bundesland: "baden-wuerttemberg",
      type: "tu",
      shortDescription:
        "Almanya'nın en iyi teknik üniversitelerinden biri, araştırma ve eğitimi bir arada sunan benzersiz bir yapıya sahiptir. Mühendislik ve doğa bilimlerinde uluslararası üne sahip.",
      websiteUrl: "https://www.kit.edu",
      ranking: {
        qsWorld: 119,
        theWorld: 107,
      },
      stats: {
        totalStudents: 22000,
        internationalPercent: 22,
        semesterFee: "~172€/dönem",
      },
      founded: 1825,
      conditionalAcceptance: "yes",
      conditionalAcceptanceLevel: "b1",
      studienkolleg: true,
      applicationDeadlines: { winterSemester: "15 Temmuz", summerSemester: "15 Ocak" },
      programs: [
        { name: "Makine Mühendisliği (B.Sc.)", degree: "bachelor", language: "de" },
        { name: "Elektroteknik (B.Sc.)", degree: "bachelor", language: "de" },
        { name: "Enerji Teknolojileri (M.Sc.)", degree: "master", language: "en" },
      ],
      isPartner: true,
      sortOrder: 8,
    },
  });

  console.log(`  ✓ ${8} üniversite oluşturuldu`);

  // ============================================
  // 3. COURSES (7 Eğitim Programı)
  // ============================================
  console.log("📚 Eğitim programları oluşturuluyor...");

  await payload.create({
    collection: "courses",
    data: {
      title: "Studienkolleg Hazırlık Programı",
      slug: "studienkolleg-hazirlik",
      programType: "studienkolleg",
      field: "other",
      shortDescription:
        "Türkiye'deki lise diplomanızla Alman üniversitelerine kabul alabilmek için gereken Studienkolleg programına kapsamlı hazırlık. T-Kurs, M-Kurs, W-Kurs ve G-Kurs seçenekleri.",
      language: "de",
      duration: "1 Yıl",
      germanLevel: "b1",
      tuitionInfo: "Devlet Studienkolleg'leri ücretsiz, sadece semesterbeitrag (~100-350€/dönem). Özel Studienkolleg'ler 5.000-10.000€/yıl.",
      requirements: [
        { text: "Türkiye'de lise diploması (min. 60/100 ortalama)" },
        { text: "Almanca B1 seviyesi sertifikası (Goethe, TELC veya ÖSD)" },
        { text: "Studienkolleg kabul sınavını geçmek (Aufnahmetest)" },
        { text: "Geçerli pasaport ve öğrenci vizesi" },
        { text: "Sperrkonto (bloke hesap) - 11.904€/yıl (2026)" },
      ],
      highlights: [
        { text: "Devlet Studienkolleg'leri tamamen ücretsiz" },
        { text: "Başarıyla tamamlayanlar doğrudan üniversiteye geçer" },
        { text: "4 farklı kurs türü: T-Kurs (teknik), M-Kurs (tıp), W-Kurs (işletme), G-Kurs (beşeri bilimler)" },
        { text: "FSP (Feststellungsprüfung) sınavı ile bitirme" },
        { text: "Almanca seviyenizi C1'e taşıma fırsatı" },
      ],
      applicationDeadline: "Kış dönemi: 15 Temmuz, Yaz dönemi: 15 Ocak",
      relatedUniversities: [uniTUM.id, uniLMU.id, uniHeidelberg.id],
      status: "active",
      featured: true,
      sortOrder: 1,
    },
  });

  await payload.create({
    collection: "courses",
    data: {
      title: "Almanya Lisans Programları (Bachelor)",
      slug: "lisans-bachelor",
      programType: "bachelor",
      field: "engineering",
      shortDescription:
        "Almanya'nın dünyaca ünlü üniversitelerinde lisans eğitimi. Mühendislik, tıp, işletme, bilgisayar bilimleri ve daha fazlası. Devlet üniversitelerinde ücretsiz eğitim fırsatı.",
      language: "de-en",
      duration: "3-4 Yıl (6-8 Semester)",
      germanLevel: "b2",
      tuitionInfo: "Devlet üniversiteleri: Ücretsiz (sadece semesterbeitrag ~100-380€/dönem). Baden-Württemberg eyaletinde AB dışı öğrenciler için 1.500€/dönem.",
      requirements: [
        { text: "Lise diploması + Studienkolleg veya direkt kabul (yüksek not)" },
        { text: "Almanca B2/C1 sertifikası (DSH-2 veya TestDaF 4×4)" },
        { text: "İngilizce programlar için IELTS 6.5+ veya TOEFL 80+" },
        { text: "Motivasyon mektubu ve CV" },
        { text: "Sperrkonto (bloke hesap) - 11.904€/yıl" },
        { text: "Sağlık sigortası (ayda ~110€)" },
      ],
      highlights: [
        { text: "Devlet üniversitelerinde ücretsiz eğitim" },
        { text: "Haftada 20 saate kadar çalışma izni" },
        { text: "Mezuniyet sonrası 18 ay iş arama vizesi" },
        { text: "AB'nin en güçlü ekonomisinde kariyer fırsatları" },
        { text: "200'den fazla İngilizce lisans programı" },
      ],
      applicationDeadline: "Kış dönemi: 15 Temmuz, Yaz dönemi: 15 Ocak (uni-assist üzerinden)",
      relatedUniversities: [uniTUM.id, uniLMU.id, uniTUBerlin.id, uniKIT.id],
      status: "active",
      featured: true,
      sortOrder: 2,
    },
  });

  await payload.create({
    collection: "courses",
    data: {
      title: "Almanya Yüksek Lisans Programları (Master)",
      slug: "yuksek-lisans-master",
      programType: "master",
      field: "cs",
      shortDescription:
        "Almanya'da yüksek lisans eğitimi ile kariyerinizi ileri taşıyın. 1.800'den fazla İngilizce master programı. Araştırma odaklı eğitim ve güçlü sanayi bağlantıları.",
      language: "de-en",
      duration: "1.5-2 Yıl (3-4 Semester)",
      germanLevel: "b1",
      tuitionInfo: "Devlet üniversiteleri: Ücretsiz. Özel üniversiteler: 5.000-20.000€/yıl. Çok sayıda burs imkânı mevcut (DAAD, Erasmus, Deutschlandstipendium).",
      requirements: [
        { text: "Lisans diploması (min. 2.5/4.0 veya eşdeğeri)" },
        { text: "Almanca veya İngilizce yeterlilik sertifikası" },
        { text: "GRE/GMAT (bazı programlar için)" },
        { text: "Akademik referans mektupları (2 adet)" },
        { text: "Araştırma önerisi (bazı programlar için)" },
        { text: "Staj/iş deneyimi (MBA programları için)" },
      ],
      highlights: [
        { text: "1.800+ İngilizce master programı" },
        { text: "DAAD, Erasmus+ ve Deutschlandstipendium bursları" },
        { text: "Araştırma asistanlığı ile gelir imkânı" },
        { text: "Almanya'nın güçlü Ar-Ge altyapısı" },
        { text: "Mezuniyet sonrası Almanya'da kariyer imkânı" },
      ],
      applicationDeadline: "Program ve üniversiteye göre değişir. Genellikle dönemden 3-6 ay önce.",
      relatedUniversities: [uniTUM.id, uniHeidelberg.id, uniHumboldt.id, uniKIT.id],
      status: "active",
      featured: true,
      sortOrder: 3,
    },
  });

  await payload.create({
    collection: "courses",
    data: {
      title: "Ausbildung - Mesleki Eğitim Programı",
      slug: "ausbildung-mesleki-egitim",
      programType: "ausbildung",
      field: "other",
      shortDescription:
        "Almanya'nın dünyaca ünlü dual eğitim sistemi. Haftada 2 gün okul, 3 gün işyerinde pratik. Eğitim süresince maaş alarak 300+ meslekte uzmanlaşma fırsatı.",
      language: "de",
      duration: "2-3.5 Yıl",
      germanLevel: "b1",
      tuitionInfo: "Tamamen ücretsiz, ayrıca aylık 800-1.200€ eğitim maaşı (Ausbildungsvergütung). 3. yılda 1.400€'ya kadar çıkabilir.",
      requirements: [
        { text: "Lise diploması (Hauptschulabschluss yeterli, Realschulabschluss tercih edilir)" },
        { text: "Almanca B1 seviyesi (B2 tercih edilir)" },
        { text: "Motivasyon mektubu ve CV (Almanca)" },
        { text: "İşveren ile eğitim sözleşmesi (Ausbildungsvertrag)" },
        { text: "Yaş sınırı genellikle yok (16-35 yaş arası ideal)" },
      ],
      highlights: [
        { text: "Eğitim sırasında aylık 800-1.200€ maaş" },
        { text: "300'den fazla meslek dalında eğitim imkânı" },
        { text: "Eğitim sonrası yüksek istihdam oranı (%90+)" },
        { text: "Tamamlayanlara kalıcı oturma izni kolaylığı" },
        { text: "Popüler alanlar: IT, sağlık, mekatronik, otelcilik, muhasebe" },
        { text: "İşveren sağlık sigortanızı karşılar" },
      ],
      applicationDeadline: "Yıl boyunca başvuru yapılabilir, ancak çoğu pozisyon Eylül-Şubat arasında açılır.",
      relatedUniversities: [],
      status: "active",
      featured: true,
      sortOrder: 4,
    },
  });

  await payload.create({
    collection: "courses",
    data: {
      title: "Almanca Dil Kursları (A1-C1)",
      slug: "almanca-dil-kurslari",
      programType: "language",
      field: "other",
      shortDescription:
        "Almanya'daki eğitiminize hazırlık için Almanca dil kursları. Goethe-Institut, TELC ve ÖSD sertifikasına hazırlık. Online ve yüz yüze seçenekler.",
      language: "de",
      duration: "3-12 Ay (seviyeye göre)",
      germanLevel: "none",
      tuitionInfo: "Türkiye'de: 3.000-8.000₺/seviye. Almanya'da: 400-800€/ay. Online: 200-500€/ay. Goethe-Institut: 800-1.200€/seviye.",
      requirements: [
        { text: "Herhangi bir ön koşul yok (A1'den başlanabilir)" },
        { text: "18 yaş ve üzeri (yetişkin kursları için)" },
        { text: "Almanya'daki kurslar için dil kursu vizesi gerekebilir" },
      ],
      highlights: [
        { text: "A1'den C1'e kadar tüm seviyeler" },
        { text: "TestDaF, DSH, TELC ve Goethe sınavlarına hazırlık" },
        { text: "Küçük grup dersleri (8-12 kişi)" },
        { text: "Yoğun kurslar ile hızlandırılmış öğrenme" },
        { text: "Online ve yüz yüze seçenekler" },
      ],
      applicationDeadline: "Sürekli kayıt açık. Her ay yeni gruplar başlar.",
      relatedUniversities: [],
      status: "active",
      featured: false,
      sortOrder: 5,
    },
  });


  console.log(`  ✓ ${5} eğitim programı oluşturuldu`);

  // ============================================
  // 4. SUCCESS STORIES (6 Başarı Hikayesi)
  // ============================================
  console.log("🌟 Başarı hikayeleri oluşturuluyor...");

  await payload.create({
    collection: "success-stories",
    data: {
      studentName: "Elif Yıldırım",
      university: uniTUM.id,
      universityName: "TU München",
      program: "Makine Mühendisliği (B.Sc.)",
      programType: "bachelor",
      city: "München",
      year: 2024,
      testimonial:
        "Lise son sınıfta Almanya'da okuma hayalim başladı ama nereden başlayacağımı bilmiyordum. Danışmanlık ekibi Studienkolleg sürecinden üniversite başvurusuna kadar her adımda yanımdaydı. Vize sürecindeki destekleri olmasaydı bu kadar kolay olmazdı. Şimdi TU München'de hayallerimin bölümünde okuyorum ve part-time olarak Siemens'te staj yapıyorum. Almanya'daki yaşam kalitesi ve eğitim seviyesi beklentilerimin çok üzerinde.",
      videoUrl: "https://www.youtube.com/watch?v=example1",
      rating: 5,
      isParentTestimonial: false,
      featured: true,
      isActive: true,
    },
  });

  await payload.create({
    collection: "success-stories",
    data: {
      studentName: "Burak Arslan",
      universityName: "IHK Berlin",
      program: "IT-Systemelektroniker (Ausbildung)",
      programType: "ausbildung",
      city: "Berlin",
      year: 2024,
      testimonial:
        "Lisans yerine Ausbildung tercih ettim ve çok doğru bir karardı. Firma eşleştirmesinden Almanca kursuna kadar her şeyi organize ettiler. Şimdi Berlin'de bir teknoloji şirketinde hem eğitim alıyor hem aylık 1.100€ maaş kazanıyorum. Eğitimimi bitirdikten sonra aynı firmada tam zamanlı çalışma teklifi aldım bile. Ausbildung, üniversite okumadan da Almanya'da kariyer yapmanın en iyi yolu.",
      videoUrl: "https://www.youtube.com/watch?v=example2",
      rating: 5,
      isParentTestimonial: false,
      featured: true,
      isActive: true,
    },
  });

  await payload.create({
    collection: "success-stories",
    data: {
      studentName: "Zeynep Koç (Veli)",
      university: uniHeidelberg.id,
      universityName: "Heidelberg Üniversitesi",
      program: "Tıp (Staatsexamen)",
      programType: "bachelor",
      city: "Heidelberg",
      year: 2023,
      testimonial:
        "Kızımızın Almanya'da tıp okuması için danışmanlık aldık. Sperrkonto'dan vize randevusuna, Anmeldung'dan sağlık sigortasına kadar tüm süreçte bize rehberlik ettiler. Bir ebeveyn olarak en çok güvendiğim nokta, kızımız Almanya'ya vardığında bile destek almaya devam etmesiydi. Havalimanından alınma, ev bulma ve üniversite kaydı gibi konularda yanındaydılar. Çok teşekkür ederiz.",
      rating: 5,
      isParentTestimonial: true,
      featured: true,
      isActive: true,
    },
  });

  await payload.create({
    collection: "success-stories",
    data: {
      studentName: "Oğuzhan Demir",
      university: uniTUBerlin.id,
      universityName: "TU Berlin",
      program: "Bilgisayar Bilimleri (M.Sc.)",
      programType: "master",
      city: "Berlin",
      year: 2025,
      testimonial:
        "Türkiye'de bilgisayar mühendisliği lisansımı tamamladıktan sonra Almanya'da yüksek lisans yapmak istedim. DAAD bursu başvurumda bile yardımcı oldular. Şimdi TU Berlin'de yapay zekâ üzerine tez yazıyorum ve bir startup'ta yarı zamanlı çalışıyorum. Berlin'in teknoloji ekosistemi inanılmaz, mezuniyet sonrası burada kalmayı planlıyorum.",
      videoUrl: "https://www.youtube.com/watch?v=example3",
      rating: 5,
      isParentTestimonial: false,
      featured: true,
      isActive: true,
    },
  });

  await payload.create({
    collection: "success-stories",
    data: {
      studentName: "Ayşe Yılmaz",
      university: uniLMU.id,
      universityName: "LMU München",
      program: "Psikoloji (M.Sc.)",
      programType: "master",
      city: "München",
      year: 2024,
      testimonial:
        "Almanca seviyem A2'ydi başvurduğumda. Dil kursu planlamasından sınav hazırlığına kadar her şeyi birlikte planladık. 10 ayda B2'ye ulaştım ve LMU'ya kabul aldım. Şimdi klinik psikoloji alanında stajımı yapıyorum. Almanya'da yaşam başta zor gelebilir ama doğru rehberlik ile her şey çok daha kolay.",
      rating: 4,
      isParentTestimonial: false,
      featured: false,
      isActive: true,
    },
  });

  await payload.create({
    collection: "success-stories",
    data: {
      studentName: "Mehmet Kılıç",
      universityName: "Studienkolleg Heidelberg",
      program: "T-Kurs (Teknik Alan)",
      programType: "studienkolleg",
      city: "Heidelberg",
      year: 2025,
      testimonial:
        "Türkiye'deki üniversite sınavında istediğim sonucu alamadım. Almanya'da Studienkolleg seçeneğini araştırırken bu firmayı buldum. Başvuru sürecim çok hızlı ilerledi. Şimdi Heidelberg'de T-Kurs'a devam ediyorum ve gelecek sene KIT'te mühendislik okumayı hedefliyorum. Studienkolleg'de aldığım eğitim gerçekten çok kaliteli.",
      rating: 5,
      isParentTestimonial: false,
      featured: false,
      isActive: true,
    },
  });

  console.log(`  ✓ ${6} başarı hikayesi oluşturuldu`);

  // ============================================
  // 5. TESTIMONIALS (5 Referans)
  // ============================================
  console.log("💬 Referanslar oluşturuluyor...");

  await payload.create({
    collection: "testimonials",
    data: {
      author: "Elif Yıldırım",
      role: "TU München - Makine Mühendisliği Öğrencisi",
      content:
        "Studienkolleg sürecinden üniversite başvurusuna kadar her adımda yanımdaydılar. Şimdi TU München'de hayallerimin bölümünde okuyorum. Vize sürecindeki destekleri olmasaydı bu kadar kolay olmazdı.",
      rating: 5,
      isActive: true,
    },
  });

  await payload.create({
    collection: "testimonials",
    data: {
      author: "Burak Arslan",
      role: "IT-Systemelektroniker Ausbildung - Berlin",
      content:
        "Lisans yerine Ausbildung tercih ettim ve çok doğru bir karardı. Firma eşleştirmesinden Almanca kursuna kadar her şeyi organize ettiler. Şimdi Berlin'de hem eğitim alıyor hem maaş kazanıyorum.",
      rating: 5,
      isActive: true,
    },
  });

  await payload.create({
    collection: "testimonials",
    data: {
      author: "Zeynep Koç",
      role: "Veli - Kızı Heidelberg Üniversitesi'nde Tıp Okuyor",
      content:
        "Kızımızın Almanya'da üniversite okuması için danışmanlık aldık. Sperrkonto'dan vize randevusuna, Anmeldung'dan sağlık sigortasına kadar tüm süreçte bize rehberlik ettiler.",
      rating: 5,
      isActive: true,
    },
  });

  await payload.create({
    collection: "testimonials",
    data: {
      author: "Oğuzhan Demir",
      role: "TU Berlin - Bilgisayar Bilimleri Yüksek Lisans",
      content:
        "DAAD bursu başvurumda bile yardımcı oldular. Berlin'in teknoloji ekosistemi inanılmaz, profesyonel ve samimi danışmanlık sayesinde tüm süreç sorunsuz ilerledi.",
      rating: 5,
      isActive: true,
    },
  });

  await payload.create({
    collection: "testimonials",
    data: {
      author: "Fatma Çelik",
      role: "Veli - Oğlu Hamburg'da Ausbildung Yapıyor",
      content:
        "Oğlumuz lise mezuniyetinden sonra ne yapacağını bilemiyordu. Ausbildung programını öğrenince hemen başvurduk. Şimdi Hamburg'da otelcilik eğitimi alıyor ve kendi ayakları üzerinde duruyor. Bir anne olarak çok mutluyum.",
      rating: 4,
      isActive: true,
    },
  });

  console.log(`  ✓ ${5} referans oluşturuldu`);

  // ============================================
  // 6. APPLICATIONS (5 Örnek Başvuru - CRM)
  // ============================================
  console.log("📋 Örnek başvurular oluşturuluyor...");

  await payload.create({
    collection: "applications",
    data: {
      fullName: "Deniz Yılmaz",
      email: "deniz.yilmaz@gmail.com",
      phone: "+90 532 111 2233",
      whatsapp: "+90 532 111 2233",
      currentEducation: "high-school",
      programType: "studienkolleg",
      fieldOfStudy: "Makine Mühendisliği",
      germanLevel: "a2",
      preferredSemester: "winter",
      budget: "under-10k",
      message: "Merhaba, lise son sınıf öğrencisiyim. Almanya'da mühendislik okumak istiyorum. Studienkolleg süreci hakkında bilgi alabilir miyim? Almancam şu an A2 seviyesinde, yaz aylarında B1'e çıkarmayı planlıyorum.",
      source: "instagram",
      status: "consulting",
      assignedTo: consultant1.id,
      notes: [
        {
          date: "2026-02-15",
          note: "İlk görüşme yapıldı. Öğrenci motivasyonu yüksek. A2 seviyesinde Almanca kursu devam ediyor. Haziran'da B1 sınavına girecek.",
        },
        {
          date: "2026-03-01",
          note: "Almanca kursu ilerleme raporu alındı. B1 sınavı için Haziran tarihi kesinleşti. Studienkolleg başvuru evrakları hazırlanmaya başlandı.",
        },
      ],
    },
  });

  await payload.create({
    collection: "applications",
    data: {
      fullName: "Ceren Aktaş",
      email: "ceren.aktas@outlook.com",
      phone: "+90 545 222 3344",
      whatsapp: "+90 545 222 3344",
      currentEducation: "bachelor-grad",
      programType: "master",
      fieldOfStudy: "Bilgisayar Bilimleri / Yapay Zekâ",
      germanLevel: "a1",
      preferredSemester: "winter",
      budget: "scholarship",
      message: "Bilgisayar mühendisliği mezunuyum, GPA 3.4. Almanya'da yapay zekâ alanında yüksek lisans yapmak istiyorum. DAAD bursu için şansım nedir? İngilizce programları tercih ediyorum.",
      source: "google",
      status: "documents",
      assignedTo: consultant1.id,
      notes: [
        {
          date: "2026-01-20",
          note: "Online görüşme yapıldı. GPA 3.4, güçlü profil. TU München ve TU Berlin İngilizce programları önerildi. DAAD burs başvurusu planlandı.",
        },
        {
          date: "2026-02-10",
          note: "Motivasyon mektubu ve CV taslağı hazırlandı. Referans mektupları istendi. IELTS sınav tarihi ayarlandı.",
        },
        {
          date: "2026-03-05",
          note: "IELTS sonucu: 7.0. DAAD başvurusu tamamlandı. uni-assist üzerinden TUM ve TU Berlin başvuruları hazırlanıyor.",
        },
      ],
    },
  });

  await payload.create({
    collection: "applications",
    data: {
      fullName: "Emre Şahin",
      email: "emre.sahin@hotmail.com",
      phone: "+90 507 333 4455",
      whatsapp: "+90 507 333 4455",
      currentEducation: "high-school-grad",
      programType: "ausbildung",
      fieldOfStudy: "Mekatronik / Elektronik",
      germanLevel: "b1",
      preferredSemester: "asap",
      budget: "under-10k",
      message: "Lise mezunuyum, elektronik alanında Ausbildung yapmak istiyorum. Almancam B1 seviyesinde. Ne zaman başlayabilirim? İşveren bulma konusunda yardım ediyor musunuz?",
      source: "youtube",
      status: "applied",
      assignedTo: consultant3.id,
      notes: [
        {
          date: "2026-01-10",
          note: "Telefon görüşmesi yapıldı. B1 sertifikası mevcut. Mekatronik ve elektronik alanında Ausbildung firmaları araştırılacak.",
        },
        {
          date: "2026-02-05",
          note: "3 firma ile görüşüldü. München'de Siemens AG ve Berlin'de Bosch GmbH Ausbildung pozisyonları uygun. CV ve motivasyon mektubu Almanca olarak hazırlandı.",
        },
        {
          date: "2026-02-28",
          note: "Siemens AG'den mülakata çağrı geldi. Online mülakat hazırlığı yapıldı. Mülakat tarihi: 15 Mart.",
        },
      ],
    },
  });

  await payload.create({
    collection: "applications",
    data: {
      fullName: "Sude Özkan",
      email: "sude.ozkan@gmail.com",
      phone: "+90 538 444 5566",
      currentEducation: "university",
      programType: "undecided",
      fieldOfStudy: "İşletme / Finans",
      germanLevel: "none",
      preferredSemester: "winter",
      budget: "10k-20k",
      message: "Şu an Türkiye'de işletme 2. sınıf öğrencisiyim. Almanya'ya geçiş yapmak istiyorum ama hangi yolu seçeceğime karar veremedim. Bachelor transfer mı, mezun olduktan sonra master mı? Danışmanlık almak istiyorum.",
      source: "referral",
      status: "contacted",
      assignedTo: consultant2.id,
      notes: [
        {
          date: "2026-03-10",
          note: "İlk iletişim kuruldu. WhatsApp üzerinden detaylı bilgi gönderildi. Yüz yüze görüşme için randevu alındı: 18 Mart.",
        },
      ],
    },
  });

  await payload.create({
    collection: "applications",
    data: {
      fullName: "Kaan Erdoğan",
      email: "kaan.erdogan@gmail.com",
      phone: "+90 541 555 6677",
      whatsapp: "+90 541 555 6677",
      currentEducation: "bachelor-grad",
      programType: "master",
      fieldOfStudy: "Elektrik-Elektronik Mühendisliği",
      germanLevel: "b2",
      preferredSemester: "winter",
      budget: "under-10k",
      message: "Elektrik-elektronik mühendisliği mezunuyum. KIT veya TUM'da yüksek lisans yapmak istiyorum. B2 sertifikam var, TestDaF'a hazırlanıyorum.",
      source: "event",
      status: "accepted",
      assignedTo: consultant1.id,
      notes: [
        {
          date: "2025-11-15",
          note: "Eğitim fuarında tanıştık. Profil değerlendirmesi yapıldı: güçlü aday. KIT ve TUM programları detaylı incelendi.",
        },
        {
          date: "2025-12-20",
          note: "TestDaF sonucu: TDN 4 (4x4). Harika sonuç! Başvuru evrakları tamamlandı.",
        },
        {
          date: "2026-01-30",
          note: "KIT ve TUM'a başvurular yapıldı. TUM Elektrik Mühendisliği M.Sc. programı için bekleme listesine alındı.",
        },
        {
          date: "2026-03-01",
          note: "KIT'ten kabul mektubu geldi! Sperrkonto açılıyor. Vize randevusu planlanacak.",
        },
      ],
    },
  });

  console.log(`  ✓ ${5} başvuru oluşturuldu`);

  // ============================================
  // 7. BLOG POSTS (26 Blog Yazısı)
  // ============================================
  console.log("📝 Blog yazıları oluşturuluyor...");

  const authorMap = {
    admin: admin.id,
    consultant1: consultant1.id,
    consultant2: consultant2.id,
    consultant3: consultant3.id,
  };

  for (const post of blogPosts) {
    await payload.create({
      collection: "blog-posts",
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags,
        author: authorMap[post.authorKey],
        publishedAt: post.publishedAt,
        status: post.status,
        markdownBody: post.markdownBody,
        seo: post.seo,
      },
    });
  }

  console.log(`  ✓ ${blogPosts.length} blog yazısı oluşturuldu`);

  // ============================================
  // 8. PAGES (3 CMS Sayfası)
  // ============================================
  console.log("📄 CMS sayfaları oluşturuluyor...");

  await payload.create({
    collection: "pages",
    data: {
      title: "Gizlilik Politikası",
      slug: "gizlilik-politikasi",
      status: "published",
      seo: {
        metaTitle: "Gizlilik Politikası | EuroVizyon Danışmanlık",
        metaDescription:
          "EuroVizyon Danışmanlık gizlilik politikası. Kişisel verilerinizin nasıl korunduğu hakkında bilgi.",
      },
    },
  });

  await payload.create({
    collection: "pages",
    data: {
      title: "Kullanım Koşulları",
      slug: "kullanim-kosullari",
      status: "published",
      seo: {
        metaTitle: "Kullanım Koşulları | EuroVizyon Danışmanlık",
        metaDescription: "Web sitemizin kullanım koşulları ve yasal bilgiler.",
      },
    },
  });

  await payload.create({
    collection: "pages",
    data: {
      title: "KVKK Aydınlatma Metni",
      slug: "kvkk-aydinlatma-metni",
      status: "published",
      seo: {
        metaTitle: "KVKK Aydınlatma Metni | EuroVizyon Danışmanlık",
        metaDescription:
          "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
      },
    },
  });

  console.log(`  ✓ ${3} CMS sayfası oluşturuldu`);

  // ============================================
  // 9. SITE SETTINGS (Global)
  // ============================================
  console.log("⚙️  Site ayarları güncelleniyor...");

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      siteName: "EuroVizyon Danışmanlık",
      siteDescription:
        "Türk öğrencilerin Almanya'da üniversite, Ausbildung ve dil eğitimi süreçlerinde profesyonel danışmanlık hizmeti. Studienkolleg, lisans, yüksek lisans ve Almanca kurs programları.",
      contact: {
        phone: "+90 212 555 0100",
        email: "info@almanya-egitim.com",
        address: "Levent Mahallesi, Büyükdere Caddesi No:185, Şişli / İstanbul, 34340",
        whatsapp: "+90 532 555 0100",
      },
      social: {
        instagram: "https://instagram.com/almanya-egitim",
        facebook: "https://facebook.com/almanyaegitim",
        twitter: "https://twitter.com/almanyaegitim",
        youtube: "https://youtube.com/@almanyaegitim",
        linkedin: "https://linkedin.com/company/almanya-egitim",
      },
      businessHours: [
        { day: "Pazartesi - Cuma", hours: "09:00 - 18:00" },
        { day: "Cumartesi", hours: "10:00 - 14:00" },
        { day: "Pazar", hours: "Kapalı" },
      ],
      googleMapsEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.123456789!2d29.011234!3d41.078567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA0JzQyLjgiTiAyOcKwMDAnNDAuNCJF!5e0!3m2!1str!2str!4v1234567890",
    },
  });

  console.log("  ✓ Site ayarları güncellendi");

  // ============================================
  // SERVICE PACKAGES (Hizmet Paketleri)
  // ============================================
  console.log("📦 Hizmet paketleri oluşturuluyor...");

  await payload.create({
    collection: "service-packages" as any,
    data: {
      name: "Basic Paket",
      slug: "basic",
      description: "Üniversite başvuru sürecinizi profesyonel destekle başlatın.",
      price: 1000,
      currency: "EUR",
      popular: false,
      sortOrder: 1,
      status: "active",
      ctaText: "Başvuru Yap",
      note: "Yeminli tercüme ve başvuru masrafları pakete dahildir.",
      highlights: [
        { text: "Üniversite başvuru dosyası hazırlama" },
        { text: "%100 kabul garantisi" },
        { text: "1 üniversiteye başvuru" },
        { text: "Anlaşmalı dil kursu desteği" },
      ],
      features: [
        { featureName: "Üniversite başvuru dosyasının hazırlanması", value: "Dahil" },
        { featureName: "Üniversite başvurusu, masraflar, çeviriler", value: "Dahil" },
        { featureName: "%100 Alman devlet üniversitesi kabul garantisi", value: "Dahil" },
        { featureName: "Danışmanla bire-bir toplantı", value: "1" },
        { featureName: "Üniversite başvuru imkanı", value: "1" },
        { featureName: "Whatsapp grubu - haftalık Zoom toplantısı", value: "Dahil değil" },
        { featureName: "Almanya'da dil kursu kayıt desteği", value: "Anlaşmalı dil kursu" },
        { featureName: "Vize dosyasının hazırlanması ve kontrolü", value: "Dahil değil" },
        { featureName: "Vize randevusunun erken planlanması ve başvurusu", value: "Dahil değil" },
        { featureName: "Vize kabul ve iade garantisi", value: "Dahil değil" },
        { featureName: "Almanya'da adres kaydı / oturum başvurusu desteği", value: "Dahil değil" },
        { featureName: "Almanya'daki ilk 6 ay iletişim desteği", value: "Dahil değil" },
      ],
    },
  });

  await payload.create({
    collection: "service-packages" as any,
    data: {
      name: "Standart Paket",
      slug: "standart",
      description: "Başvurudan vize sürecine kadar uçtan uca danışmanlık.",
      price: 1500,
      currency: "EUR",
      popular: false,
      sortOrder: 2,
      status: "active",
      ctaText: "Başvuru Yap",
      note: "Yeminli tercüme ve başvuru masrafları pakete dahildir.",
      highlights: [
        { text: "Vize dosyası hazırlama ve randevu" },
        { text: "WhatsApp grubu & Zoom toplantısı" },
        { text: "Vize kabul ve iade garantisi" },
        { text: "En uygun 3 dil kursu desteği" },
      ],
      features: [
        { featureName: "Üniversite başvuru dosyasının hazırlanması", value: "Dahil" },
        { featureName: "Üniversite başvurusu, masraflar, çeviriler", value: "Dahil" },
        { featureName: "%100 Alman devlet üniversitesi kabul garantisi", value: "Dahil" },
        { featureName: "Danışmanla bire-bir toplantı", value: "Dahil" },
        { featureName: "Üniversite başvuru imkanı", value: "1" },
        { featureName: "Whatsapp grubu - haftalık Zoom toplantısı", value: "Dahil" },
        { featureName: "Almanya'da dil kursu kayıt desteği", value: "En uygun 3 dil kursu" },
        { featureName: "Vize dosyasının hazırlanması ve kontrolü", value: "Dahil" },
        { featureName: "Vize randevusunun erken planlanması ve başvurusu", value: "Dahil" },
        { featureName: "Vize kabul ve iade garantisi", value: "Dahil" },
        { featureName: "Almanya'da adres kaydı / oturum başvurusu desteği", value: "Dahil değil" },
        { featureName: "Almanya'daki ilk 6 ay iletişim desteği", value: "Dahil değil" },
      ],
    },
  });

  await payload.create({
    collection: "service-packages" as any,
    data: {
      name: "Premium Paket",
      slug: "premium",
      description: "Türkiye'den Almanya'ya tam kapsamlı premium hizmet.",
      price: 2000,
      currency: "EUR",
      popular: true,
      sortOrder: 3,
      status: "active",
      ctaText: "Başvuru Yap",
      note: "Yeminli tercüme ve başvuru masrafları pakete dahildir.",
      highlights: [
        { text: "3 üniversiteye başvuru" },
        { text: "%100 vize kabul ve iade garantisi" },
        { text: "Adres kaydı ve oturum desteği" },
        { text: "İlk 6 ay iletişim desteği" },
      ],
      features: [
        { featureName: "Üniversite başvuru dosyasının hazırlanması", value: "Dahil" },
        { featureName: "Üniversite başvurusu, masraflar, çeviriler", value: "Dahil" },
        { featureName: "%100 Alman devlet üniversitesi kabul garantisi", value: "Dahil" },
        { featureName: "Danışmanla bire-bir toplantı", value: "Dahil" },
        { featureName: "Üniversite başvuru imkanı", value: "3" },
        { featureName: "Whatsapp grubu - haftalık Zoom toplantısı", value: "Dahil" },
        { featureName: "Almanya'da dil kursu kayıt desteği", value: "Üniversite bünyesinde" },
        { featureName: "Vize dosyasının hazırlanması ve kontrolü", value: "Dahil" },
        { featureName: "Vize randevusunun erken planlanması ve başvurusu", value: "Dahil" },
        { featureName: "Vize kabul ve iade garantisi", value: "%100" },
        { featureName: "Almanya'da adres kaydı / oturum başvurusu desteği", value: "Dahil" },
        { featureName: "Almanya'daki ilk 6 ay iletişim desteği", value: "Dahil" },
      ],
    },
  });

  console.log("  ✓ 3 Hizmet paketi oluşturuldu");

  // ============================================
  console.log("\n✅ Seed tamamlandı!");
  console.log("   - 4 Kullanıcı (1 admin + 3 danışman)");
  console.log("   - 8 Üniversite");
  console.log("   - 5 Eğitim Programı");
  console.log("   - 6 Başarı Hikayesi");
  console.log("   - 5 Referans");
  console.log("   - 5 Başvuru (CRM)");
  console.log("   - 26 Blog Yazısı (20 Üniversite + 6 Genel)");
  console.log("   - 3 CMS Sayfası");
  console.log("   - 3 Hizmet Paketi");
  console.log("   - 1 Site Ayarları (Global)");
  console.log("\n   Admin giriş: admin@almanya-egitim.com / admin123");
}
