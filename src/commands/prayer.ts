import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import boxen from 'boxen';
import dayjs from 'dayjs';
import { fetchPrayerTimes, PrayerTimesResponse } from '../api/aladhan.js';
import { getSettings } from '../utils/config.js';
import { displayError } from '../utils/display.js';

export const prayerCommand = new Command('prayer')
  .description('Get prayer times for a specific city')
  .option('-c, --city <city>', 'City name')
  .option('-C, --country <country>', 'Country code (e.g., US, UK, SA)')
  .option('-m, --method <method>', 'Calculation method (1-7)', '2')
  .action(async (options) => {
    const spinner = ora('Fetching prayer times...').start();

    try {
      const settings = getSettings();
      const city = options.city || settings.city;
      const country = options.country || settings.country;
      const method = parseInt(options.method) || settings.calculationMethod;

      if (!city || !country) {
        spinner.stop();
        displayError('Please provide city and country, or set defaults using "ramadan settings"');
        return;
      }

      const data: PrayerTimesResponse = await fetchPrayerTimes(city, country, method);
      
      spinner.stop();

      const { timings, date, meta } = data.data;

      const prayerBox = boxen(
        `
${chalk.yellow.bold('📅 Date:')} ${chalk.white(date.readable)}
${chalk.yellow.bold('📆 Hijri Date:')} ${chalk.white(`${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year} AH`)}
${chalk.yellow.bold('🌍 Timezone:')} ${chalk.white(meta.timezone)}
${chalk.yellow.bold('📐 Method:')} ${chalk.white(meta.method.name)}

${chalk.cyan.bold('🕐 Prayer Times')}
${'─'.repeat(30)}

🌅 ${chalk.yellow('Fajr:')}      ${chalk.cyan(timings.Fajr)}
☀️  ${chalk.yellow('Sunrise:')}  ${chalk.cyan(timings.Sunrise)}
🌞 ${chalk.yellow('Dhuhr:')}    ${chalk.cyan(timings.Dhuhr)}
🌤  ${chalk.yellow('Asr:')}      ${chalk.cyan(timings.Asr)}
🌇 ${chalk.yellow('Maghrib:')}  ${chalk.cyan.bold(timings.Maghrib)} ${chalk.green('(Iftar)')}
🌙 ${chalk.yellow('Isha:')}     ${chalk.cyan(timings.Isha)}
        `.trim(),
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'green',
          title: `🕌 Prayer Times for ${city}, ${country}`,
          titleAlignment: 'center',
        }
      );

      console.log(prayerBox);

      // Show current/next prayer
      const currentTime = dayjs();
      const prayers = [
        { name: 'Fajr', time: timings.Fajr },
        { name: 'Dhuhr', time: timings.Dhuhr },
        { name: 'Asr', time: timings.Asr },
        { name: 'Maghrib', time: timings.Maghrib },
        { name: 'Isha', time: timings.Isha },
      ];

      let nextPrayer = null;
      for (const prayer of prayers) {
        const prayerTime = dayjs(`${dayjs().format('YYYY-MM-DD')} ${prayer.time}`);
        if (prayerTime.isAfter(currentTime)) {
          nextPrayer = prayer;
          break;
        }
      }

      if (nextPrayer) {
        console.log(
          boxen(
            chalk.green.bold(`⏰ Next Prayer: ${nextPrayer.name} at ${nextPrayer.time}`),
            {
              padding: 1,
              borderStyle: 'round',
              borderColor: 'cyan',
            }
          )
        );
      }

    } catch (error) {
      spinner.stop();
      displayError('Failed to fetch prayer times. Please check your city/country and try again.');
    }
  });
