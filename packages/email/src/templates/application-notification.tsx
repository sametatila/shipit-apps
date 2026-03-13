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

interface ApplicationNotificationProps {
  siteName: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  programName: string;
  universityName?: string;
  submittedAt?: string;
  locale?: string;
}

export function ApplicationNotification({
  siteName,
  studentName,
  studentEmail,
  studentPhone,
  programName,
  universityName,
  submittedAt,
  locale = "tr",
}: ApplicationNotificationProps) {
  const t = (key: string, params?: Record<string, string | number>) =>
    getEmailTranslation(locale, key, params);

  return (
    <Html>
      <Head />
      <Preview>
        {t("application.preview", { siteName, name: studentName })}
      </Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f6f9fc" }}>
        <Container style={{ margin: "0 auto", padding: "20px", maxWidth: "580px" }}>
          <Section style={{ backgroundColor: "#ffffff", borderRadius: "8px", padding: "32px" }}>
            <Heading style={{ fontSize: "24px", marginBottom: "16px" }}>
              {t("application.title")}
            </Heading>
            <Text style={{ fontSize: "14px", color: "#666" }}>
              {t("application.subtitle", { siteName })}
            </Text>
            <Hr />
            <Text><strong>{t("application.student")}:</strong> {studentName}</Text>
            <Text><strong>{t("contact.email")}:</strong> {studentEmail}</Text>
            {studentPhone && <Text><strong>{t("contact.phone")}:</strong> {studentPhone}</Text>}
            <Hr />
            <Text><strong>{t("application.program")}:</strong> {programName}</Text>
            {universityName && <Text><strong>{t("application.university")}:</strong> {universityName}</Text>}
            {submittedAt && (
              <Text style={{ fontSize: "12px", color: "#999", marginTop: "16px" }}>
                {t("application.date")}: {submittedAt}
              </Text>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
