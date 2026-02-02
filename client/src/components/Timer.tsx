import { useEffect, useState } from 'react';

/**
 * Timer Component
 * 
 * Design: Dark Luxury Minimalism
 * - Displays elapsed time since the beautiful action
 * - Rose Gold text color
 * - Subtle, elegant presentation
 * - Updates every second
 */
export default function Timer() {
  const [elapsed, setElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set the start time (you can modify this date as needed)
    // For now, using the moment the page loads
    const startTime = localStorage.getItem('ramaStartTime');
    const initialTime = startTime ? parseInt(startTime) : Date.now();
    
    if (!startTime) {
      localStorage.setItem('ramaStartTime', initialTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.floor((now - initialTime) / 1000); // in seconds

      const days = Math.floor(diff / (24 * 3600));
      const hours = Math.floor((diff % (24 * 3600)) / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setElapsed({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-4 bg-background/50 backdrop-blur-sm border-t border-[#2A2F4A]">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h3 className="text-lg md:text-xl font-cairo font-bold text-[#D4AF8A]">
          الوقت الذي قضيته وأنا فخور بكِ
        </h3>

        <div className="grid grid-cols-4 gap-4 md:gap-8">
          {/* Days */}
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-cairo font-bold text-[#D4AF8A]">
              {String(elapsed.days).padStart(2, '0')}
            </div>
            <p className="text-xs md:text-sm font-amiri text-muted-foreground">
              يوم
            </p>
          </div>

          {/* Hours */}
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-cairo font-bold text-[#D4AF8A]">
              {String(elapsed.hours).padStart(2, '0')}
            </div>
            <p className="text-xs md:text-sm font-amiri text-muted-foreground">
              ساعة
            </p>
          </div>

          {/* Minutes */}
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-cairo font-bold text-[#D4AF8A]">
              {String(elapsed.minutes).padStart(2, '0')}
            </div>
            <p className="text-xs md:text-sm font-amiri text-muted-foreground">
              دقيقة
            </p>
          </div>

          {/* Seconds */}
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-cairo font-bold text-[#D4AF8A]">
              {String(elapsed.seconds).padStart(2, '0')}
            </div>
            <p className="text-xs md:text-sm font-amiri text-muted-foreground">
              ثانية
            </p>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="flex justify-center pt-4">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF8A] to-transparent"
               style={{
                 boxShadow: '0 0 10px rgba(212, 175, 138, 0.3)'
               }}>
          </div>
        </div>
      </div>
    </section>
  );
}
