import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { allBaggedCoffee } from '../data/products';

const categories = ['All', 'Single Origin', 'Organic Single Origin', 'Blend', 'Organic Blend', 'Other'];
const roasts = ['All Roasts', 'Light', 'Light-Medium', 'Medium', 'Medium-Dark', 'Dark', 'Extra Dark'];
const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A-Z', value: 'name-asc' },
  { label: 'Name: Z-A', value: 'name-desc' },
];

export default function Shop() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [roast, setRoast] = useState('All Roasts');
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(20);

  const filtered = useMemo(() => {
    let list = [...allBaggedCoffee];

    // Search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.notes?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    // Category
    if (category !== 'All') {
      list = list.filter((p) => p.category === category);
    }

    // Roast
    if (roast !== 'All Roasts') {
      list = list.filter((p) => p.roast === roast);
    }

    // Price
    list = list.filter((p) => p.price <= maxPrice);

    // Sort
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': list.sort((a, b) => b.name.localeCompare(a.name)); break;
      default: break;
    }

    return list;
  }, [search, category, roast, sort, maxPrice]);

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setRoast('All Roasts');
    setSort('featured');
    setMaxPrice(20);
  };

  const hasFilters = search || category !== 'All' || roast !== 'All Roasts' || maxPrice < 20;

  return (
    <main className="min-h-screen">
      {/* ── Page Header ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%), linear-gradient(160deg, #050200, #120800)',
        }}
      >
        <div className="gold-divider absolute bottom-0 left-0 right-0" />

        {/* Sparkles */}
        {[
          { top: '20%', left: '8%' }, { top: '60%', left: '92%' },
          { top: '30%', left: '75%' }, { top: '70%', left: '20%' },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: s.top, left: s.left }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14">
              <path d="M7 0L7.9 5.5L13 7L7.9 8.5L7 14L6.1 8.5L1 7L6.1 5.5L7 0Z" fill="rgba(201,168,76,0.6)" />
            </svg>
          </motion.div>
        ))}

        <div className="section-container text-center">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-bold tracking-[0.4em] text-gold/60 uppercase mb-4 block">✦ The Collection ✦</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
              Shop{' '}
              <span style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                All Coffee
              </span>
            </h1>
            <div className="gold-divider-sm mt-4 mb-5" />
            <p className="text-white/50 max-w-xl mx-auto">
              {allBaggedCoffee.length} premium specialty coffees — from single-origin gems to curated blends, all roasted to perfection.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="section-container">
          {/* ── Search + Sort bar ── */}
          <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
            {/* Search */}
            <div
              className="flex items-center gap-3 flex-1 min-w-[240px] max-w-md px-4 py-3"
              style={{ background: 'rgba(20,8,0,0.8)', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              <Search size={16} className="text-gold/60 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, flavor, origin..."
                className="flex-1 bg-transparent text-white text-sm placeholder-white/30 outline-none"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-white/40 hover:text-gold">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Filter toggle (mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                  showFilters ? 'bg-gold text-soul-black' : 'border border-gold/30 text-gold/70 hover:border-gold hover:text-gold'
                }`}
              >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
                {hasFilters && <span className="w-2 h-2 rounded-full bg-gold" />}
              </button>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none px-4 py-3 pr-8 text-xs font-semibold tracking-wider text-white/70 outline-none cursor-pointer"
                  style={{ background: 'rgba(20,8,0,0.8)', border: '1px solid rgba(201,168,76,0.2)' }}
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value} style={{ background: '#140800' }}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gold/50 pointer-events-none" />
              </div>

              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-gold/60 hover:text-gold underline tracking-wider transition-colors">
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* ── Filter panel ── */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-8"
              >
                <div
                  className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6"
                  style={{ background: 'rgba(20,8,0,0.8)', border: '1px solid rgba(201,168,76,0.12)' }}
                >
                  {/* Category filter */}
                  <div>
                    <h4 className="text-xs font-black tracking-[0.25em] text-gold/70 uppercase mb-3">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                            category === cat
                              ? 'text-soul-black'
                              : 'border border-white/10 text-white/50 hover:border-gold/40 hover:text-gold/70'
                          }`}
                          style={category === cat ? { background: 'linear-gradient(135deg, #8B6914, #C9A84C)' } : {}}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Roast filter */}
                  <div>
                    <h4 className="text-xs font-black tracking-[0.25em] text-gold/70 uppercase mb-3">Roast Level</h4>
                    <div className="flex flex-wrap gap-2">
                      {roasts.map((r) => (
                        <button
                          key={r}
                          onClick={() => setRoast(r)}
                          className={`px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                            roast === r
                              ? 'text-soul-black'
                              : 'border border-white/10 text-white/50 hover:border-gold/40 hover:text-gold/70'
                          }`}
                          style={roast === r ? { background: 'linear-gradient(135deg, #8B6914, #C9A84C)' } : {}}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price range */}
                  <div>
                    <h4 className="text-xs font-black tracking-[0.25em] text-gold/70 uppercase mb-3">
                      Max Price: <span className="text-gold">${maxPrice.toFixed(2)}</span>
                    </h4>
                    <input
                      type="range"
                      min="10"
                      max="20"
                      step="0.5"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-gold cursor-pointer"
                      style={{ accentColor: '#C9A84C' }}
                    />
                    <div className="flex justify-between text-xs text-white/30 mt-1">
                      <span>$10</span>
                      <span>$20</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Category quick nav ── */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-thin">
            {categories.slice(1).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat === category ? 'All' : cat)}
                className={`flex-shrink-0 px-5 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                  category === cat
                    ? 'text-soul-black'
                    : 'border border-gold/20 text-white/50 hover:border-gold/50 hover:text-gold/70'
                }`}
                style={category === cat ? { background: 'linear-gradient(135deg, #8B6914, #C9A84C)' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Results count ── */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/40 text-sm">
              Showing <span className="text-white font-semibold">{filtered.length}</span> {filtered.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {/* ── Products Grid ── */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <div className="text-6xl mb-6">☕</div>
                <h3 className="font-display text-2xl font-bold text-white/40 mb-3">No coffees found</h3>
                <p className="text-white/25 mb-8">Try adjusting your filters or search term</p>
                <button onClick={clearFilters} className="btn-gold px-8 py-3 text-xs">
                  <span>CLEAR FILTERS</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
