import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onRevealClick: () => void;
}

/**
 * HeroSection Component
 * 
 * Design: Dark Luxury Minimalism
 * - Centered content with ample whitespace
 * - Hero background image with rose gold accents
 * - Cairo font for heading, Amiri for body text
 * - Smooth fade-in animations
 */
export default function HeroSection({ onRevealClick }: HeroSectionProps) {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-4 py-20"
      style={{
        backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/hmkKfxMirXeD7WnP8wRkEG/sandbox/kJ1uBRO6iKPbZtaSov9L1d-img-1_1770075301000_na1fn_aGVyby1iYWNrZ3JvdW5k.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaG1rS2Z4TWlyWGVEN1duUDh3UmtFRy9zYW5kYm94L2tKMXVCUk82aUtQYlp0YVNvdjlMMWQtaW1nLTFfMTc3MDA3NTMwMTAwMF9uYTFmbl9hR1Z5YnkxaVlXTnJaM0p2ZFc1ay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ofiZhnn7tqIGnJabEgUHG51LG72Bk4Hsu3YeaFmEMAgSX3LBV2Z4FJKdzK5m1sLsBH8eMIgKE75-owt7ZjE3Du4ZoIgtnnncqE3ldxSVL3XuUbm4A3Eg5e~0o6Rg2JR9Um3AxEBymhSTTNU9VTjJbss2C-OHIYoIcyK3ExBHl2dxPN-OXgC6x1VGgaDaOkMkHehARdOI4dwclMjujl3iN8aSeYoAly-d2pf-uM14HYgWfF5~RprHEJkjpEHwOlpLw4XEmK43fEHUz7OqRcccr5leQB4OXJbTqodg~G8lb7CaUc86QOUJuTMHBl9n-hG7dY6MErJZM~gceQP8v0iIcg__)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-12 animate-fade-in">
        {/* Decorative Line Top */}
        <div className="flex justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF8A] to-transparent"
               style={{
                 boxShadow: '0 0 15px rgba(212, 175, 138, 0.4)'
               }}>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-cairo font-bold text-foreground leading-tight">
          يا رحمة..
          <br />
          <span className="text-[#D4AF8A]">مَعدنك بيظهر في الشدائد</span>
        </h1>

        {/* Decorative Line */}
        <div className="flex justify-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF8A] to-transparent"
               style={{
                 boxShadow: '0 0 15px rgba(212, 175, 138, 0.4)'
               }}>
          </div>
        </div>

        {/* Body Paragraph */}
        <p className="text-lg md:text-xl font-amiri text-foreground/90 leading-relaxed space-y-4">
          في أفعال كدة بتبين رزانة الست اللي الواحد اختارها تكون شريكته. اللي عملتيه النهاردة مش بس فعل جميل، 
          ده موقف كبّرك في نظري وخلاني فخور بيكي زي ما الأب بيفخر بنباهة بنته، ومطمن عليكي زي ما الحبيب بيطمن 
          وقلبه في إيد أمينة. مكنتش محتاج دليل على أصلك، بس إنتي النهاردة أكدتيلي إني اخترت صح.
        </p>

        {/* Decorative Line Bottom */}
        <div className="flex justify-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF8A] to-transparent"
               style={{
                 boxShadow: '0 0 15px rgba(212, 175, 138, 0.4)'
               }}>
          </div>
        </div>

        {/* Reveal Button */}
        <button
          onClick={onRevealClick}
          className="mt-8 px-8 py-3 border-2 border-[#D4AF8A] text-[#D4AF8A] font-cairo font-bold text-lg
                     hover:bg-[#D4AF8A] hover:text-background transition-all duration-700 ease-out
                     rounded-none uppercase tracking-widest"
        >
          شوفي تقديري ليكي
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
