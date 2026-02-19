import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import boxen from 'boxen';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { fetchRamadanDate } from '../api/aladhan.js';
import { getRamadanDay } from '../utils/moon.js';
import { displayError, colors, createProgressBar, displayTip } from '../utils/display.js';

dayjs.extend(duration);

export const countdownCommand = new Command('countdown')
  .description('⏰ Show countdown to Ramadan or Eid')
  .addHelpText('after', `
${colors.info.bold('Displays:')}
  • Days remaining until Ramadan (if before)
  • Current day of Ramadan with progress (if during)
  • Days until next Ramadan (if after)

${colors.info.bold('Examples:')}
  $ romdhan countdown
  `)
  .action(async () => {
    const spinner = ora({
      text: colors.info('Calculating...'),
      spinner: 'moon',
    }).start();

    try {
      const today = new Date();
      const currentYear = today.getFullYear();
      
      const { start: ramadanStart, end: ramadanEnd } = await fetchRamadanDate(currentYear);
      
      spinner.stop();

      const ramadanDay = getRamadanDay();

      if (ramadanDay !== null) {
        // Ramadan is ongoing
        const daysUntilEid = Math.ceil((ramadanEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const progressBar = createProgressBar(ramadanDay, 30);

        const content = `
${colors.success.bold('🌙 Ramadan Mubarak!')}\n\n` +
          `${colors.accent('Day')} ${colors.primary.bold(ramadanDay)} ${colors.accent('of')} ${colors.primary.bold('30')}\n\n` +
          `${colors.info('Progress:')}\n${progressBar}\n\n` +
          `${colors.warning('🎉')} ${colors.white(`${daysUntilEid} days until Eid al-Fitr!`)}`;

        console.log('\n');
        console.log(
          boxen(content, {
            padding: 1,
            margin: 1,
            borderStyle: 'double',
            borderColor: '#00E676',
            title: '✨ Ramadan Progress',
            titleAlignment: 'center',
          })
        );
        console.log('\n');

        if (ramadanDay < 10) {
          displayTip('The first 10 days of Ramadan are the days of Mercy. Increase your dua!');
        } else if (ramadanDay < 20) {
          displayTip('The second 10 days are the days of Forgiveness. Seek Allah\'s forgiveness!');
        } else {
          displayTip('The last 10 days are the days of Salvation from the Fire. Seek Laylatul Qadr!');
        }

      } else if (today < ramadanStart) {
        // Before Ramadan starts
        const daysUntilRamadan = Math.ceil((ramadanStart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(daysUntilRamadan / 7);
        const remainingDays = daysUntilRamadan % 7;

        const content = `
${colors.accent.bold('📅 Next Ramadan')}\n` +
          `${colors.primary(dayjs(ramadanStart).format('MMMM D, YYYY'))}\n\n` +
          `${colors.success.bold(`⏰ ${daysUntilRamadan} days remaining`)}\n\n` +
          `${colors.info(`Approximately ${weeks} weeks and ${remainingDays} days`)}\n\n` +
          `${colors.warning('🌟 Start preparing your heart and soul!')}`;

        console.log('\n');
        console.log(
          boxen(content, {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: '#64B5F6',
            title: '🌙 Countdown to Ramadan',
            titleAlignment: 'center',
          })
        );
        console.log('\n');

        displayTip('Start preparing now by fasting voluntarily (Sunnah fasts) before Ramadan begins!');

      } else {
        // After Ramadan
        const nextYear = currentYear + 1;
        const { start: nextRamadan } = await fetchRamadanDate(nextYear);
        const daysUntilNextRamadan = Math.ceil((nextRamadan.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        const content = `
${colors.success.bold('Eid Mubarak! 🎉')}\n\n` +
          `${colors.info(`Ramadan ${currentYear} has ended.`)}\n\n` +
          `${colors.accent('Next Ramadan:')} ${colors.primary(dayjs(nextRamadan).format('MMMM D, YYYY'))}\n` +
          `${colors.muted(`${daysUntilNextRamadan} days until then`)}\n\n` +
          `${colors.white('May Allah accept your fasts and prayers!')}`;

        console.log('\n');
        console.log(
          boxen(content, {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: '#FFD93D',
            title: '✨ Until Next Ramadan',
            titleAlignment: 'center',
          })
        );
        console.log('\n');
      }
    } catch (error) {
      spinner.stop();
      displayError('Failed to calculate countdown', 'Please check your internet connection');
    }
  });
