import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/showroom";

type Props = {
  /** Service or bike name added to the prefilled WhatsApp message. */
  subject?: string;
  label?: string;
  className?: string;
  variant?: "solid" | "outline";
};

export function WhatsAppButton({
  subject,
  label = "WhatsApp Us",
  className,
  variant = "solid",
}: Props) {
  return (
    <a
      href={whatsappUrl(subject)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        subject ? `Chat on WhatsApp about ${subject}` : "Chat with the showroom on WhatsApp"
      }
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        variant === "solid"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-border text-foreground hover:bg-secondary",
        className,
      )}
    >
      <MessageCircle aria-hidden="true" className="size-4" />
      {label}
    </a>
  );
}
