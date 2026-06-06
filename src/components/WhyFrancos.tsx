import React from 'react';
import { motion } from 'motion/react';
import { Award, Sprout, Hand, ChefHat, Sun, Truck } from 'lucide-react';

interface FeatureItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
}

export default function WhyFrancos() {
  const features: FeatureItem[] = [
    {
      id: 1,
      icon: <Award className="w-8 h-8 text-gold" />,
      title: 'Rodilý šéfkuchař z Neapole',
      description: 'Majitel a kuchař v jedné osobě pochází přímo z italské Neapole. Všechna jídla tak nesou jeho rodinný rukopis a poctivou italskou duši.',
      badge: 'Neapol'
    },
    {
      id: 2,
      icon: <Sprout className="w-8 h-8 text-gold" />,
      title: 'Vlastní pěstované suroviny',
      description: 'Suroviny u nás mají zelenou. Například pálivé papričky jalapeños si s láskou pěstujeme sami na naší zahrádce pro jedinečnou čerstvost.',
      badge: 'Zahrádka'
    },
    {
      id: 3,
      icon: <ChefHat className="w-8 h-8 text-gold" />,
      title: 'Domácí ručně dělané těstoviny',
      description: 'Každé ráno hněteme čerstvé těstoviny z krupice semolina a vajec. Poznáte rozdíl hned od prvního sousta.',
      badge: 'Poctivost'
    },
    {
      id: 4,
      icon: <Hand className="w-8 h-8 text-gold" />,
      title: 'Křupavá pizza z kamenné pece',
      description: 'Pečeme na extrémní teploty při 450 °C. Okraje jsou nadýchané, křupavé a uprostřed krásně vláčné.',
      badge: 'Zážitek'
    },
    {
      id: 5,
      icon: <Sun className="w-8 h-8 text-gold" />,
      title: 'Příjemná letní zahrádka',
      description: 'Vychutnejte si vychlazený tankový Pilsner Urquell nebo skvělé víno na naší útulné letní zahrádce v klidu.',
      badge: 'Atmosféra'
    },
    {
      id: 6,
      icon: <Truck className="w-8 h-8 text-gold" />,
      title: 'Exkluzivní rozvoz s Foodorou',
      description: 'Chcete pizzu či těstoviny až k vám domů? Všechny naše rozvozy jídla zajišťuje spolehlivě a exkluzivně partnerská služba Foodora.',
      badge: 'Rozvoz'
    }
  ];

  return (
    <section id="proc-francos" className="py-24 bg-cream/30 relative overflow-hidden">
      {/* Decorative vector background */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cream to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="text-xs font-mono font-bold tracking-widest text-[#1F6B45] uppercase bg-ita-green/10 px-3 py-1 rounded-full">
              Dokonalost v každém detailu
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-charcoal tracking-tight mt-3"
          >
            PROČ PRÁVĚ FRANCO'S?
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-[3px] bg-gold mx-auto mt-4 origin-center"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-charcoal-light/70 font-sans mt-5 leading-relaxed text-sm sm:text-base"
          >
            Pečeme s láskou, ctíme řemeslo a věříme, že dobré jídlo spojuje lidi. 
            Zde je to, co nás dělá jedinečnou pizzerií na Mělníku.
          </motion.p>
        </div>

        {/* Features Bento list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-8 border border-cream-dark shadow-[0_4px_20px_-4px_rgba(31,31,31,0.05)] hover:shadow-[0_12px_30px_-6px_rgba(31,31,31,0.08)] transition-all duration-300 relative group flex flex-col justify-between overflow-hidden"
            >
              {/* Top abstract line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-ita-green/60 to-gold/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              <div>
                <div className="flex justify-between items-start mb-6">
                  {/* Icon wrapper */}
                  <div className="p-3 bg-cream/85 rounded-xl text-gold group-hover:bg-[#1F6B45]/10 group-hover:text-ita-green transition-colors duration-300">
                    {feat.icon}
                  </div>
                  
                  {/* Subtle index badge */}
                  <span className="text-[10px] uppercase font-mono tracking-widest font-semibold px-2.5 py-1 rounded bg-cream-dark/50 text-[#1F6B45]/70">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-charcoal mb-3 group-hover:text-ita-green transition-colors">
                  {feat.title}
                </h3>
                
                <p className="text-charcoal-light/70 text-sm leading-relaxed font-sans mb-4">
                  {feat.description}
                </p>
              </div>

              {/* Read recipe inline simulation accent */}
              <div className="flex items-center gap-1.5 mt-2 text-xs font-mono font-semibold text-gold group-hover:animate-pulse">
                <span>✦ Autentica Italiana</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
