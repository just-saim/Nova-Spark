import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ArrowRight, MessageSquarePlus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: "Vikram Sharma",
    role: "Founder, TechFlow",
    image: "https://i.pravatar.cc/150?img=11",
    review: "NovaSpark didn't just build us a website; they transformed our entire digital identity. Their attention to detail and futuristic design approach is unmatched in the industry.",
    rating: 5,
  },
  {
    id: 2,
    name: "Aisha Patel",
    role: "Marketing Director, Zara Boutique",
    image: "https://i.pravatar.cc/150?img=5",
    review: "Working with this team was a game-changer. They understand the sweet spot between stunning aesthetics and high-converting performance. Worth every penny.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "CEO, FreshBite Delivery",
    image: "https://i.pravatar.cc/150?img=8",
    review: "Their creative strategy propelled our launch to heights we hadn't anticipated. The branding and app UI are world-class, and the communication was flawless.",
    rating: 5,
  }
];

const TestimonialsSection = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.15 });
  const [reviews, setReviews] = useState(INITIAL_TESTIMONIALS);
  
  // Review Form Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    review: '',
    rating: 5
  });

  const handleRatingClick = (ratingValue) => {
    setFormData((prev) => ({ ...prev, rating: ratingValue }));
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      const newReview = {
        id: Date.now(),
        name: formData.name,
        role: formData.role,
        review: formData.review,
        rating: formData.rating,
        // Assign a random avatar for new reviews
        image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` 
      };
      
      setReviews([newReview, ...reviews]);
      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({ name: '', role: '', review: '', rating: 5 });
    }, 1000);
  };

  return (
    <>
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }} />

        <div className="container mx-auto px-6 relative z-10">
          
          {/* Header */}
          <motion.div 
            ref={ref}
            variants={staggerContainer()} 
            initial="hidden" 
            animate={isVisible ? 'visible' : 'hidden'} 
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-block text-sm font-mono tracking-widest uppercase mb-4" style={{ color: 'var(--accent-primary)' }}>
              ✦ Client Success Stories
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              What Our Clients Say
            </motion.h2>
            <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--text-secondary)' }}>
              Don't just take our word for it. Here's what visionary founders and industry leaders have to say about partnering with us.
            </motion.p>
          </motion.div>

          {/* Testimonials Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
          >
            <AnimatePresence mode="popLayout">
              {reviews.map((testimonial, idx) => (
                <motion.div 
                  key={testimonial.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.1, 0.3) }}
                  whileHover={{ y: -8, borderColor: 'var(--accent-primary)' }}
                  className="relative p-8 rounded-2xl border transition-colors duration-300 group flex flex-col h-full"
                  style={{ 
                    background: 'var(--bg-secondary)', 
                    borderColor: 'var(--border)' 
                  }}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity" style={{ color: 'var(--accent-primary)' }}>
                    <Quote size={40} fill="currentColor" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        style={{ color: i < testimonial.rating ? 'var(--accent-primary)' : 'var(--text-muted)' }} 
                        fill={i < testimonial.rating ? "var(--accent-primary)" : "transparent"} 
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="leading-relaxed mb-8 flex-grow" style={{ color: 'var(--text-primary)' }}>
                    "{testimonial.review}"
                  </p>

                  {/* Author Profile */}
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: 'var(--accent-glow)' }}>
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold" style={{ color: 'var(--text-primary)' }}>{testimonial.name}</h4>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Subtle bottom glow on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"
                    style={{ background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)' }} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Write a Review Button */}
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="flex justify-center mb-24"
          >
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-300"
              style={{ color: 'var(--accent-primary)', borderColor: 'var(--border-strong)', background: 'var(--bg-secondary)' }}
              whileHover={{ scale: 1.05, borderColor: 'var(--accent-primary)', background: 'var(--accent-glow)' }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquarePlus size={18} /> Add Your Review
            </motion.button>
          </motion.div>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-center"
          >
            <div className="inline-block p-1 rounded-full" style={{ background: 'var(--border)' }}>
              <div className="px-8 py-10 md:px-16 md:py-12 rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden"
                style={{ background: 'var(--bg-secondary)' }}>
                
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(circle at center, var(--accent-primary) 0%, transparent 60%)' }} />
                
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-8 relative z-10" style={{ color: 'var(--text-primary)' }}>
                  Ready to build your next <span style={{ color: 'var(--accent-primary)' }}>big brand?</span>
                </h3>
                
                <Link to="/contact" className="relative z-10">
                  <motion.button
                    className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold"
                    style={{ background: 'var(--accent-primary)', boxShadow: '0 0 30px var(--accent-glow)' }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px var(--accent-glow-strong)' }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Your Project <ArrowRight size={18} />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Write Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div 
              className="relative w-full max-w-lg p-8 rounded-3xl border"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-lg)' }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-[var(--bg-elevated)] transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Share Your Experience</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>We'd love to hear about your project with NovaSpark.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Rating Input */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm mr-2" style={{ color: 'var(--text-secondary)' }}>Your Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star 
                        size={24} 
                        style={{ color: star <= formData.rating ? 'var(--accent-primary)' : 'var(--text-muted)' }} 
                        fill={star <= formData.rating ? "var(--accent-primary)" : "transparent"} 
                      />
                    </button>
                  ))}
                </div>

                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Name" 
                  className="w-full p-4 rounded-xl outline-none transition-colors"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
                
                <input 
                  type="text" 
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  placeholder="Company / Role (e.g. CEO, TechFlow)" 
                  className="w-full p-4 rounded-xl outline-none transition-colors"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />

                <textarea 
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about your experience..." 
                  rows="4" 
                  className="w-full p-4 rounded-xl outline-none transition-colors resize-none"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                ></textarea>

                <motion.button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full p-4 rounded-xl text-white font-semibold mt-2 disabled:opacity-70 flex justify-center items-center"
                  style={{ background: 'var(--accent-primary)' }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }} 
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Post Review"
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TestimonialsSection;
