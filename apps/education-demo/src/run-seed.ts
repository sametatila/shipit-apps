import { getPayload } from "payload";
import config from "./payload.config";
import { seed } from "./seed";

async function run() {
  console.log("🔗 Payload başlatılıyor...\n");

  const payload = await getPayload({ config });

  try {
    await seed(payload);
  } catch (error) {
    console.error("❌ Seed hatası:", error);
    process.exit(1);
  }

  console.log("\n🏁 İşlem tamamlandı.");
  process.exit(0);
}

run();
