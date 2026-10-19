import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Bosh sahifa', href: '#bosh-sahifa' },
    { label: 'Katalog', href: '#katalog' },
    { label: 'Taqqoslash', href: '#taqqoslash' },
    { label: 'Xizmatlar', href: '#xizmatlar' },
    { label: 'Hisoblagich', href: '#hisoblagich' },
    { label: 'Xavfsizlik', href: '#xavfsizlik' },
    { label: 'Aloqa', href: '#aloqa' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#15191E]/95 dark:bg-[#15191E]/95 bg-white/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-lg'
          : 'bg-[#15191E]/80 dark:bg-[#15191E]/80 bg-white/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <a
            href="#bosh-sahifa"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#bosh-sahifa');
            }}
            className="flex items-center gap-2 group whitespace-nowrap shrink-0"
          >
            <span className="w-8 h-8 rounded bg-[#FFB800] flex items-center justify-center font-black text-black font-heading text-xl shadow-md group-hover:scale-105 transition-transform">
              ▲
            </span>
            <span className="text-2xl font-black font-heading tracking-wider text-neutral-900 dark:text-white">
              AVTOKRAN <span className="text-[#FFB800]">PRO</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links (Clean single-line prose) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`whitespace-nowrap transition-colors relative py-1 text-sm font-semibold tracking-wide ${
                    isActive
                      ? 'text-[#FFB800] dark:text-[#FFB800]'
                      : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFB800] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Theme Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Dark / Light toggle button */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:text-[#FFB800] dark:hover:text-[#FFB800] transition-colors"
              title={darkMode ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"}
              aria-label="Mavzuni almashtirish"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Primary Action Button */}
            <a
              href="#hisoblagich"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hisoblagich');
              }}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#FFB800] hover:bg-[#e5a600] active:scale-95 rounded-lg transition-all shadow-md hover:shadow-[#FFB800]/20 whitespace-nowrap shrink-0"
            >
              <span>Kran hisoblash</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Mobile menu toggle button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              aria-label={mobileMenuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#15191E] border-b border-neutral-200 dark:border-neutral-800 px-6 py-6 shadow-2xl transition-all">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`text-base font-semibold py-2 transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-[#FFB800] dark:text-[#FFB800]'
                      : 'text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#FFB800]" />}
                </a>
              );
            })}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
              <a
                href="#hisoblagich"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#hisoblagich');
                }}
                className="w-full text-center py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#FFB800] hover:bg-[#e5a600] rounded-lg transition-colors"
              >
                Kran xizmatini hisoblash
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
