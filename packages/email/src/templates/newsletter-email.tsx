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

interface NewsletterEmailProps {
  siteName: string;
  previewText: string;
  content: string;
  unsubscribeUrl: string;
}

export function NewsletterEmail({
  siteName,
  previewText,
  content,
  unsubscribeUrl,
}: NewsletterEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              {siteName}
            </Heading>

            <Text
              style={{ fontSize: "15px", color: "#333", lineHeight: "1.7" }}
            >
              {content}
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
