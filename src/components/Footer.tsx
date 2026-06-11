import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import {
  ADDRESS_DISPLAY,
  BUSINESS_HOURS,
  CLOSED_DAYS,
  LINE_URL,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
} from "@/lib/businessInfo";
import { LineIcon } from "@/components/icons/LineIcon";

export const Footer = () => {
  return (
    <footer className="py-12 relative z-10 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Name / Address / Phone / Hours — keep in sync via businessInfo.ts */}
        <div className="text-center mb-10">
          <p className="font-serif text-foreground text-lg tracking-[0.2em] mb-4">
            injoy 悦納蔬食生活館
          </p>
          <div className="space-y-2 text-muted-foreground font-sans text-sm">
            <p>
              <Link
                to="/location"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <MapPin size={14} strokeWidth={1.5} />
                {ADDRESS_DISPLAY}
              </Link>
            </p>
            <p>
              <a
                href={PHONE_TEL_HREF}
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Phone size={14} strokeWidth={1.5} />
                {PHONE_DISPLAY}
              </a>
            </p>
            <p className="tracking-wide">
              {BUSINESS_HOURS.map(({ label, time }, i) => (
                <span key={label} className="whitespace-nowrap">
                  {i > 0 && "｜"}
                  {label} {time}
                </span>
              ))}
            </p>
            <p>每{CLOSED_DAYS}公休</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <p className="text-muted-foreground font-sans text-xs tracking-widest mb-4">
            FOLLOW US
          </p>
          <div className="flex items-center justify-center gap-6">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="LINE"
            >
              <LineIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/p/%E6%82%85%E7%B4%8D%E8%94%AC%E9%A3%9F%E7%94%9F%E6%B4%BB%E9%A4%A8-100093238144393/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/injoysharelife/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-muted-foreground font-sans text-xs mt-8">
          © {new Date().getFullYear()} injoy 悦納. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
