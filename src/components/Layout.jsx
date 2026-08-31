import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import AestheticBackground from './AestheticBackground';
import CustomCursor from './CustomCursor';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-warm-beige text-deep-navy font-sans relative overflow-x-hidden">
      <AestheticBackground />
      <CustomCursor />
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex-grow pt-24"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Layout;

