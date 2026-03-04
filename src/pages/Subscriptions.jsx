import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, RefreshCw, Package, Truck, ArrowRight, Star } from 'lucide-react';
import { subscriptionPlans } from '../data/products';

const faqs = [
  { q: 'How does the subscription work?', a: 'Choose your plan, select your coffees, and pick your delivery frequency (every 2, 4, or 6 weeks). We\'ll freshly roast and ship to you automatically.' },
  { q: 'Can I change my coffees each month?', a: 'Absolutely! Log in to your account before your next billing date to swap out any or all of your coffees. We love helping you explore.' },
  { q: 'What if I need to pause or cancel?', a: 'No contracts, no penalties. You can skip a delivery, pause, or cancel your subscription at any time from your account dashboard.' },
  { q: 'When will my first order ship?', a: 'Your first order ships within 1-2 business days of placing your subscription. Subsequent orders ship on your chosen schedule.' },
  { q: 'Is the discount applied automatically?', a: 'Yes! Your subscriber discount is automatically applied to every order — you\'ll see the savings clearly on each invoice.' },
];

export default function Subscriptions() {
  const [billing, setBilling] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <main className="min-h-screen">
      {/* ── Header ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%), linear-gradient(160deg, #050200, #120800)' }}
      >
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
        <div className="section-container text-center">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-bold tracking-[0.4em] text-gold/60 uppercase mb-4 block">✦ Never Run Out ✦</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
              Coffee{' '}
              <span style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Subscriptions
              </span>
            </h1>
            <div className="gold-divider-sm mt-4 mb-5" />
            <p className="text-white/50 max-w-lg mx-auto">
              Save up to 20%, get free shipping, and enjoy your favorite coffees delivered fresh to your door on your schedule.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section ref={ref} className="py-16 relative">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
            {[
              { icon: <Package size={24} />, step: '01', title: 'Choose Your Plan', desc: 'Select how many bags per month. Customize your frequency.' },
              { icon: <RefreshCw size={24} />, step: '02', title: 'Pick Your Coffees', desc: 'Choose from our full collection. Change selections anytime.' },
              { icon: <Truck size={24} />, step: '03', title: 'Enjoy & Save', desc: 'Fresh coffee delivered to your door. Save up to 20%.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ y: 30, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex items-start gap-5 p-6"
                style={{ background: 'rgba(20,8,0,0.6)', border: '1px solid rgba(201,168,76,0.1)' }}
              >
                <div
                  className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-soul-black"
                  style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <span className="text-xs font-black tracking-[0.3em] text-gold/40 uppercase">{item.step}</span>
                  <h3 className="font-display text-lg font-bold text-white mt-1 mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Plans ── */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-white mb-8">
              Choose Your{' '}
              <span style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Plan
              </span>
            </h2>

            {/* Billing toggle */}
            <div className="inline-flex items-center p-1 mb-10" style={{ background: 'rgba(20,8,0,0.8)', border: '1px solid rgba(201,168,76,0.15)' }}>
              {['monthly', 'quarterly'].map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className={`px-6 py-2.5 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                    billing === b ? 'text-soul-black' : 'text-white/50 hover:text-white/80'
                  }`}
                  style={billing === b ? { background: 'linear-gradient(135deg, #8B6914, #C9A84C)' } : {}}
                >
                  {b === 'monthly' ? 'Monthly' : 'Quarterly (Save Extra 5%)'}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {subscriptionPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ y: 40, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                className={`relative flex flex-col overflow-hidden transition-all duration-500 ${
                  plan.popular
                    ? 'scale-105 z-10'
                    : 'hover:scale-[1.02]'
                }`}
                style={{
                  background: plan.popular
                    ? 'linear-gradient(160deg, rgba(30,12,0,0.95), rgba(20,8,0,0.9))'
                    : 'rgba(20,8,0,0.7)',
                  border: plan.popular
                    ? '1px solid rgba(201,168,76,0.5)'
                    : '1px solid rgba(201,168,76,0.12)',
                  boxShadow: plan.popular ? '0 0 40px rgba(201,168,76,0.12)' : 'none',
                }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div
                    className="text-center py-2 text-xs font-black tracking-[0.25em] text-soul-black uppercase"
                    style={{ background: 'linear-gradient(90deg, #8B6914, #C9A84C, #E8C96D, #C9A84C, #8B6914)' }}
                  >
                    ✦ Most Popular ✦
                  </div>
                )}

                <div className="p-8 flex-1 flex flex-col">
                  {/* Plan info */}
                  <div className="mb-6">
                    <h3 className="font-display text-2xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-white/45 text-sm">{plan.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <div className="flex items-end gap-2">
                      <span className="font-display text-5xl font-bold text-gold">
                        ${billing === 'quarterly'
                          ? (plan.price * 0.95).toFixed(2)
                          : plan.price.toFixed(2)}
                      </span>
                      <span className="text-white/40 text-sm mb-2">/{plan.frequency}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="px-2.5 py-1 text-[10px] font-black tracking-wider text-soul-black"
                        style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}
                      >
                        SAVE {plan.savings}
                      </span>
                      <span className="text-white/40 text-xs">{plan.bags} bags included</span>
                    </div>
                  </div>

                  <div className="gold-divider my-6" />

                  {/* Features */}
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check size={14} className="text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-white/65 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`w-full py-4 text-sm font-bold tracking-[0.18em] uppercase transition-all duration-300 ${
                      plan.popular
                        ? 'text-soul-black hover:shadow-gold'
                        : 'text-gold border border-gold/40 hover:bg-gold/10'
                    }`}
                    style={plan.popular ? {
                      background: 'linear-gradient(135deg, #8B6914, #C9A84C, #E8C96D, #C9A84C, #8B6914)',
                      backgroundSize: '200% 100%',
                    } : {}}
                  >
                    START {plan.name.toUpperCase()}
                  </button>
                </div>

                {/* Gold corner for popular */}
                {plan.popular && (
                  <>
                    <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                      <div className="absolute top-8 left-0 w-full h-px bg-gold/20" />
                      <div className="absolute top-0 left-8 h-full w-px bg-gold/20" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                      <div className="absolute bottom-8 right-0 w-full h-px bg-gold/20" />
                      <div className="absolute bottom-0 right-8 h-full w-px bg-gold/20" />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {/* ── FAQs ── */}
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-white text-center mb-8">
              Frequently Asked{' '}
              <span style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Questions
              </span>
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="overflow-hidden"
                  style={{ background: 'rgba(20,8,0,0.7)', border: '1px solid rgba(201,168,76,0.12)' }}
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-white group-hover:text-gold transition-colors text-sm pr-4">{faq.q}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                      <span className="text-gold text-xl font-light">+</span>
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-white/55 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
