import React from 'react';
import { ShieldCheck, HardHat } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101418] text-neutral-400 border-t border-neutral-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Brand & description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-[#FFB800] flex items-center justify-center font-black text-black font-heading text-xl shadow-md">
                ▲
              </span>
              <span className="text-2xl font-black font-heading tracking-wider text-white">
                AVTOKRAN <span className="text-[#FFB800]">PRO</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              KUCH. ANIQLIK. ISHONCH. Og‘ir yuklarni ko‘tarish va maxsus texnikalar bo‘yicha professional axborot-namoyish portali.
            </p>

            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <HardHat className="w-4 h-4 text-[#FFB800]" />
              <span>O‘quv-amaliy veb-loyiha taqdimoti uchun maxsus yaratilgan</span>
            </div>
          </div>

          {/* Nav links 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-heading mb-4">
              Bo‘limlar
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('bosh-sahifa')}
                  className="hover:text-[#FFB800] transition-colors"
                >
                  Bosh sahifa
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('katalog')}
                  className="hover:text-[#FFB800] transition-colors"
                >
                  Avtokranlar katalogi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('taqqoslash')}
                  className="hover:text-[#FFB800] transition-colors"
                >
                  Texnikalarni taqqoslash
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('xizmatlar')}
                  className="hover:text-[#FFB800] transition-colors"
                >
                  Xizmatlar yo‘nalishlari
                </button>
              </li>
            </ul>
          </div>

          {/* Nav links 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-heading mb-4">
              Interaktiv Vositlar
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('hisoblagich')}
                  className="hover:text-[#FFB800] transition-colors"
                >
                  Kran hisoblagichi (Demo)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('xavfsizlik')}
                  className="hover:text-[#FFB800] transition-colors"
                >
                  Xavfsizlik va bilim testi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('aloqa')}
                  className="hover:text-[#FFB800] transition-colors"
                >
                  So‘rov shakli
                </button>
              </li>
            </ul>
          </div>

          {/* Technical safety notice */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-heading">
              Xavfsizlik Bildirishnomasi
            </h4>
            <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] leading-relaxed text-neutral-400">
              <div className="flex items-center gap-1.5 text-[#FFB800] font-bold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Texnika Xavfsizligi</span>
              </div>
              Barcha kran operatsiyalari faqat sertifikatlangan kran operatorlari va maxsus himoya vositalari bilan jihozlangan rigging xodimlari nazoratida amalga oshirilishi shart.
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} AVTOKRAN PRO. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-4">
            <span>Maktab va o‘quv baholash loyihasi</span>
            <span aria-hidden="true">·</span>
            <span>O‘zbek tili (Lotin alifbosi)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
