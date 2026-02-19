import { useTranslation } from 'react-i18next';
import { Terminal, ExternalLink } from 'lucide-react';

const Footer = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const links = [
    { label: isArabic ? 'المميزات' : 'Features', href: '#features' },
    { label: isArabic ? 'الأوامر' : 'Commands', href: '#commands' },
    { label: isArabic ? 'التجربة' : 'Demo', href: '#demo' },
    { label: isArabic ? 'التثبيت' : 'Install', href: '#install' },
  ];

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/TheNeovimmer/romdhan' },
    { label: 'NPM', href: 'https://www.npmjs.com/package/romdhan' },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-border-dark py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-primary" />
            <span className="font-mono font-bold tracking-tight text-slate-900 dark:text-slate-100">
              romdhan
            </span>
          </div>
          <p className="text-slate-500 text-sm text-center md:text-left">
            © 2026 Romdhan Contributors. Open source under MIT.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 text-sm text-slate-600 dark:text-slate-400 font-medium">
          {links.map(link => (
            <a key={link.label} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
          {socialLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              {link.label}
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
