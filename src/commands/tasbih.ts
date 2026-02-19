import { Command } from 'commander';
import readline from 'readline';
import chalk from 'chalk';
import boxen from 'boxen';
import { displayError } from '../utils/display.js';

const dhikrList = [
  { name: 'SubhanAllah', meaning: 'Glory be to Allah', target: 33 },
  { name: 'Alhamdulillah', meaning: 'Praise be to Allah', target: 33 },
  { name: 'Allahu Akbar', meaning: 'Allah is the Greatest', target: 34 },
  { name: 'La ilaha illallah', meaning: 'There is no god but Allah', target: 100 },
  { name: 'Astaghfirullah', meaning: 'I seek forgiveness from Allah', target: 100 },
  { name: 'Allahumma salli ala Muhammad', meaning: 'O Allah, bless Muhammad', target: 100 },
];

export const tasbihCommand = new Command('tasbih')
  .description('Digital tasbih counter for dhikr')
  .option('-d, --dhikr <name>', 'Choose dhikr type', 'SubhanAllah')
  .action(async (options) => {
    const dhikrName = options.dhikr;
    const selectedDhikr = dhikrList.find(d => d.name.toLowerCase() === dhikrName.toLowerCase()) || dhikrList[0];
    
    let count = 0;
    let target = selectedDhikr.target;

    console.clear();

    const displayCounter = () => {
      const progressBar = '▓'.repeat(Math.floor((count / target) * 20)) + '░'.repeat(20 - Math.floor((count / target) * 20));
      const percentage = Math.round((count / target) * 100);

      console.log(
        boxen(
          `
${chalk.yellow.bold(selectedDhikr.name)}
${chalk.gray(selectedDhikr.meaning)}

${chalk.cyan.bold(`Count: ${count} / ${target}`)}

${chalk.green(progressBar)} ${percentage}%

${chalk.magenta('Press ENTER to count')}
${chalk.gray('Press q + ENTER to quit')}
          `.trim(),
          {
            padding: 2,
            margin: 1,
            borderStyle: 'double',
            borderColor: 'cyan',
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
        console.log(chalk.green('\n✨ May Allah accept your dhikr!\n'));
        rl.close();
        process.exit(0);
      }

      if (count < target) {
        count++;
        console.clear();
        displayCounter();

        if (count === target) {
          console.log(
            boxen(
              chalk.green.bold('🎉 Target completed!\n') +
              chalk.yellow('You have completed your dhikr.'),
              {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'green',
              }
            )
          );
        }
      }
    });

    // Handle Ctrl+C gracefully
    process.on('SIGINT', () => {
      console.log(chalk.green('\n\n✨ May Allah accept your dhikr!\n'));
      rl.close();
      process.exit(0);
    });
  });
