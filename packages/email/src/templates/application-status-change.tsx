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
import { getEmailTranslation, getStatusLabel } from "../i18n";

interface ApplicationStatusChangeProps {
  siteName: string;
  studentName: string;
  programName: string;
  oldStatus: string;
  newStatus: string;
  message?: string;
  locale?: string;
}

export function ApplicationStatusChange({
  siteName,
  studentName,
  programName,
  oldStatus,
  newStatus,
  message,
  locale = "tr",
}: ApplicationStatusChangeProps) {
  const t = (key: string, params?: Record<string, string | number>) =>
    getEmailTranslation(locale, key, params);
  const newStatusLabel = getStatusLabel(locale, newStatus);

  return (
    <Html>
      <Head />
      <Preview>
        {t("status.preview", { siteName, status: newStatusLabel })}
      </Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f6f9fc" }}>
        <Container style={{ margin: "0 auto", padding: "20px", maxWidth: "580px" }}>
          <Section style={{ backgroundColor: "#ffffff", borderRadius: "8px", padding: "32px" }}>
            <Heading style={{ fontSize: "24px", marginBottom: "16px" }}>
              {t("status.title")}
            </Heading>
            <Text style={{ fontSize: "16px" }}>
              {t("status.greeting", { name: studentName })}
            </Text>
            <Text style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
              {t("status.body", { program: programName })}
            </Text>
            <Hr />
            <Section style={{ backgroundColor: "#f0f7ff", padding: "16px", borderRadius: "4px", textAlign: "center" as const }}>
              <Text style={{ fontSize: "18px", fontWeight: "bold", color: "#1a56db" }}>
                {newStatusLabel}
              </Text>
            </Section>
            {message && (
              <>
                <Hr />
                <Text><strong>{t("status.note")}:</strong></Text>
                <Text style={{ backgroundColor: "#f6f9fc", padding: "16px", borderRadius: "4px" }}>
                  {message}
                </Text>
              </>
            )}
            <Hr />
            <Text style={{ fontSize: "12px", color: "#999" }}>
              {t("status.footer")}
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
