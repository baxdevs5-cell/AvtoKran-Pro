import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { CraneCatalog } from './components/CraneCatalog.tsx';
import { CraneDetailModal } from './components/CraneDetailModal.tsx';
import { CraneComparison } from './components/CraneComparison.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { CraneCalculator } from './components/CraneCalculator.tsx';
import { SafetyQuiz } from './components/SafetyQuiz.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { Crane } from './types/index.ts';
import { CRANES_DATA } from './data/cranesData.ts';

export default function App() {
  // Theme state with localStorage persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('avtokran_theme');
    if (saved) return saved === 'dark';
    return true; // Default dark industrial look
  });

  // Favorites state with localStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('avtokran_favorites');
      return saved ? JSON.parse(saved) : ['liebherr-ltm-11200', 'grove-gmk6300l'];
    } catch {
      return ['liebherr-ltm-11200'];
    }
  });

  // Active section spy
  const [activeSection, setActiveSection] = useState<string>('bosh-sahifa');

  // Detail Modal state
  const [selectedCraneForDetail, setSelectedCraneForDetail] = useState<Crane | null>(null);

  // Cross-component states for Comparison & Calculator & Contact
  const [comparisonCraneA, setComparisonCraneA] = useState<Crane | null>(null);
  const [comparisonCraneB, setComparisonCraneB] = useState<Crane | null>(null);

  const [calcSelectedCraneId, setCalcSelectedCraneId] = useState<string>('liebherr-ltm-1300');
  const [calcSelectedServiceTitle, setCalcSelectedServiceTitle] = useState<string>('Avtokran ijarasi');

  const [contactPrefill, setContactPrefill] = useState<{
    service?: string;
    crane?: string;
    duration?: string;
    price?: string;
  }>({});

  // Sync dark class on html root element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('avtokran_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('avtokran_theme', 'light');
    }
  }, [darkMode]);

  // Sync favorites
  useEffect(() => {
    localStorage.setItem('avtokran_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Scroll spy effect to highlight current active section
  useEffect(() => {
    const sectionIds = [
      'bosh-sahifa',
      'katalog',
      'taqqoslash',
      'xizmatlar',
      'hisoblagich',
      'xavfsizlik',
      'aloqa',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Handlers for cross-linking features
  const handleSelectForCompare = (crane: Crane) => {
    // If Crane A is not set or same, set Crane B, else set Crane A
    if (!comparisonCraneA || comparisonCraneA.id === crane.id) {
      setComparisonCraneA(crane);
    } else {
      setComparisonCraneB(crane);
    }
    const compareEl = document.getElementById('taqqoslash');
    if (compareEl) {
      compareEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectForCalculate = (crane: Crane) => {
    setCalcSelectedCraneId(crane.id);
    const calcEl = document.getElementById('hisoblagich');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForCalculator = (serviceTitle: string) => {
    setCalcSelectedServiceTitle(serviceTitle);
    const calcEl = document.getElementById('hisoblagich');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setContactPrefill((prev) => ({
      ...prev,
      service: serviceTitle,
    }));
    const contactEl = document.getElementById('aloqa');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendCalculatorToContact = (data: {
    service: string;
    crane: string;
    duration: string;
    estimatedPrice: string;
  }) => {
    setContactPrefill({
      service: data.service,
      crane: data.crane,
      duration: data.duration,
      price: data.estimatedPrice,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#15191E] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* Sticky Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeSection={activeSection}
      />

      <main>
        {/* SECTION 1: Bosh Sahifa (Hero) */}
        <Hero />

        {/* SECTION 2: Avtokranlar Katalogi */}
        <CraneCatalog
          onOpenDetail={(crane) => setSelectedCraneForDetail(crane)}
          onSelectForCompare={handleSelectForCompare}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />

        {/* SECTION 3: Kranlarni Taqqoslash */}
        <CraneComparison
          initialCraneA={comparisonCraneA || CRANES_DATA[1]}
          initialCraneB={comparisonCraneB || CRANES_DATA[3]}
          onOpenDetail={(crane) => setSelectedCraneForDetail(crane)}
          onSelectForCalculate={handleSelectForCalculate}
        />

        {/* SECTION 4: Xizmatlarimiz */}
        <ServicesSection
          onSelectServiceForCalculator={handleSelectServiceForCalculator}
          onSelectServiceForContact={handleSelectServiceForContact}
        />

        {/* SECTION 5: Kran Hisoblagichi */}
        <CraneCalculator
          key={`${calcSelectedCraneId}-${calcSelectedServiceTitle}`}
          preselectedCraneId={calcSelectedCraneId}
          preselectedServiceTitle={calcSelectedServiceTitle}
          onSendToContact={handleSendCalculatorToContact}
        />

        {/* SECTION 6: Xavfsizlik va Bilim Testi */}
        <SafetyQuiz />

        {/* SECTION 7: Aloqa & Buyurtma */}
        <ContactSection
          key={`${contactPrefill.service}-${contactPrefill.crane}-${contactPrefill.price}`}
          prefilledService={contactPrefill.service}
          prefilledCrane={contactPrefill.crane}
          prefilledDuration={contactPrefill.duration}
          prefilledPrice={contactPrefill.price}
        />
      </main>

      {/* SECTION 8: Footer */}
      <Footer />

      {/* Detail Modal */}
      <CraneDetailModal
        crane={selectedCraneForDetail}
        onClose={() => setSelectedCraneForDetail(null)}
        onSelectForCompare={handleSelectForCompare}
        onSelectForCalculate={handleSelectForCalculate}
      />
    </div>
  );
}
