import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { useThemeStore } from './store/themeStore';
import Navbar from './components/layout/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ManageLeads from './pages/admin/ManageLeads';
import LeadDetail from './pages/admin/LeadDetail';
import ManageProjects from './pages/admin/ManageProjects';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageBlog from './pages/admin/ManageBlog';
import AdminSettings from './pages/admin/AdminSettings';

const App = () => {
  const { theme, initTheme } = useThemeStore();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    initTheme();
    // Only initialize smooth scrolling on non-admin routes to prevent conflicts with dashboard
    let lenis;
    if (!isAdminRoute) {
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
      });
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    return () => {
      if (lenis) lenis.destroy();
    };
  }, [initTheme, isAdminRoute]);

  return (
    <div className="app bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leads" element={<ManageLeads />} />
            <Route path="leads/:id" element={<LeadDetail />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="blog" element={<ManageBlog />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
