import React, { useState, useEffect } from 'react';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { CRANES_DATA } from '../data/cranesData.ts';
import { Send, CheckCircle2, Info, RotateCcw } from 'lucide-react';

interface ContactSectionProps {
  prefilledService?: string;
  prefilledCrane?: string;
  prefilledDuration?: string;
  prefilledPrice?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledService,
  prefilledCrane,
  prefilledDuration,
  prefilledPrice,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [serviceType, setServiceType] = useState(prefilledService || SERVICES_DATA[0].title);
  const [craneModel, setCraneModel] = useState(prefilledCrane || 'Istalgan model');
  const [details, setDetails] = useState('');

  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; details?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  useEffect(() => {
    if (prefilledService) setServiceType(prefilledService);
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledCrane) setCraneModel(prefilledCrane);
  }, [prefilledCrane]);

  useEffect(() => {
    if (prefilledPrice && prefilledDuration) {
      setDetails((prev) => {
        const autoNote = `[Kalkulyatordan o‘tkazilgan parametrlar: ${prefilledDuration}, Taxminiy qiymat: ${prefilledPrice}]`;
        if (prev.includes(autoNote)) return prev;
        return prev ? `${prev}\n\n${autoNote}` : autoNote;
      });
    }
  }, [prefilledPrice, prefilledDuration]);

  const validate = () => {
    const errs: { fullName?: string; phone?: string; details?: string } = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'Iltimos, to‘liq ismingizni kiriting (kamida 3 harf).';
    }

    // Phone validation: must contain digits, e.g. +998 90 123 45 67
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 9) {
      errs.phone = 'Telefon raqamini to‘g‘ri kiriting (kamida 9 ta raqam).';
    }

    if (!details.trim()) {
      errs.details = 'Iltimos, ish ob’ekti yoki talablaringiz haqida qisqacha yozing.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmittedData({
      fullName,
      phone,
      serviceType,
      craneModel,
      details,
      timestamp: new Date().toLocaleTimeString('uz-UZ'),
    });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFullName('');
    setPhone('+998 ');
    setDetails('');
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <section id="aloqa" className="py-16 lg:py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FFB800] mb-2">
            <span>Aloqa & Buyurtma</span>
            <span className="text-neutral-400">·</span>
            <span>Demo So‘rovnoma</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-neutral-900 dark:text-white">
            ALOQA VA SO‘ROV YUBORISH
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl mx-auto">
            Avtokran tanlash yoki dastlabki hisob-kitob bo‘yicha texnik so‘rov shaklini to‘ldiring.
          </p>
        </div>

        {/* Contact Form Container */}
        <div className="bg-white dark:bg-[#15191E] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-lg">
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Ism */}
                <div>
                  <label htmlFor="full-name-input" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-heading">
                    Ismingiz <span className="text-[#FFB800]">*</span>
                  </label>
                  <input
                    id="full-name-input"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Masalan: Aziz Rahimov"
                    className={`w-full py-2.5 px-3.5 text-sm rounded-lg border bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-neutral-300 dark:border-neutral-700 focus:ring-[#FFB800]'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-xs text-rose-500 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                {/* Telefon raqami */}
                <div>
                  <label htmlFor="phone-input" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-heading">
                    Telefon raqami <span className="text-[#FFB800]">*</span>
                  </label>
                  <input
                    id="phone-input"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className={`w-full py-2.5 px-3.5 text-sm rounded-lg border bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-neutral-300 dark:border-neutral-700 focus:ring-[#FFB800]'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-xs text-rose-500 mt-1 block">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Xizmat turi */}
                <div>
                  <label htmlFor="service-type-select" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-heading">
                    Xizmat turi
                  </label>
                  <select
                    id="service-type-select"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full py-2.5 px-3.5 text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tanlangan kran */}
                <div>
                  <label htmlFor="crane-model-select" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-heading">
                    Qiziqtirgan kran modeli
                  </label>
                  <select
                    id="crane-model-select"
                    value={craneModel}
                    onChange={(e) => setCraneModel(e.target.value)}
                    className="w-full py-2.5 px-3.5 text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                  >
                    <option value="Istalgan model (Mutaxassis tavsiyasi kerak)">
                      Istalgan model (Mutaxassis tavsiyasi kerak)
                    </option>
                    {CRANES_DATA.map((c) => (
                      <option key={c.id} value={`${c.manufacturer} ${c.name} (${c.capacityTons} t)`}>
                        {c.manufacturer} {c.name} ({c.capacityTons} t)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Qo'shimcha ma'lumot */}
              <div>
                <label htmlFor="details-textarea" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-heading">
                  Qo‘shimcha ma’lumot / Vazifa tavsifi <span className="text-[#FFB800]">*</span>
                </label>
                <textarea
                  id="details-textarea"
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Yuk og‘irligi, ko‘tarish balandligi, ob’ekt joylashuvi yoki muddat haqida qisqacha ma’lumot bering..."
                  className={`w-full py-2.5 px-3.5 text-sm rounded-lg border bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 ${
                    errors.details
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-neutral-300 dark:border-neutral-700 focus:ring-[#FFB800]'
                  }`}
                />
                {errors.details && (
                  <span className="text-xs text-rose-500 mt-1 block">{errors.details}</span>
                )}
              </div>

              {/* Disclaimer Notice */}
              <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <p>
                  <strong>Namoyish shakli eslatmasi:</strong> Ushbu shakl maktab o‘quv loyihasining interaktiv funksionalligini ko‘rsatish uchun mo‘ljallangan. Kiritilgan ma’lumotlar tashqi serverga yuborilmaydi va real kompaniya bazasiga tushmaydi.
                </p>
              </div>

              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#FFB800] hover:bg-[#e5a600] active:scale-95 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>So‘rov yuborish</span>
                </button>
              </div>

            </form>
          ) : (
            /* Success confirmation card */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 font-heading block">
                  Muvaffaqiyatli topshirildi
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-neutral-900 dark:text-white mt-1">
                  So‘rovingiz Qabul Qilindi!
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-md mx-auto">
                  Rahmat, <strong>{submittedData?.fullName}</strong>! So‘rov parametrlari tekshirildi va namoyish tizimida muvaffaqiyatli qayd etildi.
                </p>
              </div>

              {/* Summary of submitted request */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  <span className="text-neutral-400">Vaqt:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white tabular-nums">{submittedData?.timestamp}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  <span className="text-neutral-400">Telefon:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{submittedData?.phone}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  <span className="text-neutral-400">Xizmat:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{submittedData?.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Model:</span>
                  <span className="font-semibold text-[#FFB800]">{submittedData?.craneModel}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-[#FFB800] dark:hover:border-[#FFB800] text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Yangi so‘rov yuborish</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
