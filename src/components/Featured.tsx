import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart, ShoppingBag } from 'lucide-react';
import { MENU_ITEMS, IMAGE_PASTA_RECOMMENDED } from '../data';

export default function Featured() {
  // Filter only specified featured items
  const featuredDetails = MENU_ITEMS.filter(m => m.isFeatured === true);

  // Return custom graphics or icons associated with the specific items
  const getItemDetails = (id: string) => {
    switch(id) {
      case 'p17': // Parma
        return {
          icon: '🍕',
          tag: 'Naše chlouba',
          desc: 'Tradiční těsto, parmská šunka dozrávaná 18 měsíců, čerstvá divoká rukola a parmezánové hobliny.',
          img: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=700&q=80'
        };
      case 'p13': // Quattro Formaggi
        return {
          icon: '🍕',
          tag: 'Smetanová rozkoš',
          desc: 'Mistrovské spojení čtyř vybraných italských sýrů v čele s krémovou modrou Gorgonzolou DOP.',
          img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80'
        };
      case 'p3': // Prosciutto
        return {
          icon: '🍕',
          tag: 'Římská klasika',
          desc: 'Tradiční jemná dušená šunka Prosciutto Cotto na drcených rajčatech s fior di latte.',
          img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80'
        };
      case 'p2': // Salame
        return {
          icon: '🍕',
          tag: 'Pikantnější tóny',
          desc: 'Výběrový italský salám Salame Milano s plnou vyzrálou chutí na fior di latte základu.',
          img: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=700&q=80'
        };
      case 'pa3': // Pasta Bolognese
        return {
          icon: '🍝',
          tag: 'Dlouho tažené hovězí ragů',
          desc: 'Naše ručně vyráběné vaječné tagliatelle zalité bohatým ragù bolognese, které táhneme plných 6 hodin s červeným vínem Chianti.',
          img: IMAGE_PASTA_RECOMMENDED
        };
      default:
        return {
          icon: '🍕',
          tag: 'Doporučujeme',
          desc: 'Lahodná specialita od našeho šéfkuchaře Franco.',
          img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80'
        };
    }
  };

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
    <section id="doporucujeme" className="py-24 bg-[#1F1F1F] text-white relative overflow-hidden scroll-mt-20">
      {/* Visual top and bottom subtle line accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/5"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-white/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full mb-3">
              <Sparkles size={12} className="text-gold fill-gold" />
              <span className="text-[10px] sm:text-xs font-mono font-medium text-gold uppercase tracking-widest">
                Šéfkuchař Franco doporučuje
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight">
              NEJLEPŠÍ KULINÁŘSKÉ ZÁŽITKY
            </h2>
            <div className="w-16 h-[2.5px] bg-gold mt-3"></div>
            <p className="text-cream-dark/70 text-sm font-sans mt-4">
              To nejlepší z naší nabídky, vytvořené s neutuchající vášní pro rodinnou tradici a pravou italskou chuť. Vyzkoušejte nejoblíbenější jídla našich hostů na Mělníku.
            </p>
          </div>

          <button
            onClick={handleScrollToMenu}
            className="flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold tracking-wide text-gold hover:text-white transition-all self-start md:self-end pt-2 underline underline-offset-4 cursor-pointer"
          >
            <span>Zobrazit kompletní lístek</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* FEATURED SAMPLES HORIZONTAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDetails.map((item, index) => {
            const copy = getItemDetails(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-charcoal-light/35 border border-white/5 rounded-3xl overflow-hidden hover:border-gold/30 hover:bg-charcoal-light/60 transition-all duration-300 flex flex-col justify-between group h-full"
              >
                
                {/* Visual Image container with hover scaling */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={copy.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette layer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark through-transparent to-black/20"></div>

                  {/* Food badge */}
                  <span className="absolute bottom-4 left-4 flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-black/85 text-white px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                    <span>{copy.icon}</span>
                    <span>{copy.tag}</span>
                  </span>

                  {/* Absolute visual heart interaction */}
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-black/65 backdrop-blur-md text-white/70 hover:text-ita-red hover:scale-110 active:scale-95 transition-all">
                    <Heart size={14} className="fill-current" />
                  </button>
                </div>

                {/* Description Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline gap-4">
                      <h3 className="font-display font-medium text-lg sm:text-xl text-white group-hover:text-gold transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-gold font-mono font-bold text-lg whitespace-nowrap shrink-0">
                        {item.price} <span className="text-xs text-white/55">Kč</span>
                      </span>
                    </div>

                    <p className="text-cream-dark/65 text-xs sm:text-sm font-sans leading-relaxed">
                      {copy.desc}
                    </p>
                  </div>

                  {/* Direct interactive CTA inside recommendation card */}
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <button
                      onClick={handleScrollToMenu}
                      className="w-full py-2.5 bg-white/5 hover:bg-[#1F6B45] hover:text-white border border-white/10 hover:border-ita-green text-xs font-sans font-bold text-white tracking-widest uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag size={13} />
                      <span>Objednat z lístku</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
