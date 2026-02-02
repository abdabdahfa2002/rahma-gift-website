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
