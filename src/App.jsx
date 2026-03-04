import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Subscriptions from './pages/Subscriptions';
import GrabAndGo from './pages/GrabAndGo';
import Rewards from './pages/Rewards';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
          },
        }}
      />

      {/* Cart drawer (global) */}
      <CartDrawer />

      {/* Announcement bar */}
      <AnnouncementBar />

      {/* Header */}
      <Header />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/grab-and-go" element={<GrabAndGo />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* Catch-all → 404 inline */}
        <Route
          path="*"
          element={
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
              <div className="text-6xl mb-6">☕</div>
              <h1 className="font-display text-5xl font-bold text-gold mb-4">404</h1>
              <p className="text-white/50 text-lg mb-8">This page must be lost in the coffee beans...</p>
              <a href="/" className="btn-gold px-8 py-3 text-sm">
                <span>BACK HOME</span>
              </a>
            </div>
          }
        />
      </Routes>

      {/* Footer */}
      <Footer />
    </>
  );
}
