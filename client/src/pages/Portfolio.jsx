// pages/Portfolio.jsx — COMPLETE WITH REAL SAMPLE PROJECTS

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, X, ArrowRight, Eye, Shirt, Coffee, Monitor, Activity, Palette, Building, Leaf, HeartPulse, Box, ImageIcon, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── SAMPLE PORTFOLIO DATA ────────────────────────────────────

const SAMPLE_PROJECTS = [
  {
    id: 1, slug: 'zara-boutique-branding',
    title: 'Zara Boutique',
    category: 'branding',
    client: 'Zara Fashion Store, Mumbai',
    thumbnail: null,
    color: '#FF4D9F',
    icon: Shirt,
    tags: ['Logo Design', 'Brand Identity', 'Packaging'],
    shortDesc: 'A complete brand overhaul for a premium fashion boutique in Mumbai. Redesigned the entire identity from logos to bags.',
    results: 'A 40% increase in walk-ins after launch, and Instagram followers grew from 0 to 8K in 3 months.',
    featured: true
  },
  {
    id: 2, slug: 'spice-route-restaurant',
    title: 'Spice Route Restaurant',
    category: 'photography',
    client: 'Spice Route, Delhi',
    thumbnail: null,
    color: '#FF8C42',
    icon: Coffee,
    tags: ['Food Photography', 'Menu Design', 'Social Content'],
    shortDesc: 'High-end food photography and social media content for a fine dining restaurant in Delhi. Every dish was presented like a piece of art.',
    results: 'Social media engagement increased by 3x, and online reservations went up by 60%.',
    featured: true
  },
  {
    id: 3, slug: 'techflow-solutions-website',
    title: 'TechFlow Solutions',
    category: 'web',
    client: 'TechFlow IT Services, Bangalore',
    thumbnail: null,
    color: '#4D9FFF',
    icon: Monitor,
    tags: ['React Website', 'UI/UX Design', 'SEO'],
    shortDesc: 'A modern, fast-loading website for an IT company in Bangalore. Converted complex services into a simple, attractive UI.',
    results: 'Bounce rate dropped from 70% to 35%, and lead form submissions increased by 4x.',
    featured: true
  },
  {
    id: 4, slug: 'royal-fitness-campaign',
    title: 'Royal Fitness Club',
    category: 'marketing',
    client: 'Royal Fitness, Pune',
    thumbnail: null,
    color: '#4DFFB8',
    icon: Activity,
    tags: ['Meta Ads', 'Google Ads', 'Content Strategy'],
    shortDesc: 'A 3-month aggressive digital marketing campaign for a gym chain in Pune. Built a profitable paid acquisition channel from zero budget.',
    results: 'Monthly new memberships grew from 25 to 180. Ad spend ROI reached 420%.',
    featured: false
  },
  {
    id: 5, slug: 'mehendi-by-sara-brand',
    title: 'Mehendi by Sara',
    category: 'branding',
    client: 'Sara Khan, Hyderabad',
    thumbnail: null,
    color: '#FFB84D',
    icon: Palette,
    tags: ['Logo', 'Instagram Branding', 'Portfolio Book'],
    shortDesc: 'Created a personal brand for a freelance henna artist. Presented traditional art with a modern aesthetic.',
    results: 'Booking requests increased by 5x. Clients started accepting premium pricing.',
    featured: false
  },
  {
    id: 6, slug: 'urban-stays-brand-film',
    title: 'Urban Stays',
    category: 'videography',
    client: 'Urban Stays Hospitality, Goa',
    thumbnail: null,
    color: '#9F4DFF',
    icon: Building,
    tags: ['Brand Film', 'Drone Footage', 'Video Editing'],
    shortDesc: 'A cinematic brand film for a boutique hotel in Goa. Drone shots, interior walkthroughs, guest experience — all packed into a 2-minute masterpiece.',
    results: 'The film reached 50K+ views on YouTube. Direct bookings increased by 35%.',
    featured: true
  },
  {
    id: 7, slug: 'freshbite-food-startup',
    title: 'FreshBite',
    category: 'web',
    client: 'FreshBite Delivery, Chennai',
    thumbnail: null,
    color: '#FF4D00',
    icon: Leaf,
    tags: ['E-commerce', 'Mobile App UI', 'Branding'],
    shortDesc: 'End-to-end digital presence for a healthy food delivery startup in Chennai. Built everything from App UI design to the website.',
    results: '500+ orders in the launch week. App rating of 4.8/5 on the Play Store.',
    featured: false
  },
  {
    id: 8, slug: 'dr-sharma-clinic-marketing',
    title: 'Dr. Sharma Clinic',
    category: 'marketing',
    client: 'Dr. Rahul Sharma, Jaipur',
    thumbnail: null,
    color: '#4DFFB8',
    icon: HeartPulse,
    tags: ['Google Ads', 'Local SEO', 'Social Media'],
    shortDesc: 'A complete digital marketing setup for a dermatologist in Jaipur. Started acquiring local patients through online channels.',
    results: 'Monthly patient inquiries grew from 0 to 120+. Reached page 1 in Google rankings.',
    featured: false
  },
  {
    id: 9, slug: 'craftwood-furniture-photography',
    title: 'CraftWood Furniture',
    category: 'photography',
    client: 'CraftWood, Ahmedabad',
    thumbnail: null,
    color: '#FF8C42',
    icon: Box,
    tags: ['Product Photography', 'Lifestyle Shoots', 'Catalogue'],
    shortDesc: 'Complete product catalogue photography for a premium furniture brand in Ahmedabad. Shot 50+ products in an aspirational lifestyle context.',
    results: 'E-commerce conversion rate increased from 1.2% to 4.8%. Returns were reduced by 40%.',
    featured: false
  },
];

const CATEGORIES = [
  { value: 'all', label: 'All Work', count: SAMPLE_PROJECTS.length },
  { value: 'branding', label: 'Branding', count: SAMPLE_PROJECTS.filter(p => p.category === 'branding').length },
  { value: 'web', label: 'Web Dev', count: SAMPLE_PROJECTS.filter(p => p.category === 'web').length },
  { value: 'photography', label: 'Photography', count: SAMPLE_PROJECTS.filter(p => p.category === 'photography').length },
  { value: 'videography', label: 'Video', count: SAMPLE_PROJECTS.filter(p => p.category === 'videography').length },
  { value: 'marketing', label: 'Marketing', count: SAMPLE_PROJECTS.filter(p => p.category === 'marketing').length },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeCategory === 'all'
    ? SAMPLE_PROJECTS
    : SAMPLE_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Our Work — NovaSpark Creative Agency Portfolio</title>
        <meta name="description" content="200+ projects across branding, web development, photography, videography, and digital marketing. Real clients, real results, real impact." />
      </Helmet>

      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }} />

        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-sm font-mono tracking-widest uppercase mb-4 px-4 py-2 rounded-full"
              style={{ background: 'var(--accent-glow)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)' }}>
              ✦ 200+ Projects Delivered
            </span>
            <h1 className="font-display mb-6" style={{ color: 'var(--text-primary)' }}>
              Our Work Speaks<br />
              <span className="gradient-text">Louder Than Words</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
              Every project solves a problem, ignites a brand. Let's look at some memorable work.
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Click any project to see the full case study
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-[57px] z-40 py-4 border-b" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', transform: 'translate3d(0,0,0)' }}>
        <div className="container flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap"
              style={{
                background: activeCategory === cat.value ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: activeCategory === cat.value ? 'white' : 'var(--text-secondary)',
                border: `1px solid ${activeCategory === cat.value ? 'var(--accent-primary)' : 'var(--border)'}`
              }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
              <span className="text-xs px-1.5 py-0.5 rounded-full"
                style={{ background: activeCategory === cat.value ? 'rgba(255,255,255,0.2)' : 'var(--bg-tertiary)', color: 'inherit' }}>
                {cat.count}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} onOpen={() => setSelectedProject(project)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl mb-4" style={{ color: 'var(--text-primary)' }}>
              Your Brand is Next
            </h2>
            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
              We want to build your success story just like these projects. Shall we talk?
            </p>
            <Link to="/contact">
              <motion.button
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold"
                style={{ background: 'var(--accent-primary)', boxShadow: '0 0 40px var(--accent-glow-strong)' }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              >
                Start Your Project <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

// ─── PROJECT CARD ─────────────────────────────────────────────
const ProjectCard = ({ project, onOpen }) => (
  <motion.div
    className="group relative overflow-hidden rounded-2xl border cursor-pointer"
    style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
    whileHover={{ y: -8, borderColor: project.color }}
    transition={{ duration: 0.3 }}
    onClick={onOpen}
  >
    {/* Thumbnail / Placeholder */}
    <div className="relative overflow-hidden aspect-[4/3] flex items-center justify-center"
      style={{ background: `${project.color}15` }}>
      <motion.div
        className="flex items-center justify-center"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <project.icon size={80} color={project.color} strokeWidth={1.5} />
      </motion.div>

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
          style={{ background: 'var(--accent-primary)', color: 'white' }}>
          <Star size={12} fill="currentColor" /> Featured
        </div>
      )}

      {/* Category badge */}
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono uppercase"
        style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}>
        {project.category}
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{ background: 'rgba(0,0,0,0.7)' }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white"
          style={{ background: project.color }}>
          <Eye size={16} /> View Case Study
        </div>
      </motion.div>
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
        {project.title}
      </h3>
      <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{project.client}</p>
      <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
        {project.shortDesc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Results highlight */}
      <div className="pt-4 border-t flex items-center gap-2" style={{ borderColor: 'var(--border)' }}>
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: project.color }} />
        <p className="text-xs font-medium line-clamp-1" style={{ color: project.color }}>
          {project.results}
        </p>
      </div>
    </div>
  </motion.div>
);

// ─── PROJECT MODAL ────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => (
  <>
    {/* Backdrop */}
    <motion.div
      className="fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    />

    {/* Modal */}
    <motion.div
      className="fixed inset-4 md:inset-10 z-50 overflow-y-auto rounded-3xl"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 40 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}
      >
        <X size={18} style={{ color: 'var(--text-primary)' }} />
      </button>

      <div className="p-8 md:p-12">
        {/* Header */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${project.color}15` }}>
            <project.icon size={40} color={project.color} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono uppercase px-3 py-1 rounded-full"
                style={{ background: `${project.color}20`, color: project.color }}>
                {project.category}
              </span>
              {project.featured && <span className="text-xs px-3 py-1 rounded-full bg-[var(--accent-primary)] text-white flex items-center gap-1"><Star size={12} fill="currentColor" /> Featured</span>}
            </div>
            <h2 className="font-display text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{project.client}</p>
          </div>
        </div>

        {/* Image placeholder */}
        <div className="w-full aspect-video rounded-2xl mb-8 flex items-center justify-center"
          style={{ background: `${project.color}10`, border: `1px solid ${project.color}30` }}>
          <div className="text-center flex flex-col items-center">
            <project.icon size={64} className="mb-4 opacity-50" color={project.color} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Project screenshots will appear here</p>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Project Overview</h3>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              {project.shortDesc}
            </p>
            <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Results</h3>
            <p className="leading-relaxed" style={{ color: project.color }}>
              {project.results}
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Services Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full"
                  style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-8 border-t flex flex-wrap gap-4" style={{ borderColor: 'var(--border)' }}>
          <Link to="/contact" onClick={onClose}>
            <motion.button
              className="flex items-center gap-3 px-8 py-3 rounded-full text-white font-semibold"
              style={{ background: 'var(--accent-primary)' }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              Want Similar Results? <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  </>
);

export default Portfolio;
