import React, { useState, useId } from 'react';
import { CRANES_DATA } from '../data/cranesData.ts';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { Calculator, ArrowRight, Info, Check, ShieldCheck } from 'lucide-react';

interface CraneCalculatorProps {
  preselectedCraneId?: string;
  preselectedServiceTitle?: string;
  onSendToContact: (data: { service: string; crane: string; duration: string; estimatedPrice: string }) => void;
}

export const CraneCalculator: React.FC<CraneCalculatorProps> = ({
  preselectedCraneId,
  preselectedServiceTitle,
  onSendToContact,
}) => {
  const [serviceType, setServiceType] = useState<string>(
    preselectedServiceTitle || SERVICES_DATA[0].title
  );
  const [craneId, setCraneId] = useState<string>(
    preselectedCraneId || CRANES_DATA[1].id
  );
  const [durationMode, setDurationMode] = useState<'hourly' | 'shift'>('shift');
  const [durationHours, setDurationHours] = useState<number>(4);
  const [durationShifts, setDurationShifts] = useState<number>(1);
  const [distanceKm, setDistanceKm] = useState<number>(15);
  const [includeRigging, setIncludeRigging] = useState<boolean>(true);

  // Generate unique IDs for accessibility
  const serviceTypeId = useId();
  const craneSelectId = useId();
  const hoursInputId = useId();
  const shiftsInputId = useId();
  const distanceInputId = useId();
  const riggingCheckboxId = useId();

  // Demo rate coefficients by capacity tier
  const getDemoRates = (capacity: number) => {
    if (capacity <= 60) {
      return { hourly: 900000, shift: 6800000 };
    } else if (capacity <= 220) {
      return { hourly: 2500000, shift: 18500000 };
    } else if (capacity <= 250) {
      return { hourly: 3200000, shift: 23000000 };
    } else if (capacity <= 300) {
      return { hourly: 4500000, shift: 32000000 };
    } else if (capacity <= 400) {
      return { hourly: 6000000, shift: 45000000 };
    } else {
      return { hourly: 18000000, shift: 130000000 };
    }
  };

  const selectedCrane = CRANES_DATA.find((c) => c.id === craneId) || CRANES_DATA[1];
  const rates = getDemoRates(selectedCrane.capacityTons);

  // Base machinery cost calculation
  const baseCost =
    durationMode === 'hourly'
      ? rates.hourly * Math.max(1, durationHours)
      : rates.shift * Math.max(1, durationShifts);

  // Mobilization / delivery cost (demo: 35,000 UZS / km)
  const mobilizationCost = distanceKm * 35000;

  // Rigging brigade cost
  const riggingCost = includeRigging
    ? durationMode === 'hourly'
      ? durationHours * 250000
      : durationShifts * 1800000
    : 0;

  // Total estimate
  const totalEstimate = baseCost + mobilizationCost + riggingCost;

  const formatUZS = (val: number) => {
    return new Intl.NumberFormat('uz-UZ').format(val) + " so'm";
  };

  const handleTransferToContact = () => {
    const durationLabel =
      durationMode === 'hourly'
        ? `${durationHours} soat`
        : `${durationShifts} smena (${durationShifts * 8} soat)`;

    onSendToContact({
      service: serviceType,
      crane: `${selectedCrane.manufacturer} ${selectedCrane.name} (${selectedCrane.capacityTons} t)`,
      duration: durationLabel,
      estimatedPrice: formatUZS(totalEstimate),
    });

    const contactEl = document.getElementById('aloqa');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hisoblagich" className="py-16 lg:py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FFB800]">
              <Calculator className="w-4 h-4 text-[#FFB800]" />
              <span>Interaktiv Hisoblagich</span>
              <span className="text-neutral-400">·</span>
              <span>Dastlabki Baholash</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-neutral-900 dark:text-white mt-1">
              KRAN HISOBLAGICHI
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl">
              Ish hajmi, kran tonnaji va masofaga qarab dastlabki taxminiy xizmat qiymatini hisoblang.
              Barcha hisob-kitoblar o‘quv namoyishi (DEMO) tariflariga asoslangan.
            </p>
          </div>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 bg-white dark:bg-[#15191E] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* 1. Xizmat turi */}
            <div>
              <label htmlFor={serviceTypeId} className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-heading">
                1. Xizmat turi
              </label>
              <select
                id={serviceTypeId}
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

            {/* 2. Kran turi va tonnaj */}
            <div>
              <label htmlFor={craneSelectId} className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-heading">
                2. Kran turi va quvvati
              </label>
              <select
                id={craneSelectId}
                value={craneId}
                onChange={(e) => setCraneId(e.target.value)}
                className="w-full py-2.5 px-3.5 text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
              >
                {CRANES_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.manufacturer} {c.name} — {c.capacityTons} tonna (Strela: {c.boomLengthMeters} m)
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                <span>Shassi: {selectedCrane.axles} o‘qli all-terrain</span>
                <span>Tavsiya etilgan: {selectedCrane.applications[0]}</span>
              </div>
            </div>

            {/* 3. Ish davomiyligi rejimi va miqdori */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-heading">
                  3. Ish davomiyligi
                </span>
                {/* Mode toggle */}
                <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setDurationMode('hourly')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                      durationMode === 'hourly'
                        ? 'bg-[#FFB800] text-black shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    Soatlik
                  </button>
                  <button
                    type="button"
                    onClick={() => setDurationMode('shift')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                      durationMode === 'shift'
                        ? 'bg-[#FFB800] text-black shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    Smena (8 soat)
                  </button>
                </div>
              </div>

              {durationMode === 'hourly' ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <label htmlFor={hoursInputId} className="text-neutral-600 dark:text-neutral-400">Ish vaqti:</label>
                    <span className="font-bold font-heading text-lg text-neutral-900 dark:text-white tabular-nums">
                      {durationHours} soat
                    </span>
                  </div>
                  <input
                    id={hoursInputId}
                    type="range"
                    min="1"
                    max="24"
                    value={durationHours}
                    onChange={(e) => setDurationHours(parseInt(e.target.value) || 1)}
                    className="w-full accent-[#FFB800] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400">
                    <span>1 soat</span>
                    <span>12 soat</span>
                    <span>24 soat</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <label htmlFor={shiftsInputId} className="text-neutral-600 dark:text-neutral-400">Smenalar soni:</label>
                    <span className="font-bold font-heading text-lg text-neutral-900 dark:text-white tabular-nums">
                      {durationShifts} smena ({durationShifts * 8} soat)
                    </span>
                  </div>
                  <input
                    id={shiftsInputId}
                    type="range"
                    min="1"
                    max="30"
                    value={durationShifts}
                    onChange={(e) => setDurationShifts(parseInt(e.target.value) || 1)}
                    className="w-full accent-[#FFB800] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400">
                    <span>1 smena</span>
                    <span>15 smena</span>
                    <span>30 smena</span>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Yetkazib berish masofasi (km) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={distanceInputId} className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-heading">
                  4. Ob’ektgacha masofa (km)
                </label>
                <span className="font-bold font-heading text-neutral-900 dark:text-white tabular-nums">
                  {distanceKm} km
                </span>
              </div>
              <input
                id={distanceInputId}
                type="range"
                min="0"
                max="100"
                step="5"
                value={distanceKm}
                onChange={(e) => setDistanceKm(parseInt(e.target.value) || 0)}
                className="w-full accent-[#FFB800] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400">
                <span>0 km (Shahar ichida)</span>
                <span>50 km</span>
                <span>100 km (Viloyat)</span>
              </div>
            </div>

            {/* 5. Qo'shimcha xizmatlar */}
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <label htmlFor={riggingCheckboxId} className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  id={riggingCheckboxId}
                  type="checkbox"
                  checked={includeRigging}
                  onChange={(e) => setIncludeRigging(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-[#FFB800] focus:ring-[#FFB800] accent-[#FFB800]"
                />
                <div className="text-sm">
                  <span className="font-semibold text-neutral-900 dark:text-white block">
                    Stropovshiklar / Rigging brigadasi qo‘shilsin
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Sertifikatlangan 2 nafar mutaxassis va rigging moslamalari bilan
                  </span>
                </div>
              </label>
            </div>

          </div>

          {/* Breakdown & Result Column */}
          <div className="lg:col-span-5 bg-white dark:bg-[#15191E] border-2 border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFB800] font-heading block">
                  Hisob-Kitob Xulosasi
                </span>
                <h3 className="text-xl font-black font-heading text-neutral-900 dark:text-white mt-1">
                  Taxminiy Xizmat Qiymati
                </h3>
              </div>

              {/* Breakdown lines */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                  <span>Asosiy kran ijara to‘lovi:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white tabular-nums">
                    {formatUZS(baseCost)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                  <span>Yetkazib berish ({distanceKm} km):</span>
                  <span className="font-semibold text-neutral-900 dark:text-white tabular-nums">
                    {formatUZS(mobilizationCost)}
                  </span>
                </div>

                {includeRigging && (
                  <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                    <span>Rigging brigadasi:</span>
                    <span className="font-semibold text-neutral-900 dark:text-white tabular-nums">
                      {formatUZS(riggingCost)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="text-xs">Kran quvvati:</span>
                  <span className="text-xs font-bold text-[#FFB800]">
                    {selectedCrane.capacityTons} TONNA
                  </span>
                </div>
              </div>

              {/* Total Card */}
              <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">
                  Taxminiy umumiy summa:
                </span>
                <div className="text-2xl sm:text-3xl font-black font-heading text-neutral-900 dark:text-white tabular-nums">
                  {formatUZS(totalEstimate)}
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
                  <span>Kran operatori va yoqilg‘i xarajatlari hisobga olingan</span>
                </div>
              </div>

              {/* Demo Disclaimer notice */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>DEMO tariflar eslatmasi:</strong> Mazkur hisoblagichdagi narxlar maktab o‘quv loyihasi uchun ko‘rgazmali tarzda berilgan bo‘lib, real tijoriy yoki bozor narx taklifi hisoblanmaydi.
                </p>
              </div>

            </div>

            {/* Action button to transfer this state to contact form */}
            <div className="pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-800">
              <button
                type="button"
                onClick={handleTransferToContact}
                className="w-full py-3.5 px-4 bg-[#FFB800] hover:bg-[#e5a600] active:scale-95 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ushbu ma’lumotlar bilan so‘rov yuborish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
