import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { singleOrigins, blends, organicBlends } from '../data/products';

const categories = [
  { id: 'origins', label: 'Single Origins', products: singleOrigins },
  { id: 'blends', label: 'Blends', products: blends },
  { id: 'organic', label: 'Organic Blends', products: organicBlends },
];

export default function FeaturedProducts() {
  const [active, setActive] = useState('origins');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const currentProducts = categories.find((c) => c.id === active)?.products || [];

  return (
    <section ref={ref} className="py-24 bg-soul-dark relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 10% 80%, rgba(140,80,10,0.08) 0%, transparent 65%)',
        }}
      />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold tracking-[0.4em] text-gold/60 uppercase mb-4 block">
            ✦ Our Collection ✦
          </span>
          <h2 className="section-heading text-white mb-4">
            Specialty Coffee{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #F5D98B, #C9A84C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Beans
            </span>
          </h2>
          <div className="gold-divider-sm mt-4 mb-6" />
          <p className="text-white/50 text-base max-w-xl mx-auto leading-relaxed">
            Sourced from the world&apos;s finest origins. Every bag tells a story of the land, climate, and craft that brought it to your cup.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-12 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`relative px-6 py-2.5 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                active === cat.id
                  ? 'text-soul-black'
                  : 'text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20'
              }`}
              style={active === cat.id ? {
                background: 'linear-gradient(135deg, #8B6914, #C9A84C, #E8C96D, #C9A84C, #8B6914)',
              } : {}}
            >
              {cat.label}
              {active === cat.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C, #E8C96D)' }}
                  initial={false}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5"
          >
            {currentProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-14"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors duration-300 group"
          >
            <span>View All Coffee</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
