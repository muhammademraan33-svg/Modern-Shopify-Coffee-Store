import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Gift, Zap, Crown, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <Star size={24} />,
    title: 'Join Free',
    description: 'Sign up and instantly receive 250 welcome points — no purchase required.',
    points: '+250 pts',
  },
  {
    icon: <Zap size={24} />,
    title: 'Earn on Every Order',
    description: 'Earn 10 points for every $1 spent. Stack points faster with double-point events.',
    points: '10 pts/$1',
  },
  {
    icon: <Gift size={24} />,
    title: 'Redeem Rewards',
    description: 'Redeem points for free coffee, discounts, exclusive merch, and early product access.',
    points: 'Free Bags',
  },
  {
    icon: <Crown size={24} />,
    title: 'Unlock VIP Status',
    description: 'Reach Gold or Platinum tier for triple points, free shipping, and premium perks.',
    points: '3x Points',
  },
];

/* Sparkle positions */
const sparklePositions = [
  { top: '8%', left: '5%', delay: 0 },
  { top: '15%', left: '25%', delay: 0.4 },
  { top: '5%', left: '55%', delay: 0.8 },
  { top: '12%', left: '75%', delay: 1.2 },
  { top: '8%', left: '92%', delay: 0.6 },
  { top: '85%', left: '8%', delay: 1 },
  { top: '75%', left: '35%', delay: 0.3 },
  { top: '88%', left: '65%', delay: 0.9 },
  { top: '80%', left: '88%', delay: 0.2 },
  { top: '50%', left: '3%', delay: 1.5 },
  { top: '45%', left: '97%', delay: 0.7 },
];

export default function RewardsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%), linear-gradient(160deg, #050200 0%, #120800 50%, #050200 100%)',
      }}
    >
      {/* Gold top divider */}
      <div className="gold-divider absolute top-0 left-0 right-0" />

      {/* Animated sparkles */}
      {sparklePositions.map((s, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ top: s.top, left: s.left }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.3, 0.7] }}
          transition={{ duration: 2 + (i % 3) * 0.5, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 0L7.9 5.5L13 7L7.9 8.5L7 14L6.1 8.5L1 7L6.1 5.5L7 0Z" fill="rgba(201,168,76,0.7)" />
          </svg>
        </motion.div>
      ))}

      {/* Bokeh orbs */}
      {[
        { w: 300, h: 300, top: '10%', left: '5%', opacity: 0.08 },
        { w: 250, h: 250, top: '60%', right: '5%', opacity: 0.07 },
        { w: 400, h: 200, top: '40%', left: '30%', opacity: 0.05 },
      ].map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.w,
            height: orb.h,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            background: `radial-gradient(circle, rgba(201,168,76,${orb.opacity}), transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      ))}

      <div className="section-container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Large star */}
          <motion.div
            className="flex justify-center mb-6"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="56" height="56" viewBox="0 0 50 50">
              <polygon
                points="25,3 30.6,18.2 47,18.2 33.8,28.4 38.9,43.7 25,33.5 11.1,43.7 16.2,28.4 3,18.2 19.4,18.2"
                fill="url(#rewardsStar)"
              />
              <defs>
                <linearGradient id="rewardsStar" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B6914" />
                  <stop offset="40%" stopColor="#C9A84C" />
                  <stop offset="70%" stopColor="#F5D98B" />
                  <stop offset="100%" stopColor="#8B6914" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-xs font-bold tracking-[0.4em] text-gold/60 uppercase mb-4 block">
              ✦ Loyalty Program ✦
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">
              Join the{' '}
              <span style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                SoulStar
              </span>{' '}
              Rewards Club
            </h2>
            <div className="gold-divider-sm mt-4 mb-6" />
            <p className="text-white/50 max-w-lg mx-auto text-base leading-relaxed">
              Every cup you enjoy earns points toward free coffee, exclusive rewards, and VIP experiences. It&apos;s our way of saying thank you.
            </p>
          </motion.div>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              className="relative group"
            >
              <div
                className="relative p-8 h-full transition-all duration-500 group-hover:border-gold/40"
                style={{
                  background: 'rgba(20,8,0,0.7)',
                  border: '1px solid rgba(201,168,76,0.12)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Step number */}
                <div
                  className="absolute -top-4 -left-2 w-8 h-8 flex items-center justify-center text-xs font-black"
                  style={{
                    background: 'linear-gradient(135deg, #8B6914, #C9A84C)',
                    color: '#0A0400',
                  }}
                >
                  {i + 1}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-soul-black"
                  style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C, #E8C96D)' }}
                >
                  {step.icon}
                </div>

                {/* Points badge */}
                <div
                  className="inline-block px-3 py-1 text-[10px] font-black tracking-wider mb-4"
                  style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
                >
                  {step.points}
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
                />

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gold/30 z-10" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            to="/rewards"
            className="btn-gold-solid px-12 py-4 text-sm tracking-[0.2em] group inline-flex items-center gap-3"
          >
            <span>JOIN NOW — FREE</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link to="/rewards" className="btn-gold px-10 py-4 text-xs tracking-[0.15em]">
            <span>LEARN HOW IT WORKS</span>
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-white/30 text-xs tracking-widest uppercase mt-6"
        >
          ✦ Join 12,000+ SoulStar Rewards members ✦
        </motion.p>
      </div>

      {/* Gold bottom divider */}
      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
