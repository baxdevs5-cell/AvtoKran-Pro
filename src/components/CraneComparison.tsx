import React, { useState, useEffect } from 'react';
import { Crane } from '../types/index.ts';
import { CRANES_DATA } from '../data/cranesData.ts';
import { ArrowLeftRight, Check, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

interface CraneComparisonProps {
  initialCraneA?: Crane | null;
  initialCraneB?: Crane | null;
  onOpenDetail: (crane: Crane) => void;
  onSelectForCalculate: (crane: Crane) => void;
}

export const CraneComparison: React.FC<CraneComparisonProps> = ({
  initialCraneA,
  initialCraneB,
  onOpenDetail,
  onSelectForCalculate,
}) => {
  const [craneAId, setCraneAId] = useState<string>(
    initialCraneA ? initialCraneA.id : 'liebherr-ltm-1300'
  );
  const [craneBId, setCraneBId] = useState<string>(
    initialCraneB ? initialCraneB.id : 'grove-gmk6300l'
  );

  useEffect(() => {
    if (initialCraneA) setCraneAId(initialCraneA.id);
  }, [initialCraneA]);

  useEffect(() => {
    if (initialCraneB) setCraneBId(initialCraneB.id);
  }, [initialCraneB]);

  const craneA = CRANES_DATA.find((c) => c.id === craneAId) || CRANES_DATA[0];
  const craneB = CRANES_DATA.find((c) => c.id === craneBId) || CRANES_DATA[3];

  const handleSwap = () => {
    const temp = craneAId;
    setCraneAId(craneBId);
    setCraneBId(temp);
  };

  // Metric helpers
  const boomA = typeof craneA.boomLengthMeters === 'number' ? craneA.boomLengthMeters : 0;
  const boomB = typeof craneB.boomLengthMeters === 'number' ? craneB.boomLengthMeters : 0;

  return (
    <section id="taqqoslash" className="py-16 lg:py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FFB800]">
              <span>Taqqoslash Vositası</span>
              <span className="text-neutral-400">·</span>
              <span>Interaktiv Taqqoslash</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-neutral-900 dark:text-white mt-1">
              KRANLARNI TAQQOSLASH
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl">
              Ikkita turli rusumdagi yoki ishlab chiqaruvchidagi avtokranni tanlang va ularning yuk ko‘tarish quvvati,
              strelasi hamda texnik imkoniyatlarini yonma-yon solishtiring.
            </p>
          </div>
        </div>

        {/* Selection Bar with Swap */}
        <div className="bg-white dark:bg-[#15191E] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            
            {/* Select Crane A */}
            <div className="md:col-span-5">
              <label htmlFor="crane-a-select" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5 font-heading">
                1-Kran (A Model)
              </label>
              <select
                id="crane-a-select"
                value={craneAId}
                onChange={(e) => setCraneAId(e.target.value)}
                className="w-full py-2.5 px-3 text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
              >
                {CRANES_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.manufacturer} — {c.name} ({c.capacityTons} t)
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex justify-center py-2 md:py-0">
              <button
                type="button"
                onClick={handleSwap}
                className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:bg-[#FFB800] hover:text-black dark:hover:bg-[#FFB800] dark:hover:text-black text-neutral-700 dark:text-neutral-300 transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Kranlarni o‘rnini almashtirish"
                aria-label="Almashtirish"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* Select Crane B */}
            <div className="md:col-span-5">
              <label htmlFor="crane-b-select" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5 font-heading">
                2-Kran (B Model)
              </label>
              <select
                id="crane-b-select"
                value={craneBId}
                onChange={(e) => setCraneBId(e.target.value)}
                className="w-full py-2.5 px-3 text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
              >
                {CRANES_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.manufacturer} — {c.name} ({c.capacityTons} t)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card A */}
          <div className="bg-white dark:bg-[#15191E] border-2 border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              {/* Media banner */}
              <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                <img
                  src={craneA.image}
                  alt={craneA.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-bold uppercase text-[#FFB800] tracking-wider">
                    {craneA.manufacturer}
                  </span>
                  <h3 className="text-2xl font-black font-heading text-white">
                    {craneA.name}
                  </h3>
                </div>
              </div>

              {/* Specs Table */}
              <div className="p-6 space-y-4">
                {/* Capacity metric */}
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-100 dark:border-neutral-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Yuk ko‘tarish quvvati</span>
                    <span className="text-xl font-bold font-heading text-[#FFB800] tabular-nums">
                      {craneA.capacityTons} tonna
                    </span>
                  </div>
                  {/* Visual comparison bar */}
                  <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFB800] rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (craneA.capacityTons / Math.max(craneA.capacityTons, craneB.capacityTons)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Boom length metric */}
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-100 dark:border-neutral-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Asosiy strela</span>
                    <span className="text-base font-bold font-heading text-neutral-900 dark:text-white tabular-nums">
                      {typeof craneA.boomLengthMeters === 'number' ? `${craneA.boomLengthMeters} metr` : craneA.boomLengthMeters}
                    </span>
                  </div>
                  {boomA > 0 && boomB > 0 && (
                    <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neutral-400 dark:bg-neutral-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (boomA / Math.max(boomA, boomB)) * 100)}%`,
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Quick specs grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
                    <span className="text-neutral-400 block text-[11px]">Shassi o‘qlari</span>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200 tabular-nums">
                      {craneA.axles} o‘qli
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
                    <span className="text-neutral-400 block text-[11px]">Kran og‘irligi</span>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200 tabular-nums">
                      {craneA.weightTon} tonna
                    </span>
                  </div>
                </div>

                {/* Applications */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2 font-heading">
                    Asosiy vazifalari
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                    {craneA.applications.map((app, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions for Crane A */}
            <div className="p-6 pt-0 flex gap-2">
              <button
                type="button"
                onClick={() => onOpenDetail(craneA)}
                className="flex-1 py-2.5 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-[#FFB800] dark:hover:border-[#FFB800] text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white transition-colors"
              >
                Batafsil ma’lumot
              </button>
              <button
                type="button"
                onClick={() => onSelectForCalculate(craneA)}
                className="flex-1 py-2.5 px-3 rounded-lg bg-[#FFB800] hover:bg-[#e5a600] text-black text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Hisoblash
              </button>
            </div>
          </div>

          {/* Card B */}
          <div className="bg-white dark:bg-[#15191E] border-2 border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              {/* Media banner */}
              <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                <img
                  src={craneB.image}
                  alt={craneB.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-bold uppercase text-[#FFB800] tracking-wider">
                    {craneB.manufacturer}
                  </span>
                  <h3 className="text-2xl font-black font-heading text-white">
                    {craneB.name}
                  </h3>
                </div>
              </div>

              {/* Specs Table */}
              <div className="p-6 space-y-4">
                {/* Capacity metric */}
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-100 dark:border-neutral-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Yuk ko‘tarish quvvati</span>
                    <span className="text-xl font-bold font-heading text-[#FFB800] tabular-nums">
                      {craneB.capacityTons} tonna
                    </span>
                  </div>
                  {/* Visual comparison bar */}
                  <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFB800] rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (craneB.capacityTons / Math.max(craneA.capacityTons, craneB.capacityTons)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Boom length metric */}
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-100 dark:border-neutral-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Asosiy strela</span>
                    <span className="text-base font-bold font-heading text-neutral-900 dark:text-white tabular-nums">
                      {typeof craneB.boomLengthMeters === 'number' ? `${craneB.boomLengthMeters} metr` : craneB.boomLengthMeters}
                    </span>
                  </div>
                  {boomA > 0 && boomB > 0 && (
                    <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neutral-400 dark:bg-neutral-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (boomB / Math.max(boomA, boomB)) * 100)}%`,
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Quick specs grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
                    <span className="text-neutral-400 block text-[11px]">Shassi o‘qlari</span>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200 tabular-nums">
                      {craneB.axles} o‘qli
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
                    <span className="text-neutral-400 block text-[11px]">Kran og‘irligi</span>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200 tabular-nums">
                      {craneB.weightTon} tonna
                    </span>
                  </div>
                </div>

                {/* Applications */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2 font-heading">
                    Asosiy vazifalari
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                    {craneB.applications.map((app, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions for Crane B */}
            <div className="p-6 pt-0 flex gap-2">
              <button
                type="button"
                onClick={() => onOpenDetail(craneB)}
                className="flex-1 py-2.5 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-[#FFB800] dark:hover:border-[#FFB800] text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white transition-colors"
              >
                Batafsil ma’lumot
              </button>
              <button
                type="button"
                onClick={() => onSelectForCalculate(craneB)}
                className="flex-1 py-2.5 px-3 rounded-lg bg-[#FFB800] hover:bg-[#e5a600] text-black text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Hisoblash
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
