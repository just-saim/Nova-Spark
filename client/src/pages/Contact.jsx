import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight } from 'lucide-react';

const CONTACT_INFO = [
  {
    icon: Mail,
    title: 'Email Us',
    details: 'justsaim07@gmail.com',
    sub: 'We usually reply within 24 hours.'
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: '+91 90273 80030',
    sub: 'Mon-Fri from 9am to 6pm.'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: 'NovaSpark Creative Studio',
    sub: 'Andheri West, Mumbai, 400053'
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — Start Your Project with NovaSpark</title>
        <meta name="description" content="Ready to transform your brand? Get in touch with NovaSpark Creative Agency today." />
      </Helmet>

      <section className="pt-36 pb-20 relative overflow-hidden min-h-screen flex flex-col justify-center" style={{ background: 'var(--bg-primary)' }}>
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #4D9FFF 0%, transparent 70%)' }} />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-mono tracking-wider"
                style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)' }}>
                ✦ LET'S TALK
              </div>
              
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
                Let's Build Something <br />
                <span className="gradient-text">Extraordinary.</span>
              </h1>
              
              <p className="text-lg mb-12 max-w-md" style={{ color: 'var(--text-secondary)' }}>
                Whether you have a clear vision or just a spark of an idea, we are here to help you ignite it. Reach out to us.
              </p>

              <div className="space-y-8">
                {CONTACT_INFO.map((info, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (idx * 0.1) }}
                    className="flex items-start gap-5"
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                      <info.icon size={24} style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{info.title}</h3>
                      <p className="font-medium text-lg mb-1" style={{ color: 'var(--text-secondary)' }}>{info.details}</p>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{info.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="p-8 md:p-10 rounded-3xl border relative overflow-hidden"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-md)' }}>
                
                <h3 className="font-display text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Your Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe" 
                        className="w-full p-4 rounded-xl outline-none transition-all duration-300"
                        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com" 
                        className="w-full p-4 rounded-xl outline-none transition-all duration-300"
                        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Service Required</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full p-4 rounded-xl outline-none transition-all duration-300 appearance-none"
                      style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    >
                      <option value="" disabled>Select a service...</option>
                      <option value="branding">Branding & Design</option>
                      <option value="web">Website Development</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="photo_video">Photography & Videography</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Project Details</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your project goals, timeline, and budget..." 
                      rows="5" 
                      className="w-full p-4 rounded-xl outline-none transition-all duration-300 resize-none"
                      style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    ></textarea>
                  </div>

                  <motion.button 
                    type="submit" 
                    disabled={isSubmitting || submitted}
                    className="w-full flex items-center justify-center gap-3 p-4 rounded-xl text-white font-semibold text-lg mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: submitted ? '#10B981' : 'var(--accent-primary)' }}
                    whileHover={{ scale: (isSubmitting || submitted) ? 1 : 1.02 }} 
                    whileTap={{ scale: (isSubmitting || submitted) ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : submitted ? (
                      <span className="flex items-center gap-2">
                        Message Sent! <MessageSquare size={20} />
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <Send size={20} />
                      </span>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
