import { useEffect, useState } from 'react';

/**
 * LoadingScreen Component
 * 
 * Design: Dark Luxury Minimalism
 * - Centered thin line growing from left to right
 * - Rose Gold color (#D4AF8A)
 * - Smooth fade-in animations
 * - Arabic text with fatherly tone
 */
export default function LoadingScreen() {
  const [lineWidth, setLineWidth] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Animate line growth
    const lineInterval = setInterval(() => {
      setLineWidth(prev => {
        if (prev >= 100) {
          clearInterval(lineInterval);
          setShowText(true);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(lineInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-12 max-w-2xl px-4">
        {/* Animated Line */}
        <div className="w-64 h-px bg-gradient-to-r from-transparent via-[#D4AF8A] to-transparent"
             style={{
               width: `${lineWidth * 2.56}px`,
               transition: 'width 0.1s linear',
               boxShadow: '0 0 20px rgba(212, 175, 138, 0.5)'
             }}>
        </div>

        {/* Loading Text */}
        {showText && (
          <div className="animate-fade-in text-center space-y-6">
            <p className="text-lg font-amiri text-foreground opacity-80 animate-fade-in">
              التحقق من مستوى الاستحقاق...
            </p>
            <div className="space-y-3 text-sm font-amiri text-muted-foreground">
              <p className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                مصدر الإشارة: تعز - اليمن.
              </p>
              <p className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                المستقبل: رحمة.
              </p>
              <p className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
                الحالة: فخر واعتزاز.
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-in-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
