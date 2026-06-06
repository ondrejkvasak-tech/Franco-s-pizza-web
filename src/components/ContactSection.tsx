import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Facebook, Instagram, Send, CheckCircle2, Clock, Copy } from 'lucide-react';
import { ContactForm } from '../types';

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState({ name: '', email: '', phone: '', message: '' });

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      })
      .catch((err) => {
        console.error("Auto copy failed", err);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailBody = `Dobrý den,\n\nZde je zpráva z kontaktního formuláře Franco's:\n\nOd Jména: ${formData.name}\nE-mail odesílatele: ${formData.email}\nTelefon: ${formData.phone || 'Nezadán'}\n\nZpráva:\n${formData.message}\n\n---\nTato zpráva byla připravena k odeslání pro pizzaserosi.franco@seznam.cz`;

    // Save copy to clipboard instantly
    try {
      navigator.clipboard.writeText(emailBody);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.log("Auto copy blocked");
    }

    setSubmittedMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      const mailtoSubject = encodeURIComponent(`Nová zpráva od ${formData.name} - Franco's Mělník`);
      const mailtoUrl = `mailto:pizzaserosi.franco@seznam.cz?subject=${mailtoSubject}&body=${encodeURIComponent(emailBody)}`;
      
      try {
        window.location.href = mailtoUrl;
      } catch (err) {
        console.error("Mailto trigger failed", err);
      }

      // Reset form fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 1200);
  };

  return (
    <section id="kontakt" className="py-24 bg-[#1F1F1F] text-white relative overflow-hidden scroll-mt-20">
      {/* Decorative vectors */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-ita-green via-cream-dark to-ita-red"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold tracking-widest text-gold uppercase"
          >
            Ozvěte se nám nebo přijďte
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight mt-2"
          >
            KDE NÁS NAJDETE?
          </motion.h2>
          <div className="w-16 h-[2.5px] bg-gold mx-auto mt-3"></div>
          <p className="text-cream-dark/70 text-sm sm:text-base font-sans mt-4">
            Jsme tu pro vás každý den. Chcete uspořádat oslavu, zarezervovat firemní oběd nebo se jen na něco zeptat? Neváhejte nás kontaktovat.
          </p>
        </div>

        {/* 3-COLUMN CONTACT PANELS DETAILS Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* COLUMN 1: INTERACTIVE CONTACT DETAILS */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <h3 className="font-display font-bold text-xl text-white tracking-wide border-b border-white/5 pb-3">
              Kontaktní údaje
            </h3>

            {/* Address Card */}
            <div className="flex gap-4 p-5 bg-charcoal-light/35 border border-white/5 rounded-2xl">
              <div className="p-3 bg-white/5 rounded-xl text-gold h-fit">
                <MapPin size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#C9A45C] uppercase block">Adresa</span>
                <p className="font-sans font-bold text-sm text-white mt-1">Bezručova 3327</p>
                <p className="text-cream-dark/60 text-xs mt-0.5">276 01 Mělník, Česká republika</p>
              </div>
            </div>

            {/* Phone Card */}
            <a
              href="tel:+420777906014"
              className="flex gap-4 p-5 bg-charcoal-light/35 border border-white/5 hover:border-gold/30 hover:bg-charcoal-light/60 rounded-2xl group transition-all block"
            >
              <div className="p-3 bg-white/5 group-hover:bg-gold/10 rounded-xl text-gold h-fit transition-colors">
                <Phone size={20} />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono tracking-widest text-[#C9A45C] uppercase block">Telefon</span>
                <p className="font-sans font-bold text-sm text-white mt-1 group-hover:text-gold transition-colors">+420 777 906 014</p>
                <p className="text-cream-dark/60 text-xs mt-0.5">Kliknutím rovnou zavolat</p>
              </div>
            </a>

            {/* Email Card */}
            <a
              href="mailto:pizzaserosi.franco@seznam.cz"
              className="flex gap-4 p-5 bg-charcoal-light/35 border border-white/5 hover:border-gold/30 hover:bg-charcoal-light/60 rounded-2xl group transition-all block"
            >
              <div className="p-3 bg-white/5 group-hover:bg-gold/10 rounded-xl text-gold h-fit transition-colors">
                <Mail size={20} />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono tracking-widest text-[#C9A45C] uppercase block">E-mail</span>
                <p className="font-sans font-bold text-sm text-white mt-1 group-hover:text-gold transition-colors break-all">pizzaserosi.franco@seznam.cz</p>
                <p className="text-cream-dark/60 text-xs mt-0.5">Odpovídáme obvykle do hodiny</p>
              </div>
            </a>

            {/* Open Hours Card & Socials links */}
            <div className="p-5 bg-charcoal-light/20 border border-white/5 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-gold">
                <Clock size={16} />
                <span className="font-mono text-xs font-semibold uppercase tracking-widest">Otevírací doba</span>
              </div>
              <div className="space-y-1.5 text-xs text-cream-dark/80">
                <div className="flex justify-between">
                  <span>Pondělí</span>
                  <span className="font-bold text-ita-red">ZAVŘENO</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-1.5">
                  <span>Úterý - Neděle</span>
                  <span className="font-bold text-white">16:00 - 22:00</span>
                </div>
              </div>

              {/* Social Channels buttons */}
              <div className="pt-3 border-t border-white/5 flex">
                <a
                  href="https://www.facebook.com/francospizzaupastamelnik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 hover:text-gold border border-white/10 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Facebook size={12} className="text-gold" />
                  <span className="font-sans font-semibold">Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 2: CONTACT FORM PANEL */}
          <div className="lg:col-span-4 bg-charcoal-light/30 border border-white/5 p-6 rounded-3xl text-left relative">
            <h3 className="font-display font-bold text-xl text-white tracking-wide border-b border-white/5 pb-3 mb-4">
              Napište nám zprávu
            </h3>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs text-white/70 mb-1">
                    Vaše celé jméno <span className="text-ita-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Např. Jan Novák"
                    className="w-full bg-charcoal-light text-white border border-white/15 focus:border-gold rounded-xl px-3.5 py-2.5 text-xs outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-white/70 mb-1">
                    E-mail <span className="text-ita-red">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="priklad@gmail.com"
                    className="w-full bg-charcoal-light text-white border border-white/15 focus:border-gold rounded-xl px-3.5 py-2.5 text-xs outline-none transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs text-white/70 mb-1">
                    Telefon (nepovinné)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+420 777 777 777"
                    className="w-full bg-charcoal-light text-white border border-white/15 focus:border-gold rounded-xl px-3.5 py-2.5 text-xs outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs text-white/70 mb-1">
                    Zpráva <span className="text-ita-red">*</span>
                  </label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Váš dotaz, přání či poptávka..."
                    className="w-full bg-charcoal-light text-white border border-white/15 focus:border-gold rounded-xl px-3.5 py-2.5 text-xs outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gold hover:bg-gold-light text-charcoal rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                >
                  <Send size={12} />
                  <span>{isSubmitting ? 'Odesílám...' : 'Odeslat zprávu'}</span>
                </button>
              </form>
            ) : (
              <div className="py-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-14 h-14 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 mb-4">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="text-lg font-display font-medium text-white">E-mail byl připraven!</h4>
                <p className="text-white/70 text-xs mt-2 px-3 max-w-sm leading-relaxed">
                  Děkujeme, Vážený/á <strong>{submittedMessage.name}</strong>. E-mail s vaší zprávou byl směřován na: <strong className="text-gold">pizzaserosi.franco@seznam.cz</strong>.
                </p>

                {/* Email text box description */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 mt-4 text-left text-[11px] max-w-xs w-full space-y-1">
                  <p className="text-white/40 uppercase text-[8px] font-mono tracking-wider flex justify-between items-center">
                    <span>Obsah e-mailové zprávy</span>
                    {isCopied && <span className="text-emerald-400 font-sans font-bold">Kopírováno!</span>}
                  </p>
                  <div className="text-white/80 font-mono text-[9px] bg-black/40 p-2 rounded max-h-24 overflow-y-auto whitespace-pre-wrap select-all">
                    {`Dobrý den,\n\nZde je zpráva z kontaktního formuláře Franco's:\n\nOd: ${submittedMessage.name}\nE-mail: ${submittedMessage.email}\nTelefon: ${submittedMessage.phone || 'Nezadán'}\n\nZpráva:\n${submittedMessage.message}`}
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2 w-full max-w-xs">
                  <button
                    onClick={() => handleCopyText(`Dobrý den,\n\nZde je zpráva z kontaktního formuláře Franco's:\n\nOd: ${submittedMessage.name}\nE-mail: ${submittedMessage.email}\nTelefon: ${submittedMessage.phone || 'Nezadán'}\n\nZpráva:\n${submittedMessage.message}`)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isCopied ? 'bg-emerald-600 text-white' : 'bg-gold hover:bg-gold-light text-charcoal'
                    }`}
                  >
                    <Copy size={12} />
                    <span>{isCopied ? 'Zkopírováno!' : 'Zkopírovat e-mail (pro PC)'}</span>
                  </button>

                  <a
                    href={`mailto:pizzaserosi.franco@seznam.cz?subject=${encodeURIComponent(`ZPRÁVA: ${submittedMessage.name} (Franco's)`)}&body=${encodeURIComponent(`Dobrý den,\n\nZde je zpráva z kontaktního formuláře Franco's:\n\nOd: ${submittedMessage.name}\nE-mail: ${submittedMessage.email}\nTelefon: ${submittedMessage.phone || 'Nezadán'}\n\nZpráva:\n${submittedMessage.message}`)}`}
                    className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center block transition-colors border border-white/5"
                  >
                    Send Email (Otevřít klienta)
                  </a>
                </div>

                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-5 text-xs text-white/50 hover:text-white underline"
                >
                  Napsat další zprávu
                </button>
              </div>
            )}
          </div>

          {/* COLUMN 3: STYLISH INTERACTIVE GOOGLE MAPS */}
          <div className="lg:col-span-4 bg-charcoal-light/10 border border-white/5 rounded-3xl p-4 overflow-hidden h-[420px] lg:h-auto flex flex-col justify-between">
            <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 relative h-full">
              {/* Responsive Google Maps Iframe pointing to Bezručova 3327, Mělník */}
              <iframe
                title="Pizzeria Franco's Pizza & Pasta Mělník map locus"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2537.4526685513904!2d14.4831349!3d50.3581176!2m3!1f0!2f0!3f0!3m2!1i1024|2i768|4f13.1!3m3!1m2!1s0x470bf7e7fe0ed50d%3A0xc07cf3b2f29b0a1d!2sBezru%C4%8Dova%203327%2C%20276%2001%20M%C4%9Bln%C3%ADk!5e0!3m2!1scs!2scz!4v1780327200000!5m2!1scs!2scz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter invert-[0.9] saturate-[0.8] contrast-[1.1]"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
