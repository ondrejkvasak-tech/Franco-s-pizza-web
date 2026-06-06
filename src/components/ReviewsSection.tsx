import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, MessageSquarePlus, Check, UserCircle } from 'lucide-react';
import { REVIEWS } from '../data';
import { ReviewItem } from '../types';

export default function ReviewsSection() {
  const [localReviews, setLocalReviews] = useState<ReviewItem[]>(REVIEWS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // New review form fields
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-cycle reviews
  useEffect(() => {
    if (showAddForm) return; // Stop cycling while reading or filling
    
    const interval = setInterval(() => {
      setDirection('right');
      setActiveIndex((prev) => (prev === localReviews.length - 1 ? 0 : prev + 1));
    }, 600000); // 10 minutes or keep quite high to permit relaxed reading
    
    return () => clearInterval(interval);
  }, [localReviews.length, showAddForm]);

  const handlePrev = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev === 0 ? localReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev === localReviews.length - 1 ? 0 : prev + 1));
  };

  const handleSelectIdx = (idx: number) => {
    setDirection(idx > activeIndex ? 'right' : 'left');
    setActiveIndex(idx);
  };

  const calculateAverageRating = () => {
    const total = localReviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / localReviews.length).toFixed(1);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const userReview: ReviewItem = {
      id: `r-custom-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      text: newText.trim(),
      date: 'Nyní'
    };

    // Prepend to list
    setLocalReviews((prev) => [userReview, ...prev]);
    setActiveIndex(0); // View the newest instantly
    setIsSuccess(true);

    // Reset fields
    setNewAuthor('');
    setNewText('');
    setNewRating(5);

    setTimeout(() => {
      setIsSuccess(false);
      setShowAddForm(false);
    }, 2500);
  };

  return (
    <section id="recenze" className="py-24 bg-[#1F1F1F] text-white relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-ita-green/5 rounded-full filter blur-3xl pointer-events-none -translate-x-12"></div>
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-ita-red/5 rounded-full filter blur-3xl pointer-events-none translate-x-12"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* HEADER BLOCK */}
        <div className="max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold tracking-widest text-gold uppercase"
          >
            Slovo našich hostů
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight mt-2"
          >
            CO O NÁS ŘÍKAJÍ?
          </motion.h2>
          <div className="w-16 h-[2.5px] bg-gold mx-auto mt-3"></div>

          {/* Core score summary panel */}
          <div className="flex items-center justify-center gap-3 mt-4 text-sm font-sans text-cream-dark/80">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} className="fill-gold text-gold" />
              ))}
            </div>
            <span>Průměr z hodnocení: <strong className="text-white text-base">{calculateAverageRating()}</strong> / 5</span>
            <span>({localReviews.length} recenzí)</span>
          </div>
        </div>

        {/* CONTAINER DISPLAY OR FORMS */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            {!showAddForm ? (
              
              /* REVIEWS CAROUSEL SLIDE WITH MOTION ACCENTS */
              <motion.div
                key={localReviews[activeIndex].id}
                initial={{ opacity: 0, x: direction === 'right' ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === 'right' ? -40 : 40 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                {/* Massive decorative red quotation mark */}
                <span className="text-8xl sm:text-9xl font-serif text-ita-red/20 absolute -top-10 left-1/2 transform -translate-x-1/2 leading-none pointer-events-none select-none">
                  “
                </span>

                <div className="space-y-6 pt-8 pb-4 relative z-10">
                  {/* Rating Stars list */}
                  <div className="flex justify-center gap-1.5">
                    {Array.from({ length: localReviews[activeIndex].rating }).map((_, i) => (
                      <Star key={i} size={22} className="fill-gold text-gold" />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <blockquote className="text-lg sm:text-2xl font-display italic font-light leading-relaxed text-cream max-w-3xl mx-auto px-4">
                    "{localReviews[activeIndex].text}"
                  </blockquote>

                  {/* Author Name and timestamp */}
                  <div className="space-y-1">
                    <cite className="font-sans font-bold text-sm sm:text-base text-white not-italic tracking-wide">
                      {localReviews[activeIndex].author}
                    </cite>
                    <span className="block text-[10px] sm:text-xs font-mono text-white/40 uppercase tracking-widest">
                      Spokojený host · {localReviews[activeIndex].date}
                    </span>
                  </div>
                </div>

                {/* Tactile navigation arrows */}
                <div className="hidden sm:block">
                  <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full border border-white/10 hover:border-white/30 text-white/50 hover:text-white bg-[#1F1F1F]/60 transition-colors z-10 cursor-pointer"
                    aria-label="Předchozí recenze"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full border border-white/10 hover:border-white/30 text-white/50 hover:text-white bg-[#1F1F1F]/60 transition-colors z-10 cursor-pointer"
                    aria-label="Následující recenze"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </motion.div>

            ) : (

              /* CUSTOM ADD REVIEW FORM BOX */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-charcoal-light border border-white/10 rounded-2xl p-6 sm:p-8 max-w-xl w-full text-left relative z-20 shadow-xl"
              >
                {!isSuccess ? (
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-3">
                      <h4 className="font-display font-medium text-lg text-white">Napište nám recenzi</h4>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="text-xs text-white/40 hover:text-white transition-colors"
                      >
                        Zrušit
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Vaše jméno <span className="text-ita-red">*</span></label>
                        <input
                          type="text"
                          required
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          placeholder="Např. Marek K."
                          className="w-full bg-charcoal text-white border border-white/10 focus:border-gold rounded-xl px-3.5 py-2 text-sm outline-none transition-colors"
                        />
                      </div>

                      {/* Select Rating Stars */}
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Hodnocení <span className="text-ita-red">*</span></label>
                        <div className="flex h-10 items-center gap-1.5 bg-charcoal rounded-xl px-3 justify-center border border-white/10">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setNewRating(s)}
                              className="p-1 text-white/50 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                            >
                              <Star
                                size={20}
                                className={s <= newRating ? 'text-gold fill-gold' : 'text-white/20'}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Message Box */}
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Vaše zkušenost drahého hosta <span className="text-ita-red">*</span></label>
                      <textarea
                        required
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        rows={3}
                        placeholder="Jak se vám líbilo jídlo a obsluha? Co vám nejvíce chutnalo?"
                        className="w-full bg-charcoal text-white border border-white/10 focus:border-gold rounded-xl px-3.5 py-2 text-sm outline-none transition-colors resize-none"
                      ></textarea>
                    </div>

                    {/* Submit actions */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 bg-gold hover:bg-gold-light text-charcoal rounded-xl text-xs font-bold tracking-wider uppercase transition-colors shadow-md text-center cursor-pointer"
                      >
                        Uložit hodnocení
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-12 text-center flex flex-col items-center">
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                      <Check size={20} />
                    </div>
                    <h5 className="font-display font-bold text-lg">Děkujeme za vaši recenzi!</h5>
                    <p className="text-xs text-white/60 mt-1 max-w-sm leading-relaxed">
                      Vaše zpětná vazba byla zaznamenána do naší databáze a byla úspěšně přidána na vrchol seznamu. Velmi si vážíme vašeho upřímného hodnocení.
                    </p>
                  </div>
                )}
              </motion.div>

            )}
          </AnimatePresence>
        </div>

        {/* CONTROLS AREA WITH INDEX DOTS AND BUTTON TRIGGER */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
          {/* Index Dots */}
          <div className="flex gap-2">
            {!showAddForm && localReviews.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelectIdx(i)}
                className={`h-2 rounded-full cursor-pointer transition-all ${
                  i === activeIndex ? 'w-6 bg-gold' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Přejít na recenzi ${i + 1}`}
              ></button>
            ))}
          </div>

          {/* Trigger write a review form */}
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-gold hover:text-gold text-xs font-sans font-semibold rounded-full bg-white/5 transition-all sm:self-end cursor-pointer"
            >
              <MessageSquarePlus size={14} className="text-gold" />
              <span>Napsat recenzi</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAddForm(false)}
              className="text-white/40 hover:text-white text-xs underline cursor-pointer"
            >
              Zpět na recenze
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
