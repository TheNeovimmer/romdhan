import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import boxen from 'boxen';
import { fetchSurah } from '../api/quran.js';
import { displayError } from '../utils/display.js';

export const quranCommand = new Command('quran')
  .description('Read Quran surah')
  .option('-s, --surah <number>', 'Surah number (1-114)', '1')
  .option('-l, --limit <number>', 'Limit number of ayahs to display', '10')
  .action(async (options) => {
    const spinner = ora('Fetching surah...').start();

    try {
      const surahNumber = parseInt(options.surah);
      const limit = parseInt(options.limit);

      if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
        spinner.stop();
        displayError('Please provide a valid surah number (1-114)');
        return;
      }

      const surah = await fetchSurah(surahNumber);
      
      spinner.stop();

      // Display surah header
      console.log(
        boxen(
          `
${chalk.yellow.bold(surah.name)} ${chalk.white(`(${surah.englishName})`)}

${chalk.cyan(surah.englishNameTranslation)}
${chalk.magenta(`Ayahs: ${surah.numberOfAyahs} | Type: ${surah.revelationType}`)}
          `.trim(),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'green',
            title: `📖 Surah ${surah.number}`,
            titleAlignment: 'center',
          }
        )
      );

      // Display ayahs
      console.log(chalk.yellow.bold('\n📝 Ayahs:\n'));

      const ayahsToShow = surah.ayahs.slice(0, limit);
      
      ayahsToShow.forEach((ayah, index) => {
        const ayahBox = boxen(
          `
${chalk.cyan.bold(`﴾ ${ayah.number} ﴿`)}

${chalk.white(ayah.text)}

${ayah.translation ? chalk.gray(`Translation: ${ayah.translation}`) : ''}
          `.trim(),
          {
            padding: 1,
            margin: 0,
            borderStyle: 'single',
            borderColor: 'cyan',
          }
        );

        console.log(ayahBox);
        
        if (index < ayahsToShow.length - 1) {
          console.log();
        }
      });

      if (surah.ayahs.length > limit) {
        console.log(
          boxen(
            chalk.yellow(`Showing ${limit} of ${surah.ayahs.length} ayahs. Use --limit ${surah.ayahs.length} to see all.`),
            {
              padding: 1,
              margin: 1,
              borderStyle: 'round',
              borderColor: 'yellow',
            }
          )
        );
      }

    } catch (error) {
      spinner.stop();
      displayError('Failed to fetch surah. Please try again.');
    }
  });
