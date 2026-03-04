import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navLeft = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Subscriptions', path: '/subscriptions' },
];
const navRight = [
  { label: 'Grab & Go Lattes', path: '/grab-and-go' },
  { label: 'Rewards', path: '/rewards' },
];

export default function Header() {
  const { itemCount, wishlist, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-soul-black/98 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-b border-gold/20'
            : 'bg-soul-black/95 border-b border-gold/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── 3-COLUMN GRID: left nav | center logo | right nav + icons ── */}
          <div className="grid grid-cols-3 items-center h-16 lg:h-20">

            {/* ── COL 1: LEFT NAV (desktop) / HAMBURGER (mobile) ── */}
            <div className="flex items-center">
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-white/80 hover:text-gold transition-colors duration-200 p-1"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>

              {/* Desktop left nav */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                {navLeft.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `nav-link text-sm font-medium tracking-wider uppercase ${isActive ? 'active text-gold' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* ── COL 2: CENTER LOGO ── */}
            <div className="flex justify-center">
              <Link to="/" className="flex flex-col items-center group">
                {/* Star icon */}
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="mb-0.5"
                >
                  <svg width="26" height="26" viewBox="0 0 50 50" fill="none">
                    <polygon
                      points="25,3 30.6,18.2 47,18.2 33.8,28.4 38.9,43.7 25,33.5 11.1,43.7 16.2,28.4 3,18.2 19.4,18.2"
                      fill="url(#goldStarGrad)"
                    />
                    <defs>
                      <linearGradient id="goldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B6914" />
                        <stop offset="40%" stopColor="#C9A84C" />
                        <stop offset="70%" stopColor="#F5D98B" />
                        <stop offset="100%" stopColor="#8B6914" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                {/* SOUL */}
                <span
                  className="font-display font-black text-lg leading-none tracking-[0.25em] select-none"
                  style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C, #F5D98B, #C9A84C, #8B6914)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  SOUL
                </span>
                {/* STAR */}
                <span
                  className="font-display font-black text-2xl leading-none tracking-[0.35em] -mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C, #F5D98B, #C9A84C, #8B6914)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  STAR
                </span>
                {/* divider + RESERVE */}
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-px w-5 bg-gold/60" />
                  <span className="text-[9px] font-bold tracking-[0.3em] text-gold/70 uppercase">Reserve</span>
                  <span className="h-px w-5 bg-gold/60" />
                </div>
              </Link>
            </div>

            {/* ── COL 3: RIGHT NAV + ICONS ── */}
            <div className="flex items-center justify-end gap-4 xl:gap-6">
              {/* Desktop right nav */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                {navRight.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link text-sm font-medium tracking-wider uppercase ${isActive ? 'active text-gold' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              {/* Icons */}
              <div className="flex items-center gap-0.5 sm:gap-1">
                {/* Search */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-white/70 hover:text-gold transition-colors duration-200"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>

                {/* Account */}
                <Link to="/account" className="p-2 text-white/70 hover:text-gold transition-colors duration-200" aria-label="Account">
                  <User size={18} />
                </Link>

                {/* Wishlist */}
                <button className="relative p-2 text-white/70 hover:text-gold transition-colors duration-200" aria-label="Wishlist">
                  <Heart size={18} className={wishlist.length > 0 ? 'text-gold fill-gold' : ''} />
                  {wishlist.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-soul-black text-[9px] font-black rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button
                  onClick={() => setIsOpen(true)}
                  className="relative p-2 text-white/70 hover:text-gold transition-colors duration-200"
                  aria-label="Cart"
                >
                  <ShoppingBag size={18} />
                  {itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1 w-4 h-4 bg-gold text-soul-black text-[9px] font-black rounded-full flex items-center justify-center"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ── GOLD BOTTOM BORDER LINE ── */}
        <div className="gold-divider opacity-30" />
      </header>

      {/* ── SEARCH OVERLAY ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-soul-black/95 backdrop-blur-xl flex flex-col items-center pt-32 px-4"
            onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="w-full max-w-2xl"
            >
              <div className="flex items-center gap-4 border-b-2 border-gold pb-4">
                <Search size={24} className="text-gold flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search coffees, lattes, blends..."
                  className="flex-1 bg-transparent text-2xl text-white placeholder-white/30 outline-none font-display"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-white/40 hover:text-gold transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Ethiopia', 'Dream Big', 'Caramel Latte', 'Subscription', 'Grab & Go'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      setSearchOpen(false);
                    }}
                    className="px-4 py-2 text-sm text-white/60 border border-white/10 hover:border-gold/50 hover:text-gold transition-all duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute left-0 top-0 h-full w-72 bg-soul-black border-r border-gold/20 flex flex-col overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gold/10">
                <div className="flex flex-col">
                  <span className="font-display font-black text-2xl text-gold-gradient" style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    SOULSTAR
                  </span>
                  <span className="text-xs tracking-widest text-gold/60 uppercase">Reserve</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-gold">
                  <X size={22} />
                </button>
              </div>

              {/* Nav */}
              <nav className="flex-1 p-6">
                <ul className="space-y-1">
                  {[...navLeft, ...navRight].map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end={item.path === '/'}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-200 ${
                            isActive
                              ? 'text-gold bg-gold/10 border-l-2 border-gold'
                              : 'text-white/70 hover:text-gold hover:bg-gold/5 border-l-2 border-transparent'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <NavLink
                      to="/contact"
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-200 ${
                          isActive
                            ? 'text-gold bg-gold/10 border-l-2 border-gold'
                            : 'text-white/70 hover:text-gold hover:bg-gold/5 border-l-2 border-transparent'
                        }`
                      }
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </nav>

              {/* Bottom */}
              <div className="p-6 border-t border-gold/10">
                <a href="/rewards" className="btn-gold w-full text-center text-xs py-3">
                  <span>Join Rewards Club</span>
                </a>
                <p className="text-center text-xs text-white/30 mt-4">250 points just for signing up</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
