import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, removeFromCart, updateQty, subtotal, itemCount } = useCart();

  const shipping = subtotal >= 50 ? 0 : 7.99;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col"
            style={{ background: '#0A0400', borderLeft: '1px solid rgba(201,168,76,0.2)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-gold" />
                <h2 className="font-display text-xl font-bold text-white">
                  Your Cart{' '}
                  {itemCount > 0 && (
                    <span className="text-sm font-normal text-white/40">({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  )}
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-gold border border-white/10 hover:border-gold/40 transition-all duration-200"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free shipping bar */}
            {subtotal < 50 && subtotal > 0 && (
              <div className="px-6 py-3" style={{ background: 'rgba(201,168,76,0.06)' }}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-white/50">Add <span className="text-gold font-semibold">${(50 - subtotal).toFixed(2)}</span> for free shipping</span>
                  <span className="text-gold/60">{Math.round((subtotal / 50) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #8B6914, #C9A84C, #E8C96D)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}
            {subtotal >= 50 && subtotal > 0 && (
              <div className="px-6 py-3 flex items-center gap-2 text-xs text-gold" style={{ background: 'rgba(201,168,76,0.06)' }}>
                <span>🎉</span>
                <span>You qualify for <strong>FREE shipping!</strong></span>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <ShoppingBag size={48} className="text-gold/20 mb-6" />
                  <h3 className="font-display text-xl font-bold text-white/40 mb-3">Your cart is empty</h3>
                  <p className="text-white/30 text-sm mb-8">Add some soulful coffee to get started!</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn-gold text-xs px-8 py-3"
                  >
                    <span>SHOP NOW</span>
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.option}`}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 pb-5 border-b border-white/5"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-white text-sm font-semibold leading-tight">{item.name}</h4>
                          <p className="text-white/40 text-xs mt-0.5">{item.category}</p>
                          {item.option && (
                            <span className="inline-block text-[10px] px-2 py-0.5 mt-1 text-gold/70 border border-gold/20">{item.option}</span>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.option)}
                          className="text-white/20 hover:text-red-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Qty controls */}
                        <div className="flex items-center" style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1, item.option)}
                            className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-gold hover:bg-gold/10 transition-all"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-white text-sm font-medium">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1, item.option)}
                            className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-gold hover:bg-gold/10 transition-all"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="font-display text-base font-bold text-gold">
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-gold/10" style={{ background: 'rgba(10,4,0,0.9)' }}>
                {/* Order summary */}
                <div className="space-y-2.5 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Subtotal</span>
                    <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Shipping</span>
                    <span className={shipping === 0 ? 'text-gold font-semibold' : 'text-white'}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="gold-divider" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-white">Total</span>
                    <span className="font-display text-xl font-bold text-gold">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Discount code */}
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 flex items-center gap-2 px-3 border border-white/10 focus-within:border-gold/40 transition-colors">
                    <Tag size={13} className="text-white/30" />
                    <input
                      type="text"
                      placeholder="Discount code"
                      className="flex-1 bg-transparent text-sm text-white placeholder-white/30 py-2.5 outline-none"
                    />
                  </div>
                  <button className="px-4 text-xs font-bold tracking-wider text-gold border border-gold/30 hover:bg-gold/10 transition-colors uppercase">
                    Apply
                  </button>
                </div>

                {/* Checkout button */}
                <button
                  className="w-full py-4 text-sm font-bold tracking-[0.2em] uppercase text-soul-black flex items-center justify-center gap-3 group transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C, #E8C96D, #C9A84C, #8B6914)', backgroundSize: '200% 100%' }}
                >
                  <span>CHECKOUT</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <p className="text-center text-xs text-white/25 mt-3 tracking-wider">
                  Secure checkout · Taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
