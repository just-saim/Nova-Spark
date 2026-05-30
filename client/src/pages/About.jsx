// pages/About.jsx — COMPLETE PROFESSIONAL ABOUT US PAGE

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Award, Heart, Target, Lightbulb, ArrowRight, Star, CheckCircle, Users, Briefcase, Clock, TrendingUp, Flame, Handshake, Camera, Trophy, Globe, Zap, ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── DATA ────────────────────────────────────────────────────

const STATS = [
  { number: 200, suffix: '+', label: 'Projects Delivered', icon: Briefcase },
  { number: 50, suffix: '+', label: 'Happy Clients', icon: Users },
  { number: 5, suffix: '+', label: 'Years Experience', icon: Clock },
  { number: 98, suffix: '%', label: 'Client Retention', icon: TrendingUp },
];

const TIMELINE = [
  {
    year: '2019',
    title: 'The Spark Begins',
    desc: 'One laptop, one camera, and a big dream. NovaSpark was founded with a simple belief — every brand deserves world-class creative support.',
    icon: Flame
  },
  {
    year: '2020',
    title: 'First 10 Clients',
    desc: 'Our first 10 clients came through word of mouth. Their trust led to referrals. We never compromised on quality — and that became our identity.',
    icon: Handshake
  },
  {
    year: '2021',
    title: 'Full-Service Launch',
    desc: 'Our photography and videography teams joined. We started delivering complete brand experiences, not just design. We became a creative partner, more than just an agency.',
    icon: Camera
  },
  {
    year: '2022',
    title: '100 Projects Milestone',
    desc: '100 successful projects completed. Every project brought a new lesson, a new strategy. Our client satisfaction score reached 98% — and our drive only grew.',
    icon: Trophy
  },
  {
    year: '2023',
    title: 'Digital & Web Expansion',
    desc: 'Launched full-stack web development and paid advertising services. We now manage the entire digital journey for brands — from discovery to conversion.',
    icon: Globe
  },
  {
    year: '2024',
    title: 'NovaSpark 2.0',
    desc: '200+ projects, 50+ clients, and a world-class team. But the attitude remains the same — hungry, passionate, and committed to igniting every brand we touch.',
    icon: Zap
  },
];

const TEAM = [
  {
    name: 'Mohd Sameer Ahmad',
    role: 'Founder & Creative Director',
    bio: 'I see vision where others only see problems. Igniting brands has been my obsession for over 5 years. I pour my heart into every project.',
    initials: 'MSA',
    color: '#FF4D00',
    tags: ['Strategy', 'Branding', 'Direction']
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Marketing',
    bio: 'The perfect blend of data and creativity. I build campaigns that don\'t just look good — they convert. ROI is my religion.',
    initials: 'PS',
    color: '#4DFFB8',
    tags: ['Meta Ads', 'SEO', 'Analytics']
  },
  {
    name: 'Arjun Mehta',
    role: 'Lead Photographer & Videographer',
    bio: 'I tell stories through the camera. From product photography to brand films — every shot carries emotion and a message.',
    initials: 'AM',
    color: '#4D9FFF',
    tags: ['Photography', 'Videography', 'Editing']
  },
  {
    name: 'Riya Patel',
    role: 'Full-Stack Developer',
    bio: 'I translate design into code — pixel-perfect and blazing-fast. I build websites that are beautiful to look at and powerful for business.',
    initials: 'RP',
    color: '#FFB84D',
    tags: ['React', 'Node.js', 'MongoDB']
  },
];

const VALUES = [
  {
    icon: Lightbulb,
    title: 'Creativity Without Limits',
    desc: 'We don\'t just think outside the box — we break it. A fresh perspective, unexpected solutions, and genuine innovation in every project.',
    color: '#FF4D00',
  },
  {
    icon: Heart,
    title: 'Client-First, Always',
    desc: 'Your success is our success — literally. We are partners, not vendors. We are personally invested in the growth of your business.',
    color: '#FF4D9F',
  },
  {
    icon: Target,
    title: 'Results, Not Just Aesthetics',
    desc: 'Everyone does beautiful work. We do work that delivers measurable results — leads, sales, brand recall, and real business impact.',
    color: '#4DFFB8',
  },
  {
    icon: Award,
    title: 'Zero Compromise on Quality',
    desc: 'Deadlines matter — but quality matters more. We put the best version of ourselves into every deliverable. "Good enough" is not our standard.',
    color: '#4D9FFF',
  },
];

const WHY_US = [
  { point: 'One agency, complete solution — design, marketing, photo, video, and web all in one place' },
  { point: 'No templates, no shortcuts — every project is custom, every strategy is unique' },
  { point: 'Direct communication — no middlemen, you talk directly to the team' },
  { point: 'Transparent pricing — we charge what we quote, no hidden fees' },
  { point: 'Post-delivery support — we stand with you even after the work is delivered' },
  { point: 'Data-driven decisions — creativity backed by analytics, not just gut feeling' },
];

// ─── ANIMATED COUNTER ────────────────────────────────────────
const useCounter = (target, isVisible) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let step = 0;
    const steps = 60;
    const timer = setInterval(() => {
      step++;
      setCount(Math.min(Math.round((target / steps) * step), target));
      if (step >= steps) clearInterval(timer);
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [isVisible, target]);
  return count;
};

// ─── MAIN COMPONENT ──────────────────────────────────────────
const About = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>About NovaSpark — We Don't Just Market, We Ignite Brands</title>
        <meta name="description" content="The story of NovaSpark Creative Agency — 5 years, 200+ projects, 50+ happy clients. Learn who we are, why you should choose us, and our promise for your brand." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-24"
        style={{ background: 'var(--bg-primary)' }}>

        {/* Parallax background */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }} />
          <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #4D9FFF 0%, transparent 70%)' }} />
          {/* Decorative grid lines */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </motion.div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Left Text */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-mono tracking-wider"
                style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)' }}
              >
                ✦ EST. 2019 — INDIA
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                We Are The<br />
                <span className="gradient-text">Creative Fire</span><br />
                Behind Brands
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-xl leading-relaxed mb-6"
                style={{ color: 'var(--text-secondary)' }}
              >
                NovaSpark is not just a marketing agency. We are the creative partners that transform your brand from ordinary to extraordinary.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="leading-relaxed mb-10"
                style={{ color: 'var(--text-muted)' }}
              >
                A small studio started in 2019 has now become a trusted creative agency in India with 200+ successful projects and 50+ happy clients. Photography, videography, branding, digital marketing, and web development — everything in one place, one team, one quality standard.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/contact">
                  <motion.button
                    className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold"
                    style={{ background: 'var(--accent-primary)', boxShadow: '0 0 40px var(--accent-glow-strong)' }}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  >
                    Let's Work Together <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link to="/portfolio">
                  <motion.button
                    className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold border"
                    style={{ color: 'var(--text-primary)', borderColor: 'var(--border-strong)' }}
                    whileHover={{ scale: 1.03, borderColor: 'var(--accent-primary)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    See Our Work
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — Image + Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main image box */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                {/* Replace with actual team photo */}
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))' }}>
                  <div className="text-center flex flex-col items-center">
                    <ImageIcon size={64} className="mb-4 opacity-50" style={{ color: 'var(--text-muted)' }} />
                    <p className="font-display text-2xl" style={{ color: 'var(--text-muted)' }}>Team Photo</p>
                    <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Place your team photo here</p>
                  </div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 50%)' }} />
              </div>

              {/* Floating stat card 1 */}
              <motion.div
                className="absolute -bottom-6 -left-6 p-5 rounded-2xl border"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--accent-primary)', boxShadow: '0 0 40px var(--accent-glow)' }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-glow)' }}>
                    <Star size={18} style={{ color: 'var(--accent-primary)' }} fill="var(--accent-primary)" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-2xl" style={{ color: 'var(--accent-primary)' }}>4.9/5</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Client Rating</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat card 2 */}
              <motion.div
                className="absolute -top-6 -right-6 p-5 rounded-2xl border"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(77, 255, 184, 0.1)' }}>
                    <CheckCircle size={18} color="#4DFFB8" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>200+</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Projects Done</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────── */}
      <section ref={statsRef} className="py-20 border-y" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} isVisible={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-sm font-mono tracking-widest uppercase mb-4 block" style={{ color: 'var(--accent-primary)' }}>
              Our Journey
            </span>
            <h2 className="font-display mb-4" style={{ color: 'var(--text-primary)' }}>
              Our 5-Year Journey
            </h2>
            <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--text-secondary)' }}>
              A journey that started with a laptop has now reached a team of 20+ members, 200+ projects, and countless success stories.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
              style={{ background: 'linear-gradient(to bottom, transparent, var(--accent-primary), transparent)' }} />

            <div className="space-y-16">
              {TIMELINE.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-mono tracking-widest uppercase mb-4 block" style={{ color: 'var(--accent-primary)' }}>
              The Humans Behind The Magic
            </span>
            <h2 className="font-display mb-4" style={{ color: 'var(--text-primary)' }}>
              Meet Your Creative Team
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              We are not just employees — we are passionate creators who genuinely care about your brand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <TeamCard key={i} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-mono tracking-widest uppercase mb-4 block" style={{ color: 'var(--accent-primary)' }}>
              What Drives Us
            </span>
            <h2 className="font-display" style={{ color: 'var(--text-primary)' }}>Our Core Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-3xl border overflow-hidden"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
                whileHover={{ y: -4 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at top left, ${value.color}08, transparent 60%)` }} />

                <div className="relative z-10 flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${value.color}15`, border: `1px solid ${value.color}30` }}>
                    <value.icon size={24} style={{ color: value.color }} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                      {value.title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {value.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-mono tracking-widest uppercase mb-4 block" style={{ color: 'var(--accent-primary)' }}>
                The NovaSpark Difference
              </span>
              <h2 className="font-display mb-6" style={{ color: 'var(--text-primary)' }}>
                Why Choose<br />
                <span className="gradient-text">NovaSpark?</span>
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                There are 1000 agencies in the market. But NovaSpark is where your brand is not just delivered — it is transformed.
              </p>

              <div className="space-y-4">
                {WHY_US.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent-primary)' }}>
                      <CheckCircle size={14} style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>{item.point}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side — Big quote card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="p-10 rounded-3xl relative overflow-hidden"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>

                {/* Decorative quote mark */}
                <div className="absolute top-6 right-8 font-display text-[120px] leading-none select-none opacity-5"
                  style={{ color: 'var(--accent-primary)' }}>
                  &ldquo;
                </div>

                <div className="relative z-10">
                  <p className="font-display text-2xl leading-relaxed mb-8" style={{ color: 'var(--text-primary)' }}>
                    &ldquo;Our goal isn't just to complete your project. Our goal is to make your competitors
                    <span style={{ color: 'var(--accent-primary)' }}> nervous when they hear your name.</span>&rdquo;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                      style={{ background: 'var(--accent-primary)' }}>
                      MSA
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Mohd Sameer Ahmad</p>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Founder, NovaSpark Creative Agency</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating accent */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-40 pointer-events-none"
                style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }} />
        </div>

        <div className="container relative z-10 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display mb-6" style={{ color: 'var(--text-primary)' }}>
              Ready to Ignite<br />
              <span className="gradient-text">Your Brand?</span>
            </h2>
            <p className="text-xl mb-10" style={{ color: 'var(--text-secondary)' }}>
              The first consultation is free. Talk to us, understand, and decide. No pressure, no hard sell — just an honest conversation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  className="flex items-center gap-3 px-10 py-5 rounded-full text-white font-semibold text-lg"
                  style={{ background: 'var(--accent-primary)', boxShadow: '0 0 60px var(--accent-glow-strong)' }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                >
                  Book a Free Consultation <ArrowRight size={20} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// ─── SUB COMPONENTS ──────────────────────────────────────────

const StatCard = ({ stat, index, isVisible }) => {
  const count = useCounter(stat.number, isVisible);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="text-center"
    >
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent-primary)' }}>
        <stat.icon size={24} style={{ color: 'var(--accent-primary)' }} />
      </div>
      <p className="text-5xl font-display font-bold mb-2" style={{ color: 'var(--accent-primary)' }}>
        {count}{stat.suffix}
      </p>
      <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
    </motion.div>
  );
};

const TimelineItem = ({ item, index }) => {
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col md:flex-row items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        <div className="p-8 rounded-2xl border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
          <span className="font-mono text-sm font-bold mb-2 block" style={{ color: 'var(--accent-primary)' }}>
            {item.year}
          </span>
          <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {item.title}
          </h3>
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {item.desc}
          </p>
        </div>
      </div>

      {/* Center dot */}
      <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: 'var(--bg-elevated)', border: '2px solid var(--accent-primary)', boxShadow: '0 0 30px var(--accent-glow)' }}>
        <item.icon size={28} style={{ color: 'var(--accent-primary)' }} />
      </div>

      {/* Empty space */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

const TeamCard = ({ member, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl border overflow-hidden cursor-pointer"
      style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(circle at top, ${member.color}08, transparent 70%)` }}
      />

      <div className="relative z-10">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300"
          style={{ background: member.color, boxShadow: `0 8px 24px ${member.color}40` }}>
          {member.initials}
        </div>

        {/* Info */}
        <div className="text-center mb-4">
          <h4 className="font-display font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
            {member.name}
          </h4>
          <p className="text-xs font-mono uppercase tracking-wider" style={{ color: member.color }}>
            {member.role}
          </p>
        </div>

        {/* Bio */}
        <p className="text-sm leading-relaxed text-center mb-4" style={{ color: 'var(--text-muted)' }}>
          {member.bio}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {member.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full"
              style={{ background: `${member.color}15`, color: member.color, border: `1px solid ${member.color}30` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default About;
