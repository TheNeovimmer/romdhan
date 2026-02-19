import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Play, CheckCircle, Copy, Check, Star, ListOrdered } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Installation = () => {
  const { i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.install-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [i18n.language]);

  const copyCommand = (command: string, type: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(type);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const isArabic = i18n.language === 'ar';

  const installMethods = [
    {
      id: 'npm',
      title: isArabic ? 'NPM (موصى به)' : 'NPM (Recommended)',
      command: 'npm install -g romdhan',
      icon: Download,
      recommended: true,
    },
    {
      id: 'npx',
      title: isArabic ? 'NPX (بدون تثبيت)' : 'NPX (No Install)',
      command: 'npx romdhan --help',
      icon: Play,
      recommended: false,
    },
    {
      id: 'verify',
      title: isArabic ? 'تحقق من التثبيت' : 'Verify Installation',
      command: 'romdhan --version',
      icon: CheckCircle,
      recommended: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="install"
      className="py-24 px-6 bg-slate-100/50 dark:bg-slate-900/20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            {isArabic ? 'ابدأ في ثوانٍ' : 'Get Started in Seconds'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {isArabic
              ? 'ثبت رمضان عالمياً عبر npm وابدأ استخدامها على الفور.'
              : 'Install Romdhan globally via npm and start using it immediately.'}
          </p>
        </div>

        {/* Installation Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {installMethods.map(method => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className={`install-card p-6 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark relative overflow-hidden group ${
                  method.recommended ? 'border-primary/30' : ''
                }`}
              >
                {method.recommended && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {isArabic ? 'موصى به' : 'Recommended'}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {method.title}
                  </h3>
                </div>

                <div className="relative">
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto">
                    <span className="text-slate-500">$ </span>
                    {method.command}
                  </div>
                  <button
                    onClick={() => copyCommand(method.command, method.id)}
                    className="absolute top-2 right-2 p-2 rounded-lg bg-slate-800 hover:bg-primary/20 transition-colors flex items-center gap-1"
                  >
                    {copiedCommand === method.id ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Steps */}
        <div className="mt-12 p-8 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark">
          <h3 className="text-xl font-bold mb-6 text-center text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2">
            <ListOrdered className="w-5 h-5 text-primary" />
            {isArabic ? 'الخطوات التالية' : 'Next Steps'}
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <p className="text-slate-700 dark:text-slate-300 mb-2">
                  {isArabic ? 'اضبط موقعك:' : 'Set your location:'}
                </p>
                <code className="text-sm text-primary font-mono">romdhan settings</code>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <p className="text-slate-700 dark:text-slate-300 mb-2">
                  {isArabic ? 'تحقق من أوقات الصلاة:' : 'Check prayer times:'}
                </p>
                <code className="text-sm text-primary font-mono">romdhan prayer</code>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <p className="text-slate-700 dark:text-slate-300 mb-2">
                  {isArabic ? 'اقرأ القرآن:' : 'Read the Quran:'}
                </p>
                <code className="text-sm text-primary font-mono">romdhan quran</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Installation;
