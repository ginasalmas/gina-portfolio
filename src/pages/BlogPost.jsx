import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Calendar, Tag, Share2 } from 'lucide-react';

const BlogPost = () => {
    const { id } = useParams();

    // In a real app, fetch data based on ID
    const post = {
        title: "The Future of UI/UX: Beyond Screens",
        date: "Oct 24, 2025",
        author: "Gina Salma",
        category: "Design",
        content: `
            <p>The interface of the future isn't a screen—it's the world around us. With the rise of spatial computing and advanced haptics, we are moving away from flat glass rectangles into an era of immersive, tangible digital experiences.</p>
            
            <h3>The End of "Tap to Click"</h3>
            <p>For decades, our primary interaction model has been 2D. We move a mouse, we tap a screen. But humans are 3D creatures. We grab, we push, we gesture. Spatial UI aims to bring these natural interactions into the digital realm.</p>

            <h3>Why Typography Matters More Than Ever</h3>
            <p>In 3D space, legibility becomes a complex challenge. Text isn't just sitting on a flat white background anymore; it's floating in mid-air, potentially against a busy real-world backdrop. Contrast, weight, and motion are critical.</p>

            <blockquote>
                "The best interface is no interface. It's an extension of your intent."
            </blockquote>

            <h3>Conclusion</h3>
            <p>As designers, we must start thinking outside the frame. The constraints of the browser window are dissolving. Are you ready?</p>
        `
    };

    return (
        <article className="min-h-screen py-20 relative">
            {/* Scroll Progress Bar (Optional Idea) */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-3xl mx-auto px-4"
            >
                {/* Back Button */}
                <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-400 transition mb-8 group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Articles
                </Link>

                {/* Header */}
                <header className="mb-12 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-bold uppercase tracking-wider mb-4 border border-gold-500/20">
                        {post.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-gray-400 text-sm border-y border-white/10 py-6">
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-purple-400" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-cyan-400" />
                            <span>{post.date}</span>
                        </div>
                    </div>
                </header>

                {/* Cover Image Placeholder */}
                <div className="w-full h-64 md:h-96 rounded-3xl bg-gradient-to-r from-purple-900 via-galaxy-800 to-indigo-900 mb-12 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                    <span className="text-white/20 text-lg font-mono">Article Cover Image</span>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Footer / Share */}
                <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                    <h4 className="text-white font-bold">Share this article</h4>
                    <div className="flex gap-4">
                        <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </article>
    );
};

export default BlogPost;
