import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
    {
        id: 1,
        title: "The Future of UI/UX: Beyond Screens",
        excerpt: "Exploring how haptic feedback and spatial computing are redefining user interfaces in the next decade.",
        date: "Oct 24, 2025",
        author: "Gina Salma",
        category: "Design",
        tags: ["UI/UX", "Future Tech", "Spatial"],
        readTime: "5 min read",
        image: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)" // Placeholder gradient
    },
    {
        id: 2,
        title: "Optimizing React Applications for Scale",
        excerpt: "Best practices for state management, code splitting, and keeping your bundle size low when building large apps.",
        date: "Sep 15, 2025",
        author: "Gina Salma",
        category: "Development",
        tags: ["React", "Performance", "Coding"],
        readTime: "8 min read",
        image: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
    },
    {
        id: 3,
        title: "My Journey Learning Rust for WebAssembly",
        excerpt: "Why I decided to pick up Rust and how it complements my frontend skills for high-performance tasks.",
        date: "Aug 02, 2025",
        author: "Gina Salma",
        category: "Personal",
        tags: ["Learning", "Rust", "WebAssembly"],
        readTime: "6 min read",
        image: "linear-gradient(135deg, #422006 0%, #a16207 100%)"
    }
];

const categories = ["All", "Design", "Development", "Personal"];

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="py-20 min-h-screen">
            <div className="max-w-6xl mx-auto px-4">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-purple-400 mb-6">
                        Insights & Thoughts
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Sharing my experiences in design, code, and everything in between.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md"
                >
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                                        ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20'
                                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-gold-500/50 transition"
                        />
                    </div>
                </motion.div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex flex-col h-full bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl overflow-hidden hover:border-gold-500/30 transition duration-300 hover:shadow-2xl hover:shadow-black/50"
                        >
                            {/* Image Placeholder */}
                            <div
                                className="h-48 w-full relative overflow-hidden"
                                style={{ background: post.image }}
                            >
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-500" />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 text-xs font-bold bg-black/50 backdrop-blur-md text-white rounded-full border border-white/10">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                                    <span>{post.readTime}</span>
                                </div>

                                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition leading-tight">
                                    {post.title}
                                </h2>

                                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500" />
                                        <span className="text-xs text-gray-300 font-medium">{post.author}</span>
                                    </div>
                                    <Link
                                        to={`/blog/${post.id}`}
                                        className="text-gold-400 hover:text-white text-sm font-medium flex items-center gap-1 transition"
                                    >
                                        Read <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p>No articles found matching your criteria.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Blog;
