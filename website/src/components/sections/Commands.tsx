import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Clock,
  Hourglass,
  BookOpen,
  ScrollText,
  Calculator,
  CircleDot,
  Info,
  Settings,
  Copy,
  Check,
  Download,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const commandList = [
  {
    id: 'prayer',
    cmd: 'romdhan prayer',
    desc: 'Get prayer times for your city',
    descAr: 'احصل على أوقات الصلاة لمدينتك',
    icon: Clock,
    options: '-c, --city <city>  -C, --country <country>  -m, --method <method>',
  },
  {
    id: 'countdown',
    cmd: 'romdhan countdown',
    desc: 'Show countdown to Ramadan or Eid',
    descAr: 'عرض العد التنازلي لرمضان أو العيد',
    icon: Hourglass,
    options: '',
  },
  {
    id: 'quran',
    cmd: 'romdhan quran',
    desc: 'Read Quran surah with translation',
    descAr: 'قراءة سورة القرآن مع الترجمة',
    icon: BookOpen,
    options: '-s, --surah <number>  -l, --limit <number>',
  },
  {
    id: 'hadith',
    cmd: 'romdhan hadith',
    desc: 'Get a random Ramadan-related hadith',
    descAr: 'الحصول على حديث عشوائي عن رمضان',
    icon: ScrollText,
    options: '--arabic',
  },
  {
    id: 'zakat',
    cmd: 'romdhan zakat',
    desc: 'Calculate your Zakat obligation',
    descAr: 'حساب زكاتك الواجبة',
    icon: Calculator,
    options: '',
  },
  {
    id: 'tasbih',
    cmd: 'romdhan tasbih',
    desc: 'Digital dhikr counter',
    descAr: 'عداد الذكر الرقمي',
    icon: CircleDot,
    options: '--dhikr <name>',
  },
  {
    id: 'info',
    cmd: 'romdhan info',
    desc: 'Get daily Ramadan information',
    descAr: 'الحصول على معلومات رمضان اليومية',
    icon: Info,
    options: '--tips',
  },
  {
    id: 'settings',
    cmd: 'romdhan settings',
    desc: 'Configure your preferences',
    descAr: 'تكوين تفضيلاتك',
    icon: Settings,
    options: '',
  },
];

const Commands = () => {
  const { i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.command-row',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [i18n.language]);

  const copyCommand = (command: string, id: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isArabic = i18n.language === 'ar';

  return (
    <section
      ref={sectionRef}
      id="commands"
      className="py-24 px-6 bg-slate-100/50 dark:bg-slate-900/20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            {isArabic ? 'أوامر CLI' : 'CLI Commands'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {isArabic
              ? 'أوامر بسيطة وبديهية للوصول السريع إلى جميع ميزات رمضان.'
              : 'Simple, intuitive commands for quick access to all Romdhan features.'}
          </p>
        </div>

        {/* Commands List */}
        <div className="space-y-3">
          {commandList.map(command => {
            const Icon = command.icon;
            return (
              <div
                key={command.id}
                className="command-row flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark hover:border-primary/30 transition-all group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-primary" />
                    <code className="text-primary font-mono text-sm font-bold">{command.cmd}</code>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm ml-6">
                    {isArabic ? command.descAr : command.desc}
                  </p>
                  {command.options && (
                    <p className="text-slate-500 dark:text-slate-500 text-xs mt-2 font-mono ml-6">
                      {isArabic ? 'الخيارات:' : 'Options:'} {command.options}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => copyCommand(command.cmd, command.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/10 transition-all text-sm font-medium self-start sm:self-auto ml-6 sm:ml-0"
                >
                  {copiedId === command.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copiedId === command.id
                    ? isArabic
                      ? 'تم النسخ'
                      : 'Copied'
                    : isArabic
                      ? 'نسخ'
                      : 'Copy'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Quick Install */}
        <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Download className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {isArabic ? 'جاهز للبدء؟' : 'Ready to start?'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {isArabic ? 'ثبت رمضان عالمياً عبر npm' : 'Install Romdhan globally via npm'}
                </p>
              </div>
            </div>
            <code className="px-6 py-3 bg-slate-900 rounded-lg font-mono text-sm text-white">
              npm install -g romdhan
            </code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Commands;
