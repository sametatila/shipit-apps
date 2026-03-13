#!/usr/bin/env tsx

import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";

// ============================================
// ShipIt Apps - Yeni Müşteri Oluşturma CLI
// ============================================
// Kullanım: pnpm create-client --name kebapci-ali --template restaurant --domain kebapciali.com

interface TemplateManifest {
  name: string;
  displayName: string;
  description: string;
  pages: string[];
  components: string[];
  config: Record<string, unknown>;
  dependencies?: string[];
}

interface CliArgs {
  name: string;
  template: string;
  domain?: string;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  const parsed: Record<string, string> = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].replace("--", "");
      const value = args[i + 1];
      if (value && !value.startsWith("--")) {
        parsed[key] = value;
        i++;
      }
    }
  }

  if (!parsed.name) {
    console.error("Hata: --name parametresi zorunludur");
    console.log("");
    console.log("Kullanim:");
    console.log(
      '  pnpm create-client --name "kebapci-ali" --template restaurant'
    );
    console.log("");
    console.log("Parametreler:");
    console.log("  --name      Proje adi (kebab-case)");
    console.log(
      "  --template  Sablon adi (restaurant, hotel, corporate, ecommerce, construction, lawyer, education)"
    );
    console.log("  --domain    Domain adi (opsiyonel)");
    console.log("");
    listTemplates();
    process.exit(1);
  }

  if (!parsed.template) {
    console.error("Hata: --template parametresi zorunludur");
    console.log("");
    listTemplates();
    process.exit(1);
  }

  return {
    name: parsed.name,
    template: parsed.template,
    domain: parsed.domain,
  };
}

function listTemplates() {
  const templatesDir = path.join(__dirname, "..", "templates");

  if (!fs.existsSync(templatesDir)) {
    console.log("Henuz sablon olusturulmamis.");
    return;
  }

  console.log("Mevcut sablonlar:");
  const templates = fs.readdirSync(templatesDir).filter((dir) => {
    const manifestPath = path.join(templatesDir, dir, "template.json");
    return fs.existsSync(manifestPath);
  });

  for (const tmpl of templates) {
    const manifest: TemplateManifest = fs.readJsonSync(
      path.join(templatesDir, tmpl, "template.json")
    );
    console.log(`  ${manifest.name.padEnd(15)} - ${manifest.displayName}`);
  }
}

function tryCreateDatabase(dbName: string): boolean {
  try {
    execSync(`psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname='${dbName}'" | grep -q 1 || psql -U postgres -c "CREATE DATABASE ${dbName}"`, {
      stdio: "pipe",
    });
    return true;
  } catch {
    return false;
  }
}

async function createClient(args: CliArgs) {
  const rootDir = path.join(__dirname, "..");
  const webTemplateDir = path.join(rootDir, "apps", "web");
  const templateDir = path.join(rootDir, "templates", args.template);
  const targetDir = path.join(rootDir, "apps", args.name);

  // Validasyonlar
  if (!fs.existsSync(webTemplateDir)) {
    console.error("Hata: apps/web template bulunamadi!");
    process.exit(1);
  }

  if (!fs.existsSync(templateDir)) {
    console.error(`Hata: '${args.template}' sablonu bulunamadi!`);
    listTemplates();
    process.exit(1);
  }

  if (fs.existsSync(targetDir)) {
    console.error(`Hata: '${args.name}' projesi zaten mevcut!`);
    process.exit(1);
  }

  const manifestPath = path.join(templateDir, "template.json");
  const manifest: TemplateManifest = fs.readJsonSync(manifestPath);

  console.log("");
  console.log(`  Yeni proje olusturuluyor...`);
  console.log(`  Ad:      ${args.name}`);
  console.log(`  Sablon:  ${manifest.displayName}`);
  console.log(`  Domain:  ${args.domain ?? "belirtilmedi"}`);
  console.log("");

  // Adim 1: apps/web'i kopyala
  console.log("  [1/7] Template kopyalaniyor...");
  await fs.copy(webTemplateDir, targetDir, {
    filter: (src) => {
      const rel = path.relative(webTemplateDir, src);
      // node_modules, .next, .turbo dizinlerini atla
      return (
        !rel.includes("node_modules") &&
        !rel.includes(".next") &&
        !rel.includes(".turbo")
      );
    },
  });

  // Adim 2: package.json'daki name'i guncelle
  console.log("  [2/7] package.json guncelleniyor...");
  const pkgPath = path.join(targetDir, "package.json");
  const pkg = fs.readJsonSync(pkgPath);
  pkg.name = `@shipit/${args.name}`;
  fs.writeJsonSync(pkgPath, pkg, { spaces: 2 });

  // Adim 3: Sektorel site.ts config'ini uygula
  console.log("  [3/7] Site konfigurasyonu uygulanıyor...");
  const templateConfigPath = path.join(templateDir, "config", "site.ts");
  if (fs.existsSync(templateConfigPath)) {
    const targetConfigPath = path.join(targetDir, "src", "config", "site.ts");
    await fs.copy(templateConfigPath, targetConfigPath);
  }

  // Adim 4: Sektörel bileşenleri kopyala
  console.log("  [4/7] Sektorel bilesenler kopyalaniyor...");
  const templateComponentsDir = path.join(templateDir, "components");
  if (fs.existsSync(templateComponentsDir)) {
    const targetComponentsDir = path.join(
      targetDir,
      "src",
      "components",
      "sector"
    );
    await fs.copy(templateComponentsDir, targetComponentsDir);
  }

  // Adim 5: Sektörel sayfaları kopyala
  console.log("  [5/7] Sektorel sayfalar kopyalaniyor...");
  const templatePagesDir = path.join(templateDir, "pages");
  if (fs.existsSync(templatePagesDir)) {
    const targetPagesDir = path.join(
      targetDir,
      "src",
      "app",
      "(marketing)"
    );
    await fs.copySync(templatePagesDir, targetPagesDir, { overwrite: true });
  }

  // Adim 6: .env.local olustur (SHIPIT_TEMPLATE dahil)
  console.log("  [6/7] .env.local olusturuluyor...");
  const dbName = args.name.replace(/-/g, "_");
  const envContent = [
    `# ${args.name} - Environment Variables`,
    `NEXT_PUBLIC_SITE_URL=${args.domain ? `https://${args.domain}` : "http://localhost:3000"}`,
    "",
    "# Template",
    `SHIPIT_TEMPLATE=${args.template}`,
    "",
    "# Database (Payload CMS)",
    `DATABASE_URI=postgresql://postgres:postgres@localhost:5432/${dbName}`,
    "PAYLOAD_SECRET=change-this-secret-key-" + Date.now(),
    "",
    "# Analytics",
    "NEXT_PUBLIC_GA_ID=",
    "NEXT_PUBLIC_GTM_ID=",
    "GOOGLE_SEARCH_CONSOLE_ID=",
    "",
    "# Bot Koruması (Cloudflare Turnstile)",
    "NEXT_PUBLIC_TURNSTILE_SITE_KEY=",
    "TURNSTILE_SECRET_KEY=",
    "",
    "# GraphQL",
    "DISABLE_GRAPHQL=false",
    "",
    "# Email (Resend)",
    "RESEND_API_KEY=",
    "EMAIL_FROM=",
    "EMAIL_TO=",
    "",
    "# Auth",
    "NEXTAUTH_URL=" +
      (args.domain ? `https://${args.domain}` : "http://localhost:3000"),
    "NEXTAUTH_SECRET=change-this-secret-" + Date.now(),
  ].join("\n");

  fs.writeFileSync(path.join(targetDir, ".env.local"), envContent);

  // Adim 7: PostgreSQL veritabanı oluştur
  console.log("  [7/7] Veritabani olusturuluyor...");
  const dbCreated = tryCreateDatabase(dbName);
  if (dbCreated) {
    console.log(`         ✓ '${dbName}' veritabani olusturuldu.`);
  } else {
    console.log(`         ⚠ Veritabani otomatik olusturulamadi.`);
    console.log(`           Manuel olusturmak icin:`);
    console.log(`           psql -U postgres -c "CREATE DATABASE ${dbName}"`);
  }

  console.log("");
  console.log("  ✓ Proje basariyla olusturuldu!");
  console.log("");
  console.log("  Sonraki adimlar:");
  console.log(`    1. .env.local dosyasini duzenleyin: apps/${args.name}/.env.local`);
  console.log(`    2. Site config'ini guncelleyin: apps/${args.name}/src/config/site.ts`);
  if (!dbCreated) {
    console.log(`    3. Veritabanini olusturun: psql -U postgres -c "CREATE DATABASE ${dbName}"`);
  }
  console.log(`    ${dbCreated ? "3" : "4"}. Dev server'i baslatin: pnpm dev --filter=@shipit/${args.name}`);
  console.log("");
  console.log("  Payload CMS admin paneli: http://localhost:3000/admin");
  console.log(`  Sadece '${manifest.displayName}' sektorune ait collection'lar yuklenecektir.`);
  console.log("");
}

// Ana calistirma
const args = parseArgs();
createClient(args).catch((err) => {
  console.error("Beklenmeyen hata:", err);
  process.exit(1);
});
