import { Phone } from "lucide-react";
import { PHONE_TEL_HREF, LINE_URL } from "@/lib/businessInfo";
import { LineIcon } from "@/components/icons/LineIcon";

/**
 * Fixed bottom reservation bar, phones only (hidden ≥ md). Phone call and
 * LINE are the two lowest-friction booking channels for local guests.
 * A same-height spacer keeps the bar from covering the footer.
 */
export const MobileReserveBar = () => (
  <>
    <div
      aria-hidden
      className="md:hidden"
      style={{ height: "calc(3.5rem + env(safe-area-inset-bottom))" }}
    />
    <nav
      aria-label="快速預約"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex shadow-[0_-2px_12px_rgba(0,0,0,0.12)]"
    >
      <a
        href={PHONE_TEL_HREF}
        className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-noto text-base tracking-widest pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] transition-colors hover:bg-zen-green"
      >
        <Phone size={18} strokeWidth={1.5} />
        電話預約
      </a>
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-[#06C755] text-white font-noto text-base tracking-widest pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] transition-colors hover:bg-[#05b34c]"
      >
        <LineIcon className="w-5 h-5" />
        LINE 預約
      </a>
    </nav>
  </>
);
