import { Command } from 'commander';
import ora from 'ora';
import { fetchRandomHadith } from '../api/hadith.js';
import { displayError, colors, supportsArabic } from '../utils/display.js';
import boxen from 'boxen';

export const hadithCommand = new Command('hadith')
  .description('📖 Get a random Ramadan-related hadith')
  .option('--arabic', 'Show Arabic text (if your terminal supports it)')
  .addHelpText('after', `
${colors.info.bold('About:')}
  Displays authentic hadiths about Ramadan, fasting, and related topics.
  Arabic text is shown in transliteration by default for better terminal compatibility.

${colors.info.bold('Examples:')}
  $ romdhan hadith              # Show hadith with transliteration
  $ romdhan hadith --arabic     # Show Arabic text (if supported)
  `)
  .action(async (options) => {
    const spinner = ora({
      text: colors.info('Fetching hadith...'),
      spinner: 'dots',
    }).start();

    try {
      const hadith = await fetchRandomHadith();
      spinner.stop();

      const showArabic = options.arabic && supportsArabic();
      
      let content = '';
      
      // Arabic or Transliteration
      if (showArabic && hadith.arabic) {
        content += `${colors.accent.bold('📖 Arabic:')}\n${colors.primary(hadith.arabic)}\n\n`;
      } else {
        content += `${colors.accent.bold('📖 Transliteration:')}\n${colors.info(hadith.transliteration)}\n\n`;
      }

      // English translation
      content += `${colors.success.bold('📚 English Translation:')}\n${colors.white(hadith.english.text)}\n\n`;

      // Metadata
      content += `${colors.muted('─'.repeat(40))}\n`;
      content += `${colors.warning('👤 ')}${colors.white(hadith.english.narrator)}\n`;
      content += `${colors.warning('📖 ')}${colors.white(hadith.reference)}`;

      console.log('\n');
      console.log(
        boxen(content, {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: '#FFD93D',
          title: '🌙 Hadith of the Day',
          titleAlignment: 'center',
        })
      );
      console.log('\n');

      if (!showArabic && !options.arabic) {
        console.log(colors.muted('💡 Tip: Use --arabic flag if your terminal supports Arabic text\n'));
      }

    } catch (error) {
      spinner.stop();
      displayError('Failed to fetch hadith', 'Please check your internet connection and try again');
    }
  });
