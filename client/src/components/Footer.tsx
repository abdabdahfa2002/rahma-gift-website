/**
 * Footer Component
 * 
 * Design: Dark Luxury Minimalism
 * - Simple, elegant footer with signature
 * - Rose Gold accent color
 * - Minimal text, maximum impact
 */
export default function Footer() {
  return (
    <footer className="py-8 px-4 bg-background border-t border-[#2A2F4A]">
      <div className="max-w-3xl mx-auto text-center">
        {/* Decorative Line */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF8A] to-transparent"
               style={{
                 boxShadow: '0 0 10px rgba(212, 175, 138, 0.3)'
               }}>
          </div>
        </div>

        {/* Signature */}
        <p className="text-sm md:text-base font-amiri text-muted-foreground">
          كتبها لكِ من تعز، مبرمجكِ وسندكِ.
        </p>

        {/* Year */}
        <p className="text-xs font-amiri text-muted-foreground/60 mt-4">
          © {new Date().getFullYear()} - رحمة
        </p>
      </div>
    </footer>
  );
}
