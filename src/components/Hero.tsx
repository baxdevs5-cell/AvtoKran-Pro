import React from 'react';
import { HERO_IMAGE, DEMO_STATISTICS } from '../data/cranesData.ts';
import { ArrowDown, Layers, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="bosh-sahifa" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#FFB800_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 2-column Hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Slogan & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Clean unboxed category kicker without pill capsule */}
            <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[#FFB800]">
              <span className="w-6 h-0.5 bg-[#FFB800]" />
              <span>KUCH. ANIQLIK. ISHONCH.</span>
              <span className="text-neutral-400 dark:text-neutral-500">·</span>
              <span className="text-neutral-500 dark:text-neutral-400">AVTO KRANLAR PORTALI</span>
            </div>

            {/* Hero Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-neutral-900 dark:text-white leading-[1.08] text-balance">
              HAR QANDAY YUKKA — <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] via-amber-400 to-[#FFB800]">
                ISHONCHLI YECHIM
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl font-normal">
              Og‘ir yuklarni ko‘tarishda professional yechimlar. Zamonaviy all-terrain va yuk mashinalari bazasidagi avtokranlar parametrlari, taqqoslash va xizmat hisoblagichi.
            </p>

            {/* Industrial Trust Badges - unboxed clean typography */}
            <div className="flex flex-wrap items-center gap-6 pt-1 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
                <span className="font-medium">EN 13000 xavfsizlik talablari</span>
              </div>
              <span className="text-neutral-400 dark:text-neutral-600">·</span>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#FFB800]" />
                <span className="font-medium">50 dan 1200 tonnagacha modellar</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => scrollTo('katalog')}
                className="px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black bg-[#FFB800] hover:bg-[#e5a600] active:scale-95 rounded-lg transition-all shadow-lg hover:shadow-[#FFB800]/25 flex items-center gap-3 whitespace-nowrap cursor-pointer"
              >
                <span>Kranlarni ko‘rish</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('xizmatlar')}
                className="px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-neutral-800 dark:text-white border border-neutral-300 dark:border-neutral-700 hover:border-[#FFB800] dark:hover:border-[#FFB800] hover:bg-neutral-100 dark:hover:bg-neutral-800/60 active:scale-95 rounded-lg transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Xizmatlar bilan tanishish</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero High-Impact Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl bg-neutral-900 group">
              <img
                src={HERO_IMAGE}
                alt="Zamonaviy all-terrain avtokran qurilish maydonida"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Gradient for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Technical specs overlay card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-neutral-700/60 text-white">
                <div className="flex items-center justify-between text-xs text-neutral-300 pb-1">
                  <span className="font-heading uppercase tracking-wider text-[#FFB800] font-bold">Flagman All-Terrain</span>
                  <span className="tabular-nums">1200 TONNA / 100 METR</span>
                </div>
                <p className="text-sm font-semibold text-white">
                  Yuqori aniqlikdagi gidravlika va barqarorlik tizimlari
                </p>
              </div>

              {/* Yellow Industrial Accent Tag */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#FFB800] text-black text-xs font-black uppercase font-heading tracking-wider rounded shadow-md">
                PROFESSIONAL
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Statistics strip - clearly labeled as demo illustrative values */}
        <div className="mt-14 pt-10 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-2">
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase text-neutral-900 dark:text-white font-heading">
                AVTOKRAN PARAMETRLARI VA QUVVATI
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Loyiha doirasida umumlashtirilgan ko‘rgazmali texnik diapazonlar
              </p>
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 italic">
              * Ko‘rsatkichlar katalog modellariga asosan keltirilgan
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {DEMO_STATISTICS.map((stat, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm transition-all hover:border-[#FFB800]/50"
              >
                <div className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-[#FFB800] tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
