import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const STATS = [
  { number: 200, suffix: '+', label: 'Projects Completed', desc: 'Across all categories' },
  { number: 50, suffix: '+', label: 'Happy Clients', desc: 'Pan India & beyond' },
  { number: 5, suffix: '', label: 'Years Experience', desc: 'In creative industry' },
  { number: 98, suffix: '%', label: 'Client Satisfaction', desc: 'Based on reviews' }
];

const AnimatedCounter = ({ target, suffix, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount(Math.min(Math.round(increment * step), target));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span>{count}{suffix}</span>;
};

const StatsSection = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <section ref={ref} className="py-20 border-y" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-5xl lg:text-6xl font-display font-bold mb-2" style={{ color: 'var(--accent-primary)' }}>
                <AnimatedCounter target={stat.number} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <p className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>{stat.label}</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
