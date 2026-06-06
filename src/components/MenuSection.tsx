import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Leaf, Trash2, CheckCircle2, ChevronRight, Sparkles, X, Phone, AlertCircle, ExternalLink, Copy } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

interface CartItem {
  item: MenuItem;
  quantity: number;
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pizza' | 'pasta' | 'drink' | 'salad'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);
  
  // Shopping Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'foodora' | 'done'>('cart');
  
  // Checkout Form fields
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [custNote, setCustNote] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Clipboard copy helper
  const handleCopySMS = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      })
      .catch((err) => {
        console.error("Auto copy failed", err);
      });
  };

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !onlyVegetarian || item.isVegetarian;

      return matchesCategory && matchesSearch && matchesVeg;
    });
  }, [activeCategory, searchQuery, onlyVegetarian]);

  // Cart operations
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    // Open cart drawer immediately for visual feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return { ...ci, quantity: newQty };
          }
          return ci;
        })
        .filter((ci) => ci.quantity > 0)
    );
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((total, ci) => total + (ci.item.price * ci.quantity), 0);
  }, [cart]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const itemsSummary = cart.map(ci => `${ci.quantity}x ${ci.item.name}`).join(', ');
    const smsText = `Dobrý den, objednávávám Osobní odběr u Franco's. Jméno: ${custName}, Tel: ${custPhone}, Čas vyzvednutí: ${custAddress}, Objednávka: ${itemsSummary}, Celkem: ${cartTotal} Kč.${custNote ? ` Poznámka: ${custNote}` : ''}`;
    
    // Auto-copy instantly inside the user gesture event so it succeeds on computers
    try {
      navigator.clipboard.writeText(smsText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.log("Auto-copy blocked by browser restriction");
    }

    setCheckoutStep('done');

    const smsUrl = `sms:+420777906014?body=${encodeURIComponent(smsText)}`;
    try {
      window.location.href = smsUrl;
    } catch (err) {
      console.log("SMS redirection failed");
    }
  };

  const closeCartFlow = () => {
    if (checkoutStep === 'done') {
      setCart([]);
      setCheckoutStep('cart');
    }
    setIsCartOpen(false);
  };

  return (
    <section id="menu" className="py-24 bg-cream/70 relative scroll-mt-20">
      {/* Wave separator */}
      <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#1F1F1F] to-transparent pointer-events-none opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold tracking-widest text-ita-green uppercase"
          >
            Ručně dělané, čerstvě upečené
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-charcoal mt-2 tracking-tight"
          >
            NÁŠ JÍDELNÍ LÍSTEK
          </motion.h2>
          <div className="w-16 h-[2.5px] bg-gold mx-auto mt-3"></div>
          <p className="text-charcoal-light/75 text-sm sm:text-base font-sans mt-4">
            Vyberte si ze široké nabídky našich křupavých pizz s tenkým okrajem, poctivých domácích těstovin nebo osvěžujících nápojů.
          </p>
        </div>

        {/* SEARCH, CATEGORY FILTERS, DIETARY FLAGGING */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(31,31,31,0.03)] border border-cream-dark p-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            
            {/* Category Pills Selector */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start w-full lg:w-auto">
              {[
                { id: 'all', label: 'Všechno' },
                { id: 'pizza', label: '🍕 Pizzy' },
                { id: 'pasta', label: '🍝 Těstoviny' },
                { id: 'salad', label: '🥗 Saláty' },
                { id: 'drink', label: '🍺 Nápoje' }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as any)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wide transition-all uppercase cursor-pointer ${
                    activeCategory === category.id
                      ? 'bg-[#1F6B45] text-white shadow-md shadow-ita-green/20'
                      : 'bg-cream text-charcoal-light hover:bg-[#1F6B45]/5 hover:text-ita-green'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Live Search and Dietary Filtering */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center">
              {/* Text Search Input */}
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-charcoal-light/40" />
                <input
                  type="text"
                  placeholder="Vyhledat jídlo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-cream/60 focus:bg-white text-charcoal border border-cream-dark focus:border-gold px-10 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all placeholder:text-charcoal-light/40"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-0.5 rounded-full hover:bg-cream text-charcoal/50"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Vegetarian constraint toggle */}
              <button
                onClick={() => setOnlyVegetarian(!onlyVegetarian)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all w-full sm:w-auto justify-center ${
                  onlyVegetarian
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700'
                    : 'bg-white border-cream-dark hover:bg-cream text-charcoal-light'
                }`}
              >
                <Leaf size={14} className={onlyVegetarian ? 'text-emerald-500 fill-emerald-500' : 'text-charcoal-light/60'} />
                <span>Jen vegetariánská ({MENU_ITEMS.filter(m => m.isVegetarian).length})</span>
              </button>
            </div>

          </div>
        </div>

        {/* DRUM-ROLL GRID OF ITEMS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden border border-cream-dark shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgb(31,31,31,0.05)] transition-all duration-300 flex flex-col justify-between p-6 relative group"
              >
                {/* Visual Accent badge tags (Featured, Veg, Popularity) */}
                <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 z-10">
                  {item.popularityBadge && (
                    <span className="flex items-center gap-1 text-[9px] font-sans font-bold uppercase tracking-wider bg-ita-red/10 text-ita-red border border-ita-red/20 px-2.5 py-1 rounded-full backdrop-blur-md">
                      🔥 {item.popularityBadge}
                    </span>
                  )}
                  {item.isFeatured && (
                    <span className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider bg-gold/10 text-gold-dark border border-gold/20 px-2.5 py-1 rounded-full backdrop-blur-md">
                      <Sparkles size={8} className="fill-gold" />
                      Doporučujeme
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 px-2.5 py-1 rounded-full backdrop-blur-md">
                      <Leaf size={8} className="fill-emerald-500" />
                      Veg
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline gap-4 pr-16 animate-pulse-once">
                    <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-ita-green transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-charcoal-light/65 text-xs font-sans leading-relaxed min-h-[40px]">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-cream-dark">
                  <span className="text-xl font-display font-bold text-charcoal">
                    {item.category === 'pizza' ? 'od ' : ''}{item.price} <span className="text-sm font-mono text-charcoal-light/60">Kč</span>
                  </span>

                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-2 px-4 py-2 bg-charcoal hover:bg-[#1F6B45] text-white font-sans font-semibold text-xs rounded-xl tracking-wider uppercase transition-all shadow-md cursor-pointer transform group-hover:scale-105"
                  >
                    <ShoppingBag size={13} />
                    <span>Přidat</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="col-span-full bg-white rounded-2xl p-12 border border-cream-dark text-center flex flex-col items-center">
              <span className="text-4xl mb-4">🔍</span>
              <h4 className="text-lg font-display font-bold text-charcoal">Žádná jídla neodpovídají filtrům</h4>
              <p className="text-charcoal-light/60 text-xs mt-1 max-w-sm">Zkuste prosím upravit text vyhledávání nebo odškrtnout vegetariánskou volbu.</p>
              <button
                onClick={() => { setSearchQuery(''); setOnlyVegetarian(false); setActiveCategory('all'); }}
                className="mt-6 px-4 py-2 bg-cream text-charcoal font-semibold text-xs rounded-xl hover:bg-cream-dark transition-colors cursor-pointer"
              >
                Resetovat filtry
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FLOATING ACTION CART BAR (Shown when items exist and drawer is closed) */}
      {cart.length > 0 && !isCartOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-[#1F1F1F] text-white shadow-xl rounded-full px-5 py-3 flex items-center gap-4 border border-gold/30"
        >
          <div className="flex items-center gap-2">
            <div className="relative p-2 bg-gold text-charcoal rounded-full">
              <ShoppingBag size={16} />
              <span className="absolute -top-1.5 -right-1.5 bg-ita-red text-white text-[10px] font-mono font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cart.reduce((s, c) => s + c.quantity, 0)}
              </span>
            </div>
            <div className="text-left font-sans text-xs">
              <p className="font-bold text-white tracking-wide">Váš nákupní košík</p>
              <p className="text-gold font-mono">{cartTotal} Kč</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-gold hover:bg-gold-light text-charcoal font-sans font-semibold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 tracking-wider uppercase transition-colors cursor-pointer"
          >
            <span>Otevřít</span>
            <ChevronRight size={12} />
          </button>
        </motion.div>
      )}

      {/* MODERN SLIDEOVER CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCartFlow}
              className="absolute inset-0 bg-black/75 backdrop-blur-xs"
            ></motion.div>

            {/* Drawer Body container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-md bg-charcoal text-white h-screen shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              
              {/* Header block */}
              <div className="p-6 border-b border-white/10 bg-charcoal-light flex justify-between items-center relative">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gold/10 text-gold rounded-xl">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-lg leading-tight">Nákupní košík</h3>
                    <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mt-0.5">Franco's Mělník</p>
                  </div>
                </div>
                <button
                  onClick={closeCartFlow}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Central Area: Cart items or Checkout Form or Success Statement */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* STEP 1: REVIEW CURRENT ITEMS */}
                {checkoutStep === 'cart' && (
                  <>
                    {cart.length === 0 ? (
                      <div className="py-16 text-center space-y-4">
                        <span className="text-5xl block grayscale">🍕</span>
                        <h4 className="text-lg font-display text-white/80">Košík je prázdný</h4>
                        <p className="text-white/40 text-xs px-6">Přidejte si z jídelního lístku lahodnou pizzu nebo domácí těstoviny a my pro vás roztopíme pec.</p>
                        <button
                          onClick={closeCartFlow}
                          className="mt-4 px-5 py-2 bg-gold hover:bg-gold-light text-charcoal rounded-xl text-xs font-bold uppercase transition-colors pointer-events-auto cursor-pointer"
                        >
                          Zpět k lístku
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs font-mono uppercase text-white/50 pb-1 border-b border-white/5">
                          <span>Vybrané položky</span>
                          <span>{cart.length} položka(y)</span>
                        </div>

                        {cart.map((ci) => (
                          <div key={ci.item.id} className="flex gap-4 p-3 bg-charcoal-light/50 border border-white/5 rounded-xl justify-between items-center">
                            <div className="flex-1">
                              <h5 className="font-sans font-bold text-sm text-white">{ci.item.name}</h5>
                              <p className="text-gold font-mono text-xs mt-0.5">{ci.item.price} Kč / ks</p>
                            </div>

                            {/* Quantity buttons */}
                            <div className="flex items-center bg-charcoal border border-white/10 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(ci.item.id, -1)}
                                className="px-2.5 py-1 text-white/70 hover:text-white hover:bg-white/5 transition-colors font-mono cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-3 text-xs font-mono font-bold text-white bg-charcoal-light">
                                {ci.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(ci.item.id, 1)}
                                className="px-2.5 py-1 text-white/70 hover:text-white hover:bg-white/5 transition-colors font-mono cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            {/* Total price & delete */}
                            <div className="text-right pl-2">
                              <span className="block font-mono font-bold text-sm">{ci.item.price * ci.quantity} Kč</span>
                              <button
                                onClick={() => removeFromCart(ci.item.id)}
                                className="text-ita-red-light hover:text-ita-red transition-colors mt-1 p-0.5 cursor-pointer"
                                title="Odebrat z košíku"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Order Warnings & delivery condition */}
                        <div className="p-3 bg-gold/10 border border-gold/20 rounded-xl flex gap-3 text-xs text-cream-dark/95 leading-relaxed">
                          <AlertCircle size={16} className="text-gold shrink-0 mt-0.5" />
                          <div>
                            Upozornění: <strong>Rozvoz domů sami neprovozujeme.</strong> Služba doručení domů funguje exkluzivně přes <strong>Foodoru</strong>. Zde v košíku si můžete jídlo objednat pro <strong>osobní odběr</strong> u nás v pizzerii.
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* STEP 2: DETAILS FOR PERSONAL PICKUP (Osobní odběr) */}
                {checkoutStep === 'form' && (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div className="text-xs font-mono uppercase text-[#1F6B45] font-bold pb-1 border-b border-[#1F6B45]/20 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 size={13} />
                      Údaje pro osobní odběr v Mělníku
                    </div>

                    <div>
                      <label className="block text-xs text-white/70 mb-1">
                        Vaše jméno a příjmení <span className="text-ita-red">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        placeholder="Jan Novák"
                        className="w-full bg-charcoal-light text-white border border-white/10 focus:border-gold rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-white/70 mb-1">
                        Telefonní číslo <span className="text-ita-red">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        placeholder="+420 777 777 777"
                        className="w-full bg-charcoal-light text-white border border-white/10 focus:border-gold rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-white/70 mb-1">
                        Čas vyzvednutí (Restaurace otevřena 16:00 - 22:00) <span className="text-ita-red">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={custAddress}
                        onChange={(e) => setCustAddress(e.target.value)}
                        placeholder="Např. v 18:30"
                        className="w-full bg-charcoal-light text-white border border-white/10 focus:border-gold rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-white/70 mb-1">
                        Poznámka k přípravě (volitelné)
                      </label>
                      <textarea
                        value={custNote}
                        onChange={(e) => setCustNote(e.target.value)}
                        rows={2}
                        placeholder="Např. bez cibule, pálivé navíc atd..."
                        className="w-full bg-charcoal-light text-white border border-white/10 focus:border-gold rounded-xl px-3.5 py-2 text-sm outline-none transition-colors resize-none mb-2"
                      ></textarea>
                    </div>

                    <div className="p-3.5 bg-ita-green/10 border border-ita-green/20 rounded-xl text-xs space-y-1.5 text-emerald-400 leading-relaxed">
                      <p className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 size={13} />
                        Bezručova 3327, Mělník
                      </p>
                      <p className="text-white/60">
                        Jídlo pro vás připravíme k osobnímu vyzvednutí přímo na adrese naší restaurace. Platba proběhne hotově či kartou až na místě.
                      </p>
                    </div>

                    {/* Back to cart button */}
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="text-xs text-gold/80 hover:text-gold block py-2 underline"
                    >
                      ← Zpět k položkám košíku
                    </button>
                  </form>
                )}

                {/* STEP 2.5: INFO AND SELECTION FOR FOODORA DELIVERY CHOICE */}
                {checkoutStep === 'foodora' && (
                  <div className="py-6 space-y-6 text-center">
                    <div className="w-16 h-16 bg-[#E21B70]/10 text-[#E21B70] rounded-full flex items-center justify-center mx-auto text-3xl font-black">
                      f
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-xl text-white">Rozvoz jídla na Foodoře</h4>
                      <p className="text-white/70 text-xs font-sans leading-relaxed px-4">
                        Zvolili jste rozvoz domů. Jelikož pizzerie Franco's nemá vlastní řidiče, kompletní rozvoz našich pokrmů pro vás zajišťuje kurýrní partner <strong>Foodora</strong>.
                      </p>
                    </div>

                    {/* Cart helper summarizing what they tried to order */}
                    <div className="bg-[#1F1F1F]/50 border border-white/5 rounded-2xl p-4 text-left space-y-3">
                      <p className="text-white/40 uppercase text-[9px] font-mono tracking-widest border-b border-white/5 pb-1">Užitečný přehled vybraných jídel</p>
                      <div className="space-y-1 bg-charcoal/30 p-2.5 rounded-lg max-h-32 overflow-y-auto">
                        {cart.map(ci => (
                          <div key={ci.item.id} className="text-xs text-white/90 flex justify-between">
                            <span>{ci.quantity}x {ci.item.name}</span>
                            <span className="font-mono text-gold-light">{ci.item.price * ci.quantity} Kč</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-baseline text-xs font-bold pt-1">
                        <span className="text-white/60">Orientační hodnota menu:</span>
                        <span className="text-sm text-white font-mono">{cartTotal} Kč</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl text-[10px] text-white/40 italic leading-relaxed">
                      *Tlačítko níže vás přesměruje přímo na partnerskou platformu Foodora, kde můžete dokončit svou objednávku pro dovoz v Mělníku.
                    </div>

                    {/* Foodora trigger elements */}
                    <div className="flex flex-col gap-2">
                      <a
                        href="https://www.foodora.cz/restaurant/bo13/francos-pizza-and-pasta"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-4 bg-[#E21B70] hover:bg-[#ff2b85] text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-[#E21B70]/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Otevřít Franco's na Foodoře</span>
                        <ExternalLink size={12} />
                      </a>
                      <button
                        onClick={() => setCheckoutStep('cart')}
                        className="text-xs text-white/50 hover:text-white block py-2 underline"
                      >
                        ← Zpět k úpravě košíku
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: DONE SUCCESS STATEMENT FOR PICKUP */}
                {checkoutStep === 'done' && (
                  <div className="py-8 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-xl font-display font-medium text-white leading-snug">
                      Vyzvednutí připraveno!
                    </h4>
                    <p className="text-white/70 text-xs mt-2 px-2 leading-relaxed">
                      Děkujeme, Vážený/á <strong>{custName}</strong>. Vaše rodinná objednávka k <strong>osobnímu odběru</strong> byla vygenerována. Prosím dokončete odeslání zprávy níže:
                    </p>
                    <p className="text-gold font-mono text-xs mt-4 leading-relaxed bg-white/5 border border-white/10 px-4 py-3 rounded-xl max-w-sm w-full text-left">
                      📍 Adresa vyzvednutí:<br />
                      <strong className="text-white">Franco's, Bezručova 3327, Mělník</strong><br />
                      ⏱️ Čas přípravy:<br />
                      <strong className="text-white">{custAddress}</strong><br />
                      💰 Cena k platbě na místě: <span className="font-bold text-gold-light">{cartTotal} Kč</span>
                    </p>

                    {/* Pre-packaged text field display */}
                    <div className="bg-black/30 border border-white/5 rounded-xl p-3 mt-4 text-left text-xs max-w-sm w-full space-y-1">
                      <div className="flex justify-between items-center text-[9px] uppercase font-mono text-white/40 tracking-wider">
                        <span>Text objednávky</span>
                        {isCopied ? (
                          <span className="text-emerald-400 font-sans">Kopírováno!</span>
                        ) : (
                          <span className="text-white/20 font-sans">Text je v schránce</span>
                        )}
                      </div>
                      <div className="text-white font-mono text-[10px] leading-relaxed bg-black/20 p-2 rounded max-h-20 overflow-y-auto whitespace-pre-wrap select-all">
                        {`Dobrý den, objednávávám Osobní odběr u Franco's. Jméno: ${custName}, Tel: ${custPhone}, Čas vyzvednutí: ${custAddress}, Objednávka: ${cart.map(ci => `${ci.quantity}x ${ci.item.name}`).join(', ')}, Celkem: ${cartTotal} Kč.${custNote ? ` Poznámka: ${custNote}` : ''}`}
                      </div>
                    </div>

                    {/* Desktop & Mobile Actions */}
                    <div className="mt-5 flex flex-col gap-2 w-full max-w-xs">
                      <button
                        onClick={() => handleCopySMS(`Dobrý den, objednávávám Osobní odběr u Franco's. Jméno: ${custName}, Tel: ${custPhone}, Čas vyzvednutí: ${custAddress}, Objednávka: ${cart.map(ci => `${ci.quantity}x ${ci.item.name}`).join(', ')}, Celkem: ${cartTotal} Kč.${custNote ? ` Poznámka: ${custNote}` : ''}`)}
                        className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          isCopied ? 'bg-emerald-600 text-white' : 'bg-gold hover:bg-gold-light text-charcoal'
                        }`}
                      >
                        <Copy size={13} />
                        <span>{isCopied ? 'Zkopírováno!' : 'Zkopírovat objednávku (pro PC)'}</span>
                      </button>

                      <a
                        href={`sms:+420777906014?body=${encodeURIComponent(`Dobrý den, objednávávám Osobní odběr u Franco's. Jméno: ${custName}, Tel: ${custPhone}, Čas vyzvednutí: ${custAddress}, Objednávka: ${cart.map(ci => `${ci.quantity}x ${ci.item.name}`).join(', ')}, Celkem: ${cartTotal} Kč.${custNote ? ` Poznámka: ${custNote}` : ''}`)}`}
                        className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center block transition-colors"
                      >
                        📱 Odeslat SMS přímo (z mobilu)
                      </a>

                      <a
                        href={`https://wa.me/420777906014?text=${encodeURIComponent(`Dobrý den, objednávávám Osobní odběr u Franco's. Jméno: ${custName}, Tel: ${custPhone}, Čas vyzvednutí: ${custAddress}, Objednávka: ${cart.map(ci => `${ci.quantity}x ${ci.item.name}`).join(', ')}, Celkem: ${cartTotal} Kč.${custNote ? ` Poznámka: ${custNote}` : ''}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 bg-[#25D366] hover:bg-[#22c35e] text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center block transition-colors"
                      >
                        💬 Odeslat přes WhatsApp (PC i mobil)
                      </a>
                    </div>

                    <p className="text-white/40 text-[9px] leading-relaxed mt-4 px-2">
                      *Kliknutím na tlačítka výše se předpřipravený SMS text přenese do vaší zprávy pro číslo 777 906 014.
                    </p>
                  </div>
                )}

              </div>

              {/* Bottom total calculator and submit triggers */}
              <div className="p-6 border-t border-white/10 bg-charcoal-light space-y-4">
                
                {checkoutStep !== 'done' && checkoutStep !== 'foodora' && (
                  <>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-white/60">Celkem vybrané menu</span>
                      <span className="text-2xl font-display font-bold text-white">
                        {cartTotal} <span className="text-sm font-mono text-gold font-medium">Kč</span>
                      </span>
                    </div>

                    {cart.length > 0 && (
                      <>
                        {checkoutStep === 'cart' ? (
                          <div className="flex flex-col gap-2.5">
                            {/* Option 1: Pickup */}
                            <button
                              onClick={() => setCheckoutStep('form')}
                              className="w-full bg-gold hover:bg-gold-light text-charcoal font-sans font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span>Objednat Osobní odběr</span>
                              <ChevronRight size={13} />
                            </button>

                            {/* Option 2: Foodora delivery */}
                            <button
                              onClick={() => setCheckoutStep('foodora')}
                              className="w-full bg-[#E21B70] hover:bg-[#ff2b85] text-white font-sans font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span>Doručit domů (přes Foodoru)</span>
                              <ExternalLink size={13} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={handleCheckoutSubmit}
                            disabled={!custName || !custPhone || !custAddress}
                            className="w-full bg-gradient-to-r from-ita-green to-ita-green-light hover:from-ita-green-light hover:to-ita-green text-white font-sans font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider transition-colors disabled:opacity-40 cursor-pointer text-center animate-pulse"
                          >
                            Potvrdit osobní odběr
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}

                {(checkoutStep === 'done' || checkoutStep === 'foodora') && (
                  <button
                    onClick={closeCartFlow}
                    className="w-full bg-white text-charcoal hover:bg-cream-dark transition-all font-sans font-bold text-xs py-3 rounded-xl uppercase tracking-wider text-center cursor-pointer"
                  >
                    Zavřít košík
                  </button>
                )}

                {/* Direct quick call info */}
                <div className="text-center pt-2 flex items-center justify-center gap-3">
                  <a
                    href="tel:+420777906014"
                    className="text-[10px] font-mono tracking-widest text-[#C9A45C] hover:text-white uppercase flex items-center gap-1.5 justify-center py-1 transition-colors"
                  >
                    <Phone size={10} />
                    Rychlá linka: +420 777 906 014 (Bezručova)
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
