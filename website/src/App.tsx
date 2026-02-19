import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Commands from './components/sections/Commands';
import ConfigSection from './components/sections/ConfigSection';
import Demo from './components/sections/Demo';
import Installation from './components/sections/Installation';
import Footer from './components/sections/Footer';
import './i18n/i18n';
import './styles/index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Commands />
          <ConfigSection />
          <Demo />
          <Installation />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
