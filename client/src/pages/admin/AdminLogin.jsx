import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [shake, setShake] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    // Auto-redirect if already logged in
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    }

    // Load saved email if remember me was checked previously
    const savedEmail = localStorage.getItem('novaspark_admin_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    if (rememberMe) {
      localStorage.setItem('novaspark_admin_email', email);
    } else {
      localStorage.removeItem('novaspark_admin_email');
    }

    const success = await login(email, password);
    
    if (!success) {
      // Trigger shake animation on error
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background Cinematic Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #ff6b00 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #ff6b00 0%, transparent 70%)' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
          
          {/* Subtle top glow */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)' }} />

          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-glow)] flex items-center justify-center text-[var(--accent-primary)] font-bold text-2xl mb-4 shadow-[0_0_20px_var(--accent-glow)]">
              N
            </div>
            <h1 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-1 leading-none">NovaSpark Admin</h1>
            <p className="text-sm text-[var(--text-muted)]">Authorized Access Only</p>
          </div>

          <motion.form 
            onSubmit={handleSubmit}
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] text-[var(--text-primary)] text-sm rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    placeholder="admin@novaspark.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2 ml-1">
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Password</label>
                  <button type="button" className="text-xs text-[var(--accent-primary)] hover:underline">Forgot?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] text-[var(--text-primary)] text-sm rounded-xl py-3 pl-11 pr-12 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center mt-6 mb-8 ml-1">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[var(--border)] bg-[var(--bg-tertiary)] accent-[var(--accent-primary)]"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-[var(--text-secondary)] cursor-pointer">
                Remember this device
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[var(--accent-primary)] text-white font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-all hover:bg-[#e66000] disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_var(--accent-glow)]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Secure Login <ArrowRight size={18} /></>
              )}
            </button>
          </motion.form>
        </div>
        
        {/* Return to website link */}
        <div className="text-center mt-8">
          <a href="/" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            ← Return to NovaSpark Website
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
