import React, { useState, useMemo } from 'react';
import { Crane, Manufacturer } from '../types/index.ts';
import { CRANES_DATA } from '../data/cranesData.ts';
import { Search, Bookmark, BookmarkCheck, GitCompare, ChevronRight, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface CraneCatalogProps {
  onOpenDetail: (crane: Crane) => void;
  onSelectForCompare: (crane: Crane) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const CraneCatalog: React.FC<CraneCatalogProps> = ({
  onOpenDetail,
  onSelectForCompare,
  favorites,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('Barchasi');
  const [capacityFilter, setCapacityFilter] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const manufacturers: (Manufacturer | 'Barchasi')[] = ['Barchasi', 'Liebherr', 'Grove', 'Tadano', 'XCMG'];

  const capacityOptions = [
    { id: 'all', label: 'Barcha quvvatlar' },
    { id: 'under-100', label: '100 tonnagacha' },
    { id: '100-300', label: '100 – 300 tonna' },
    { id: 'over-300', label: '300 tonnadan yuqori' },
  ];

  const filteredCranes = useMemo(() => {
    return CRANES_DATA.filter((crane) => {
      // Search query filter
      const matchesSearch =
        crane.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crane.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crane.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Manufacturer filter
      const matchesManufacturer =
        selectedManufacturer === 'Barchasi' || crane.manufacturer === selectedManufacturer;

      // Capacity filter
      let matchesCapacity = true;
      if (capacityFilter === 'under-100') {
        matchesCapacity = crane.capacityTons < 100;
      } else if (capacityFilter === '100-300') {
        matchesCapacity = crane.capacityTons >= 100 && crane.capacityTons <= 300;
      } else if (capacityFilter === 'over-300') {
        matchesCapacity = crane.capacityTons > 300;
      }

      // Favorites filter
      const matchesFavorite = !onlyFavorites || favorites.includes(crane.id);

      return matchesSearch && matchesManufacturer && matchesCapacity && matchesFavorite;
    });
  }, [searchQuery, selectedManufacturer, capacityFilter, onlyFavorites, favorites]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedManufacturer('Barchasi');
    setCapacityFilter('all');
    setOnlyFavorites(false);
  };

  return (
    <section id="katalog" className="py-16 lg:py-24 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FFB800]">
              <span>Katalog</span>
              <span className="text-neutral-400">·</span>
              <span>Mobil Kranlar Tizmasi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-neutral-900 dark:text-white mt-1">
              AVTOKRANLAR KATALOGI
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl">
              Jahonning yetakchi brendlariga tegishli all-terrain va og‘ir toifadagi mobil kranlar.
              Haqiqiy xususiyatlar, yuk ko‘tarish quvvati va strela ma’lumotlari.
            </p>
          </div>

          <div className="text-xs text-neutral-500 dark:text-neutral-400 tabular-nums font-semibold">
            Topilgan modellar: <span className="text-[#FFB800] text-sm font-bold">{filteredCranes.length}</span> / {CRANES_DATA.length}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white dark:bg-[#15191E] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4 mb-8">
          {/* Top Row: Search input and favorite toggle */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Model yoki ishlab chiqaruvchi bo‘yicha qidiring (masalan, Liebherr, 300, LTM)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  Tozalash
                </button>
              )}
            </div>

            {/* Favorites Filter button */}
            <button
              type="button"
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-2 shrink-0 ${
                onlyFavorites
                  ? 'bg-[#FFB800] text-black border-[#FFB800]'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-[#FFB800]'
              }`}
            >
              {onlyFavorites ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>Saqlanganlar ({favorites.length})</span>
            </button>
          </div>

          {/* Bottom Row: Manufacturer segmented buttons & Capacity dropdown */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            {/* Manufacturer segmented control */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mr-2 shrink-0">
                Brend:
              </span>
              {manufacturers.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedManufacturer(m)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                    selectedManufacturer === m
                      ? 'bg-[#FFB800] text-black font-bold shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Capacity filter dropdown */}
            <div className="flex items-center gap-2 self-start lg:self-auto">
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 shrink-0">
                Quvvat:
              </span>
              <select
                value={capacityFilter}
                onChange={(e) => setCapacityFilter(e.target.value)}
                className="py-1.5 px-3 text-xs font-medium rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-[#FFB800]"
              >
                {capacityOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Crane Cards Grid */}
        {filteredCranes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCranes.map((crane) => {
              const isFav = favorites.includes(crane.id);
              return (
                <article
                  key={crane.id}
                  className="bg-white dark:bg-[#15191E] border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Card Media Slot */}
                    <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-neutral-900">
                      <img
                        src={crane.image}
                        alt={`${crane.manufacturer} ${crane.name}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                      {/* Manufacturer tag */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded text-xs font-bold uppercase tracking-wider text-[#FFB800] border border-neutral-700/50">
                        {crane.manufacturer}
                      </div>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(crane.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                          isFav
                            ? 'bg-[#FFB800] text-black shadow-md'
                            : 'bg-black/50 text-white hover:bg-black/80 hover:text-[#FFB800]'
                        }`}
                        title={isFav ? "Saqlanganlardan o'chirish" : "Saqlash"}
                        aria-label="Saqlash tugmasi"
                      >
                        {isFav ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>

                      {/* Lifting capacity badge at bottom of photo */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                        <span className="font-heading font-black text-xl text-[#FFB800] tabular-nums">
                          {crane.capacityTons} TONNA
                        </span>
                        <span className="text-neutral-300 bg-black/60 px-2 py-0.5 rounded text-[11px] font-semibold tabular-nums">
                          {crane.axles} o‘qli shassi
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-black font-heading tracking-wide text-neutral-900 dark:text-white group-hover:text-[#FFB800] transition-colors">
                          {crane.name}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                          {crane.description}
                        </p>
                      </div>

                      {/* Technical specifications strip */}
                      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-neutral-100 dark:border-neutral-800">
                        <div className="p-2 rounded bg-neutral-50 dark:bg-neutral-900/60">
                          <span className="text-neutral-400 block text-[11px]">Asosiy strela</span>
                          <span className="font-bold text-neutral-800 dark:text-neutral-200 tabular-nums">
                            {typeof crane.boomLengthMeters === 'number'
                              ? `${crane.boomLengthMeters} metr`
                              : crane.boomLengthMeters}
                          </span>
                        </div>
                        <div className="p-2 rounded bg-neutral-50 dark:bg-neutral-900/60">
                          <span className="text-neutral-400 block text-[11px]">Dvigatel</span>
                          <span className="font-bold text-neutral-800 dark:text-neutral-200 truncate block" title={crane.enginePower}>
                            {crane.enginePower.split('/')[0] || crane.enginePower}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex items-center gap-2 border-t border-neutral-100 dark:border-neutral-800">
                    <button
                      type="button"
                      onClick={() => onOpenDetail(crane)}
                      className="flex-1 py-2.5 px-3 bg-[#FFB800] hover:bg-[#e5a600] text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>Batafsil ma’lumot</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectForCompare(crane)}
                      className="p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-[#FFB800] dark:hover:border-[#FFB800] text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                      title="Taqqoslash vositasiga qo‘shish"
                      aria-label="Taqqoslash"
                    >
                      <GitCompare className="w-4 h-4 text-[#FFB800]" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl bg-white/40 dark:bg-neutral-900/40">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
              Hech qanday avtokran topilmadi
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-md mx-auto">
              Qidiruv so‘rovingiz yoki tanlangan filtrlarga mos keluvchi modellar mavjud emas. Filtrlarni tozalab ko‘ring.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-neutral-200 dark:bg-neutral-800 hover:bg-[#FFB800] hover:text-black rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Filtrlarni tozalash</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
