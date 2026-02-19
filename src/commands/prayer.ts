import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import boxen from 'boxen';
import dayjs from 'dayjs';
import { fetchPrayerTimes, PrayerTimesResponse } from '../api/aladhan.js';
import { getSettings } from '../utils/config.js';
import { 
  displayError, 
  colors, 
  formatPrayerTime, 
  createTableRow,
  displayTip 
} from '../utils/display.js';

export const prayerCommand = new Command('prayer')
  .description('🕌 Get prayer times for your city')
  .option('-c, --city <city>', 'City name (e.g., New York, London)')
  .option('-C, --country <country>', 'Country code (e.g., US, UK, SA)')
  .option('-m, --method <method>', 'Calculation method (1-15)', '2')
  .addHelpText('after', `
${colors.info.bold('Examples:')}
  $ romdhan prayer                          # Use saved location
  $ romdhan prayer -c "New York" -C US     # Specify location
  $ romdhan prayer --method 4              # Use Makkah method

${colors.muted('Tip: Set your default location with')} ${colors.success('romdhan settings')}
  `)
  .action(async (options) => {
    const settings = getSettings();
    const city = options.city || settings.city;
    const country = options.country || settings.country;
    const method = parseInt(options.method) || settings.calculationMethod;

    if (!city || !country) {
      displayError(
        'No location configured',
        'Run "romdhan settings" to set your city and country, or provide them with --city and --country options'
      );
      return;
    }

    const spinner = ora({
      text: colors.info(`Fetching prayer times for ${city}...`),
      spinner: 'moon',
    }).start();

    try {
      const data: PrayerTimesResponse = await fetchPrayerTimes(city, country, method);
      spinner.stop();

      const { timings, date, meta } = data.data;
      const currentTime = dayjs();

      // Find next prayer
      const prayers = [
        { name: 'Fajr', time: timings.Fajr, icon: '🌅' },
        { name: 'Sunrise', time: timings.Sunrise, icon: '☀️' },
        { name: 'Dhuhr', time: timings.Dhuhr, icon: '🌞' },
        { name: 'Asr', time: timings.Asr, icon: '🌤️' },
        { name: 'Maghrib', time: timings.Maghrib, icon: '🌇' },
        { name: 'Isha', time: timings.Isha, icon: '🌙' },
      ];

      let nextPrayerIndex = -1;
      for (let i = 0; i < prayers.length; i++) {
        const prayerTime = dayjs(`${dayjs().format('YYYY-MM-DD')} ${prayers[i].time}`);
        if (prayerTime.isAfter(currentTime)) {
          nextPrayerIndex = i;
          break;
        }
      }

      // Build prayer times display
      let prayerTimesText = '\n';
      prayers.forEach((prayer, index) => {
        const isNext = index === nextPrayerIndex;
        const highlight = isNext ? colors.success.bold('▶') : ' ';
        const timeColor = isNext ? colors.success : colors.primary;
        const nameColor = isNext ? colors.success.bold : colors.info;
        const special = prayer.name === 'Maghrib' ? colors.warning(' (Iftar)') : '';
        
        prayerTimesText += `${highlight} ${prayer.icon} ${nameColor(prayer.name.padEnd(10))} ${timeColor.bold(prayer.time)}${special}\n`;
      });

      const content = `
${colors.accent.bold('📅 Date Information')}
${createTableRow('Gregorian', date.readable, '📆')}
${createTableRow('Hijri', `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year} AH`, '🌙')}
${createTableRow('Timezone', meta.timezone, '🌍')}
${createTableRow('Method', meta.method.name, '📐')}

${colors.accent.bold('🕐 Prayer Times')}
${prayerTimesText}
${nextPrayerIndex !== -1 
  ? colors.success(`\n✨ Next Prayer: ${prayers[nextPrayerIndex].name} at ${prayers[nextPrayerIndex].time}`)
  : colors.muted('\n✓ All prayers completed for today')}
      `.trim();

      console.log('\n');
      console.log(
        boxen(content, {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: '#00D9FF',
          title: `🕌 ${city}, ${country}`,
          titleAlignment: 'center',
        })
      );
      console.log('\n');

      // Show tip for beginners
      if (nextPrayerIndex !== -1 && prayers[nextPrayerIndex].name === 'Maghrib') {
        displayTip('Remember to make dua before breaking your fast!');
      }

    } catch (error) {
      spinner.stop();
      displayError(
        `Failed to fetch prayer times for "${city}, ${country}"`,
        'Check your spelling or try a different city name. Example: "New York", "London", "Mecca"'
      );
    }
  });
