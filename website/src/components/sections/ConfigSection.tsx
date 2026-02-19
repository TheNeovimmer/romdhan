import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ConfigSection = () => {
  const { i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: i18n.language === 'ar' ? 50 : -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        codeRef.current,
        { opacity: 0, x: i18n.language === 'ar' ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
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

  const isArabic = i18n.language === 'ar';

  const features = isArabic
    ? [
        'يعمل على جميع المنصات (macOS، Linux، Windows)',
        'مكتوب بـ TypeScript لأقصى أداء',
        '15 طريقة حساب لأوقات الصلاة الدقيقة',
      ]
    : [
        'Cross-platform (macOS, Linux, Windows)',
        'Written in TypeScript for maximum performance',
        '15 calculation methods for accurate prayer times',
      ];

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div ref={contentRef} className="flex-1">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight text-slate-900 dark:text-slate-100">
            {isArabic ? (
              <>
                قابل للتخصيص
                <br />
                حسب احتياجاتك.
              </>
            ) : (
              <>
                Configurable
                <br />
                to your needs.
              </>
            )}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
            {isArabic
              ? 'تكوين بسيط يعتمد على JSON يسمح لك بتخصيص طرق الحساب والموقع والتفضيلات.'
              : 'A simple JSON-based configuration allows you to customize calculation methods, location, and preferences.'}
          </p>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div ref={codeRef} className="flex-1 w-full">
          <div className="rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-slate-900 p-1 shadow-card">
            <div className="bg-slate-50 dark:bg-background-dark rounded-lg p-6 font-mono text-sm overflow-hidden">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200 dark:border-border-dark">
                <span className="text-slate-500">~/.config/configstore/romdhan.json</span>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded flex items-center gap-1">
                  <Code className="w-3 h-3" />
                  JSON
                </span>
              </div>
              <pre className="text-slate-700 dark:text-slate-300 overflow-x-auto">
                {`{
  `}
                <span className="text-slate-500">// Location settings</span>
                {`
  `}
                <span className="text-primary">"city"</span>
                {`: `}
                <span className="text-green-400">"Tunis"</span>
                {`,
  `}
                <span className="text-primary">"country"</span>
                {`: `}
                <span className="text-green-400">"TN"</span>
                {`,
  
  `}
                <span className="text-slate-500">// Calculation method (1-15)</span>
                {`
  `}
                <span className="text-primary">"calculationMethod"</span>
                {`: `}
                <span className="text-orange-400">2</span>
                {`,
  
  `}
                <span className="text-slate-500">// Default: ISNA method</span>
                {`
  `}
                <span className="text-slate-500">// 1: Karachi, 2: ISNA, 3: MWL, etc.</span>
                {`
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfigSection;
