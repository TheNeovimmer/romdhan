import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Terminal, Sun, Moon, Menu, X, Download, ExternalLink } from 'lucide-react';

const Navbar = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { href: '#features', label: i18n.language === 'ar' ? 'المميزات' : 'Features' },
    { href: '#commands', label: i18n.language === 'ar' ? 'الأوامر' : 'Commands' },
    { href: '#demo', label: i18n.language === 'ar' ? 'تجربة' : 'Demo' },
    { href: '#install', label: i18n.language === 'ar' ? 'تثبيت' : 'Install' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b border-border-dark/20 transition-all duration-300 ${
        isScrolled
          ? theme === 'dark'
            ? 'glass-nav'
            : 'glass-nav-light border-slate-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Terminal className="w-6 h-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-mono font-bold text-lg tracking-tight text-slate-900 dark:text-slate-100">
            romdhan
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="nav-link text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://github.com/TheNeovimmer/romdhan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
          >
            GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            {i18n.language === 'en' ? 'العربية' : 'English'}
          </button>

          <button
            onClick={() => scrollToSection('#install')}
            className="btn-primary text-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {i18n.language === 'ar' ? 'ابدأ' : 'Get Started'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-600 dark:text-slate-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-nav border-t border-border-dark/20">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left text-slate-300 hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-border-dark/20">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-slate-400 hover:text-primary"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button onClick={toggleLanguage} className="text-slate-400 hover:text-primary">
                {i18n.language === 'en' ? 'العربية' : 'English'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
