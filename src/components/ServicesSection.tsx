import React from 'react';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { Truck, Building2, Wrench, Hammer, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '../types/index.ts';

interface ServicesSectionProps {
  onSelectServiceForCalculator: (serviceTitle: string) => void;
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForCalculator,
  onSelectServiceForContact,
}) => {
  const getIcon = (name: ServiceItem['iconName']) => {
    switch (name) {
      case 'truck':
        return <Truck className="w-6 h-6 text-[#FFB800]" />;
      case 'building':
        return <Building2 className="w-6 h-6 text-[#FFB800]" />;
      case 'wrench':
        return <Wrench className="w-6 h-6 text-[#FFB800]" />;
      case 'hammer':
        return <Hammer className="w-6 h-6 text-[#FFB800]" />;
      case 'shield-check':
        return <ShieldCheck className="w-6 h-6 text-[#FFB800]" />;
      default:
        return <Truck className="w-6 h-6 text-[#FFB800]" />;
    }
  };

  return (
    <section id="xizmatlar" className="py-16 lg:py-24 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FFB800]">
              <span>Xizmatlar Yo‘nalishi</span>
              <span className="text-neutral-400">·</span>
              <span>Professional Yechimlar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-neutral-900 dark:text-white mt-1">
              XIZMATLARIMIZ
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl">
              Og‘ir yuklarni ko‘tarish, ko‘chirish va montaj qilish bo‘yicha namunaviy xizmatlar turlari.
              Har bir loyiha uchun kran tanlash va xavfsizlik standartlariga qat’iy rioya qilinadi.
            </p>
          </div>

          <div className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs text-left md:text-right">
            * Mazkur xizmatlar o‘quv loyihasi namunasi sifatida taqdim etilmoqda
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              className={`bg-white dark:bg-[#15191E] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div>
                {/* Top bar of card */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-center shrink-0 group-hover:border-[#FFB800] transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-bold font-heading uppercase text-neutral-400 dark:text-neutral-500 tabular-nums">
                    0{index + 1}. XIZMAT
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl sm:text-2xl font-black font-heading text-neutral-900 dark:text-white group-hover:text-[#FFB800] transition-colors">
                  {service.title}
                </h3>

                {/* Short description */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Key features bullet points */}
                <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-2 font-heading">
                    Asosiy afzalliklari:
                  </span>
                  <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB800] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal for unboxed label */}
                <div className="mt-4 pt-3 text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">Mo‘ljallangan: </span>
                  {service.idealFor}
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectServiceForCalculator(service.title)}
                  className="flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#FFB800] hover:bg-[#e5a600] text-black transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Hisoblash</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectServiceForContact(service.title)}
                  className="py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-[#FFB800] dark:hover:border-[#FFB800] text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  Maslahat
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
