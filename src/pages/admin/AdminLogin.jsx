import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SparkleStar, EditorialFlourish } from '../../components/common/BotanicalDecorations';

const AdminLogin = () => {
  const [username, setUsername] = useState('kyumakuma');
  const [password, setPassword] = useState('2003Ginaaa18%');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = login(username, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-warm-beige text-deep-navy flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-12 left-12 opacity-30 pointer-events-none">
        <SparkleStar className="w-10 h-10 text-soft-gold" />
      </div>
      <div className="absolute bottom-16 right-16 opacity-30 pointer-events-none">
        <SparkleStar className="w-12 h-12 text-soft-gold" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-deep-navy text-soft-gold flex items-center justify-center shadow-lg">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-display font-bold text-deep-navy">Gina's CMS Portal</h1>
          <p className="text-xs text-deep-navy/70 font-light">Sign in to manage portfolio case studies, journal posts, certificates, and site settings.</p>
          <EditorialFlourish />
        </div>

        {/* Login Form Box */}
        <div className="editorial-card rounded-3xl p-8 bg-white shadow-editorial border border-warm-beige-300 space-y-6">
          
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-deep-navy/80 block">Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-deep-navy/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 text-sm font-medium focus:outline-none focus:border-soft-gold text-deep-navy"
                  placeholder="admin"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-deep-navy/80 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-deep-navy/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 text-sm font-medium focus:outline-none focus:border-soft-gold text-deep-navy"
                  placeholder="••••••••"
                />
              </div>
            </div>


            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-deep-navy text-warm-beige font-semibold text-xs uppercase tracking-wider hover:bg-deep-navy-800 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              Sign In To Dashboard <ArrowRight className="w-4 h-4 text-soft-gold" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
