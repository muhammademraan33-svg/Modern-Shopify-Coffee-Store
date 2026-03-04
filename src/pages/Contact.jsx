import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Check, MessageCircle, Instagram, Facebook } from 'lucide-react';

const info = [
  { Icon: Phone, label: 'Phone', value: '(555) 555-0100', href: 'tel:+15555550100' },
  { Icon: Mail, label: 'Email', value: 'hello@soulstarreserve.com', href: 'mailto:hello@soulstarreserve.com' },
  { Icon: MapPin, label: 'Address', value: '123 Coffee Lane, Soulville, TX 78701', href: '#' },
  { Icon: Clock, label: 'Store Hours', value: 'Mon–Sat 6am–7pm · Sun 7am–5pm', href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen">
      {/* ── Header ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%), linear-gradient(160deg, #050200, #120800)' }}
      >
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
        <div className="section-container text-center">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-bold tracking-[0.4em] text-gold/60 uppercase mb-4 block">✦ Get in Touch ✦</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
              Contact{' '}
              <span style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Us
              </span>
            </h1>
            <div className="gold-divider-sm mt-4 mb-5" />
            <p className="text-white/50 max-w-lg mx-auto">
              Questions, wholesale inquiries, or just want to chat coffee? We&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* ── LEFT: Form ── */}
            <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-display text-2xl font-bold text-white mb-6">Send Us a Message</h2>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold tracking-[0.2em] text-gold/60 uppercase mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="input-soul"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-[0.2em] text-gold/60 uppercase mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="input-soul"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold tracking-[0.2em] text-gold/60 uppercase mb-2">Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="input-soul"
                      style={{ background: 'rgba(20,8,0,0.8)' }}
                    >
                      <option value="" style={{ background: '#140800' }}>Select a topic</option>
                      <option value="order" style={{ background: '#140800' }}>Order Support</option>
                      <option value="subscription" style={{ background: '#140800' }}>Subscription Question</option>
                      <option value="wholesale" style={{ background: '#140800' }}>Wholesale Inquiry</option>
                      <option value="rewards" style={{ background: '#140800' }}>Rewards Program</option>
                      <option value="feedback" style={{ background: '#140800' }}>Product Feedback</option>
                      <option value="other" style={{ background: '#140800' }}>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold tracking-[0.2em] text-gold/60 uppercase mb-2">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      className="input-soul resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold-solid w-full py-4 text-sm tracking-[0.18em] flex items-center justify-center gap-3 group"
                  >
                    {loading ? (
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-soul-black rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}>
                    <Check size={36} className="text-soul-black" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-gold mb-4">Message Sent!</h2>
                  <p className="text-white/55 leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* ── RIGHT: Info ── */}
            <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <h2 className="font-display text-2xl font-bold text-white mb-8">Visit or Connect</h2>

              {/* Contact info */}
              <div className="space-y-5 mb-10">
                {info.map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 p-5 group"
                    style={{ background: 'rgba(20,8,0,0.7)', border: '1px solid rgba(201,168,76,0.1)' }}>
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-soul-black"
                      style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black tracking-[0.2em] text-gold/60 uppercase mb-1">{label}</p>
                      {href && href !== '#' ? (
                        <a href={href} className="text-white/70 hover:text-gold text-sm transition-colors duration-200">{value}</a>
                      ) : (
                        <p className="text-white/70 text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div>
                <h3 className="font-display text-lg font-bold text-white mb-4">Follow the Journey</h3>
                <div className="flex gap-3">
                  {[
                    { Icon: Instagram, label: '@soulstarreserve' },
                    { Icon: Facebook, label: 'SoulStar Reserve' },
                    { Icon: MessageCircle, label: 'Live Chat' },
                  ].map(({ Icon, label }) => (
                    <button key={label}
                      className="flex items-center gap-2 px-4 py-3 text-xs font-semibold text-white/60 hover:text-gold transition-all duration-200"
                      style={{ border: '1px solid rgba(201,168,76,0.15)' }}
                    >
                      <Icon size={14} className="text-gold/70" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="mt-8 flex items-center justify-center"
                style={{ height: 200, background: 'rgba(20,8,0,0.6)', border: '1px solid rgba(201,168,76,0.1)' }}
              >
                <div className="text-center">
                  <MapPin size={32} className="text-gold/30 mx-auto mb-3" />
                  <p className="text-white/30 text-sm">123 Coffee Lane, Soulville, TX</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                    className="text-gold/60 text-xs mt-2 block hover:text-gold transition-colors">
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
