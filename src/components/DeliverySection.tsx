import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, Clock, ShieldCheck, Soup, Phone, ExternalLink, ChefHat, Sparkles } from 'lucide-react';

export default function DeliverySection() {
  const [showDispatchSim, setShowDispatchSim] = useState(false);

  const highlights = [
    {
      id: 1,
      icon: <Truck className="w-5 h-5 text-[#1F6B45]" />,
      title: 'Exkluzivně přes Foodoru',
      desc: 'Sami rozvoz neprovozujeme. Všechny online objednávky rozváží kurýři služby Foodora.'
    },
    {
      id: 2,
      icon: <Clock className="w-5 h-5 text-[#1F6B45]" />,
      title: 'Vždy čerstvé a horké',
      desc: 'Pečeme na 450 °C. Jakmile kurýr jídlo převezme, doveze ho v termotašce přímo k vám.'
    },
    {
      id: 3,
      icon: <Soup className="w-5 h-5 text-[#1F6B45]" />,
      title: 'Osobní odběr v Mělníku',
      desc: 'Zavolejte nám na telefon, jídlo rádi připravíme na domluvený čas k osobnímu odběru.'
    },
    {
      id: 4,
      icon: <ShieldCheck className="w-5 h-5 text-[#1F6B45]" />,
      title: 'Bezpečné odbavení',
      desc: 'Hygienické balení a možnost bezkontaktního doručení prověřenou službou Foodora.'
    }
  ];

  const handleScrollToMenu = () => {
    const el = document.querySelector('#menu');
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
    <section id="rozvoz" className="py-24 bg-cream/70 relative overflow-hidden text-charcoal scroll-mt-20">
      {/* Visual top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-dark"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#1F6B45] uppercase block mb-2">
                Rozvoz pouze přes Foodoru nebo Osobní Odběr
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight">
                VÝBORNÉ JÍDLO <br />
                AŽ K VÁM DOMŮ
              </h2>
              <div className="w-16 h-[2.5px] bg-gold mt-4"></div>
              <p className="text-charcoal-light/75 text-sm sm:text-base font-sans mt-5 leading-relaxed">
                Abychom se mohli na 100 % věnovat samotnému pečení a přípravě těsta, <strong>vlastní rozvozovou službu neprovozujeme</strong>. Rozvoz našich pizz a čerstvých těstovin zajišťují kurýři <strong>Foodora</strong>.{" "}
                Chcete-li osobní odběr, rádi vám jídlo připravíme k vyzvednutí u nás přímo v pizzerii na adrese <strong>Bezručova 3327, Mělník</strong>.
              </p>
            </div>

            {/* List items highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {highlights.map((hl) => (
                <div key={hl.id} className="flex gap-4 p-4 bg-white rounded-xl border border-cream-dark shadow-sm">
                  <div className="p-2.5 bg-[#1F6B45]/10 rounded-xl text-ita-green shrink-0 h-fit">
                    {hl.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-charcoal">{hl.title}</h4>
                    <p className="text-charcoal-light/60 text-[11px] sm:text-xs font-sans leading-relaxed mt-1">{hl.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct primary CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="tel:+420777906014"
                className="px-8 py-4 bg-[#B32025] hover:bg-ita-red-light text-white font-sans font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg hover:shadow-ita-red/20 transform hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Phone size={16} />
                <span>Osobní odběr: 777 906 014</span>
              </a>

              {/* Foodora custom trigger button */}
              <a
                href="https://www.foodora.cz/restaurant/bo13/francos-pizza-and-pasta"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-[#E21B70] hover:bg-[#ff2b85] text-white font-sans font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg hover:shadow-[#E21B70]/20 transform hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span className="font-sans font-extrabold text-xs">foodora</span>
                <span>Rozvoz přes Foodoru</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* RIGHT GRAPHIC ILLUSTRATION COLUMN */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-8 border border-cream-dark shadow-xl text-center relative z-10 space-y-6 overflow-hidden"
            >
              {/* Subtle top decoration strip */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-ita-green via-cream-dark to-ita-red"></div>

              <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce">
                🚴💨
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-mono tracking-widest text-[#1F6B45] uppercase font-bold bg-[#1F6B45]/10 px-2.5 py-1 rounded">
                  Exkluzivní partner
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-charcoal leading-tight">
                  ROZVOZ ÚT–NE 16:00 - 22:00
                </h3>
                <p className="text-charcoal-light/60 text-xs font-sans leading-relaxed max-w-sm mx-auto">
                  Dovoz našich jídel probíhá od úterý do neděle. V pondělí máme zavřeno a nerozvážíme.
                </p>
              </div>

              {/* Quick delivery pricing conditions */}
              <div className="bg-cream/80 rounded-2xl p-4 divide-y divide-cream-dark text-xs text-left text-charcoal">
                <div className="pb-2.5 flex justify-between">
                  <span className="text-charcoal-light/75">Objednávka rozvozu</span>
                  <span className="font-bold text-[#E21B70] uppercase">Výhradně na Foodora</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-charcoal-light/75">Osobní vyzvednutí</span>
                  <span className="font-bold text-emerald-700">Zdarma, Bezručova 3327</span>
                </div>
                <div className="pt-2.5 flex justify-between">
                  <span className="text-charcoal-light/75">Čas přípravy u nás</span>
                  <span className="font-bold">15 - 25 minut</span>
                </div>
              </div>

              <button
                onClick={handleScrollToMenu}
                className="w-full py-3 border-2 border-charcoal/20 hover:border-charcoal text-charcoal hover:bg-cream rounded-xl text-xs font-sans font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Prohlédnout menu</span>
                <Phone size={12} />
              </button>
            </motion.div>

            {/* Back background aesthetic rings */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold/5 rounded-full pointer-events-none -z-0"></div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#B32025]/5 rounded-full pointer-events-none -z-0"></div>
          </div>

        </div>
      </div>

      {/* DISPATCH SIMULATOR MODAL */}
      <AnimatePresence>
        {showDispatchSim && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDispatchSim(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 border border-cream-dark max-w-sm w-full text-center relative z-10 shadow-2xl space-y-6"
            >
              <div className="w-16 h-16 bg-[#E21B70]/10 text-[#E21B70] rounded-full flex items-center justify-center mx-auto text-xl font-black">
                f
              </div>

              <div className="space-y-2 text-charcoal">
                <h4 className="font-display font-extrabold text-xl">Přesměrování na Foodora</h4>
                <p className="text-charcoal-light/70 text-xs font-sans leading-relaxed">
                  Byl zaznamenán požadavek na otevření partnerské aplikace <strong>Foodora</strong> pro restauraci <strong>Franco's Pizza & Pasta Mělník</strong>.
                </p>
              </div>

              <div className="p-3 bg-cream rounded-xl space-y-1.5 text-xs text-left">
                <div className="flex justify-between font-mono">
                  <span className="text-charcoal-light/60">Restaurace:</span>
                  <span className="font-bold">Franco's Pizza & Pasta</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-charcoal-light/60">Aktuální stav:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Sparkles size={10} className="fill-emerald-600 animate-spin" /> Live
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-charcoal-light/40 leading-relaxed italic">
                *Pro účely dema je toto rozhraní simulováno. V produkčním nasazení zde bude přímé propojení na oficiální Foodora profil restaurace Franco's Mělník.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDispatchSim(false)}
                  className="flex-1 py-2 bg-cream text-charcoal rounded-xl text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  Zavřít
                </button>
                <a
                  href="https://www.foodora.cz/restaurant/bo13/francos-pizza-and-pasta"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 bg-[#E21B70] hover:bg-[#ff2b85] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors text-center cursor-pointer block"
                >
                  Přejít na Foodoru
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
