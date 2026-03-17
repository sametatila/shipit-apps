import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface NewsletterWelcomeProps {
  siteName: string;
  unsubscribeUrl: string;
}

export function NewsletterWelcome({
  siteName,
  unsubscribeUrl,
}: NewsletterWelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {siteName} bültenine hoş geldiniz!
      </Preview>
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f6f9fc",
        }}
      >
        <Container
          style={{ margin: "0 auto", padding: "20px", maxWidth: "580px" }}
        >
          <Section
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "32px",
            }}
          >
            <Heading style={{ fontSize: "24px", marginBottom: "16px" }}>
              Bültenimize Hoş Geldiniz!
            </Heading>

            <Text
              style={{ fontSize: "15px", color: "#333", lineHeight: "1.7" }}
            >
              {siteName} eğitim bültenine abone olduğunuz için teşekkür ederiz.
            </Text>

            <Text
              style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}
            >
              Bundan sonra size şunları göndereceğiz:
            </Text>

            <Text
              style={{ fontSize: "14px", color: "#555", lineHeight: "1.8", paddingLeft: "16px" }}
            >
              - Almanya üniversite başvuru tarihleri ve güncellemeler{"\n"}
              - Burs fırsatları ve başvuru rehberleri{"\n"}
              - Studienkolleg ve Ausbildung ilanları{"\n"}
              - Almanya'da yaşam rehberleri ve pratik bilgiler
            </Text>

            <Hr style={{ margin: "24px 0" }} />

            <Text style={{ fontSize: "12px", color: "#999" }}>
              Bu e-postayı {siteName} bültenine abone olduğunuz için
              alıyorsunuz.
            </Text>
            <Text style={{ fontSize: "12px", color: "#999" }}>
              <Link href={unsubscribeUrl} style={{ color: "#999" }}>
                Abonelikten çık
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
