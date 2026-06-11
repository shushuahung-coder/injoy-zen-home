import { Phone } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { SkipLink } from "@/components/SkipLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ADDRESS_DISPLAY,
  BUSINESS_HOURS,
  BUSINESS_HOURS_TEXT,
  CLOSED_DAYS,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
} from "@/lib/businessInfo";

// Import images with WebP fallback (src) and responsive srcSet
import signboard from "@/assets/signboard.png?w=1200&format=webp";
import signboardSrcSet from "@/assets/signboard.png?w=600;1200;1800&format=webp&as=srcset";

const Location = () => {
  useSEO({
    title: "交通資訊｜新北板橋文聖街｜injoy 悦納",
    description: `injoy 悦納位於${ADDRESS_DISPLAY}，近捷運江子翠站步行約10分鐘。${BUSINESS_HOURS_TEXT}，每${CLOSED_DAYS}公休。`,
  });

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden font-sans">
      {/* Skip Link for Accessibility */}
      <SkipLink />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative flex flex-col">
        {/* Background Image with fade effect */}
        <div className="relative h-[60vh] min-h-[400px]">
          <img
            src={signboard}
            srcSet={signboardSrcSet}
            sizes="100vw"
            alt="悦納招牌"
            className="w-full h-full object-cover"
          />
          {/* Bottom fade gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Hero Title - Below image, centered */}
        <div className="bg-background py-8 md:py-10">
          <h1 className="font-iansui text-primary text-3xl md:text-4xl lg:text-5xl tracking-[0.3em] text-center">
            交通資訊
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main id="main-content">
        {/* Map and Info Section */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            {/* Google Map Embed */}
            <div className="w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden shadow-lg mb-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.5!2d121.47822!3d25.028745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a94d17bc0517%3A0x88c1a24b258f67f7!2z5oKF57SN6JSt6aOf55Sf5rS76aSo!5e0!3m2!1szh-TW!2stw!4v1706400000000!5m2!1szh-TW!2stw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="悦納蔬食生活館地圖"
                className="w-full h-full"
              />
            </div>

            {/* Address Info */}
            <div className="text-center space-y-6">
              {/* Address */}
              <div>
                <p className="text-foreground font-medium text-lg tracking-wide">
                  {ADDRESS_DISPLAY}
                </p>
                <p className="text-muted-foreground text-base tracking-wide mt-1">
                  近捷運江子翠站（步行 10-12 分鐘）
                </p>
              </div>

              {/* Phone */}
              <a
                href={PHONE_TEL_HREF}
                className="flex items-center justify-center gap-2 text-primary hover:text-zen-green transition-colors"
              >
                <Phone size={16} strokeWidth={1.5} />
                {PHONE_DISPLAY}
              </a>

              {/* Business Hours */}
              <div className="pt-4">
                <p className="text-foreground font-medium text-base tracking-wide mb-3">
                  營業時間
                </p>
                <div className="text-muted-foreground text-base space-y-1">
                  {BUSINESS_HOURS.map(({ label, time }) => (
                    <p key={label}>
                      {label} {time}
                    </p>
                  ))}
                  <p className="mt-2">（{CLOSED_DAYS}公休）</p>
                </div>
              </div>

              {/* Welcome Message */}
              <p className="text-primary font-serif text-xl md:text-2xl tracking-widest pt-8">
                悦納，隨時歡迎你回家坐坐
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Location;
