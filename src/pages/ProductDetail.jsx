import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, ArrowLeft, Star, Plus, Minus, Check, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { allBaggedCoffee, grabAndGoLattes, specialtyLattes } from '../data/products';
import toast from 'react-hot-toast';
import ProductCard from '../components/ProductCard';

const allProducts = [...allBaggedCoffee, ...grabAndGoLattes, ...specialtyLattes];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [qty, setQty] = useState(1);
  const [option, setOption] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [subscribeMode, setSubscribeMode] = useState(false);

  const product = allProducts.find((p) => p.id === id);
  const wishlisted = product ? isWishlisted(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-5xl mb-6">☕</div>
        <h1 className="font-display text-3xl text-white mb-4">Product Not Found</h1>
        <p className="text-white/40 mb-8">This coffee seems to have wandered off...</p>
        <Link to="/shop" className="btn-gold px-8 py-3 text-xs"><span>BACK TO SHOP</span></Link>
      </div>
    );
  }

  const related = allBaggedCoffee
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product, option);
    }
    toast.custom(
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: '#140800', border: '1px solid rgba(201,168,76,0.3)' }}
      >
        <ShoppingBag size={14} className="text-gold" />
        <div>
          <p className="text-white text-sm font-medium">{qty}x {product.name}</p>
          <p className="text-gold/70 text-xs">Added to cart</p>
        </div>
      </motion.div>,
      { duration: 2500, position: 'top-right' }
    );
  };

  const finalPrice = subscribeMode ? product.price * 0.9 : product.price;

  return (
    <main className="min-h-screen py-12">
      <div className="section-container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-xs text-white/35">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-gold/60">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* ── Image ── */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="relative overflow-hidden"
              style={{ background: '#0A0400', border: '1px solid rgba(201,168,76,0.12)' }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soul-black/60 via-transparent to-transparent" />

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center backdrop-blur-sm border transition-all duration-200"
                style={{ background: 'rgba(10,4,0,0.8)', border: wishlisted ? '1px solid rgba(201,168,76,0.5)' : '1px solid rgba(255,255,255,0.1)' }}
                aria-label="Wishlist"
              >
                <Heart size={16} className={wishlisted ? 'text-red-400 fill-red-400' : 'text-white/60'} />
              </button>

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-5 left-5 px-3 py-1 text-xs font-black tracking-wider text-soul-black"
                  style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C)' }}>
                  {product.badge}
                </div>
              )}
            </div>

            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-px bg-gold/40" />
              <div className="absolute top-0 left-0 h-full w-px bg-gold/40" />
            </div>
            <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none">
              <div className="absolute bottom-0 right-0 w-full h-px bg-gold/40" />
              <div className="absolute bottom-0 right-0 h-full w-px bg-gold/40" />
            </div>
          </motion.div>

          {/* ── Info ── */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category + Rating */}
            <div className="flex items-center justify-between mb-4">
              <span className="badge-gold text-[10px]">{product.category}</span>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="text-gold fill-gold" />
                  ))}
                </div>
                <span className="text-white/40 text-xs">(24 reviews)</span>
              </div>
            </div>

            {/* Name */}
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">{product.name}</h1>

            {/* Notes */}
            {product.notes && (
              <p className="text-gold italic text-base mb-4">{product.notes}</p>
            )}

            {/* Roast badge */}
            {product.roast && (
              <div className="flex gap-2 mb-5">
                <span className={`text-xs font-bold tracking-wider px-3 py-1 ${
                  product.roast.includes('Light') ? 'roast-light' :
                  product.roast === 'Medium' || product.roast === 'Medium-Dark' ? 'roast-medium' : 'roast-dark'
                }`}>
                  {product.roast} Roast
                </span>
                {product.weight && <span className="text-xs text-white/40 border border-white/10 px-3 py-1">{product.weight}</span>}
              </div>
            )}

            {/* Gold divider */}
            <div className="gold-divider mb-6" />

            {/* Subscribe toggle */}
            <div
              className="flex items-center justify-between p-4 mb-6 cursor-pointer group transition-all duration-300"
              style={{ background: subscribeMode ? 'rgba(201,168,76,0.1)' : 'rgba(20,8,0,0.5)', border: subscribeMode ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.08)' }}
              onClick={() => setSubscribeMode(!subscribeMode)}
            >
              <div className="flex items-center gap-3">
                <RefreshCw size={16} className={subscribeMode ? 'text-gold' : 'text-white/40'} />
                <div>
                  <p className={`text-sm font-semibold ${subscribeMode ? 'text-gold' : 'text-white/70'}`}>Subscribe &amp; Save 10%</p>
                  <p className="text-white/35 text-xs">Delivered every 4 weeks · Cancel anytime</p>
                </div>
              </div>
              <div
                className="w-5 h-5 flex items-center justify-center transition-all duration-200"
                style={{ background: subscribeMode ? 'linear-gradient(135deg, #8B6914, #C9A84C)' : 'transparent', border: subscribeMode ? 'none' : '1px solid rgba(255,255,255,0.2)' }}
              >
                {subscribeMode && <Check size={11} className="text-soul-black" />}
              </div>
            </div>

            {/* Options (Iced/Hot) */}
            {product.options && (
              <div className="mb-6">
                <label className="block text-xs font-bold tracking-[0.2em] text-gold/60 uppercase mb-3">Preparation</label>
                <div className="flex gap-3">
                  {product.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setOption(opt)}
                      className={`px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                        option === opt ? 'text-soul-black' : 'border border-white/15 text-white/60 hover:border-gold/40'
                      }`}
                      style={option === opt ? { background: 'linear-gradient(135deg, #8B6914, #C9A84C)' } : {}}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price + Qty */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-display text-4xl font-bold text-gold">${finalPrice.toFixed(2)}</span>
                {subscribeMode && (
                  <span className="ml-3 text-white/40 text-sm line-through">${product.price.toFixed(2)}</span>
                )}
              </div>

              <div className="flex items-center" style={{ border: '1px solid rgba(201,168,76,0.25)' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-gold hover:bg-gold/10 transition-all">
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-white font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-gold hover:bg-gold/10 transition-all">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 text-sm font-bold tracking-[0.2em] uppercase text-soul-black flex items-center justify-center gap-3 mb-4 transition-all duration-300 hover:shadow-gold"
              style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C, #E8C96D, #C9A84C, #8B6914)', backgroundSize: '200% 100%' }}
            >
              <ShoppingBag size={16} />
              <span>ADD TO CART — ${(finalPrice * qty).toFixed(2)}</span>
            </button>

            {/* Shipping note */}
            <p className="text-center text-xs text-white/25 tracking-wider">
              ✓ Free shipping on orders $50+ · ✓ Freshly roasted · ✓ Secure checkout
            </p>
          </motion.div>
        </div>

        {/* ── Tabs: Description / Details ── */}
        <div className="mb-20">
          <div className="flex gap-0 border-b border-gold/10 mb-8">
            {['description', 'details'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 border-b-2 ${
                  activeTab === tab ? 'text-gold border-gold' : 'text-white/40 border-transparent hover:text-white/70'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl"
          >
            {activeTab === 'description' ? (
              <p className="text-white/60 text-base leading-relaxed">{product.description}</p>
            ) : (
              <div className="space-y-4">
                {[
                  { label: 'Category', value: product.category },
                  { label: 'Roast Level', value: product.roast || '—' },
                  { label: 'Flavor Notes', value: product.notes || '—' },
                  { label: 'Weight', value: product.weight || 'Varies' },
                  { label: 'Origin', value: product.category?.includes('Origin') ? product.name : 'Blend' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-6 py-3 border-b border-white/5">
                    <span className="text-xs font-black tracking-[0.2em] text-gold/50 uppercase w-32 flex-shrink-0">{label}</span>
                    <span className="text-white/70 text-sm">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Related ── */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-3xl font-bold text-white mb-8">
              You May Also{' '}
              <span style={{ background: 'linear-gradient(135deg, #C9A84C, #F5D98B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Like
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
