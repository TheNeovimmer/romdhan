import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import boxen from 'boxen';
import { fetchRandomHadith } from '../api/hadith.js';
import { displayError } from '../utils/display.js';

export const hadithCommand = new Command('hadith')
  .description('Get a random Ramadan-related hadith')
  .action(async () => {
    const spinner = ora('Fetching hadith...').start();

    try {
      const hadith = await fetchRandomHadith();
      
      spinner.stop();

      console.log(
        boxen(
          `
${chalk.yellow.bold('📖 Arabic:')}
${chalk.cyan(hadith.arabic)}

${chalk.green.bold('📚 English Translation:')}
${chalk.white(hadith.english.text)}

${chalk.magenta.bold('👤 Narrator:')} ${chalk.white(hadith.english.narrator)}
${chalk.magenta.bold('📖 Reference:')} ${chalk.white(hadith.reference)}
          `.trim(),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'yellow',
            title: '🌙 Hadith of the Day',
            titleAlignment: 'center',
          }
        )
      );
    } catch (error) {
      spinner.stop();
      displayError('Failed to fetch hadith.');
    }
  });
