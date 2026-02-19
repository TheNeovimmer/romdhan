import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, BookOpen, Hourglass, ScrollText, Calculator, CircleDot } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 'prayer',
    icon: Clock,
    title: 'Accurate Prayer Times',
    titleAr: 'أوقات صلاة دقيقة',
    description:
      'Get precise prayer times for any city worldwide with 15+ calculation methods. Shows next prayer indicator and Iftar time.',
    descriptionAr: 'احصل على أوقات صلاة دقيقة لأي مدينة في العالم مع أكثر من 15 طريقة حساب.',
  },
  {
    id: 'quran',
    icon: BookOpen,
    title: 'Quran Reader',
    titleAr: 'قارئ القرآن',
    description:
      'Read any of the 114 Surahs with authentic Arabic text and English translations. Features proper RTL rendering.',
    descriptionAr: 'اقرأ أي من السور الـ114 بنص عربي أصيل وترجمات إنجليزية.',
  },
  {
    id: 'countdown',
    icon: Hourglass,
    title: 'Ramadan Tracker',
    titleAr: 'متتبع رمضان',
    description:
      "Smart countdown showing current Ramadan day, progress bar, and days until Eid. Adapts to your country's moon sighting.",
    descriptionAr: 'عداد ذكي يعرض يوم رمضان الحالي وشريط التقدم والأيام المتبقية حتى العيد.',
  },
  {
    id: 'hadith',
    icon: ScrollText,
    title: 'Daily Hadith',
    titleAr: 'الحديث اليومي',
    description:
      'Access authentic Ramadan-related hadiths with transliteration and English translations from Sahih collections.',
    descriptionAr: 'الوصول إلى أحاديث رمضان الأصيلة مع النقحرة والترجمات الإنجليزية.',
  },
  {
    id: 'zakat',
    icon: Calculator,
    title: 'Zakat Calculator',
    titleAr: 'حاسبة الزكاة',
    description:
      'Interactive wealth calculator with step-by-step guidance. Calculates Nisab threshold and final Zakat obligation (2.5%).',
    descriptionAr: 'حاسبة ثروة تفاعلية مع إرشادات خطوة بخطوة.',
  },
  {
    id: 'tasbih',
    icon: CircleDot,
    title: 'Digital Tasbih',
    titleAr: 'السبحة الرقمية',
    description:
      'Keyboard-driven dhikr counter with visual progress tracking. Features 6 preset dhikr patterns for your daily adhkar.',
    descriptionAr: 'عداد ذكر يعمل باللوحة المفاتيحة مع تتبع التقدم المرئي.',
  },
];

const Features = () => {
  const { i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [i18n.language]);

  const isArabic = i18n.language === 'ar';

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-24 px-6 bg-slate-100/50 dark:bg-slate-900/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            {isArabic ? 'كل ما تحتاجه في رمضان' : 'Everything You Need for Ramadan'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {isArabic
              ? 'أدوات شاملة مصممة لتعزيز تجربتك في رمضان دون مغادرة الطرفية.'
              : 'Comprehensive tools designed to enhance your Ramadan experience without leaving your terminal.'}
          </p>
        </div>

        {/* Features Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(feature => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="feature-card p-8 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/50 transition-all group card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 icon-animate">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  {isArabic ? feature.titleAr : feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isArabic ? feature.descriptionAr : feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
