import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, ArrowRight, RefreshCw } from 'lucide-react';

const perks = [
  'Save 10–20% on every order',
  'Free shipping always',
  'Skip, pause, or cancel anytime',
  'Early access to new releases',
  'Subscriber-exclusive blends',
];

export default function SubscriptionBanner() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{
        background: `
          url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80') center/cover no-repeat,
          linear-gradient(135deg, #050200, #140900)
        `,
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(5,2,0,0.97) 0%, rgba(5,2,0,0.85) 50%, rgba(5,2,0,0.97) 100%)' }}
      />

      {/* Gold horizontal accent lines */}
      <div className="absolute inset-y-0 left-0 w-1" style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-1" style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)' }} />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}
              >
                <RefreshCw size={18} className="text-soul-black" />
              </div>
              <span className="text-xs font-bold tracking-[0.35em] text-gold/70 uppercase">Coffee Subscription</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Never Run Out{' '}
              <span style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                of Soul
              </span>
            </h2>

            <div className="gold-divider-sm mb-6" style={{ marginLeft: 0 }} />

            <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
              Subscribe to your favorite SoulStar coffee and enjoy exclusive savings, free shipping, and the freedom to customize your delivery schedule. Your perfect cup, delivered on your terms.
            </p>

            <ul className="space-y-3 mb-10">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)' }}>
                    <Check size={11} className="text-gold" />
                  </div>
                  <span className="text-white/70 text-sm">{perk}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link to="/subscriptions" className="btn-gold-solid px-10 py-4 text-sm tracking-[0.18em] inline-flex items-center gap-2 group">
                <span>VIEW PLANS</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/shop" className="btn-gold px-8 py-4 text-xs tracking-[0.15em]">
                <span>SHOP FIRST</span>
              </Link>
            </div>
          </motion.div>

          {/* Right: plan teaser */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Popular plan card */}
              <div
                className="relative p-8 overflow-hidden"
                style={{
                  background: 'rgba(20,8,0,0.9)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Popular badge */}
                <div
                  className="absolute top-0 right-8 px-5 py-1.5 text-xs font-black tracking-widest text-soul-black"
                  style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C, #E8C96D)' }}
                >
                  MOST POPULAR
                </div>

                <div className="mt-4 mb-6">
                  <p className="text-xs font-bold tracking-[0.35em] text-gold/60 uppercase mb-2">Reserve Collection</p>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="font-display text-5xl font-bold text-white">$54</span>
                    <span className="font-display text-2xl font-bold text-gold/70">.99</span>
                    <span className="text-white/40 text-sm mb-2">/month</span>
                  </div>
                  <p className="text-gold text-sm font-semibold">Save 15% every order</p>
                </div>

                <div className="gold-divider mb-6" />

                {/* Features */}
                {[
                  '4 bags of your choice (12 oz each)',
                  'Free priority shipping',
                  'Early access to new releases',
                  'Monthly tasting notes card',
                  'Subscriber-only blend access',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3 mb-3">
                    <Check size={14} className="text-gold flex-shrink-0" />
                    <span className="text-white/70 text-sm">{f}</span>
                  </div>
                ))}

                <Link
                  to="/subscriptions"
                  className="block mt-8 text-center py-4 text-sm font-bold tracking-[0.2em] uppercase text-soul-black transition-all duration-300 hover:shadow-gold"
                  style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C, #E8C96D, #C9A84C, #8B6914)', backgroundSize: '200% 100%' }}
                >
                  START SUBSCRIPTION
                </Link>

                <p className="text-center text-xs text-white/30 mt-3 tracking-wide">No commitment · Cancel anytime</p>

                {/* Gold corner accent */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-px bg-gold/50" />
                  <div className="absolute top-0 left-0 h-full w-px bg-gold/50" />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-full h-px bg-gold/50" />
                  <div className="absolute bottom-0 right-0 h-full w-px bg-gold/50" />
                </div>
              </div>

              {/* Decorative card behind */}
              <div
                className="absolute -bottom-3 -right-3 inset-x-3 h-full -z-10"
                style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.1)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
