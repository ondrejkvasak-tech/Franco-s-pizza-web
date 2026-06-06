import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <footer className="bg-charcoal-dark text-white pt-16 pb-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* COLUMN 1: BRAND LOGO */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <a
              href="#domu"
              onClick={(e) => handleScrollTo(e, '#domu')}
              className="inline-block"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5 h-4.5 w-4 rounded-sm overflow-hidden">
                    <div className="w-1/3 bg-[#1F6B45]"></div>
                    <div className="w-1/3 bg-white"></div>
                    <div className="w-1/3 bg-[#B32025]"></div>
                  </div>
                  <span className="font-display font-bold text-2xl tracking-tight text-white hover:text-gold transition-colors">
                    Franco's
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#C9A45C] uppercase mt-[1px]">
                  Pizza & Pasta Mělník
                </span>
              </div>
            </a>
            
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-sm">
              Přinášíme vám kousek slunné Itálie přímo do srdce Mělníka. Zakládáme si na originálních recepturách, čerstvých dovážených surovinách a nefalšované rodinné atmosféře.
            </p>

            <div className="flex gap-3 pt-2 text-white/40">
              <a href="https://www.facebook.com/francospizzaupastamelnik" target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-white/10 hover:text-gold rounded-full transition-colors">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* COLUMN 2: QUICK IN-PAGE NAVIGATION */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="font-display font-bold text-sm text-gold uppercase tracking-widest">
              Rychlé odkazy
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs sm:text-sm text-white/70">
              <a href="#domu" onClick={(e) => handleScrollTo(e, '#domu')} className="hover:text-white hover:underline transition-colors w-fit">Domů</a>
              <a href="#o-nas" onClick={(e) => handleScrollTo(e, '#o-nas')} className="hover:text-white hover:underline transition-colors w-fit">O nás</a>
              <a href="#menu" onClick={(e) => handleScrollTo(e, '#menu')} className="hover:text-white hover:underline transition-colors w-fit">Menu</a>
              <a href="#galerie" onClick={(e) => handleScrollTo(e, '#galerie')} className="hover:text-white hover:underline transition-colors w-fit">Galerie</a>
              <a href="#rozvoz" onClick={(e) => handleScrollTo(e, '#rozvoz')} className="hover:text-white hover:underline transition-colors w-fit">Rozvoz</a>
              <a href="#kontakt" onClick={(e) => handleScrollTo(e, '#kontakt')} className="hover:text-white hover:underline transition-colors w-fit">Kontakt</a>
            </nav>
          </div>

          {/* COLUMN 3: DIRECT CONTACT LINKAGE */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h4 className="font-display font-bold text-sm text-gold uppercase tracking-widest">
              Kontaktní spojení
            </h4>
            <div className="flex flex-col gap-3 text-xs sm:text-sm text-white/70">
              
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <span>Bezručova 3327, 276 01 Mělník, CZ</span>
              </div>

              <a href="tel:+420777906014" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={16} className="text-gold" />
                <span>+420 777 906 014</span>
              </a>

              <a href="mailto:pizzaserosi.franco@seznam.cz" className="flex items-center gap-2 hover:text-white transition-colors break-all">
                <Mail size={16} className="text-gold" />
                <span>pizzaserosi.franco@seznam.cz</span>
              </a>

              <div className="pt-2">
                <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Pečeme pro vás:</span>
                <span className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-emerald-400 font-bold block w-fit">
                  Út - Ne · 16:00 - 22:00 (Po: Zavřeno)
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM METADATA BAR FOR STRUCTURED MICRODATA AND COPYRIGHTS */}
        <div className="pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-white/40 gap-4">
          
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Franco's Pizza & Pasta Mělník. Všechna práva vyhrazena.</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono">
            <span>Upečeno s 🇮🇹 na Mělníku</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
