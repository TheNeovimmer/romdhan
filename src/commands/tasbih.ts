import { Command } from 'commander';
import readline from 'readline';
import boxen from 'boxen';
import { displayError, colors, createProgressBar } from '../utils/display.js';

const dhikrList = [
  { name: 'SubhanAllah', meaning: 'Glory be to Allah', target: 33 },
  { name: 'Alhamdulillah', meaning: 'Praise be to Allah', target: 33 },
  { name: 'Allahu Akbar', meaning: 'Allah is the Greatest', target: 34 },
  { name: 'La ilaha illallah', meaning: 'There is no god but Allah', target: 100 },
  { name: 'Astaghfirullah', meaning: 'I seek forgiveness from Allah', target: 100 },
  { name: 'Allahumma salli ala Muhammad', meaning: 'O Allah, bless Muhammad', target: 100 },
];

export const tasbihCommand = new Command('tasbih')
  .description('📿 Digital tasbih counter for dhikr')
  .option('-d, --dhikr <name>', 'Choose dhikr type', 'SubhanAllah')
  .addHelpText('after', `
${colors.info.bold('Available Dhikrs:')}
  • SubhanAllah (33 times) - Glory be to Allah
  • Alhamdulillah (33 times) - Praise be to Allah
  • Allahu Akbar (34 times) - Allah is the Greatest
  • La ilaha illallah (100 times) - There is no god but Allah
  • Astaghfirullah (100 times) - I seek forgiveness
  • Allahumma salli ala Muhammad (100 times) - Bless Muhammad

${colors.info.bold('Usage:')}
  Press ENTER to count
  Press q + ENTER to quit

${colors.info.bold('Examples:')}
  $ romdhan tasbih                           # Default: SubhanAllah
  $ romdhan tasbih --dhikr "Alhamdulillah"   # Specific dhikr
  `)
  .action(async (options) => {
    const dhikrName = options.dhikr;
    const selectedDhikr = dhikrList.find(d => d.name.toLowerCase() === dhikrName.toLowerCase()) || dhikrList[0];
    
    let count = 0;
    const target = selectedDhikr.target;

    console.clear();

    const displayCounter = () => {
      const progress = createProgressBar(count, target, 25);

      console.log(
        boxen(
          `${colors.accent.bold(selectedDhikr.name)}\n` +
          `${colors.muted(selectedDhikr.meaning)}\n\n` +
          `${colors.info('Count:')} ${colors.primary.bold(`${count} / ${target}`)}\n\n` +
          `${progress}\n\n` +
          `${colors.success('Press ENTER to count')}\n` +
          `${colors.muted('Press q + ENTER to quit')}`,
          {
            padding: 2,
            margin: 1,
            borderStyle: 'double',
            borderColor: '#00D9FF',
            title: '📿 Digital Tasbih',
            titleAlignment: 'center',
          }
        )
      );
    };

    displayCounter();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on('line', (input) => {
      if (input.toLowerCase() === 'q') {
        console.log(colors.success('\n✨ May Allah accept your dhikr!\n'));
        rl.close();
        process.exit(0);
      }

      if (count < target) {
        count++;
        console.clear();
        displayCounter();

        if (count === target) {
          console.log('\n');
          console.log(
            boxen(
              `${colors.success.bold('🎉 Target Completed!')}\n\n` +
              `${colors.white(`You completed ${target} counts of ${selectedDhikr.name}`)}\n\n` +
              `${colors.accent('May Allah accept your dhikr')}`,
              {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: '#00E676',
              }
            )
          );
          console.log(colors.muted('\nPress q + ENTER to exit\n'));
        }
      }
    });

    // Handle Ctrl+C gracefully
    process.on('SIGINT', () => {
      console.log(colors.success('\n\n✨ May Allah accept your dhikr!\n'));
      rl.close();
      process.exit(0);
    });
  });
