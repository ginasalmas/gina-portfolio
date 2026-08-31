import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading process
        const timer = setTimeout(() => {
            setLoading(false);
            setTimeout(() => onComplete(), 1000); // Wait for exit animation
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1c2e] via-[#0b0d17] to-[#000000] overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
        >
            {/* Nebula Haze */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-blue-900/20 mix-blend-screen pointer-events-none" />
            {/* Background Stars (Subtle movement) */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full opacity-20"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                            y: [null, Math.random() * window.innerHeight],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            width: Math.random() * 3 + 1,
                            height: Math.random() * 3 + 1,
                        }}
                    />
                ))}
            </div>

            {/* Central Hyperspace Core */}
            <div className="relative flex items-center justify-center">
                {/* Outer Rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute border border-cyan-500/30 rounded-full"
                        style={{
                            width: 200 + i * 100,
                            height: 200 + i * 100,
                        }}
                        animate={{
                            rotate: i % 2 === 0 ? 360 : -360,
                            scale: loading ? [1, 1.05, 1] : 5, // Explode on finish
                            opacity: loading ? 0.3 : 0
                        }}
                        transition={{
                            rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
                            scale: { duration: 1.5, ease: "easeInOut" },
                            opacity: { duration: 0.5 }
                        }}
                    />
                ))}

                {/* Core Orb */}
                <motion.div
                    className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full blur-md shadow-[0_0_100px_rgba(34,211,238,0.5)] z-20 relative"
                    animate={{
                        scale: loading ? [1, 1.2, 1] : 30, // Massive Zoom into the core
                    }}
                    transition={{
                        duration: loading ? 2 : 1.2,
                        repeat: loading ? Infinity : 0,
                        ease: "easeInOut"
                    }}
                >
                    {/* Text inside Orb */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center text-white font-bold tracking-widest text-sm"
                        animate={{ opacity: loading ? 1 : 0 }}
                    >
                        INITIALIZING
                    </motion.div>
                </motion.div>
            </div>

            {/* Loading Bar */}
            <motion.div
                className="absolute bottom-20 w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
                animate={{ opacity: loading ? 1 : 0, y: loading ? 0 : 50 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="h-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.8, ease: "easeInOut" }}
                />
            </motion.div>

        </motion.div>
    );
};

export default LoadingScreen;
