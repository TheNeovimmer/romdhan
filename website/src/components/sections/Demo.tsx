import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefreshCw, Send, Play, Terminal as TerminalIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const commandResponses: Record<string, string> = {
  'romdhan prayer': `╔════════════════════════════════════════════════╗
║  🕌 Tunis, TN                                  ║
╠════════════════════════════════════════════════╣
║                                                ║
║  📅 Date Information                           ║
║  ─────────────────────────────────────────     ║
║  📆 Gregorian    February 19, 2026             ║
║  🌙 Hijri        1 Ramadan 1447 AH             ║
║  🌍 Timezone     Africa/Tunis                  ║
║  📐 Method       Islamic Society of North      ║
║                  America (ISNA)                ║
║                                                ║
║  🕐 Prayer Times                               ║
║  ─────────────────────────────────────────     ║
║   🌅 Fajr        05:24 AM                      ║
║   ☀️ Sunrise     06:45 AM                      ║
║ ▶ 🌞 Dhuhr       12:15 PM                      ║
║   🌤️ Asr         03:30 PM                      ║
║   🌇 Maghrib     06:12 PM  (Iftar)             ║
║   🌙 Isha        07:35 PM                      ║
║                                                ║
║  ✨ Next Prayer: Dhuhr at 12:15 PM             ║
╚════════════════════════════════════════════════╝`,

  'romdhan countdown': `╔════════════════════════════════════════════════╗
║  ✨ Ramadan Progress                           ║
╠════════════════════════════════════════════════╣
║                                                ║
║  🌙 Ramadan Mubarak!                           ║
║                                                ║
║  Day 1 of 30                                   ║
║                                                ║
║  Progress:                                     ║
║  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  3%   ║
║                                                ║
║  🎉 29 days until Eid al-Fitr!                 ║
║                                                ║
╚════════════════════════════════════════════════╝

💡 Tip: The first 10 days of Ramadan are the days of Mercy. Increase your dua!`,

  'romdhan quran': `╔════════════════════════════════════════════════╗
║  📖 Surah 1 — Al-Fatiha                        ║
╠════════════════════════════════════════════════╣
║  The Opening | 7 Ayahs | Meccan                ║
╚════════════════════════════════════════════════╝

📝 Ayahs:

┌────────────────────────────────────────────────┐
│ ﴾ 1 ﴿                                         │
│                                                │
│ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ         │
│                                                │
│ Translation: In the name of Allah, the Most    │
│ Gracious, the Most Merciful                    │
└────────────────────────────────────────────────┘

💡 Tip: Surah Al-Fatiha is recited in every rakah of every prayer!`,

  'romdhan hadith': `╔════════════════════════════════════════════════╗
║  🌙 Hadith of the Day                          ║
╠════════════════════════════════════════════════╣
║                                                ║
║  📖 Transliteration:                           ║
║  Man samma Ramadana wa-sa-ala bi-ilmin...      ║
║                                                ║
║  📚 English Translation:                       ║
║  Whoever fasts during Ramadan with faith and   ║
║  seeking reward, all his past sins will be     ║
║  forgiven.                                     ║
║                                                ║
║  ────────────────────────────────────────────  ║
║  👤 Narrated by Abu Hurairah                   ║
║  📖 Sahih al-Bukhari 2014                      ║
║                                                ║
╚════════════════════════════════════════════════╝

💡 Tip: Use --arabic flag if your terminal supports Arabic text`,

  'romdhan --help': `Usage: romdhan [command] [options]

Commands:
  prayer      🕌 Get prayer times for your city
  countdown   ⏰ Show countdown to Ramadan or Eid
  quran       📖 Read Quran surah with translation
  hadith      📖 Get a random Ramadan-related hadith
  zakat       💰 Calculate your Zakat obligation
  tasbih      📿 Digital dhikr counter
  info        🌙 Get daily Ramadan information
  settings    ⚙️  Configure your preferences

Options:
  --version   Display version number
  --help      Display help for command`,

  'romdhan --version': '1.0.2',
};

const defaultResponse = `Command not found. Type 'romdhan --help' for available commands.`;

const Demo = () => {
  const { i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; content: string }>>([
    { type: 'output', content: commandResponses['romdhan countdown'] },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.demo-container',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, { type: 'input' as const, content: input }];
    const response = commandResponses[input.toLowerCase()] || defaultResponse;
    newHistory.push({ type: 'output' as const, content: response });
    setHistory(newHistory);
    setInput('');
  };

  const resetTerminal = () => {
    setHistory([{ type: 'output', content: commandResponses['romdhan countdown'] }]);
    setInput('');
  };

  const isArabic = i18n.language === 'ar';

  return (
    <section ref={sectionRef} id="demo" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            {isArabic ? 'جربها بنفسك' : 'Try it yourself'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {isArabic
              ? 'تجربة تفاعلية مباشرة في متصفحك. اكتب أوامر وشاهد النتائج في الوقت الفعلي.'
              : 'Interactive experience right in your browser. Type commands and see results in real-time.'}
          </p>
        </div>

        {/* Terminal */}
        <div className="demo-container rounded-xl border border-border-dark bg-[#011627] overflow-hidden terminal-glow">
          {/* Terminal Header */}
          <div className="terminal-header">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
              <TerminalIcon className="w-3 h-3" />
              {isArabic ? 'الطرفية التفاعلية' : 'Interactive Terminal'}
            </div>
            <button
              onClick={resetTerminal}
              className="flex items-center gap-1 p-1 px-2 hover:bg-white/10 rounded transition-colors text-slate-500 hover:text-white"
              title={isArabic ? 'إعادة تعيين' : 'Reset'}
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          {/* Terminal Body */}
          <div className="terminal-body h-96 overflow-y-auto">
            {history.map((item, index) => (
              <div key={index} className="mb-4">
                {item.type === 'input' ? (
                  <div className="flex items-start gap-2">
                    <span className="text-primary">➜</span>
                    <span className="text-cyan-400">~</span>
                    <span className="text-white">{item.content}</span>
                  </div>
                ) : (
                  <div className="pl-6 whitespace-pre text-slate-300">{item.content}</div>
                )}
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-start gap-2">
              <span className="text-primary">➜</span>
              <span className="text-cyan-400">~</span>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={isArabic ? 'اكتب أمر...' : 'Type a command...'}
                className="flex-1 bg-transparent text-white outline-none font-mono"
                autoFocus
              />
              <button type="submit" className="text-primary hover:text-primary-dark">
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Quick Commands */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {Object.keys(commandResponses)
            .slice(0, 5)
            .map(cmd => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  setTimeout(() => {
                    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                  }, 100);
                }}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-mono hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-2"
              >
                <Play className="w-3 h-3" />
                {cmd}
              </button>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Demo;
