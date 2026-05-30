import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => { setScrolled(latest > 50); });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogoClick = (e) => {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      animate={(scrolled || mobileMenuOpen) ? {
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        paddingTop: '12px', paddingBottom: '12px'
      } : {
        background: 'transparent',
        backdropFilter: 'blur(0px)',
        borderBottom: '1px solid transparent',
        paddingTop: '24px', paddingBottom: '24px'
      }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" onClick={handleLogoClick}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Nova<span style={{ color: 'var(--accent-primary)' }}>Spark</span>
            </span>
          </motion.div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.path} to={link.path}
              className="relative text-sm font-medium transition-colors hover:text-[var(--accent-primary)]"
              style={{ color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
              {link.label}
              {location.pathname === link.path && (
                <motion.span layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: 'var(--accent-primary)' }} />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/contact"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white hover:scale-105 transition-transform"
            style={{ background: 'var(--accent-primary)' }}>
            Start a Project
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden w-full overflow-hidden"
          >
            <div className="container mx-auto px-6 pt-4 pb-6 flex flex-col gap-4 border-t border-[var(--border)] mt-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium py-1 transition-colors hover:text-[var(--accent-primary)]"
                  style={{
                    color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-secondary)'
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 mt-2 rounded-full text-sm font-medium text-white"
                style={{ background: 'var(--accent-primary)' }}
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
