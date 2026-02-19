import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { Download, Code } from 'lucide-react';

const Hero = () => {
  const { i18n } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          terminalRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          '-=0.2'
        );
    }, heroRef);

    return () => ctx.revert();
  }, [i18n.language]);

  const isArabic = i18n.language === 'ar';

  const scrollToInstall = () => {
    const element = document.querySelector('#install');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div ref={badgeRef} className="badge mb-6">
          <span className="status-dot"></span>
          {isArabic ? 'الإصدار 1.0.2 - متوفر الآن' : 'v1.0.2 Now Available'}
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          <span className="gradient-text">
            {isArabic ? 'سطر الأوامر الحديث' : 'The Modern CLI'}
          </span>
          <br />
          <span className="text-slate-900 dark:text-slate-100">
            {isArabic ? 'لشهر رمضان' : 'for Ramadan'}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {isArabic
            ? 'أداة CLI مصممة بإتقان تجلب أوقات الصلاة والقرآن والأحاديث والأدوات الروحية مباشرة إلى سطر الأوامر.'
            : 'A beautifully crafted CLI tool that brings prayer times, Quran, Hadith, and spiritual tools directly to your command line.'}
        </p>

        {/* CTA Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button
            onClick={scrollToInstall}
            className="w-full sm:w-auto px-8 py-4 bg-primary text-background-dark font-bold rounded-xl text-lg btn-glow transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            {isArabic ? 'ابدأ الآن' : 'Get Started Free'}
          </button>
          <a
            href="https://github.com/TheNeovimmer/romdhan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <Code className="w-5 h-5" />
            {isArabic ? 'عرض على GitHub' : 'View on GitHub'}
          </a>
        </div>

        {/* Terminal Preview */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full -z-10"></div>

          <div
            ref={terminalRef}
            className="rounded-xl border border-border-dark bg-[#011627] overflow-hidden terminal-glow text-left shadow-2xl"
          >
            {/* Terminal Header */}
            <div className="terminal-header">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-slate-500 text-xs font-mono">zsh — 80×24</div>
              <div className="w-10"></div>
            </div>

            {/* Terminal Body */}
            <div className="terminal-body text-slate-300">
              <div className="mb-2">
                <span className="text-primary">➜</span>
                <span className="text-cyan-400"> ~</span>
                <span className="text-white"> romdhan countdown --live</span>
              </div>

              <div className="mt-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <div className="text-xs text-slate-500 mb-1">
                      {isArabic ? 'الحالة الحالية' : 'CURRENT STATUS'}
                    </div>
                    <div className="text-primary font-bold">
                      {isArabic ? 'صيام (اليوم 1)' : 'FASTING (Day 1)'}
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <div className="text-xs text-slate-500 mb-1">
                      {isArabic ? 'الصلاة القادمة' : 'NEXT PRAYER'}
                    </div>
                    <div className="text-cyan-400 font-bold">
                      {isArabic ? 'المغرب بعد 8 ساعات' : 'Maghrib in 8h 45m'}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{isArabic ? 'تقدم رمضان' : 'Ramadan Progress'}</span>
                    <span>3%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary animate-progress"
                      style={{ width: '3%' }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1 mt-6">
                  <div className="flex gap-8">
                    <span className="text-slate-500 w-20">{isArabic ? 'الفجر:' : 'Fajr:'}</span>
                    <span className="text-white">05:24 AM</span>
                  </div>
                  <div className="flex gap-8">
                    <span className="text-slate-500 w-20">{isArabic ? 'الشروق:' : 'Sunrise:'}</span>
                    <span className="text-white">06:45 AM</span>
                  </div>
                  <div className="flex gap-8">
                    <span className="text-slate-500 w-20">{isArabic ? 'الظهر:' : 'Dhuhr:'}</span>
                    <span className="text-white">12:15 PM</span>
                  </div>
                  <div className="flex gap-8">
                    <span className="text-slate-500 w-20">{isArabic ? 'العصر:' : 'Asr:'}</span>
                    <span className="text-white">03:30 PM</span>
                  </div>
                  <div className="flex gap-8">
                    <span className="text-primary font-bold w-20">
                      {isArabic ? 'المغرب:' : 'Maghrib:'}
                    </span>
                    <span className="text-primary font-bold">
                      06:12 PM {isArabic ? '(الإفطار)' : '(Iftar)'}
                    </span>
                  </div>
                  <div className="flex gap-8">
                    <span className="text-slate-500 w-20">{isArabic ? 'العشاء:' : 'Isha:'}</span>
                    <span className="text-white">07:35 PM</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <span className="text-primary">➜</span>
                  <span className="text-cyan-400"> ~</span>
                  <span className="typing-cursor text-white"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
