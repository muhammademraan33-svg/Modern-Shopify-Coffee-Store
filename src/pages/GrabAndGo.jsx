import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingBag, Flame, Snowflake } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import {
  espressoDrinks,
  grabAndGoLattes,
  specialtyLattes,
  soulStarSodas,
  proteinPowerballs,
  extras,
} from '../data/products';

function DrinkCard({ item, index }) {
  const { addToCart } = useCart();
  const [option, setOption] = useState(item.options?.[0] || null);

  const handleAdd = () => {
    addToCart({ ...item, id: `${item.id}-${option || ''}` }, option);
    toast.custom(
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: '#140800', border: '1px solid rgba(201,168,76,0.3)' }}
      >
        <ShoppingBag size={14} className="text-gold" />
        <div>
          <p className="text-white text-sm font-medium">{item.name} {option ? `(${option})` : ''}</p>
          <p className="text-gold/70 text-xs">Added to cart</p>
        </div>
      </motion.div>,
      { duration: 2500, position: 'top-right' }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative overflow-hidden"
      style={{ background: 'rgba(18,7,0,0.9)', border: '1px solid rgba(201,168,76,0.1)' }}
    >
      {/* Image */}
      {item.image && (
        <div className="relative overflow-hidden" style={{ paddingBottom: '60%' }}>
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soul-black via-soul-black/20 to-transparent" />

          {/* Badge */}
          {item.badge && (
            <div className="absolute top-3 left-3 px-3 py-1 text-[10px] font-black tracking-wider text-soul-black"
              style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}>
              {item.badge}
            </div>
          )}
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-base font-bold text-white group-hover:text-gold transition-colors duration-300">{item.name}</h3>
          <span className="font-display text-lg font-bold text-gold flex-shrink-0">${item.price.toFixed(2)}</span>
        </div>

        {item.notes && (
          <p className="text-white/50 text-xs italic mb-3 leading-relaxed">{item.notes}</p>
        )}

        {/* Iced/Hot toggle */}
        {item.options && item.options.length > 1 && (
          <div className="flex gap-2 mb-4">
            {item.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setOption(opt)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  option === opt ? 'text-soul-black' : 'border border-white/15 text-white/50 hover:border-gold/40'
                }`}
                style={option === opt ? { background: 'linear-gradient(135deg, #8B6914, #C9A84C)' } : {}}
              >
                {opt === 'Iced' ? <Snowflake size={11} /> : <Flame size={11} />}
                {opt}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleAdd}
          className="w-full py-2.5 text-xs font-bold tracking-[0.18em] uppercase text-gold border border-gold/30 hover:bg-gold hover:text-soul-black transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingBag size={12} />
          ADD TO ORDER
        </button>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
      />
    </motion.div>
  );
}

function SectionHeader({ badge, title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <span className="text-xs font-bold tracking-[0.35em] text-gold/60 uppercase mb-3 block">{badge}</span>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h2>
      <div className="gold-divider-sm mt-3 mb-4" />
      {subtitle && <p className="text-white/45 text-sm max-w-lg mx-auto">{subtitle}</p>}
    </div>
  );
}

export default function GrabAndGo() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <main className="min-h-screen" ref={ref}>
      {/* ── Header ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1600&q=60')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,2,0,0.88) 0%, rgba(5,2,0,0.75) 50%, rgba(5,2,0,0.95) 100%)' }} />
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
        <div className="section-container text-center relative z-10">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-bold tracking-[0.4em] text-gold/60 uppercase mb-4 block">✦ Ready to Sip ✦</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
              Grab{' '}
              <span style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                &amp; Go
              </span>
              {' '}Menu
            </h1>
            <div className="gold-divider-sm mt-4 mb-5" />
            <p className="text-white/55 max-w-lg mx-auto">
              All syrups are made in-house. Fresh, handcrafted drinks for your on-the-go lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-container py-16 space-y-20">

        {/* ── Espresso Drinks ── */}
        <section id="espresso">
          <SectionHeader badge="✦ Espresso Bar ✦" title="Espresso Drinks" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {espressoDrinks.map((drink, i) => (
              <motion.div
                key={drink.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative p-5 text-center group hover:border-gold/40 transition-all duration-300"
                style={{ background: 'rgba(18,7,0,0.9)', border: '1px solid rgba(201,168,76,0.1)' }}
              >
                <div className="text-2xl mb-3">☕</div>
                <h4 className="font-display text-sm font-bold text-white mb-1 group-hover:text-gold transition-colors">{drink.name}</h4>
                <p className="text-white/40 text-[10px] italic mb-3">{drink.notes}</p>
                <span className="font-display text-xl font-bold text-gold">${drink.price.toFixed(2)}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Grab & Go Lattes ── */}
        <section id="lattes">
          <SectionHeader
            badge="✦ All Day, Any Way ✦"
            title="Lattes (Iced or Hot)"
            subtitle="Classic and seasonal lattes made fresh. All syrups crafted in-house."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {grabAndGoLattes.map((item, i) => (
              <DrinkCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </section>

        {/* ── Specialty Lattes ── */}
        <section id="specialty">
          <SectionHeader
            badge="✦ Made to Order ✦"
            title="Specialty Lattes"
            subtitle="Handcrafted to order and topped with house-made cold foam. $7.00 each."
          />
          <div
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider text-gold mb-6"
            style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
          >
            <span>⭐</span>
            <span>Made to order · Includes cold foam · All syrups made in-house</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {specialtyLattes.map((item, i) => (
              <DrinkCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </section>

        {/* ── SoulStar Sodas ── */}
        <section id="sodas">
          <SectionHeader
            badge="✦ Signature Creations ✦"
            title="SoulStar Sodas"
            subtitle="Craft sodas with house-made syrups and cold foam. Available in diet. $7.00 each."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {soulStarSodas.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 relative group hover:border-gold/40 transition-all duration-300"
                style={{ background: 'rgba(18,7,0,0.9)', border: '1px solid rgba(201,168,76,0.12)' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-lg font-bold text-gold group-hover:text-gold-light transition-colors">{item.name}</h3>
                  <span className="font-display text-xl font-bold text-gold">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-white/55 text-sm mb-4 leading-relaxed">{item.notes}</p>
                {item.badge && (
                  <span className="inline-block px-2.5 py-1 text-[9px] font-bold tracking-wider text-gold/70 border border-gold/20 mb-4">
                    {item.badge}
                  </span>
                )}
                <p className="text-white/40 text-xs italic">{item.description.split('.')[0]}.</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Protein Powerballs ── */}
        <section id="powerballs">
          <SectionHeader
            badge="✦ Energy Bites ✦"
            title="Protein Powerballs"
            subtitle="3 for $4.00 — made fresh in-house. The perfect companion to your coffee."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {proteinPowerballs.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-5 text-center group hover:border-gold/40 transition-all duration-300"
                style={{ background: 'rgba(18,7,0,0.9)', border: '1px solid rgba(201,168,76,0.1)' }}
              >
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-display text-sm font-bold text-white mb-1 group-hover:text-gold transition-colors">{item.name}</h4>
                <p className="text-white/40 text-xs italic mb-2">{item.notes}</p>
                <span className="font-display text-xl font-bold text-gold">${item.price.toFixed(2)}</span>
                <p className="text-white/25 text-[10px] mt-1">(3 pieces)</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Extras ── */}
        <section id="extras">
          <SectionHeader badge="✦ Add-Ons ✦" title="Extras & Customizations" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {extras.map((extra, i) => (
              <motion.div
                key={extra.name}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center justify-between px-5 py-4"
                style={{ background: 'rgba(18,7,0,0.7)', border: '1px solid rgba(201,168,76,0.08)' }}
              >
                <span className="text-white/70 text-sm">{extra.name}</span>
                <span className="font-display font-bold text-gold">${extra.price.toFixed(2)}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-white/30 text-sm mt-6 italic">
            Whole milk and almond milk included · Oat &amp; Coconut milk add $0.50
          </p>
        </section>

      </div>
    </main>
  );
}
