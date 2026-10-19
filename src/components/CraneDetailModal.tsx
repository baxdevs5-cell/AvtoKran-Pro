import React, { useEffect } from 'react';
import { Crane } from '../types/index.ts';
import { X, ArrowRight, GitCompare, CheckCircle2 } from 'lucide-react';

interface CraneDetailModalProps {
  crane: Crane | null;
  onClose: () => void;
  onSelectForCompare: (crane: Crane) => void;
  onSelectForCalculate: (crane: Crane) => void;
}

export const CraneDetailModal: React.FC<CraneDetailModalProps> = ({
  crane,
  onClose,
  onSelectForCompare,
  onSelectForCalculate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (crane) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [crane, onClose]);

  if (!crane) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#15191E] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl text-neutral-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-900">
          <img
            src={crane.image}
            alt={crane.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFB800]">
              {crane.manufacturer}
            </span>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-black font-heading tracking-wide text-white">
              {crane.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Description */}
          <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
            {crane.description}
          </p>

          {/* Technical Specifications Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 font-heading">
              Texnik Parametrlar
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Yuk ko‘tarish quvvati</span>
                <span className="text-lg font-bold font-heading text-[#FFB800] tabular-nums">
                  {crane.capacityTons} tonna
                </span>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Asosiy strela</span>
                <span className="text-lg font-bold font-heading text-neutral-900 dark:text-white tabular-nums">
                  {typeof crane.boomLengthMeters === 'number' ? `${crane.boomLengthMeters} metr` : crane.boomLengthMeters}
                </span>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Gusek (qo‘shimcha strela)</span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {crane.jibLengthMeters || 'Modelga qarab farq qiladi'}
                </span>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Shassi o‘qlari soni</span>
                <span className="text-lg font-bold font-heading text-neutral-900 dark:text-white tabular-nums">
                  {crane.axles} o‘qli
                </span>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Dvigatel quvvati</span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {crane.enginePower}
                </span>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Kran og‘irligi</span>
                <span className="text-lg font-bold font-heading text-neutral-900 dark:text-white tabular-nums">
                  {typeof crane.weightTon === 'number' ? `${crane.weightTon} tonna` : crane.weightTon}
                </span>
              </div>
            </div>
          </div>

          {/* Suitable Applications */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 font-heading">
              Tavsiya Etilgan Ish Turlari
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              {crane.applications.map((app, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FFB800] shrink-0" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons in Modal */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                onSelectForCompare(crane);
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-[#FFB800] dark:hover:border-[#FFB800] text-sm font-bold uppercase tracking-wider text-neutral-800 dark:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <GitCompare className="w-4 h-4 text-[#FFB800]" />
              <span>Taqqoslashga qo‘shish</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectForCalculate(crane);
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#FFB800] hover:bg-[#e5a600] text-sm font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <span>Xizmatini hisoblash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
