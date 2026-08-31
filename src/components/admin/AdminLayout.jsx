import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  Award, 
  Trophy, 
  BookOpen, 
  Briefcase, 
  Wrench, 
  Settings, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { SparkleStar } from '../common/BotanicalDecorations';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const { settings } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Portfolio CMS', path: '/admin/portfolio', icon: FolderKanban },
    { name: 'Blog / Journal', path: '/admin/blog', icon: FileText },
    { name: 'Certificates', path: '/admin/certificates', icon: Award },
    { name: 'Achievements', path: '/admin/achievements', icon: Trophy },
    { name: 'Writings', path: '/admin/writings', icon: BookOpen },
    { name: 'Experience', path: '/admin/experience', icon: Briefcase },
    { name: 'Skills & Tools', path: '/admin/skills', icon: Wrench },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen flex bg-deep-navy-950 text-warm-beige font-sans">
      
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-deep-navy border-r border-warm-beige/10 p-6 flex-shrink-0 justify-between">
        
        <div className="space-y-8">
          {/* Admin Header Logo */}
          <div className="flex items-center justify-between pb-6 border-b border-warm-beige/10">
            <Link to="/admin" className="flex items-center gap-2 font-display text-xl font-bold text-warm-beige">
              <span>{settings.name || 'Gina'} Studio</span>
              <SparkleStar className="w-4 h-4 text-soft-gold" />
            </Link>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-soft-gold text-deep-navy uppercase">CMS</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-soft-gold text-deep-navy shadow-md font-bold'
                      : 'text-warm-beige/70 hover:bg-warm-beige/5 hover:text-warm-beige'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-deep-navy' : 'text-soft-gold'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: User Profile & Public Site Link */}
        <div className="pt-6 border-t border-warm-beige/10 space-y-4">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-warm-beige/20 text-xs font-semibold hover:bg-warm-beige/10 transition-colors text-warm-beige"
          >
            <ExternalLink className="w-3.5 h-3.5 text-soft-gold" /> View Live Public Site
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-soft-gold text-deep-navy font-bold text-xs flex items-center justify-center">
                {(settings.name || 'G')[0]}
              </div>
              <div className="text-xs">
                <p className="font-semibold text-warm-beige">{user?.username || 'Admin'}</p>
                <p className="text-[10px] text-warm-beige/50">Content Manager</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-warm-beige/50 hover:text-rose-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Mobile */}
        <header className="lg:hidden bg-deep-navy border-b border-warm-beige/10 px-6 py-4 flex items-center justify-between">
          <Link to="/admin" className="font-display font-bold text-lg text-warm-beige flex items-center gap-1.5">
            <span>{settings.name || 'Gina'} Admin</span>
            <SparkleStar className="w-3.5 h-3.5 text-soft-gold" />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-warm-beige focus:outline-none"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden bg-deep-navy border-b border-warm-beige/10 px-6 py-6 space-y-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold ${
                      isActive(item.path) ? 'bg-soft-gold text-deep-navy' : 'text-warm-beige/70'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-warm-beige/10 flex justify-between items-center">
              <Link to="/" target="_blank" className="text-xs text-soft-gold flex items-center gap-1">
                View Site <ExternalLink className="w-3 h-3" />
              </Link>
              <button onClick={handleLogout} className="text-xs text-rose-400 flex items-center gap-1">
                Logout <LogOut className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Page Content View */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-warm-beige text-deep-navy">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
