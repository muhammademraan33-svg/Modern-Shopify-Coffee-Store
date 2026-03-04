import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/products';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  // Show 3 at a time on desktop
  const visible = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #050200 0%, #0D0600 50%, #050200 100%)' }}>
      {/* Gold dividers */}
      <div className="gold-divider absolute top-0 left-0 right-0" />
      <div className="gold-divider absolute bottom-0 left-0 right-0" />

      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-[0.4em] text-gold/60 uppercase mb-4 block">✦ Reviews ✦</span>
          <h2 className="section-heading text-white mb-3">
            What Our{' '}
            <span style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Community
            </span>{' '}
            Says
          </h2>
          <div className="gold-divider-sm mt-4" />
        </motion.div>

        {/* Desktop: 3 cards */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <motion.div
              key={`${t.id}-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-8 group transition-all duration-500 hover:border-gold/40"
              style={{ background: 'rgba(20,8,0,0.8)', border: '1px solid rgba(201,168,76,0.12)', backdropFilter: 'blur(8px)' }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-15">
                <Quote size={36} className="text-gold" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/70 text-sm leading-relaxed mb-6 line-clamp-4 italic">&quot;{t.text}&quot;</p>

              {/* Gold divider */}
              <div className="gold-divider mb-5" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-soul-black"
                  style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.location}</p>
                </div>
                <div className="ml-auto">
                  <p className="text-[10px] text-gold/60 text-right tracking-wider">{t.product}</p>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: single card slider */}
        <div className="lg:hidden mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="p-8 relative"
              style={{ background: 'rgba(20,8,0,0.8)', border: '1px solid rgba(201,168,76,0.15)' }}
            >
              <Quote size={32} className="text-gold/20 absolute top-6 right-6" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonials[current].rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6 italic">&quot;{testimonials[current].text}&quot;</p>
              <div className="gold-divider mb-5" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-soul-black"
                  style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}>
                  {testimonials[current].avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{testimonials[current].name}</p>
                  <p className="text-white/40 text-xs">{testimonials[current].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prev}
            className="w-10 h-10 flex items-center justify-center border border-gold/30 text-gold/60 hover:border-gold hover:text-gold transition-all duration-200"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300"
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === current ? '#C9A84C' : 'rgba(201,168,76,0.25)',
                }}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 flex items-center justify-center border border-gold/30 text-gold/60 hover:border-gold hover:text-gold transition-all duration-200"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Aggregate rating */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-6 mt-12 pt-8 border-t border-white/5"
        >
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-gold">4.9</p>
            <div className="flex gap-0.5 justify-center mt-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-gold fill-gold" />)}
            </div>
            <p className="text-white/40 text-xs mt-1 tracking-wider">Average Rating</p>
          </div>
          <div className="h-12 w-px bg-white/10" />
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-gold">2,400+</p>
            <p className="text-white/40 text-xs mt-2 tracking-wider">Verified Reviews</p>
          </div>
          <div className="h-12 w-px bg-white/10" />
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-gold">98%</p>
            <p className="text-white/40 text-xs mt-2 tracking-wider">Would Recommend</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
