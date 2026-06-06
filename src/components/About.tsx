import { motion } from 'motion/react';
import { Star, Flame, Trophy, Leaf } from 'lucide-react';

export default function About() {
  const stats = [
    {
      id: 1,
      value: '4,9 / 5',
      label: 'Hodnocení hostů',
      desc: 'Přes 140+ recenzí',
      icon: <Star className="text-gold fill-gold w-5 h-5 animate-pulse" />
    },
    {
      id: 2,
      value: '20+',
      label: 'Druhů skvělé pizzy',
      desc: 'Z pece na dřevo',
      icon: <Flame className="text-ita-red w-5 h-5" />
    },
    {
      id: 3,
      value: '5',
      label: 'Druhů těstovin',
      desc: 'Z ranní čerstvé semoliny',
      icon: <Trophy className="text-gold w-5 h-5" />
    },
    {
      id: 4,
      value: '100%',
      label: 'Italská vášeň',
      desc: 'Autentické rodinné pouto',
      icon: <Leaf className="text-ita-green w-5 h-5" />
    }
  ];

  return (
    <section id="o-nas" className="py-24 bg-[#1F1F1F] text-white relative overflow-hidden scroll-mt-20">
      {/* Visual backdrop decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ita-green/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-ita-red/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-8">
          
          {/* Narrative & Story */}
          <div className="space-y-8">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xs font-mono font-medium tracking-widest text-[#C9A45C] uppercase block mb-2"
              >
                Naše rodinná tradice
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight"
              >
                RODINNÝ KLENOT <br />
                V SRDCI MĚLNÍKA
              </motion.h2>
              <div className="w-16 h-[2.5px] bg-gold mt-4"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-cream-dark/85 font-sans text-sm sm:text-base leading-relaxed"
            >
              <p>
                <strong>Franco's Pizza & Pasta</strong> je útulná rodinná pizzerie v Mělníku. Její zakladatel, majitel a současně šéfkuchař <strong>pochází z italské Neapole</strong> a přináší s sebou celoživotní zkušenosti a vášeň pro opravdovou, tradiční chuť těsta s nefalšovanými nadýchanými okraji.
              </p>
              <p>
                Zakládáme si na čerstvých a poctivých surovinách. I když některé základy, jako mouku nebo rajčata San Marzano, pečlivě vybíráme, jedinečné ingredience si tvoříme sami — například <strong>pálivé papričky jalapeños si s péčí pěstujeme sami na naší zahrádce</strong>, díky čemuž mají nezaměnitelnou domácí chuť a ostrost.
              </p>
              <p>
                Chceme, abyste se u nás cítili jako u italské rodiny při nedělním obědě. V létě si můžete uvolněnou rodinnou atmosféru vychutnat na naší stinné rozkvetlé <strong>venkovní zahrádce</strong>, v chladnějším období pak v intimním a hřejivém domáckém prostředí v interiéru restaurace.
              </p>
            </motion.div>

            {/* Core Stats Block */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              {stats.map((st, index) => (
                <motion.div
                  key={st.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-charcoal-light/60 border border-white/5 p-4 rounded-2xl flex flex-col items-center text-center group hover:border-gold/30 hover:bg-charcoal-light transition-all duration-300"
                >
                  <div className="mb-2 p-1.5 bg-white/5 rounded-lg group-hover:bg-gold/10 transition-colors">
                    {st.icon}
                  </div>
                  <h4 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight">
                    {st.value}
                  </h4>
                  <span className="text-[11px] font-medium text-gold/90 uppercase tracking-wide mt-1">
                    {st.label}
                  </span>
                  <span className="text-[9px] text-white/50 tracking-wider font-mono mt-0.5">
                    {st.desc}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
