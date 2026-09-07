import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Sparkles, Lock } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SparkleStar, TinyFlower } from './common/BotanicalDecorations';

const Navbar = () => {
  const { settings } = useData();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home',         path: '/' },
    { name: 'Portfolio',    path: '/portfolio' },
    { name: 'Journal',      path: '/blog' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Writings',     path: '/writings' },
    { name: 'About',        path: '/about' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
        aria-hidden
      >
        <div className="h-full w-full bg-gradient-to-r from-soft-gold-400 via-soft-gold to-muted-rose" />
      </motion.div>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-paper-cream/88 backdrop-blur-2xl border-b border-warm-beige-300/60 py-2.5 shadow-editorial'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between gap-4">

          {/* ── Brand Logo ── */}
          <Link to="/" className="group flex items-center gap-2 text-deep-navy shrink-0">
            {/* Monogram Circle */}
            <motion.div
              whileHover={{ rotate: 15, scale: 1.08 }}
              transition={{ duration: 0.35 }}
              className="w-9 h-9 rounded-full bg-deep-navy flex items-center justify-center shadow-md group-hover:shadow-glow-gold transition-shadow"
            >
              <span className="text-soft-gold font-display font-bold text-sm leading-none">G</span>
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-[15px] text-deep-navy tracking-tight">
                {settings.name || 'Gina'}.
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-soft-gold-600 hidden sm:block">
                Portfolio
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav Pills ── */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-paper-cream/85 backdrop-blur-xl px-2.5 py-1.5 rounded-full border border-warm-beige-300/70 shadow-inner-warm">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 text-[11px] font-semibold tracking-wide transition-colors duration-300 rounded-full ${
                    active ? 'text-deep-navy' : 'text-deep-navy/60 hover:text-deep-navy'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-gradient-to-r from-soft-gold/20 to-soft-gold/10 border border-soft-gold/35 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* ── Action Buttons ── */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.a
              href={`mailto:${settings.email}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-deep-navy text-warm-beige hover:bg-deep-navy-800 transition-all shadow-editorial hover:shadow-glow-gold flex items-center gap-2"
            >
              <div className="relative flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 relative availability-dot" style={{ color: '#34d399' }} />
              </div>
              Let's Talk
            </motion.a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-deep-navy hover:bg-soft-gold/10 transition-colors"
            aria-label="Toggle Navigation"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-5 h-5" /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu className="w-5 h-5" /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="lg:hidden bg-paper-cream/97 backdrop-blur-2xl border-t border-warm-beige-300/60 px-5 py-5 space-y-4 shadow-2xl overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={link.path}
                      className={`block text-sm font-medium py-2.5 px-3.5 rounded-xl transition-colors ${
                        isActive(link.path)
                          ? 'bg-soft-gold/15 text-deep-navy font-semibold border border-soft-gold/30'
                          : 'text-deep-navy/70 hover:bg-warm-beige-200'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="pt-3 flex flex-col gap-2.5 border-t border-warm-beige-300/60">
                <a
                  href={`mailto:${settings.email}`}
                  className="w-full text-center py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-deep-navy text-warm-beige shadow-md"
                >
                  Let's Talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
