import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import boxen from 'boxen';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { fetchRamadanDate } from '../api/aladhan.js';
import { getRamadanDay } from '../utils/moon.js';
import { displayError } from '../utils/display.js';

dayjs.extend(duration);

export const countdownCommand = new Command('countdown')
  .description('Show countdown to Ramadan or Eid')
  .action(async () => {
    const spinner = ora('Calculating...').start();

    try {
      const today = new Date();
      const currentYear = today.getFullYear();
      
      const { start: ramadanStart, end: ramadanEnd } = await fetchRamadanDate(currentYear);
      
      spinner.stop();

      const ramadanDay = getRamadanDay();

      if (ramadanDay !== null) {
        // Ramadan is ongoing
        const daysUntilEid = Math.ceil((ramadanEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        const progressBar = '▓'.repeat(ramadanDay) + '░'.repeat(30 - ramadanDay);
        const percentage = Math.round((ramadanDay / 30) * 100);

        console.log(
          boxen(
            `
${chalk.green.bold('🌙 Ramadan Mubarak!')}

${chalk.yellow(`Day ${ramadanDay} of 30`)}

${chalk.cyan('Progress:')} ${percentage}%
${chalk.green(progressBar)}

${chalk.magenta(`🎉 ${daysUntilEid} days until Eid al-Fitr!`)}
            `.trim(),
            {
              padding: 1,
              margin: 1,
              borderStyle: 'double',
              borderColor: 'green',
              title: '✨ Ramadan Countdown',
              titleAlignment: 'center',
            }
          )
        );
      } else if (today < ramadanStart) {
        // Before Ramadan starts
        const daysUntilRamadan = Math.ceil((ramadanStart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        const weeks = Math.floor(daysUntilRamadan / 7);
        const remainingDays = daysUntilRamadan % 7;

        console.log(
          boxen(
            `
${chalk.cyan.bold('📅 Next Ramadan:')} ${chalk.white(dayjs(ramadanStart).format('MMMM D, YYYY'))}

${chalk.green.bold(`⏰ ${daysUntilRamadan} days remaining`)}

${chalk.yellow(`That's approximately ${weeks} weeks and ${remainingDays} days`)}

${chalk.magenta('🌟 Start preparing your heart and soul!')}
            `.trim(),
            {
              padding: 1,
              margin: 1,
              borderStyle: 'round',
              borderColor: 'cyan',
              title: '🌙 Countdown to Ramadan',
              titleAlignment: 'center',
            }
          )
        );
      } else {
        // After Ramadan
        const nextYear = currentYear + 1;
        const { start: nextRamadan } = await fetchRamadanDate(nextYear);
        const daysUntilNextRamadan = Math.ceil((nextRamadan.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        console.log(
          boxen(
            `
${chalk.yellow.bold('Eid Mubarak! 🎉')}

${chalk.cyan(`Ramadan ${currentYear} has ended.`)}

${chalk.green(`Next Ramadan: ${dayjs(nextRamadan).format('MMMM D, YYYY')}`)}
${chalk.magenta(`Days until then: ${daysUntilNextRamadan}`)}

${chalk.white('May Allah accept your fasts and prayers!')}
            `.trim(),
            {
              padding: 1,
              margin: 1,
              borderStyle: 'round',
              borderColor: 'yellow',
              title: '✨ Until Next Ramadan',
              titleAlignment: 'center',
            }
          )
        );
      }
    } catch (error) {
      spinner.stop();
      displayError('Failed to calculate countdown.');
    }
  });
