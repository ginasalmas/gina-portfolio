import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on fine pointer desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('has-custom-cursor');
    setIsVisible(true);

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .editorial-card, .interactive-hover');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 flex items-center justify-center pointer-events-none z-[9999]"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isClicking ? 0.8 : isHovered ? 1.3 : 1,
      }}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.05 }}
      style={{ width: '32px', height: '32px' }}
    >
      {/* Outer Ring */}
      <div className={`absolute inset-0 rounded-full transition-colors duration-200 ${
        isHovered 
          ? 'bg-soft-gold/15 border-2 border-soft-gold/60' 
          : 'bg-transparent border border-deep-navy/40'
      }`} />
      
      {/* Inner Precision Dot */}
      <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${
        isHovered ? 'bg-soft-gold' : 'bg-deep-navy'
      }`} />
    </motion.div>
  );
};

export default CustomCursor;
