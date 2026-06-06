import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Clock, ShoppingCart } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Calculate real-time Czech restaurant status
    // Pondělí/Monday: Zavřeno
    // Úterý - Neděle / Tue - Sun: 16:00 - 22:00
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeVal = hours + minutes / 60;
      
      if (day === 1) {
        // Monday closed
        setIsOpenNow(false);
      } else if (timeVal >= 16 && timeVal < 22) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const menuItems = [
    { label: 'Domů', href: '#domu' },
    { label: 'O nás', href: '#o-nas' },
    { label: 'Menu', href: '#menu' },
    { label: 'Doporučujeme', href: '#doporucujeme' },
    { label: 'Rozvoz', href: '#rozvoz' },
    { label: 'Kontakt', href: '#kontakt' },
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      setIsMobileMenuOpen(false);
      
      const offset = 80; // height of fixed header
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      // 1. Direct window scroll calculation (extremely reliable in standard and sandboxed environments)
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // 2. Native element positioning fallback
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 50);
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-charcoal/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
          : 'bg-gradient-to-b from-charcoal/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand Brand */}
          <a
            href="#domu"
            onClick={(e) => handleScrollToSection(e, '#domu')}
            className="flex items-center gap-3 group"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                {/* Italian Colors Flag Stripe Dot */}
                <div className="flex gap-0.5 h-4 w-3.5 rounded-sm overflow-hidden">
                  <div className="w-1/3 bg-ita-green"></div>
                  <div className="w-1/3 bg-cream"></div>
                  <div className="w-1/3 bg-ita-red"></div>
                </div>
                <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white group-hover:text-gold transition-colors">
                  Franco's
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-gold uppercase mt-[-2px]">
                Pizza & Pasta
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href)}
                className="font-sans text-sm font-medium text-white/90 hover:text-gold tracking-wide transition-colors relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Business Hours quick and active CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end text-xs text-white/70">
              <div className="flex items-center gap-1.5 font-mono">
                <div className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-ita-red shadow-[0_0_8px_rgba(179,32,37,0.6)]'}`}></div>
                <span className={isOpenNow ? 'text-emerald-400 font-medium' : 'text-ita-red-light font-medium'}>
                  {isOpenNow ? 'Dnes máme otevřeno' : 'Nyní zavřeno'}
                </span>
              </div>
              <span className="text-[10px] text-right font-mono text-white/50">Út–Ne: 16:00–22:00 (Po zavřeno)</span>
            </div>
            
            <a
              href="#rozvoz"
              onClick={(e) => handleScrollToSection(e, '#rozvoz')}
              className="bg-gold hover:bg-gold-light text-charcoal font-sans font-semibold text-xs py-2 px-4 rounded-full flex items-center gap-2 tracking-wide transform hover:scale-105 active:scale-95 transition-all shadow-md shadow-gold/20"
            >
              <ShoppingCart size={14} />
              Rozvoz online
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:+420777906014"
              className="p-2 text-white/80 hover:text-gold transition-colors md:hidden"
              aria-label="Zavolat"
            >
              <Phone size={20} />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/80 hover:text-gold transition-colors rounded-lg focus:outline-none"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-charcoal border-t border-white/10"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-gold" />
                  <span className="text-white/80 font-mono text-xs">Út–Ne: 16:00–22:00 (Po: zavřeno)</span>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isOpenNow ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/15 text-red-400 border border-red-500/20'}`}>
                  {isOpenNow ? 'OTEVŘENO' : 'ZAVŘENO'}
                </span>
              </div>

              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScrollToSection(e, item.href)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-white/80 hover:bg-white/5 hover:text-gold transition-colors"
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-4 grid grid-cols-2 gap-3">
                <a
                  href="tel:+420777906014"
                  className="flex items-center justify-center gap-2 bg-charcoal-light border border-white/10 hover:border-white/30 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-all"
                >
                  <Phone size={16} className="text-gold" />
                  Zavolat
                </a>
                <a
                  href="#rozvoz"
                  onClick={(e) => handleScrollToSection(e, '#rozvoz')}
                  className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-charcoal font-semibold text-sm py-2.5 px-4 rounded-xl transition-all shadow-md shadow-gold/10"
                >
                  <ShoppingCart size={16} />
                  Rozvoz
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
