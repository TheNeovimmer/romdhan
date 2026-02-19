import { Command } from 'commander';
import chalk from 'chalk';
import boxen from 'boxen';
import { getMoonPhase, getRamadanDay } from '../utils/moon.js';
import { getRandomQuote } from '../utils/quotes.js';
import { getSettings } from '../utils/config.js';
import dayjs from 'dayjs';

export const infoCommand = new Command('info')
  .description('Get daily Ramadan information and inspiration')
  .action(() => {
    const ramadanDay = getRamadanDay();
    const moonPhase = getMoonPhase();
    const quote = getRandomQuote();
    const settings = getSettings();

    let statusMessage = '';
    if (ramadanDay !== null) {
      statusMessage = chalk.green.bold(`🌙 Ramadan Day ${ramadanDay} of 30`);
    } else {
      const nextRamadan = new Date('2026-02-18');
      const daysUntil = Math.ceil((nextRamadan.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      statusMessage = chalk.yellow(`⏰ ${daysUntil} days until Ramadan 2026`);
    }

    console.log(
      boxen(
        `
${chalk.cyan.bold('📅 Gregorian Date:')} ${dayjs().format('MMMM D, YYYY')}

${statusMessage}

${chalk.magenta.bold('🌙 Moon Phase:')} ${moonPhase}
        `.trim(),
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'cyan',
          title: '🌙 Daily Ramadan Info',
          titleAlignment: 'center',
        }
      )
    );

    // Motivational Quote
    console.log(
      boxen(
        `
${chalk.white(`"${quote.quote}"`)}

${chalk.gray(`— ${quote.author}`)}
        `.trim(),
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'yellow',
          title: '💫 Motivational Quote',
          titleAlignment: 'center',
        }
      )
    );

    // Tips
    const tips = [
      '🥗 Eat Suhoor - it contains blessings',
      '🤲 Make dua during the last third of the night',
      '📖 Read at least one page of Quran daily',
      '🎁 Give charity, even if small',
      '🙏 Pray Taraweeh in congregation',
      '🧠 Learn one new thing about Islam today',
      '💧 Stay hydrated between Iftar and Suhoor',
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    console.log(
      boxen(
        chalk.cyan(`${randomTip}`),
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'green',
          title: '💡 Tip of the Day',
          titleAlignment: 'center',
        }
      )
    );
  });
