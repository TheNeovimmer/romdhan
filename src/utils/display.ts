import chalk from 'chalk';
import figlet from 'figlet';
import boxen from 'boxen';

export const displayBanner = (): void => {
  console.log(
    chalk.cyan(
      figlet.textSync('ROMDHAN', {
        font: 'Big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  );
  console.log(
    boxen(chalk.yellow('🌙  Your Companion for the Blessed Month'), {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'yellow',
    })
  );
};

export const displayError = (message: string): void => {
  console.error(
    boxen(chalk.red(`❌ Error: ${message}`), {
      padding: 1,
      borderStyle: 'round',
      borderColor: 'red',
    })
  );
};

export const displaySuccess = (message: string): void => {
  console.log(
    boxen(chalk.green(`✅ ${message}`), {
      padding: 1,
      borderStyle: 'round',
      borderColor: 'green',
    })
  );
};

export const formatPrayerTime = (time: string): string => {
  return chalk.cyan(time);
};

export const formatLabel = (label: string): string => {
  return chalk.yellow.bold(label);
};
