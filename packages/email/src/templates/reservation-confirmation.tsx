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

interface ReservationConfirmationProps {
  siteName: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  locale?: string;
}

export function ReservationConfirmation({
  siteName,
  name,
  email,
  phone,
  date,
  time,
  guests,
  notes,
  locale = "tr",
}: ReservationConfirmationProps) {
  const t = (key: string, params?: Record<string, string | number>) =>
    getEmailTranslation(locale, key, params);

  return (
    <Html>
      <Head />
      <Preview>
        {t("reservation.preview", { siteName, name, date })}
      </Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f6f9fc" }}>
        <Container style={{ margin: "0 auto", padding: "20px", maxWidth: "580px" }}>
          <Section style={{ backgroundColor: "#ffffff", borderRadius: "8px", padding: "32px" }}>
            <Heading style={{ fontSize: "24px", marginBottom: "16px" }}>
              {t("reservation.title")}
            </Heading>
            <Text style={{ fontSize: "14px", color: "#666" }}>
              {t("reservation.subtitle", { siteName })}
            </Text>
            <Hr />
            <Text><strong>{t("contact.name")}:</strong> {name}</Text>
            <Text><strong>{t("contact.email")}:</strong> {email}</Text>
            {phone && <Text><strong>{t("contact.phone")}:</strong> {phone}</Text>}
            <Hr />
            <Text><strong>{t("reservation.date")}:</strong> {date}</Text>
            <Text><strong>{t("reservation.time")}:</strong> {time}</Text>
            <Text><strong>{t("reservation.guests")}:</strong> {guests}</Text>
            {notes && (
              <>
                <Hr />
                <Text><strong>{t("reservation.notes")}:</strong></Text>
                <Text style={{ backgroundColor: "#f6f9fc", padding: "16px", borderRadius: "4px" }}>
                  {notes}
                </Text>
              </>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
