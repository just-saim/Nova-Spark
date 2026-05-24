import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServicesSection from '../components/home/ServicesSection';

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', desc: 'We dive deep into your brand, audience, and goals.' },
  { step: '02', title: 'Strategy', desc: 'Crafting a customized plan to achieve maximum ROI.' },
  { step: '03', title: 'Execution', desc: 'Our expert team brings the strategy to life flawlessly.' },
  { step: '04', title: 'Optimization', desc: 'Continuous testing and tweaking for peak performance.' },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services — NovaSpark Creative Agency</title>
        <meta name="description" content="From branding and design to digital marketing and web development. Explore our comprehensive suite of creative services." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-36 pb-12 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        <div className="absolute top-20 left-0 w-96 h-96 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }} />

        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-sm font-mono tracking-widest uppercase mb-4 px-4 py-2 rounded-full"
              style={{ background: 'var(--accent-glow)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)' }}>
              ✦ EXPERTISE & SOLUTIONS
            </span>
            <h1 className="font-display mb-6" style={{ color: 'var(--text-primary)' }}>
              Everything You Need to <br />
              <span className="gradient-text">Dominate Your Market</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
              We don't just offer services; we offer solutions. Whether you're starting from scratch or scaling to the next level, we have the tools to get you there.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Grid (reusing the component) */}
      <div className="pb-10" style={{ background: 'var(--bg-primary)' }}>
        <ServicesSection />
      </div>

      {/* Our Process Section */}
      <section className="section-padding border-t" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display mb-4" style={{ color: 'var(--text-primary)' }}>How We Work</h2>
            <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--text-secondary)' }}>
              A proven 4-step framework designed to eliminate guesswork and guarantee results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl border bg-[var(--bg-primary)] hover:-translate-y-2 transition-transform duration-300"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="font-display text-4xl font-bold mb-4 opacity-20" style={{ color: 'var(--accent-primary)' }}>
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        <div className="container relative z-10 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl md:text-5xl mb-6" style={{ color: 'var(--text-primary)' }}>
              Ready to Upgrade Your <span className="gradient-text">Brand Arsenal?</span>
            </h2>
            <p className="text-xl mb-10" style={{ color: 'var(--text-secondary)' }}>
              Let's build a custom package tailored specifically to your business goals.
            </p>
            <Link to="/contact">
              <motion.button
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-semibold text-lg"
                style={{ background: 'var(--accent-primary)', boxShadow: '0 0 60px var(--accent-glow-strong)' }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              >
                Start Your Project <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
