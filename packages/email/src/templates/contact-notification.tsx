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

interface ContactNotificationProps {
  siteName: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt?: string;
  locale?: string;
}

export function ContactNotification({
  siteName,
  name,
  email,
  phone,
  message,
  submittedAt,
  locale = "tr",
}: ContactNotificationProps) {
  const t = (key: string, params?: Record<string, string | number>) =>
    getEmailTranslation(locale, key, params);

  return (
    <Html>
      <Head />
      <Preview>
        {t("contact.preview", { siteName, name })}
      </Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f6f9fc" }}>
        <Container style={{ margin: "0 auto", padding: "20px", maxWidth: "580px" }}>
          <Section style={{ backgroundColor: "#ffffff", borderRadius: "8px", padding: "32px" }}>
            <Heading style={{ fontSize: "24px", marginBottom: "16px" }}>
              {t("contact.title")}
            </Heading>
            <Text style={{ fontSize: "14px", color: "#666" }}>
              {t("contact.subtitle", { siteName })}
            </Text>
            <Hr />
            <Text><strong>{t("contact.name")}:</strong> {name}</Text>
            <Text><strong>{t("contact.email")}:</strong> {email}</Text>
            {phone && <Text><strong>{t("contact.phone")}:</strong> {phone}</Text>}
            <Hr />
            <Text><strong>{t("contact.message")}:</strong></Text>
            <Text style={{ backgroundColor: "#f6f9fc", padding: "16px", borderRadius: "4px" }}>
              {message}
            </Text>
            {submittedAt && (
              <Text style={{ fontSize: "12px", color: "#999", marginTop: "16px" }}>
                {t("contact.sentAt")}: {submittedAt}
              </Text>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
