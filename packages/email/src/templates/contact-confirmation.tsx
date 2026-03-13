import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { getEmailTranslation } from "../i18n";

interface ContactConfirmationProps {
  siteName: string;
  name: string;
  locale?: string;
}

export function ContactConfirmation({
  siteName,
  name,
  locale = "tr",
}: ContactConfirmationProps) {
  const t = (key: string, params?: Record<string, string | number>) =>
    getEmailTranslation(locale, key, params);

  return (
    <Html>
      <Head />
      <Preview>
        {t("confirmation.preview", { siteName })}
      </Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f6f9fc" }}>
        <Container style={{ margin: "0 auto", padding: "20px", maxWidth: "580px" }}>
          <Section style={{ backgroundColor: "#ffffff", borderRadius: "8px", padding: "32px" }}>
            <Heading style={{ fontSize: "24px", marginBottom: "16px" }}>
              {t("confirmation.title")}
            </Heading>
            <Text style={{ fontSize: "16px" }}>
              {t("confirmation.greeting", { name })}
            </Text>
            <Text style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
              {t("confirmation.body", { siteName })}
            </Text>
            <Hr />
            <Text style={{ fontSize: "12px", color: "#999" }}>
              {t("confirmation.footer")}
            </Text>
            <Text style={{ fontSize: "12px", color: "#999" }}>
              {siteName}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
