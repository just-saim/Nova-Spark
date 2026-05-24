import { motion } from 'framer-motion';
import { Palette, TrendingUp, Globe, Camera, Film, Target } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const SERVICES = [
  { icon: Palette, title: 'Branding & Design', desc: 'Logo, brand identity, visual language — build your complete brand from one place', color: '#FF4D00' },
  { icon: TrendingUp, title: 'Social Media Marketing', desc: 'Instagram, Facebook, YouTube — content, ads, and growth strategy', color: '#4DFFB8' },
  { icon: Globe, title: 'Website Development', desc: 'Fast, modern, mobile-first websites that convert', color: '#4D9FFF' },
  { icon: Camera, title: 'Photography', desc: 'Product, corporate, event — professional photography', color: '#FF4D9F' },
  { icon: Film, title: 'Videography & Editing', desc: 'Brand films, reels, ads — cinematic quality video production', color: '#FFB84D' },
  { icon: Target, title: 'Paid Advertising', desc: 'Google Ads and Meta Ads — maximum return on every dollar', color: '#9F4DFF' }
];

const ServicesSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-6">
        <motion.div ref={ref} variants={staggerContainer()} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} className="text-center mb-16">
          <motion.span variants={fadeInUp} className="inline-block text-sm font-mono tracking-widest uppercase mb-4" style={{ color: 'var(--accent-primary)' }}>What We Do</motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-bold mb-4">Our Services</motion.h2>
          <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-lg text-[var(--text-secondary)]">Everything in one place — from design to digital marketing</motion.p>
        </motion.div>

        <motion.div variants={staggerContainer(0.1)} initial="hidden" animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div key={i} variants={fadeInUp} whileHover={{ y: -8 }}
              className="group relative p-8 rounded-2xl border cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl"
              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
              <div className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: service.color }} />
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}>
                <service.icon size={24} style={{ color: service.color }} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{service.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{service.desc}</p>
              <div className="mt-6 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ color: service.color }}>
                Explore Service &rarr;
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
