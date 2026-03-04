import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/* ── Bokeh orb config ─────────────────────────────────── */
const orbs = [
  { w: 320, h: 320, top: '8%',  left: '5%',  opacity: 0.25, blur: 60, delay: 0 },
  { w: 200, h: 200, top: '55%', left: '18%', opacity: 0.35, blur: 40, delay: 1.2 },
  { w: 280, h: 280, top: '20%', left: '35%', opacity: 0.15, blur: 70, delay: 2.5 },
  { w: 150, h: 150, top: '70%', left: '50%', opacity: 0.20, blur: 30, delay: 0.7 },
  { w: 380, h: 380, top: '10%', left: '62%', opacity: 0.18, blur: 90, delay: 1.8 },
  { w: 220, h: 220, top: '60%', left: '78%', opacity: 0.28, blur: 45, delay: 3 },
  { w: 120, h: 120, top: '35%', left: '90%', opacity: 0.20, blur: 25, delay: 0.4 },
  { w: 260, h: 260, top: '80%', left: '8%',  opacity: 0.22, blur: 55, delay: 2 },
];

/* ── Small sparkle dots ─────────────────────────────────── */
const sparkles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 90 + 2}%`,
  left: `${Math.random() * 95 + 1}%`,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 2 + 1.5,
}));

/* ── Coffee bag cards ─────────────────────────────────── */
const bags = [
  { name: 'Grateful Grind', roast: 'Light Roast', color: '#1C0F05', delay: 0.2 },
  { name: 'Rialto Blend',   roast: 'Medium Roast', color: '#140900', delay: 0.35 },
  { name: 'Dream Big',      roast: 'Medium Roast', color: '#0E0600', delay: 0.5 },
  { name: 'Evolution 22',   roast: 'Dark Roast',   color: '#0A0400', delay: 0.65 },
];

export default function Hero() {
  return (
    <section className="hero-section grain-overlay relative">

      {/* ── Bokeh orbs ── */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="bokeh-orb"
          style={{
            width: orb.w,
            height: orb.h,
            top: orb.top,
            left: orb.left,
            background: `radial-gradient(circle at center, rgba(201,168,76,${orb.opacity}) 0%, rgba(180,100,20,${orb.opacity * 0.6}) 40%, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            opacity: [orb.opacity * 0.6, orb.opacity * 1.2, orb.opacity * 0.6],
          }}
          transition={{
            duration: 6 + i * 0.8,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ── Sparkle dots ── */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full pointer-events-none"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, background: '#C9A84C' }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Vignette overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(5,2,0,0.5) 70%, rgba(5,2,0,0.9) 100%)',
          zIndex: 2,
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 section-container h-full flex items-center min-h-[85vh]">
        <div className="w-full grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-0">

          {/* ── LEFT: Coffee bags visual ── */}
          <div className="relative flex items-end justify-center lg:justify-start h-80 lg:h-[520px] order-2 lg:order-1">
            {bags.map((bag, i) => (
              <motion.div
                key={bag.name}
                initial={{ y: 80, opacity: 0, rotateY: 25 }}
                animate={{ y: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: bag.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -12, scale: 1.03, zIndex: 20 }}
                className="relative cursor-pointer"
                style={{
                  marginLeft: i === 0 ? 0 : '-28px',
                  zIndex: i + 1,
                  filter: `drop-shadow(0 20px 40px rgba(0,0,0,0.8))`,
                }}
              >
                {/* Coffee bag mockup */}
                <div
                  className="relative flex flex-col items-center justify-between overflow-hidden"
                  style={{
                    width: 90 + i * 5,
                    height: 180 + i * 10,
                    background: `linear-gradient(160deg, ${bag.color} 0%, #050200 100%)`,
                    border: '1px solid rgba(201,168,76,0.25)',
                    borderRadius: '4px 4px 12px 12px',
                    padding: '12px 8px',
                  }}
                >
                  {/* Top seal */}
                  <div className="w-full flex justify-center">
                    <div className="w-10 h-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.5)' }} />
                  </div>

                  {/* Logo area */}
                  <div className="flex flex-col items-center gap-0.5 mt-2">
                    <svg width="18" height="18" viewBox="0 0 50 50">
                      <polygon
                        points="25,3 30.6,18.2 47,18.2 33.8,28.4 38.9,43.7 25,33.5 11.1,43.7 16.2,28.4 3,18.2 19.4,18.2"
                        fill="url(#bagStarGrad)"
                      />
                      <defs>
                        <linearGradient id="bagStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8B6914" />
                          <stop offset="50%" stopColor="#C9A84C" />
                          <stop offset="100%" stopColor="#F5D98B" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="font-display font-black text-[8px] tracking-[0.2em] text-gold/90 leading-tight">SOUL</span>
                    <span className="font-display font-black text-[9px] tracking-[0.25em] text-gold leading-tight">STAR</span>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <span className="h-px w-3 bg-gold/50" />
                      <span className="font-bold text-[6px] tracking-[0.15em] text-gold/60 uppercase">Reserve</span>
                      <span className="h-px w-3 bg-gold/50" />
                    </div>
                  </div>

                  {/* Product name */}
                  <div className="text-center mt-1">
                    <p className="font-display font-bold text-[7px] tracking-wide text-white/80 leading-tight">{bag.name}</p>
                    <p className="font-sans text-[6px] tracking-wider text-gold/60 uppercase mt-0.5">{bag.roast}</p>
                  </div>

                  {/* Weight */}
                  <div className="mt-auto">
                    <p className="text-[6px] text-white/40 text-center tracking-wider">12 oz / 340g</p>
                  </div>

                  {/* Sheen overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%)',
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {/* ── Coffee cup (right side) ── */}
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="absolute right-0 bottom-0 lg:right-[-40px]"
            >
              <div className="relative w-28 h-36 lg:w-36 lg:h-44">
                {/* Steam wisps */}
                {[0, 1, 2].map((j) => (
                  <motion.div
                    key={j}
                    className="absolute top-0"
                    style={{ left: `${25 + j * 18}%` }}
                    animate={{ y: [-20, -50], opacity: [0, 0.7, 0], scaleX: [1, 1.5, 1] }}
                    transition={{ duration: 2 + j * 0.4, delay: j * 0.5, repeat: Infinity, ease: 'easeOut' }}
                  >
                    <div className="w-1.5 h-8 rounded-full" style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.3), transparent)' }} />
                  </motion.div>
                ))}

                {/* Cup body */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  style={{
                    width: '80%',
                    height: '78%',
                    background: 'linear-gradient(160deg, #1A1A1A, #050505)',
                    borderRadius: '4px 4px 18px 18px',
                    border: '1px solid rgba(201,168,76,0.15)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Coffee surface */}
                  <div
                    className="absolute top-3 left-3 right-3"
                    style={{
                      height: '18px',
                      background: 'radial-gradient(ellipse at 40% 40%, #3D1F00, #1A0900)',
                      borderRadius: '50%',
                      opacity: 0.9,
                    }}
                  />
                  {/* Handle */}
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full"
                    style={{
                      width: '20px',
                      height: '28px',
                      border: '3px solid rgba(30,30,30,0.95)',
                      borderLeft: 'none',
                      borderRadius: '0 12px 12px 0',
                    }}
                  />
                </div>

                {/* Saucer */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  style={{
                    width: '100%',
                    height: '10px',
                    background: 'linear-gradient(to bottom, #1A1A1A, #0A0A0A)',
                    borderRadius: '50%',
                    border: '1px solid rgba(201,168,76,0.1)',
                  }}
                />
              </div>
            </motion.div>

            {/* Scattered coffee beans */}
            {[
              { top: '10%', left: '5%', rot: -20, size: 18 },
              { top: '85%', left: '40%', rot: 35, size: 14 },
              { top: '15%', right: '10%', rot: -45, size: 16 },
              { top: '70%', left: '10%', rot: 15, size: 12 },
            ].map((bean, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ ...bean }}
                animate={{ rotate: [bean.rot - 5, bean.rot + 5, bean.rot - 5], y: [-3, 3, -3] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width={bean.size} height={bean.size * 1.5} viewBox="0 0 20 30">
                  <ellipse cx="10" cy="15" rx="8" ry="13" fill="#3D1F00" />
                  <line x1="10" y1="3" x2="10" y2="27" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* ── RIGHT: Text content ── */}
          <div className="flex flex-col items-start lg:items-end text-left lg:text-right order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="h-px w-12 bg-gold/60" />
              <span className="text-xs font-bold tracking-[0.35em] text-gold/70 uppercase">Premium Reserve</span>
            </motion.div>

            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-script text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.1] mb-6"
            >
              coffee that&apos;s
              <br />
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C 0%, #F5D98B 50%, #C9A84C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                good for the soul
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white/60 text-base lg:text-lg font-light max-w-sm lg:text-right mb-8 leading-relaxed"
            >
              Specialty coffee sourced from the world&apos;s finest origins. Roasted to perfection. Crafted for those who live soulfully.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <Link to="/shop" className="btn-gold-solid px-10 py-4 text-sm font-bold tracking-[0.2em]">
                <span>SHOP NOW</span>
              </Link>
              <Link to="/subscriptions" className="btn-gold px-8 py-4 text-sm tracking-[0.15em]">
                <span>SUBSCRIBE &amp; SAVE</span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex items-center gap-8 mt-10 pt-8 border-t border-white/10"
            >
              {[
                { num: '18+', label: 'Bean Varieties' },
                { num: '100%', label: 'Specialty Grade' },
                { num: '5★', label: 'Average Rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-right">
                  <p className="font-display text-2xl font-bold text-gold">{stat.num}</p>
                  <p className="text-xs text-white/40 tracking-wider uppercase mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] tracking-[0.3em] text-gold/40 uppercase">Scroll</span>
        <ChevronDown size={16} className="text-gold/40" />
      </motion.div>
    </section>
  );
}
