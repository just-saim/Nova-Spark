import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { staggerContainer, fadeInUp, wordVariants } from '../../utils/animations';

const CYCLING_WORDS = ['Brands', 'Stories', 'Growth', 'Ideas', 'Futures'];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(at 40% 20%, var(--accent-glow) 0px, transparent 50%), radial-gradient(at 80% 0%, var(--bg-tertiary) 0px, transparent 50%)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 relative z-10 pt-24">
        <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" animate="visible" className="max-w-5xl mx-auto text-center">

          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-8 mx-auto">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)', color: 'var(--accent-primary)' }}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              Available for new projects
              <Sparkles size={14} />
            </span>
          </motion.div>

          <motion.div variants={fadeInUp} className="overflow-hidden mb-2 pb-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1]" style={{ color: 'var(--text-primary)' }}>We Ignite</h1>
          </motion.div>

          <motion.div variants={fadeInUp} className="overflow-hidden mb-8 flex justify-center pb-6" style={{ height: 'clamp(4rem, 10vw, 9.5rem)' }}>
            <AnimatePresence mode="wait">
              <motion.h1 key={CYCLING_WORDS[wordIndex]} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] gradient-text"
                variants={wordVariants} initial="enter" animate="center" exit="exit">
                {CYCLING_WORDS[wordIndex]}
              </motion.h1>
            </AnimatePresence>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl max-w-2xl mx-auto mb-12" style={{ color: 'var(--text-secondary)' }}>
            Full-service creative agency — Marketing, Branding, Photography, Videography & Web Development.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <motion.button
                className="group flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-lg"
                style={{ background: 'var(--accent-primary)' }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Start a Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link to="/portfolio">
              <motion.button
                className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg border hover:bg-[var(--bg-elevated)] transition-colors"
                style={{ color: 'var(--text-primary)', borderColor: 'var(--border-strong)' }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                View Our Work
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
