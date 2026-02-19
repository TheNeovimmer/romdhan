import { Command } from 'commander';
import boxen from 'boxen';
import { getMoonPhase, getRamadanDay } from '../utils/moon.js';
import { getRandomQuote } from '../utils/quotes.js';
import { getSettings } from '../utils/config.js';
import dayjs from 'dayjs';
import { colors, createProgressBar, displayTip, displayQuickStart } from '../utils/display.js';

export const infoCommand = new Command('info')
  .description('🌙 Get daily Ramadan information and inspiration')
  .option('--tips', 'Show additional tips for Ramadan')
  .addHelpText('after', `
${colors.info.bold('Displays:')}
  • Current Ramadan status
  • Moon phase
  • Motivational quote
  • Daily tip

${colors.info.bold('Examples:')}
  $ romdhan info
  $ romdhan info --tips
  `)
  .action((options) => {
    const ramadanDay = getRamadanDay();
    const moonPhase = getMoonPhase();
    const quote = getRandomQuote();
    const settings = getSettings();

    console.log('\n');

    // Status Section
    let statusContent = '';
    if (ramadanDay !== null) {
      statusContent += `${colors.success.bold('🌙 Ramadan Mubarak!')}\n\n`;
      statusContent += `${colors.accent('Day')} ${colors.primary.bold(ramadanDay)} ${colors.accent('of')} ${colors.primary.bold('30')}\n`;
      statusContent += `${createProgressBar(ramadanDay, 30)}\n`;
    } else {
      const nextRamadan = new Date('2026-02-18');
      const daysUntil = Math.ceil((nextRamadan.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      statusContent += `${colors.info.bold('⏰ Ramadan Countdown')}\n\n`;
      statusContent += `${colors.warning.bold(`${daysUntil} days`)} ${colors.white('until Ramadan 2026')}\n`;
      statusContent += `${colors.muted(dayjs(nextRamadan).format('MMMM D, YYYY'))}`;
    }

    statusContent += `\n\n${colors.accent('🌙 Moon Phase:')} ${colors.primary(moonPhase)}`;

    console.log(
      boxen(statusContent, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: '#00D9FF',
        title: '📅 Daily Info',
        titleAlignment: 'center',
      })
    );

    // Quote Section
    console.log(
      boxen(
        `${colors.white(`"${quote.quote}"`)}\n\n${colors.muted(`— ${quote.author}`)}`,
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: '#FFD93D',
          title: '💫 Daily Inspiration',
          titleAlignment: 'center',
        }
      )
    );

    // Tips
    const tips = [
      'Eat Suhoor - it contains blessings',
      'Make dua during the last third of the night',
      'Read at least one page of Quran daily',
      'Give charity, even if small',
      'Pray Taraweeh in congregation',
      'Learn one new thing about Islam today',
      'Stay hydrated between Iftar and Suhoor',
      'Help prepare Iftar for your family',
      'Visit the sick and elderly',
      'Control your anger and tongue',
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    displayTip(randomTip);

    // Show quick start for first-time users
    if (settings.city === 'Mecca' && settings.country === 'SA') {
      displayQuickStart();
    }

    console.log('\n');
  });
