import React, { useEffect, useRef } from 'react';

const GalaxyBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrameId;

        const setSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        setSize();
        window.addEventListener('resize', setSize);

        // Star properties
        const stars = [];
        const starCount = 300;

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2,
                opacity: Math.random(),
                speed: Math.random() * 0.05,
                change: Math.random() * 0.02,
                color: Math.random() > 0.8 ? '#ffc51a' : '#ffffff' // 20% gold stars
            });
        }

        // Shooting stars
        let shootingStars = [];
        const createShootingStar = () => {
            if (Math.random() < 0.01 && shootingStars.length < 3) {
                shootingStars.push({
                    x: Math.random() * width,
                    y: 0,
                    length: Math.random() * 80 + 10,
                    speed: Math.random() * 10 + 5,
                    size: Math.random() * 2,
                    angle: Math.PI / 4 // 45 degrees
                });
            }
        };

        const animate = () => {
            ctx.fillStyle = '#050810';
            ctx.fillRect(0, 0, width, height);

            // Static/Twinkling Stars
            stars.forEach(star => {
                // Twinkle
                star.opacity += star.change;
                if (star.opacity > 1 || star.opacity < 0.1) {
                    star.change = -star.change;
                }

                // Slight movement
                star.y -= star.speed;
                if (star.y < 0) star.y = height;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = star.color; // Use star globalAlpha for opacity? 
                ctx.globalAlpha = Math.max(0, Math.min(1, star.opacity));
                ctx.fill();
                ctx.globalAlpha = 1.0;
            });

            // Gradient Nebulas (Static for atmosphere)
            const gradient1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 0, width * 0.2, height * 0.3, width * 0.5);
            gradient1.addColorStop(0, 'rgba(88, 28, 135, 0.08)'); // Purple
            gradient1.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient1;
            ctx.fillRect(0, 0, width, height);

            const gradient2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 0, width * 0.8, height * 0.7, width * 0.5);
            gradient2.addColorStop(0, 'rgba(230, 172, 0, 0.03)'); // Gold
            gradient2.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient2;
            ctx.fillRect(0, 0, width, height);

            // Shooting Stars
            createShootingStar();
            shootingStars.forEach((star, index) => {
                star.x += star.speed * Math.cos(star.angle);
                star.y += star.speed * Math.sin(star.angle);

                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(star.x - star.length * Math.cos(star.angle), star.y - star.length * Math.sin(star.angle));
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.lineWidth = star.size;
                ctx.stroke();

                if (star.x > width || star.y > height) {
                    shootingStars.splice(index, 1);
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default GalaxyBackground;
