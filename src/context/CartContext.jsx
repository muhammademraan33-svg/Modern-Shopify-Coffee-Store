import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) => i.id === action.payload.id && i.option === action.payload.option
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id && i.option === action.payload.option
              ? { ...i, qty: i.qty + (action.payload.qty || 1) }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: action.payload.qty || 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => !(i.id === action.payload.id && i.option === action.payload.option)) };
    case 'UPDATE_QTY':
      if (action.payload.qty < 1)
        return { ...state, items: state.items.filter((i) => !(i.id === action.payload.id && i.option === action.payload.option)) };
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id && i.option === action.payload.option ? { ...i, qty: action.payload.qty } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

const initialState = {
  items: JSON.parse(localStorage.getItem('soulstar-cart') || '[]'),
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useState(
    () => JSON.parse(localStorage.getItem('soulstar-wishlist') || '[]')
  );
  const [points, setPoints] = useState(
    () => parseInt(localStorage.getItem('soulstar-points') || '250')
  );

  useEffect(() => {
    localStorage.setItem('soulstar-cart', JSON.stringify(state.items));
  }, [state.items]);

  useEffect(() => {
    localStorage.setItem('soulstar-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, option = null) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, option } });
    setIsOpen(true);
  };

  const removeFromCart = (id, option = null) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, option } });
  };

  const updateQty = (id, qty, option = null) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty, option } });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const isWishlisted = (id) => wishlist.includes(id);

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = state.items.reduce((sum, i) => sum + i.qty, 0);

  const earnPoints = (amount) => {
    const earned = Math.floor(amount * 10);
    setPoints((p) => {
      const newPoints = p + earned;
      localStorage.setItem('soulstar-points', newPoints.toString());
      return newPoints;
    });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        subtotal,
        itemCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        points,
        earnPoints,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
