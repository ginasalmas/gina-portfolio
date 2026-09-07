import React from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, FileText, Award, Eye, Plus, ArrowRight, Settings, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SparkleStar } from '../../components/common/BotanicalDecorations';

const AdminDashboard = () => {
  const { projects, blogPosts, certificates, settings } = useData();

  // Get real site views from local storage
  const [siteViews, setSiteViews] = React.useState('0');
  
  React.useEffect(() => {
    const views = localStorage.getItem('gina_portfolio_views') || '0';
    setSiteViews(Number(views).toLocaleString('id-ID'));
  }, []);

  const stats = [
    { title: 'Total Portfolio Case Studies', value: projects.length, icon: FolderKanban, color: 'bg-soft-gold/20 text-soft-gold-600', link: '/admin/portfolio' },
    { title: 'Total Blog Posts', value: blogPosts.length, icon: FileText, color: 'bg-deep-navy/10 text-deep-navy', link: '/admin/blog' },
    { title: 'Total Certificates', value: certificates.length, icon: Award, color: 'bg-muted-rose-100 text-muted-rose-500', link: '/admin/certificates' },
    { title: 'Monthly Site Views', value: siteViews, icon: Eye, color: 'bg-warm-beige-300 text-deep-navy', link: '#' },
  ];

  const recentProjects = projects.slice(0, 3);
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-deep-navy/10 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-deep-navy">Welcome back, {settings.name || 'Gina'}!</h1>
          <p className="text-xs text-deep-navy/70 font-light mt-1">Manage all your portfolio content, case studies, blog articles, and settings from one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/portfolio"
            className="px-4 py-2.5 rounded-full bg-deep-navy text-warm-beige text-xs font-semibold uppercase tracking-wider hover:bg-deep-navy-800 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-soft-gold" /> New Case Study
          </Link>
          <Link
            to="/admin/blog"
            className="px-4 py-2.5 rounded-full border border-deep-navy/20 text-deep-navy text-xs font-semibold hover:bg-warm-beige-200 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-soft-gold" /> New Post
          </Link>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link key={idx} to={stat.link} className="editorial-card rounded-2xl p-6 space-y-4 hover:border-soft-gold/60 block">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-deep-navy/60">{stat.title}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-display font-bold text-deep-navy">{stat.value}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Tables: Recent Projects & Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Projects */}
        <div className="editorial-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-deep-navy/10 pb-4">
            <h2 className="text-lg font-display font-bold text-deep-navy flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-soft-gold" /> Recent Portfolio Projects
            </h2>
            <Link to="/admin/portfolio" className="text-xs font-semibold text-deep-navy hover:text-soft-gold flex items-center gap-1">
              Manage All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-warm-beige-100/60 border border-warm-beige-300">
                <div className="flex items-center gap-3">
                  <img src={p.thumbnail} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-bold text-deep-navy line-clamp-1">{p.title}</p>
                    <p className="text-[10px] text-deep-navy/60">{p.category} • {p.date}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${p.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {p.status || 'published'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className="editorial-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-deep-navy/10 pb-4">
            <h2 className="text-lg font-display font-bold text-deep-navy flex items-center gap-2">
              <FileText className="w-4 h-4 text-soft-gold" /> Recent Journal Posts
            </h2>
            <Link to="/admin/blog" className="text-xs font-semibold text-deep-navy hover:text-soft-gold flex items-center gap-1">
              Manage All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-3 rounded-xl bg-warm-beige-100/60 border border-warm-beige-300">
                <div className="flex items-center gap-3">
                  <img src={post.coverImage} alt={post.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-bold text-deep-navy line-clamp-1">{post.title}</p>
                    <p className="text-[10px] text-deep-navy/60">{post.category} • {post.publishedAt}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${post.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {post.status || 'published'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
