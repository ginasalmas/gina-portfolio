import React, { useEffect, useRef } from 'react';

const AestheticBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId;

    // Mouse tracking for ambient glow interaction
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Particle system (Golden Dust & Botanical Petals)
    const particlesCount = Math.min(60, Math.floor((width * height) / 20000));
    const particles = [];

    const colors = [
      'rgba(197, 155, 78, 0.4)', // Soft Gold
      'rgba(122, 139, 123, 0.35)', // Botanical Sage
      'rgba(196, 131, 119, 0.35)', // Muted Rose
      'rgba(240, 232, 220, 0.6)', // Warm Beige Highlight
    ];

    for (let i = 0; i < particlesCount; i++) {
      const isPetal = i % 3 === 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isPetal ? Math.random() * 4 + 2 : Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.3 - 0.1, // Gently float upwards
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        isPetal,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const animate = () => {
      // Smooth interpolation for ambient glow movement
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Background Meshes
      const radGrad1 = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, Math.max(width, height) * 0.4);
      radGrad1.addColorStop(0, 'rgba(197, 155, 78, 0.06)');
      radGrad1.addColorStop(0.5, 'rgba(122, 139, 123, 0.03)');
      radGrad1.addColorStop(1, 'rgba(240, 232, 220, 0)');
      ctx.fillStyle = radGrad1;
      ctx.fillRect(0, 0, width, height);

      // Top corner botanical accent glow
      const cornerGrad = ctx.createRadialGradient(width * 0.85, height * 0.15, 0, width * 0.85, height * 0.15, 400);
      cornerGrad.addColorStop(0, 'rgba(196, 131, 119, 0.07)');
      cornerGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = cornerGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Floating Dust & Petals
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Wrap around boundaries smoothly
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.isPetal) {
          // Draw leaf/petal path
          ctx.beginPath();
          ctx.moveTo(0, -p.radius * 2);
          ctx.quadraticCurveTo(p.radius * 1.5, 0, 0, p.radius * 2);
          ctx.quadraticCurveTo(-p.radius * 1.5, 0, 0, -p.radius * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
        } else {
          // Draw soft glowing circle
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 transition-opacity duration-1000"
    />
  );
};

export default AestheticBackground;
