import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Inbox, 
  Briefcase, 
  Star, 
  FileText, 
  Settings, 
  LogOut,
  Globe
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Leads', path: '/admin/leads', icon: Inbox, badge: true }, // Add logic for unread badge later
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
    { name: 'Blog', path: '/admin/blog', icon: FileText },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/admin/login');
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <motion.aside
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--bg-secondary)] border-r border-[var(--border)] z-50 flex flex-col transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-[var(--border)]">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_var(--accent-glow)]">
              N
            </div>
            <span className="font-display font-bold text-xl tracking-wide leading-none text-[var(--text-primary)]">
              NovaSpark
            </span>
            <span className="bg-[var(--accent-glow)] text-[var(--accent-primary)] text-xs px-2 py-0.5 rounded-full font-semibold ml-1">
              Admin
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] font-medium' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--accent-primary)] rounded-r-full shadow-[0_0_10px_var(--accent-glow)]"
                  />
                )}
                
                <div className="flex items-center gap-3">
                  <Icon size={20} className={isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors'} />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Profile Section */}
        <div className="p-4 border-t border-[var(--border)]">
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 mb-4 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors text-sm font-medium"
          >
            <Globe size={16} /> View Website
          </a>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-[var(--border)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-primary)] font-bold leading-none">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{user?.name || 'Admin'}</p>
                <p className="text-xs text-[var(--text-muted)] capitalize">{user?.role || 'Administrator'}</p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
