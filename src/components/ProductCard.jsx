import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const roastColors = {
  'Light': 'roast-light',
  'Light-Medium': 'roast-light',
  'Medium': 'roast-medium',
  'Medium-Dark': 'roast-dark',
  'Dark': 'roast-dark',
  'Extra Dark': 'roast-dark',
};

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.custom((t) => (
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 80, opacity: 0 }}
        className="flex items-center gap-3 px-5 py-4 shadow-xl"
        style={{ background: '#140800', border: '1px solid rgba(201,168,76,0.3)' }}
      >
        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
          <ShoppingBag size={14} className="text-gold" />
        </div>
        <div>
          <p className="text-white text-sm font-medium">{product.name}</p>
          <p className="text-gold/70 text-xs">Added to cart</p>
        </div>
      </motion.div>
    ), { duration: 2500, position: 'top-right' });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.custom((t) => (
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: '#140800', border: '1px solid rgba(201,168,76,0.3)' }}
      >
        <Heart size={14} className={`${!wishlisted ? 'text-red-400' : 'text-white/40'}`} />
        <p className="text-white text-sm">{wishlisted ? 'Removed from wishlist' : 'Added to wishlist'}</p>
      </motion.div>
    ), { duration: 2000, position: 'top-right' });
  };

  const isOrganic = product.category?.includes('Organic');
  const roastClass = roastColors[product.roast] || 'roast-medium';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link to={`/product/${product.id}`} className="product-card block group">

        {/* Image container */}
        <div className="relative overflow-hidden" style={{ paddingBottom: '70%' }}>
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-soul-black via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-soul-black/0 group-hover:bg-soul-black/30 transition-all duration-500" />

          {/* Quick action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
            <button
              onClick={handleWishlist}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-soul-black/80 backdrop-blur-sm border border-gold/20 hover:border-gold/60 transition-all duration-200"
              aria-label="Add to wishlist"
            >
              <Heart size={14} className={wishlisted ? 'text-red-400 fill-red-400' : 'text-white/70'} />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-soul-black/80 backdrop-blur-sm border border-gold/20 hover:border-gold/60 transition-all duration-200"
              aria-label="Quick view"
            >
              <Eye size={14} className="text-white/70" />
            </Link>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span
                className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase"
                style={{
                  background: isOrganic ? 'rgba(76,140,76,0.85)' : 'rgba(201,168,76,0.9)',
                  color: isOrganic ? '#fff' : '#0A0400',
                }}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Add to cart button (slides up on hover) */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 flex items-center justify-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-soul-black"
              style={{ background: 'linear-gradient(90deg, #8B6914, #C9A84C, #E8C96D, #C9A84C, #8B6914)', backgroundSize: '200% 100%' }}
            >
              <ShoppingBag size={14} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          {/* Category + roast */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold tracking-widest text-gold/60 uppercase">{product.category}</span>
            {product.roast && (
              <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 ${roastClass}`}>
                {product.roast}
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="font-display text-base font-semibold text-white mb-1.5 group-hover:text-gold transition-colors duration-300 leading-tight">
            {product.name}
          </h3>

          {/* Notes */}
          {product.notes && (
            <p className="text-white/50 text-xs italic leading-relaxed mb-3 line-clamp-2">{product.notes}</p>
          )}

          {/* Stars + price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className={i < 5 ? 'star-filled fill-gold' : 'star-empty'} />
              ))}
              <span className="text-[10px] text-white/40 ml-1.5">(24)</span>
            </div>
            <span className="font-display text-lg font-bold text-gold">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Weight */}
          {product.weight && (
            <p className="text-[10px] text-white/30 tracking-wider mt-1">{product.weight}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
