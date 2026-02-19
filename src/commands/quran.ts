import { Command } from 'commander';
import ora from 'ora';
import boxen from 'boxen';
import { fetchSurah } from '../api/quran.js';
import { displayError, colors, displayTip } from '../utils/display.js';

export const quranCommand = new Command('quran')
  .description('📖 Read Quran surah with translation')
  .option('-s, --surah <number>', 'Surah number (1-114)', '1')
  .option('-l, --limit <number>', 'Limit number of ayahs to display', '10')
  .addHelpText('after', `
${colors.info.bold('Examples:')}
  $ romdhan quran                    # Read Surah Al-Fatiha
  $ romdhan quran -s 36              # Read Surah Yaseen
  $ romdhan quran --surah 2 --limit 5  # Read first 5 ayahs of Surah Al-Baqarah

${colors.info.bold('Popular Surahs:')}
  1. Al-Fatiha (The Opening)
  36. Yaseen
  67. Al-Mulk
  112. Al-Ikhlas
  114. An-Nas
  `)
  .action(async (options) => {
    const surahNumber = parseInt(options.surah);
    const limit = parseInt(options.limit);

    if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
      displayError(
        'Invalid surah number',
        'Please provide a number between 1 and 114. Example: "romdhan quran --surah 1"'
      );
      return;
    }

    const spinner = ora({
      text: colors.info(`Loading Surah ${surahNumber}...`),
      spinner: 'dots',
    }).start();

    try {
      const surah = await fetchSurah(surahNumber);
      spinner.stop();

      // Display surah header
      console.log('\n');
      console.log(
        boxen(
          `${colors.accent.bold(surah.englishName)}\n` +
          `${colors.info(surah.englishNameTranslation)}\n\n` +
          `${colors.muted(`Ayahs: ${surah.numberOfAyahs} | Type: ${surah.revelationType}`)}`,
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: '#00E676',
            title: `📖 Surah ${surah.number}`,
            titleAlignment: 'center',
          }
        )
      );

      // Display ayahs
      const ayahsToShow = surah.ayahs.slice(0, limit);
      
      console.log(colors.accent.bold('\n📝 Ayahs:\n'));
      
      ayahsToShow.forEach((ayah, index) => {
        const isLast = index === ayahsToShow.length - 1;
        
        console.log(
          boxen(
            `${colors.primary.bold(`﴾ ${ayah.number} ﴿`)}\n\n` +
            `${colors.white(ayah.text)}\n\n` +
            (ayah.translation ? `${colors.muted('Translation:')} ${colors.info(ayah.translation)}` : ''),
            {
              padding: 1,
              margin: 0,
              borderStyle: 'single',
              borderColor: '#64B5F6',
            }
          )
        );
        
        if (!isLast) {
          console.log();
        }
      });

      if (surah.ayahs.length > limit) {
        console.log('\n');
        console.log(
          boxen(
            colors.warning(`Showing ${limit} of ${surah.ayahs.length} ayahs`) + '\n' +
            colors.muted(`Use --limit ${surah.ayahs.length} to see all ayahs`),
            {
              padding: 1,
              margin: 1,
              borderStyle: 'round',
              borderColor: '#FFD93D',
            }
          )
        );
      }

      console.log('\n');

      // Tips for specific surahs
      if (surahNumber === 1) {
        displayTip('Surah Al-Fatiha is recited in every rakah of every prayer!');
      } else if (surahNumber === 18) {
        displayTip('Surah Al-Kahf is recommended to be read every Friday!');
      } else if (surahNumber === 67) {
        displayTip('Surah Al-Mulk protects from the punishment of the grave!');
      }

    } catch (error) {
      spinner.stop();
      displayError(
        `Failed to fetch Surah ${surahNumber}`,
        'Please check your internet connection and try again'
      );
    }
  });
