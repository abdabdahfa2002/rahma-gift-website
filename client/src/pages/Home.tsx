import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/components/HeroSection';
import RevealSection from '@/components/RevealSection';
import Footer from '@/components/Footer';
import Timer from '@/components/Timer';

/**
 * Home Page - Romantic Gift Website
 * 
 * Design Philosophy: Dark Luxury Minimalism
 * - Deep Navy background (#0A0E27) with Rose Gold accents (#D4AF8A)
 * - Smooth, slow transitions for intimate feel
 * - Serif fonts (Amiri) for body, Sans-serif (Cairo) for headings
 * - Fatherly yet Romantic tone in Egyptian Arabic
 */
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showReveal, setShowReveal] = useState(false);

  useEffect(() => {
    // Simulate loading completion after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-col min-h-screen">
          {/* Navigation */}
          <nav className="bg-[#1A1F3A] border-b border-[#2A2F4A] py-4 px-4">
            <div className="max-w-6xl mx-auto flex justify-center gap-8">
              <a href="/" className="text-[#D4AF8A] font-cairo font-bold hover:text-white transition-colors">الرئيسية</a>
              <a href="/memories" className="text-foreground font-cairo hover:text-[#D4AF8A] transition-colors">الذكريات</a>
              <a href="/tasks" className="text-foreground font-cairo hover:text-[#D4AF8A] transition-colors">المهام</a>
              <a href="/events" className="text-foreground font-cairo hover:text-[#D4AF8A] transition-colors">الأحداث</a>
            </div>
          </nav>

          <main className="flex-1 flex flex-col">
            <HeroSection onRevealClick={() => setShowReveal(true)} />
            {showReveal && <RevealSection />}
          </main>
          <Timer />
          <Footer />
        </div>
      )}
    </div>
  );
}
