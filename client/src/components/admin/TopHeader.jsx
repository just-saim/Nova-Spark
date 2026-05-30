import { useState } from 'react';
import { Menu, Search, Bell, Sun, Moon, User } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';

const TopHeader = ({ setIsMobileOpen }) => {
  const { theme, toggleTheme } = useThemeStore();
  const { user } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="h-20 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border)] sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
      
      {/* Left: Mobile Menu & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="relative hidden md:block max-w-md w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input 
            type="text" 
            placeholder="Search leads, projects, blog..." 
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full py-2 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] rounded-full transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[var(--bg-primary)]"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative ml-2">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-1 pl-2 pr-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full hover:border-[var(--accent-primary)] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[var(--accent-glow)] flex items-center justify-center text-[var(--accent-primary)] font-bold text-xs">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <span className="text-sm font-medium text-[var(--text-primary)] hidden md:block">
              {user?.name?.split(' ')[0] || 'Admin'}
            </span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-[var(--border)] mb-2">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{user?.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{user?.email}</p>
              </div>
              <a href="/admin/settings" className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--accent-primary)]">
                Profile Settings
              </a>
              <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
