import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

// Context Providers
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';

// Public Layout & Pages
import Layout from './components/Layout';
import Home from './pages/Home';
import PortfolioPage from './pages/PortfolioPage';
import PortfolioDetail from './pages/PortfolioDetail';
import JournalPage from './pages/JournalPage';
import JournalDetail from './pages/JournalDetail';
import AboutPage from './pages/AboutPage';
import CertificatesPage from './pages/CertificatesPage';
import AchievementsPage from './pages/AchievementsPage';

// Admin CMS Components & Pages
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPortfolio from './pages/admin/AdminPortfolio';
import AdminBlog from './pages/admin/AdminBlog';
import AdminCertificates from './pages/admin/AdminCertificates';
import AdminAchievements from './pages/admin/AdminAchievements';
import AdminExperience from './pages/admin/AdminExperience';
import AdminSkills from './pages/admin/AdminSkills';
import AdminSettings from './pages/admin/AdminSettings';

// Scroll to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Track site views
    if (!pathname.startsWith('/admin')) {
      const views = parseInt(localStorage.getItem('gina_portfolio_views') || '0', 10);
      localStorage.setItem('gina_portfolio_views', (views + 1).toString());
    }
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="portfolio/:id" element={<PortfolioDetail />} />
              <Route path="blog" element={<JournalPage />} />
              <Route path="blog/:id" element={<JournalDetail />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="certificates" element={<CertificatesPage />} />
              <Route path="achievements" element={<AchievementsPage />} />
            </Route>

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin CMS Routes */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="portfolio" element={<AdminPortfolio />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="certificates" element={<AdminCertificates />} />
                <Route path="achievements" element={<AdminAchievements />} />
                <Route path="experience" element={<AdminExperience />} />
                <Route path="skills" element={<AdminSkills />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </DataProvider>
      <Analytics />
    </AuthProvider>
  );
}

export default App;
