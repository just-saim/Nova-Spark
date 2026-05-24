import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { useThemeStore } from './store/themeStore';
import Navbar from './components/layout/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

const App = () => {
  const { theme, initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [initTheme]);

  return (
    <div className="app bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
