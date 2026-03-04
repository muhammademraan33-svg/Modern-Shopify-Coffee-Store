import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'All Coffee', href: '/shop' },
    { label: 'Single Origins', href: '/shop?cat=origins' },
    { label: 'Blends', href: '/shop?cat=blends' },
    { label: 'Organic Coffees', href: '/shop?cat=organic' },
    { label: 'Grab & Go Lattes', href: '/grab-and-go' },
    { label: 'SoulStar Sodas', href: '/grab-and-go#sodas' },
    { label: 'Protein Powerballs', href: '/grab-and-go#powerballs' },
  ],
  Subscribe: [
    { label: 'Soul Starter Plan', href: '/subscriptions' },
    { label: 'Reserve Collection', href: '/subscriptions' },
    { label: 'Connoisseur Plan', href: '/subscriptions' },
    { label: 'Manage Subscription', href: '/account' },
    { label: 'Gift a Subscription', href: '/subscriptions#gift' },
  ],
  Rewards: [
    { label: 'Join Rewards Club', href: '/rewards' },
    { label: 'How It Works', href: '/rewards#how' },
    { label: 'Earn Points', href: '/rewards#earn' },
    { label: 'Redeem Rewards', href: '/rewards#redeem' },
    { label: 'VIP Tiers', href: '/rewards#tiers' },
  ],
  Company: [
    { label: 'Our Story', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Store Locations', href: '/contact#locations' },
    { label: 'Wholesale', href: '/contact#wholesale' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
};

const social = [
  { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { Icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(160deg, #050200 0%, #0A0400 100%)' }}>
      {/* Gold top border */}
      <div className="gold-divider" />

      {/* Main footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-3">
            {/* Logo */}
            <Link to="/" className="flex flex-col items-start group mb-6">
              <svg width="32" height="32" viewBox="0 0 50 50" className="mb-2">
                <polygon
                  points="25,3 30.6,18.2 47,18.2 33.8,28.4 38.9,43.7 25,33.5 11.1,43.7 16.2,28.4 3,18.2 19.4,18.2"
                  fill="url(#footerStarGrad)"
                />
                <defs>
                  <linearGradient id="footerStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B6914" />
                    <stop offset="50%" stopColor="#C9A84C" />
                    <stop offset="100%" stopColor="#F5D98B" />
                  </linearGradient>
                </defs>
              </svg>
              <span
                className="font-display font-black text-2xl tracking-[0.25em] leading-none"
                style={{ background: 'linear-gradient(135deg, #8B6914, #C9A84C, #F5D98B, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                SOULSTAR
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="h-px w-6 bg-gold/50" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-gold/60 uppercase">Reserve</span>
                <span className="h-px w-6 bg-gold/50" />
              </div>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Specialty coffee roasted to perfection. Sourced from the world&apos;s finest origins. Coffee that&apos;s good for the soul.
            </p>

            {/* Contact */}
            <div className="space-y-2.5 mb-6">
              <a href="mailto:hello@soulstarreserve.com" className="flex items-center gap-2.5 text-white/50 hover:text-gold text-sm transition-colors duration-200 group">
                <Mail size={14} className="text-gold/60 group-hover:text-gold" />
                hello@soulstarreserve.com
              </a>
              <a href="tel:+15555550100" className="flex items-center gap-2.5 text-white/50 hover:text-gold text-sm transition-colors duration-200 group">
                <Phone size={14} className="text-gold/60 group-hover:text-gold" />
                (555) 555-0100
              </a>
              <div className="flex items-start gap-2.5 text-white/50 text-sm">
                <MapPin size={14} className="text-gold/60 mt-0.5 flex-shrink-0" />
                <span>123 Coffee Lane, Soulville, TX 78701</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {social.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-gold/20 text-white/50 hover:border-gold hover:text-gold transition-all duration-300 group"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-xs font-black tracking-[0.3em] text-gold/80 uppercase mb-5">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-white/45 hover:text-gold transition-colors duration-200 flex items-center gap-1 group"
                      >
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="gold-divider opacity-30" />

      {/* Bottom bar */}
      <div className="section-container py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wider">
            © {new Date().getFullYear()} SoulStar Reserve. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((item) => (
              <a key={item} href="#" className="text-xs text-white/30 hover:text-gold/60 transition-colors duration-200 tracking-wide">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-white/20 text-xs">
            <span>Powered by</span>
            <span className="text-white/40 font-semibold">Shopify</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
