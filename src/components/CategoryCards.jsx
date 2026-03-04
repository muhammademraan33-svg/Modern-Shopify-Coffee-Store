import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Coffee, RefreshCw, ArrowRight } from 'lucide-react';

const cards = [
  {
    id: 'coffee',
    label: 'Shop Coffee',
    heading: 'Shop Coffee',
    description: 'Explore our premium, specialty coffee collection',
    buttonText: 'SHOP NOW',
    href: '/shop',
    bgImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&q=80',
    icon: <Coffee size={22} />,
    overlayColor: 'from-soul-black via-transparent to-soul-black/50',
    tint: 'rgba(20,10,0,0.35)',
  },
  {
    id: 'lattes',
    label: 'Grab & Go Lattes',
    heading: 'Grab & Go Lattes',
    description: 'Ready-to-drink lattes for your convenience',
    buttonText: 'BROWSE LATTES',
    href: '/grab-and-go',
    bgImage: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&q=80',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    overlayColor: 'from-soul-black via-transparent to-soul-black/40',
    tint: 'rgba(10,5,0,0.30)',
  },
  {
    id: 'subscribe',
    label: 'Subscribe & Save',
    heading: 'Subscribe & Save',
    description: 'Save 10% + free shipping on every order!',
    buttonText: 'LEARN MORE',
    href: '/subscriptions',
    bgImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&q=80',
    icon: <RefreshCw size={22} />,
    overlayColor: 'from-soul-black via-transparent to-soul-black/50',
    tint: 'rgba(15,8,0,0.40)',
  },
];

export default function CategoryCards() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative z-10">
      {/* Gold top border */}
      <div className="gold-divider" />

      <div className="grid grid-cols-1 md:grid-cols-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative overflow-hidden group cursor-pointer"
            style={{ minHeight: 420 }}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${card.bgImage})` }}
            />

            {/* Dark overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
              style={{ background: `linear-gradient(to bottom, rgba(5,2,0,0.6) 0%, ${card.tint} 50%, rgba(5,2,0,0.85) 100%)` }}
            />

            {/* Top label */}
            <div className="absolute top-0 left-0 right-0 p-6 z-10">
              <h2 className="font-display text-xl font-bold text-white tracking-wide">{card.label}</h2>
            </div>

            {/* Gold vertical border between cards */}
            {i < cards.length - 1 && (
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent z-20" />
            )}

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-8 z-10">
              {/* Floating gold icon circle */}
              <motion.div
                className="relative mb-5"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-soul-black relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #8B6914, #C9A84C, #E8C96D, #C9A84C, #8B6914)',
                    boxShadow: '0 0 25px rgba(201,168,76,0.5), 0 8px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  {card.icon}
                  {/* Sheen */}
                  <div className="absolute inset-0 bg-white/10 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)' }} />
                </div>
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-gold/40"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                />
              </motion.div>

              {/* Heading */}
              <h3 className="font-display text-2xl font-bold text-white text-center mb-3 tracking-wide">
                {card.heading}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm text-center mb-6 leading-relaxed">{card.description}</p>

              {/* CTA Button */}
              <Link
                to={card.href}
                className="inline-flex items-center gap-2 px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase border border-gold/70 text-gold hover:bg-gold hover:text-soul-black transition-all duration-300 group/btn"
              >
                <span>{card.buttonText}</span>
                <ArrowRight size={12} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>

            {/* Hover shimmer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.04) 0%, transparent 50%)' }}
            />
          </motion.div>
        ))}
      </div>

      {/* Gold bottom border */}
      <div className="gold-divider" />
    </section>
  );
}
