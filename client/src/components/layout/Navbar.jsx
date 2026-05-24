import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu } from 'lucide-react';
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
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => { setScrolled(latest > 50); });

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      animate={scrolled ? {
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
        <Link to="/">
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
    </motion.header>
  );
};

export default Navbar;
