import { useEffect, useState } from 'react';

/**
 * RevealSection Component
 * 
 * Design: Dark Luxury Minimalism
 * - Beautiful glowing seal/medal appears with animation
 * - Rose Gold colors with soft glow effects
 * - Final message in Arabic with fatherly romantic tone
 * - Smooth fade-in and scale animations
 */
export default function RevealSection() {
  const [showSeal, setShowSeal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Trigger seal animation
    setShowSeal(true);
    
    // Show message after seal animation
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
             style={{ backgroundColor: '#D4AF8A' }}>
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
             style={{ backgroundColor: '#D4AF8A' }}>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-12">
        {/* Seal/Medal */}
        <div className={`flex justify-center transition-all duration-1000 ${
          showSeal ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}>
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <img
              src="https://private-us-east-1.manuscdn.com/sessionFile/hmkKfxMirXeD7WnP8wRkEG/sandbox/kJ1uBRO6iKPbZtaSov9L1d_1770075304482_na1fn_c2VhbC1tZWRhbA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaG1rS2Z4TWlyWGVEN1duUDh3UmtFRy9zYW5kYm94L2tKMXVCUk82aUtQYlp0YVNvdjlMMWRfMTc3MDA3NTMwNDQ4Ml9uYTFmbl9jMlZoYkMxdFpXUmhiQS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=G3x0dESnaj~dsBzgdIDCPpQzR1qf8UVJZjkw7kwphIQPRcucouu0GiB119yvCb~rJK8uG8nEVoL60Ef2ciVLAqoHM2j4a2QZ3MyZwh61ARhTWstlyxoeKCqhGpc9s4COjo84YOKYPOClSXH1R02OrpvfoLTsjb9sf1-aYouYRm6rHvR218wztiiK54KKMb46XNKY~GSVDXvzUABW-Dzqo9HkXhMNFqrqN1tTzu07ggb178AwX5X~7iVGB7fUlgOhYnIGdHV1wlbQowtC15Jao2nN9kamXtP4yuKu7gwTi0Domd8o0kx6pMwseYpcEuMO8hESTPaTLPplm1RH9zxVWA__"
              alt="ميدالية الفخر"
              className="w-full h-full object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(212, 175, 138, 0.6))',
                animation: showSeal ? 'float 3s ease-in-out infinite' : 'none'
              }}
            />
          </div>
        </div>

        {/* Final Message */}
        {showMessage && (
          <div className="animate-fade-in space-y-8">
            {/* Decorative Line */}
            <div className="flex justify-center">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF8A] to-transparent"
                   style={{
                     boxShadow: '0 0 15px rgba(212, 175, 138, 0.4)'
                   }}>
              </div>
            </div>

            {/* Message Text */}
            <p className="text-lg md:text-xl font-amiri text-foreground/90 leading-relaxed">
              المكافأة دي مش مجرد كلمة حلوة، دي وعد إني هفضل السند والضهر اللي ترمي حمولك عليه وإنتي مطمنة. 
              كبريائي بيكي النهاردة ملوش حدود. خليكي دايماً بالجمال والرقي ده.. وليكي عندي مكافأة تانية تليق بيكي 
              لما نتقابل.
            </p>

            {/* Decorative Line */}
            <div className="flex justify-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF8A] to-transparent"
                   style={{
                     boxShadow: '0 0 15px rgba(212, 175, 138, 0.4)'
                   }}>
              </div>
            </div>

            {/* Signature */}
            <p className="text-sm md:text-base font-amiri text-muted-foreground italic pt-4">
              كتبها لكِ من تعز، مبرمجكِ وسندكِ.
            </p>
          </div>
        )}
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
