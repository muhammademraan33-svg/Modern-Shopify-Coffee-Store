import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #050200 0%, #120800 40%, #1C0E00 70%, #050200 100%)',
      }}
    >
      {/* Gold border top/bottom */}
      <div className="gold-divider absolute top-0 left-0 right-0" />
      <div className="gold-divider absolute bottom-0 left-0 right-0" />

      {/* Bokeh bg */}
      {[
        { w: 400, h: 200, top: '20%', left: '5%', opacity: 0.07 },
        { w: 300, h: 300, top: '30%', right: '5%', opacity: 0.06 },
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
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-soul-black"
                style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C, #E8C96D)' }}
              >
                <Mail size={24} />
              </div>
            </div>

            <span className="text-xs font-bold tracking-[0.4em] text-gold/60 uppercase mb-4 block">
              ✦ Stay in the Loop ✦
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Join the{' '}
              <span style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                SoulStar Inner Circle
              </span>
            </h2>
            <div className="gold-divider-sm mb-6" />
            <p className="text-white/50 text-base leading-relaxed mb-10">
              Be the first to know about new roasts, seasonal launches, flash sales, and exclusive subscriber perks. No spam, ever — just good coffee news.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="relative">
                <div
                  className="flex items-stretch gap-0 overflow-hidden"
                  style={{ border: '1px solid rgba(201,168,76,0.3)' }}
                >
                  <div className="flex items-center pl-4 text-white/30">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-transparent text-white text-sm px-4 py-4 outline-none placeholder-white/30 focus:placeholder-white/20 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase text-soul-black transition-all duration-300 flex items-center gap-2 disabled:opacity-80"
                    style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C, #E8C96D, #C9A84C, #8B6914)', backgroundSize: '200% 100%', minWidth: 160 }}
                  >
                    {loading ? (
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 bg-soul-black rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    ) : (
                      <>
                        <span>SUBSCRIBE</span>
                        <ArrowRight size={12} />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-white/25 text-xs mt-3 tracking-wider">
                  By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-10 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}
                >
                  <Check size={28} className="text-soul-black" />
                </div>
                <h3 className="font-display text-2xl font-bold text-gold mb-3">Welcome to the Inner Circle!</h3>
                <p className="text-white/60 text-sm">
                  You&apos;re in. Check your inbox for a welcome gift — a special discount just for you.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-8 mt-10 flex-wrap"
          >
            {[
              { label: 'No Spam', icon: '🛡️' },
              { label: 'Exclusive Deals', icon: '⭐' },
              { label: 'Early Access', icon: '🔑' },
              { label: 'Unsubscribe Anytime', icon: '✓' },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1.5 text-white/30">
                <span className="text-sm">{b.icon}</span>
                <span className="text-xs tracking-wider">{b.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
