import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-[52px] h-[28px] rounded-full border border-[var(--border)] bg-[var(--bg-tertiary)] overflow-hidden"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute inset-0.5 rounded-full"
        style={{ background: isDark ? 'linear-gradient(135deg, #1A1A24, #0A0A0F)' : 'linear-gradient(135deg, #FFF9F0, #FFF0E0)' }}
      />
      <motion.div
        className="absolute top-[3px] w-[22px] h-[22px] rounded-full flex items-center justify-center"
        style={{ background: 'var(--accent-primary)' }}
        animate={{ x: isDark ? 3 : 25 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div key="moon" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
              <Moon size={12} color="white" />
            </motion.div>
          ) : (
            <motion.div key="sun" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
              <Sun size={12} color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
