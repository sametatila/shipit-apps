"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@shipit/ui";
import { useContactModal } from "@/contexts/contact-modal-context";
import { ContactForm } from "@/components/forms/contact-form";

export function ContactModal() {
  const { isOpen, close } = useContactModal();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Ücretsiz Danışmanlık
          </DialogTitle>
          <DialogDescription>
            Formu doldurun, uzman danışmanlarımız en kısa sürede sizinle iletişime geçsin.
          </DialogDescription>
        </DialogHeader>
        <ContactForm source="modal" onSuccess={() => setTimeout(close, 3000)} />
      </DialogContent>
    </Dialog>
  );
}
