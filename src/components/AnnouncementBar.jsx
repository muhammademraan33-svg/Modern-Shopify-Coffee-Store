import { useState } from 'react';
import { X, Store, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  { id: 1, text: '✦ Join & Earn Rewards — Get 250 points just for signing up ✦', highlight: true },
  { id: 2, text: '✦ Free Shipping on orders over $50 — Subscribe & Save 10%+ ✦', highlight: false },
  { id: 3, text: '✦ New: Pistachio Latte & Supernova Soda now available ✦', highlight: false },
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const prev = () => setCurrent((c) => (c - 1 + messages.length) % messages.length);
  const next = () => setCurrent((c) => (c + 1) % messages.length);

  return (
    <div className="announcement-bar py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: join & earn */}
        <a
          href="/rewards"
          className="hidden sm:flex items-center gap-2 text-xs font-semibold tracking-widest text-gold uppercase hover:text-gold-light transition-colors duration-300"
        >
          <span className="text-gold">+</span>
          <span>Join &amp; Earn Rewards</span>
        </a>

        {/* Center: rotating announcements */}
        <div className="flex items-center gap-3 flex-1 justify-center">
          <button
            onClick={prev}
            className="text-white/40 hover:text-gold transition-colors duration-200 p-1"
            aria-label="Previous announcement"
          >
            <ChevronLeft size={14} />
          </button>

          <div className="overflow-hidden h-5 relative min-w-0 flex-1 max-w-md text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={messages[current].id}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`text-xs font-medium tracking-wider truncate ${
                  messages[current].highlight ? 'text-gold' : 'text-white/70'
                }`}
              >
                {messages[current].text}
              </motion.p>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            className="text-white/40 hover:text-gold transition-colors duration-200 p-1"
            aria-label="Next announcement"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Right: store info */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-white/50">
          <a href="/contact" className="flex items-center gap-1.5 hover:text-gold transition-colors duration-200">
            <Store size={13} />
            <span className="tracking-wider font-medium">Store</span>
          </a>
          <button
            onClick={() => setVisible(false)}
            className="ml-2 text-white/30 hover:text-white/70 transition-colors duration-200"
            aria-label="Close announcement bar"
          >
            <X size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
