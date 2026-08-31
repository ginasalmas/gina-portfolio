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
    <>
      {/* Small Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-soft-gold rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isClicking ? 0.5 : isHovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 450, mass: 0.2 }}
      />

      {/* Lagging Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-soft-gold/60 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isClicking ? 1.4 : isHovered ? 2.2 : 1,
          backgroundColor: isHovered ? 'rgba(197, 155, 78, 0.12)' : 'rgba(0,0,0,0)',
          borderColor: isHovered ? 'rgba(197, 155, 78, 0.9)' : 'rgba(197, 155, 78, 0.4)',
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 250, mass: 0.5 }}
      />
    </>
  );
};

export default CustomCursor;
