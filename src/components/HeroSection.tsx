import { ChevronDown, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { PHONE_TEL_HREF } from "@/lib/businessInfo";
import heroCafeWebp from "@/assets/hero-cafe.png?w=1600&format=webp";
import heroCafeSrcSet from "@/assets/hero-cafe.png?w=800;1600;2400&format=webp&as=srcset";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroCafeWebp}
          srcSet={heroCafeSrcSet}
          sizes="100vw"
          alt="Injoy 悦納 明亮溫馨的空間"
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1
          className="font-iansui text-primary text-2xl md:text-3xl lg:text-4xl leading-relaxed max-w-2xl mx-auto"
          style={{ textShadow: '0 0 20px hsl(50 20% 96%), 0 0 40px hsl(50 20% 96%), 0 0 60px hsl(50 20% 96% / 0.8)' }}
        >
          <span className="block mb-2">滋養會生活的生命</span>
          <span className="block mb-2">實踐有生命的生活</span>
          <span className="block text-lg md:text-xl lg:text-2xl mt-6 font-light">
            悦納，隨時歡迎你回家
          </span>
        </h1>

        {/* Primary conversion actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={PHONE_TEL_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-3 font-noto text-base tracking-widest shadow-organic hover:bg-zen-green transition-colors"
          >
            <Phone size={18} strokeWidth={1.5} />
            電話預約
          </a>
          <Link
            to="/dining"
            className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-background/70 backdrop-blur-sm text-primary px-8 py-3 font-noto text-base tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            查看菜單
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary/80 hover:text-primary transition-colors group"
        style={{ textShadow: '0 0 15px hsl(50 20% 96%), 0 0 30px hsl(50 20% 96% / 0.6)' }}
      >
        <span className="text-xs font-sans tracking-widest">探索</span>
        <ChevronDown 
          size={24} 
          className="animate-bounce-gentle group-hover:translate-y-1 transition-transform" 
        />
      </a>
    </section>
  );
};
