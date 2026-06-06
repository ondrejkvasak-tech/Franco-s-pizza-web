import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, Mail, Phone, User, Check, X, ArrowRight, Copy } from 'lucide-react';
import { IMAGE_HERO_PIZZA } from '../data';
import { BookingForm } from '../types';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    phone: '',
    guests: 2,
    date: '',
    time: '18:00',
    email: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopySMS = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      })
      .catch((err) => {
        console.error("Auto copy failed, user can copy manually", err);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: idNumFields.includes(name) ? Number(value) : value
    }));
  };

  const idNumFields = ['guests'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const smsText = `Dobrý den, chci rezervovat stůl u Franco's. Jméno: ${formData.name}, Počet osob: ${formData.guests}, Datum: ${formData.date}, Čas: ${formData.time}, Tel: ${formData.phone}.${formData.note ? ` Poznámka: ${formData.note}` : ''}`;
    
    // Auto-copy instantly inside the user gesture event so it succeeds on computers
    try {
      navigator.clipboard.writeText(smsText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.log("Auto-copy blocked by browser restriction");
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      const smsUrl = `sms:+420777906014?body=${encodeURIComponent(smsText)}`;
      // Attempt to invoke native SMS client
      try {
        window.location.href = smsUrl;
      } catch (err) {
        console.log("SMS redirection failed, customer can click fallback buttons.");
      }
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      guests: 2,
      date: '',
      time: '18:00',
      email: '',
      note: ''
    });
    setIsSuccess(false);
    setIsModalOpen(false);
  };

  const handleScrollToSection = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 50);
    }
  };

  return (
    <section id="domu" className="relative h-screen w-full flex items-center justify-center overflow-hidden scroll-mt-20">
      {/* Cinematic Background with Zoom-In Effect on load */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={IMAGE_HERO_PIZZA}
          alt="Authentic wood-fired Neapolitan pizza"
          className="w-full h-full object-cover select-none filter brightness-50"
          referrerPolicy="no-referrer"
        />
        {/* Multilayer gradient overlays for premium dark atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-dark via-charcoal/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark through-transparent to-black/30"></div>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left w-full h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Subtle Italian green-cream-red tag badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-ita-green"></span>
            <span className="flex h-2 w-2 rounded-full bg-cream"></span>
            <span className="flex h-2 w-2 rounded-full bg-ita-red"></span>
            <span className="text-xs font-mono font-medium text-gold uppercase tracking-widest pl-1">
              Pravá Itálie v Mělníku
            </span>
          </motion.div>

          {/* Premium Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.1] mb-6"
          >
            PRAVÁ CHUŤ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">
              ITÁLIE
            </span>{' '}
            V MĚLNÍKU
          </motion.h1>

          {/* Supporting paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-cream-dark/95 leading-relaxed font-sans mb-10 max-w-2xl"
          >
            Autentická italská pizza, domácí těstoviny a poctivé suroviny. 
            Vychutnejte si pravou atmosféru Itálie přímo v srdci Mělníka.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:items-center"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-ita-green to-ita-green-light hover:from-ita-green-light hover:to-ita-green text-white font-sans font-semibold text-sm rounded-xl tracking-wider uppercase transition-all shadow-lg hover:shadow-ita-green/30 transform hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
            >
              Rezervovat stůl
            </button>
            <button
              onClick={() => handleScrollToSection('#rozvoz')}
              className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-sans font-semibold text-sm rounded-xl tracking-wider uppercase border-2 border-white/30 hover:border-white transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Objednat rozvoz</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>



      {/* RESERVATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-charcoal text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-w-lg w-full z-10"
            >
              {/* Header block with Italian accents */}
              <div className="bg-gradient-to-r from-ita-green-dark via-charcoal-light to-ita-red-light p-6 relative">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
                <span className="text-[10px] font-mono tracking-widest text-gold uppercase">
                  Franco's Pizza & Pasta Mělník
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold mt-1">
                  Rezervace stolu v restauraci
                </h3>
                <p className="text-white/70 text-xs mt-1">
                  Po vytvoření rezervace vás budeme ihned kontaktovat pro potvrzení.
                </p>
              </div>

              {/* Form Body or Success Screen */}
              <div className="p-6">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                          <User size={12} className="text-gold" />
                          Celé jméno <span className="text-ita-red">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Jan Novák"
                          className="w-full bg-charcoal-light text-white border border-white/10 focus:border-gold rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors"
                        />
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                          <Phone size={12} className="text-gold" />
                          Telefonní číslo <span className="text-ita-red">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+420 777 777 777"
                          className="w-full bg-charcoal-light text-white border border-white/10 focus:border-gold rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Date input */}
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                          <Calendar size={12} className="text-gold" />
                          Datum <span className="text-ita-red">*</span>
                        </label>
                        <input
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full bg-charcoal-light text-white border border-white/10 focus:border-gold rounded-xl px-3.5 py-2.5 text-xs sm:text-sm outline-none transition-colors text-white scheme-dark"
                        />
                      </div>

                      {/* Time input */}
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                          <Clock size={12} className="text-gold" />
                          Čas <span className="text-ita-red">*</span>
                        </label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full bg-charcoal-light text-white border border-white/10 focus:border-gold rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors"
                        >
                          <option value="16:00" className="bg-charcoal">16:00</option>
                          <option value="16:30" className="bg-charcoal">16:30</option>
                          <option value="17:00" className="bg-charcoal">17:00</option>
                          <option value="17:30" className="bg-charcoal">17:30</option>
                          <option value="18:00" className="bg-charcoal">18:00</option>
                          <option value="18:30" className="bg-charcoal">18:30</option>
                          <option value="19:00" className="bg-charcoal">19:00</option>
                          <option value="19:30" className="bg-charcoal">19:30</option>
                          <option value="20:00" className="bg-charcoal">20:00</option>
                          <option value="20:30" className="bg-charcoal">20:30</option>
                          <option value="21:00" className="bg-charcoal">21:00</option>
                          <option value="21:30" className="bg-charcoal">21:30</option>
                        </select>
                      </div>

                      {/* Guests number */}
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                          <Users size={12} className="text-gold" />
                          Počet osob <span className="text-ita-red">*</span>
                        </label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full bg-charcoal-light text-white border border-white/10 focus:border-gold rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors"
                        >
                          <option value="1" className="bg-charcoal">1 osoba</option>
                          <option value="2" className="bg-charcoal">2 osoby</option>
                          <option value="3" className="bg-charcoal">3 osoby</option>
                          <option value="4" className="bg-charcoal">4 osoby</option>
                          <option value="5" className="bg-charcoal">5 osob</option>
                          <option value="6" className="bg-charcoal">6 osob</option>
                          <option value="7" className="bg-charcoal">7+ osob</option>
                        </select>
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                        <Mail size={12} className="text-gold" />
                        E-mail pro potvrzení <span className="text-ita-red">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e-mail@priklady.cz"
                        className="w-full bg-charcoal-light text-white border border-white/10 focus:border-gold rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors"
                      />
                    </div>

                    {/* Custom Note */}
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1.5">
                        Poznámka / Speciální přání (volitelné)
                      </label>
                      <textarea
                        name="note"
                        value={formData.note || ''}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="Např. dětská sedačka, alergie na lepek, sraz u okna..."
                        className="w-full bg-charcoal-light text-white border border-white/10 focus:border-gold rounded-xl px-3.5 py-2 text-sm outline-none transition-colors resize-none"
                      ></textarea>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex gap-3 text-right">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 px-4 py-2 bg-charcoal-light hover:bg-white/5 border border-white/10 text-white rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Zrušit
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-2 px-4 py-3 bg-gold hover:bg-gold-light text-charcoal rounded-xl text-sm font-bold tracking-wider uppercase transition-colors shadow-md disabled:opacity-50 cursor-pointer text-center"
                      >
                        {isSubmitting ? 'Odesílám...' : 'Odeslat rezervaci'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 mb-4">
                      <Check size={32} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-medium text-white leading-snug">
                      Rezervace připravena k odeslání!
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm mt-3 px-4 max-w-md leading-relaxed">
                      Děkujeme, Vážený/á <strong>{formData.name}</strong>. Pro dokončení rezervace prosím odešlete zprávu na naše provozní číslo: <strong className="text-gold font-mono">+420 777 906 014</strong>.
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-4 text-left text-xs max-w-sm w-full space-y-1">
                      <p className="text-white/50 uppercase text-[9px] font-mono tracking-widest flex justify-between items-center">
                        <span>Obsah zprávy k odeslání</span>
                        {isCopied ? (
                          <span className="text-emerald-400 font-sans text-[10px] lowercase">Kopírováno!</span>
                        ) : (
                          <span className="text-white/30 font-sans text-[10px] lowercase">Text je v schránce</span>
                        )}
                      </p>
                      <div className="text-white font-mono text-[11px] leading-relaxed bg-black/40 p-2.5 rounded-lg border border-white/5 whitespace-pre-wrap select-all">
                        {`Dobrý den, chci rezervovat stůl u Franco's. Jméno: ${formData.name}, Počet osob: ${formData.guests}, Datum: ${formData.date}, Čas: ${formData.time}, Tel: ${formData.phone}.${formData.note ? ` Poznámka: ${formData.note}` : ''}`}
                      </div>
                    </div>

                    {/* Direct SMS CTA triggers fallback */}
                    <div className="mt-6 flex flex-col gap-2.5 w-full max-w-xs">
                      <button
                        onClick={() => handleCopySMS(`Dobrý den, chci rezervovat stůl u Franco's. Jméno: ${formData.name}, Počet osob: ${formData.guests}, Datum: ${formData.date}, Čas: ${formData.time}, Tel: ${formData.phone}.${formData.note ? ` Poznámka: ${formData.note}` : ''}`)}
                        className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                          isCopied ? 'bg-emerald-600 text-white' : 'bg-gold hover:bg-gold-light text-charcoal'
                        }`}
                      >
                        <Copy size={13} />
                        <span>{isCopied ? 'Zkopírováno!' : 'Zkopírovat zprávu (pro PC)'}</span>
                      </button>

                      <a
                        href={`sms:+420777906014?body=${encodeURIComponent(`Dobrý den, chci rezervovat stůl u Franco's. Jméno: ${formData.name}, Počet osob: ${formData.guests}, Datum: ${formData.date}, Čas: ${formData.time}, Tel: ${formData.phone}.${formData.note ? ` Poznámka: ${formData.note}` : ''}`)}`}
                        className="w-full py-3 bg-white/10 hover:bg-white/25 text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center block transition-colors"
                      >
                        📱 Odeslat SMS přímo (z mobilu)
                      </a>

                      <a
                        href={`https://wa.me/420777906014?text=${encodeURIComponent(`Dobrý den, chci rezervovat stůl u Franco's. Jméno: ${formData.name}, Počet osob: ${formData.guests}, Datum: ${formData.date}, Čas: ${formData.time}, Tel: ${formData.phone}.${formData.note ? ` Poznámka: ${formData.note}` : ''}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 bg-[#25D366] hover:bg-[#22c35e] text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center block shadow-sm transition-colors"
                      >
                        💬 Odeslat přes WhatsApp (PC i mobil)
                      </a>

                      <button
                        onClick={resetForm}
                        className="w-full py-2 bg-charcoal-light/40 hover:bg-white/5 text-white/55 hover:text-white rounded-xl text-[11px] font-semibold uppercase tracking-wider transition-colors mt-1"
                      >
                        Hotovo / Zavřít
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
