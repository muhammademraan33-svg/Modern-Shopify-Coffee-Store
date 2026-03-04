import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Gift, Zap, Crown, Check, ArrowRight, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';

const tiers = [
  {
    name: 'Soul Seeker',
    icon: <Star size={28} />,
    pointsMin: 0,
    pointsMax: 499,
    color: 'from-white/5 to-white/10',
    borderColor: 'rgba(255,255,255,0.15)',
    textColor: 'text-white/70',
    perks: ['Earn 10 pts/$1', 'Birthday bonus', 'Member-only deals'],
  },
  {
    name: 'Soul Star',
    icon: (
      <svg width="28" height="28" viewBox="0 0 50 50">
        <polygon points="25,3 30.6,18.2 47,18.2 33.8,28.4 38.9,43.7 25,33.5 11.1,43.7 16.2,28.4 3,18.2 19.4,18.2" fill="url(#tier2Grad)" />
        <defs>
          <linearGradient id="tier2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B6914" />
            <stop offset="50%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#F5D98B" />
          </linearGradient>
        </defs>
      </svg>
    ),
    pointsMin: 500,
    pointsMax: 1999,
    color: 'from-gold/10 to-gold/5',
    borderColor: 'rgba(201,168,76,0.35)',
    textColor: 'text-gold',
    perks: ['Earn 15 pts/$1', '15% off all orders', 'Free bag at 1,000 pts', 'Early product access'],
  },
  {
    name: 'Reserve Elite',
    icon: <Crown size={28} />,
    pointsMin: 2000,
    pointsMax: Infinity,
    color: 'from-gold/20 to-gold/10',
    borderColor: 'rgba(201,168,76,0.6)',
    textColor: 'text-gold',
    perks: ['Earn 20 pts/$1', '20% off all orders', 'Triple points weekends', 'VIP new releases', 'Quarterly gift box', 'Dedicated support'],
    popular: true,
  },
];

const redeemOptions = [
  { points: 500, reward: '$5 Store Credit', icon: '💳' },
  { points: 750, reward: 'Free Grab & Go Latte', icon: '☕' },
  { points: 1000, reward: 'Free 12oz Coffee Bag', icon: '🎁' },
  { points: 1500, reward: '15% Off Your Next Order', icon: '🏷️' },
  { points: 2500, reward: 'Free Subscription Month', icon: '🔄' },
  { points: 5000, reward: 'SoulStar VIP Experience', icon: '⭐' },
];

export default function Rewards() {
  const { points } = useCart();
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const currentTier = tiers.find((t) => points >= t.pointsMin && points <= t.pointsMax) || tiers[0];
  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  const progressToNext = nextTier ? ((points - currentTier.pointsMin) / (nextTier.pointsMin - currentTier.pointsMin)) * 100 : 100;

  return (
    <main className="min-h-screen" ref={ref}>
      {/* ── Header ── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(201,168,76,0.1) 0%, transparent 65%), linear-gradient(160deg, #050200, #120800)' }}
      >
        <div className="gold-divider absolute bottom-0 left-0 right-0" />

        {/* Animated stars */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ top: `${Math.random() * 90}%`, left: `${Math.random() * 95}%` }}
            animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.7, 1.2, 0.7] }}
            transition={{ duration: 2 + (i % 3), delay: i * 0.25, repeat: Infinity }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14">
              <path d="M7 0L7.9 5.5L13 7L7.9 8.5L7 14L6.1 8.5L1 7L6.1 5.5L7 0Z" fill="rgba(201,168,76,0.7)" />
            </svg>
          </motion.div>
        ))}

        <div className="section-container text-center relative z-10">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
            <motion.div
              className="flex justify-center mb-6"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <svg width="64" height="64" viewBox="0 0 50 50">
                <polygon
                  points="25,3 30.6,18.2 47,18.2 33.8,28.4 38.9,43.7 25,33.5 11.1,43.7 16.2,28.4 3,18.2 19.4,18.2"
                  fill="url(#heroRewardStar)"
                />
                <defs>
                  <linearGradient id="heroRewardStar" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B6914" />
                    <stop offset="50%" stopColor="#C9A84C" />
                    <stop offset="100%" stopColor="#F5D98B" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <span className="text-xs font-bold tracking-[0.4em] text-gold/60 uppercase mb-4 block">✦ Loyalty Program ✦</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
              SoulStar{' '}
              <span style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Rewards
              </span>
            </h1>
            <div className="gold-divider-sm mt-4 mb-5" />
            <p className="text-white/50 max-w-lg mx-auto">
              Every sip earns points. Every point brings you closer to rewards, perks, and the VIP experience you deserve.
            </p>
          </motion.div>

          {/* Points display */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 inline-block"
          >
            <div
              className="px-10 py-6 text-center"
              style={{ background: 'rgba(20,8,0,0.9)', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <p className="text-xs font-bold tracking-[0.3em] text-gold/60 uppercase mb-2">Your Points Balance</p>
              <p className="font-display text-6xl font-bold text-gold">{points.toLocaleString()}</p>
              <p className="text-white/40 text-sm mt-1">SoulStar Points</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <Award size={16} className="text-gold" />
                <span className="text-gold text-sm font-semibold">{currentTier.name}</span>
              </div>
            </div>
          </motion.div>

          {/* Progress to next tier */}
          {nextTier && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 max-w-sm mx-auto"
            >
              <div className="flex justify-between text-xs mb-2">
                <span className="text-white/40">{currentTier.name}</span>
                <span className="text-gold/60">{nextTier.pointsMin - points} pts to {nextTier.name}</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #8B6914, #C9A84C, #E8C96D)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progressToNext, 100)}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <div className="section-container py-16 space-y-20">

        {/* ── Tiers ── */}
        <section id="tiers">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Membership{' '}
              <span style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Tiers
              </span>
            </h2>
            <div className="gold-divider-sm mt-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ y: 30, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative p-8 overflow-hidden transition-all duration-300 ${tier.popular ? 'scale-[1.03]' : ''}`}
                style={{ background: `linear-gradient(160deg, ${tier.color.replace('from-', '').replace(' to-', ', ')})`, border: `1px solid ${tier.borderColor}` }}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 py-1.5 text-center text-[10px] font-black tracking-[0.25em] text-soul-black uppercase"
                    style={{ background: 'linear-gradient(90deg, #8B6914, #C9A84C, #E8C96D)' }}>
                    HIGHEST TIER
                  </div>
                )}
                <div className={`mt-${tier.popular ? 8 : 0} mb-4 text-gold`}>{tier.icon}</div>
                <h3 className={`font-display text-xl font-bold mb-1 ${tier.textColor}`}>{tier.name}</h3>
                <p className="text-white/40 text-xs mb-4">
                  {tier.pointsMax === Infinity ? `${tier.pointsMin.toLocaleString()}+ points` : `${tier.pointsMin}–${tier.pointsMax.toLocaleString()} points`}
                </p>
                <div className="gold-divider mb-5" />
                <ul className="space-y-2.5">
                  {tier.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2.5">
                      <Check size={12} className="text-gold flex-shrink-0" />
                      <span className="text-white/65 text-sm">{p}</span>
                    </li>
                  ))}
                </ul>
                {currentTier.name === tier.name && (
                  <div className="mt-5 py-2 text-center text-xs font-bold tracking-wider text-gold border border-gold/30">
                    YOUR CURRENT TIER
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Redeem options ── */}
        <section id="redeem">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Redeem Your{' '}
              <span style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Rewards
              </span>
            </h2>
            <div className="gold-divider-sm mt-3" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {redeemOptions.map((opt, i) => (
              <motion.div
                key={opt.reward}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative p-5 text-center group transition-all duration-300 ${points >= opt.points ? 'cursor-pointer hover:border-gold/50' : 'opacity-50 cursor-not-allowed'}`}
                style={{ background: 'rgba(18,7,0,0.8)', border: `1px solid ${points >= opt.points ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.06)'}` }}
              >
                <div className="text-3xl mb-3">{opt.icon}</div>
                <p className="font-bold text-gold text-sm mb-2">{opt.points.toLocaleString()} pts</p>
                <p className="text-white/60 text-xs leading-tight">{opt.reward}</p>
                {points >= opt.points && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-soul-black text-xs font-black"
                    style={{ background: '#C9A84C' }}
                  >
                    ✓
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Join CTA ── */}
        {!joined && (
          <section className="max-w-xl mx-auto text-center">
            <div className="p-10" style={{ background: 'rgba(20,8,0,0.8)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <h2 className="font-display text-3xl font-bold text-white mb-3">
                Not a Member Yet?
              </h2>
              <p className="text-white/50 text-sm mb-6">Join free and get 250 points instantly. No purchase required.</p>
              <form
                onSubmit={(e) => { e.preventDefault(); setJoined(true); }}
                className="flex gap-3 mb-4"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 input-soul text-sm"
                  style={{ border: '1px solid rgba(201,168,76,0.2)' }}
                />
                <button type="submit" className="btn-gold-solid px-6 text-xs tracking-wider">
                  JOIN FREE
                </button>
              </form>
              <p className="text-white/25 text-xs">No spam. Get 250 pts just for joining. ✦</p>
            </div>
          </section>
        )}

        {joined && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-xl mx-auto text-center p-10"
            style={{ background: 'rgba(20,8,0,0.8)', border: '1px solid rgba(201,168,76,0.3)' }}
          >
            <div className="text-5xl mb-4">⭐</div>
            <h2 className="font-display text-2xl font-bold text-gold mb-3">Welcome to the Club!</h2>
            <p className="text-white/60 text-sm">250 points have been added to your account. Start shopping to earn more!</p>
          </motion.div>
        )}

      </div>
    </main>
  );
}
