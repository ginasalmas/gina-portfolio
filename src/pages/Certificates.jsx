import React from 'react';
import { motion } from 'framer-motion';

const Certificates = () => {
    const certs = [
        {
            title: "Google UX Design Professional Certificate",
            issuer: "Google",
            date: "2023"
        },
        {
            title: "Meta Front-End Developer",
            issuer: "Meta",
            date: "2022"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
        >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gold-300 to-purple-500">
                Certificates & Awards
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certs.map((cert, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-gold-500/50 transition-colors group">
                        <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">{cert.title}</h3>
                        <p className="text-gray-400 mt-2">{cert.issuer} • {cert.date}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Certificates;
