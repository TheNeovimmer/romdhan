import { Command } from 'commander';
import inquirer from 'inquirer';
import boxen from 'boxen';
import ora from 'ora';
import { displaySuccess, displayError, colors, createTableRow, displayTip } from '../utils/display.js';

interface ZakatAnswers {
  savings: string;
  gold: string;
  silver: string;
  investments: string;
  debts: string;
}

export const zakatCommand = new Command('zakat')
  .description('💰 Calculate your Zakat (2.5% of qualifying wealth)')
  .addHelpText('after', `
${colors.info.bold('What is Zakat?')}
  Zakat is 2.5% of your total qualifying wealth that has been in your
  possession for one lunar year (haul).

${colors.info.bold('Nisab Threshold:')}
  Approximately $400+ USD (varies by current gold/silver prices)
  If your net wealth is below this, Zakat is not obligatory.

${colors.info.bold('Examples:')}
  $ romdhan zakat    # Start interactive calculator
  `)
  .action(async () => {
    console.log('\n');
    console.log(
      boxen(
        `${colors.accent.bold('💰 Zakat Calculator')}\n\n` +
        `${colors.white('Calculate your annual Zakat obligation')}\n\n` +
        `${colors.muted('Zakat Rate:')} ${colors.success('2.5%')}\n` +
        `${colors.muted('Nisab Threshold:')} ${colors.warning('~$400 USD')}`,
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: '#FFD93D',
          title: '🌙 Islamic Zakat',
          titleAlignment: 'center',
        }
      )
    );

    try {
      const answers = await inquirer.prompt<ZakatAnswers>([
        {
          type: 'input',
          name: 'savings',
          message: colors.primary('💵 Cash savings and bank accounts:'),
          default: '0',
          validate: (input: string) => {
            if (isNaN(Number(input)) || Number(input) < 0) {
              return 'Please enter a valid number';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'gold',
          message: colors.primary('🥇 Value of gold you own ($):'),
          default: '0',
          validate: (input: string) => {
            if (isNaN(Number(input)) || Number(input) < 0) {
              return 'Please enter a valid number';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'silver',
          message: colors.primary('🥈 Value of silver you own ($):'),
          default: '0',
          validate: (input: string) => {
            if (isNaN(Number(input)) || Number(input) < 0) {
              return 'Please enter a valid number';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'investments',
          message: colors.primary('📈 Value of investments and stocks ($):'),
          default: '0',
          validate: (input: string) => {
            if (isNaN(Number(input)) || Number(input) < 0) {
              return 'Please enter a valid number';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'debts',
          message: colors.primary('💳 Outstanding debts you owe ($):'),
          default: '0',
          validate: (input: string) => {
            if (isNaN(Number(input)) || Number(input) < 0) {
              return 'Please enter a valid number';
            }
            return true;
          },
        },
      ]);

      const spinner = ora({
        text: colors.info('Calculating Zakat...'),
        spinner: 'dots',
      }).start();
      
      await new Promise(resolve => setTimeout(resolve, 800));
      spinner.stop();

      const savings = parseFloat(answers.savings) || 0;
      const gold = parseFloat(answers.gold) || 0;
      const silver = parseFloat(answers.silver) || 0;
      const investments = parseFloat(answers.investments) || 0;
      const debts = parseFloat(answers.debts) || 0;

      const totalWealth = savings + gold + silver + investments;
      const netWealth = totalWealth - debts;
      const zakatAmount = netWealth * 0.025;
      const nisabThreshold = 400;

      console.log('\n');
      console.log(
        boxen(
          `${colors.accent.bold('📊 Wealth Summary')}\n\n` +
          `${createTableRow('Cash Savings', `$${savings.toLocaleString()}`, '💵')}\n` +
          `${createTableRow('Gold', `$${gold.toLocaleString()}`, '🥇')}\n` +
          `${createTableRow('Silver', `$${silver.toLocaleString()}`, '🥈')}\n` +
          `${createTableRow('Investments', `$${investments.toLocaleString()}`, '📈')}\n` +
          `${colors.muted('─'.repeat(35))}\n` +
          `${createTableRow('Total Wealth', `$${totalWealth.toLocaleString()}`, '💰')}\n` +
          `${createTableRow('Debts', `-$${debts.toLocaleString()}`, '💳')}\n` +
          `${colors.muted('─'.repeat(35))}\n` +
          `${createTableRow('Net Wealth', `$${netWealth.toLocaleString()}`, '📊')}\n\n` +
          `${colors.success.bold(`💵 Zakat Due: $${zakatAmount.toLocaleString()}`)}`,
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: '#00E676',
            title: '🌙 Zakat Calculation',
            titleAlignment: 'center',
          }
        )
      );

      if (netWealth < nisabThreshold) {
        console.log('\n');
        console.log(
          boxen(
            `${colors.warning.bold('⚠ Below Nisab Threshold')}\n\n` +
            `${colors.white('Your wealth is below the Nisab threshold.')}\n` +
            `${colors.muted('Zakat is not obligatory, but you may still give voluntary charity (Sadaqah).')}`,
            {
              padding: 1,
              margin: 1,
              borderStyle: 'round',
              borderColor: '#FFD93D',
            }
          )
        );
        displayTip('Even small acts of charity are rewarded greatly by Allah!');
      } else {
        displaySuccess(
          `Your Zakat amount is $${zakatAmount.toLocaleString()}`,
          'May Allah accept your charity and multiply your rewards'
        );
        
        console.log('\n');
        console.log(
          boxen(
            `${colors.accent.bold('📖 Quranic Reminder')}\n\n` +
            `${colors.white('"And establish prayer and give Zakat, and whatever good you put forward for yourselves - you will find it with Allah. Indeed, Allah of what you do, is Seeing."')}\n\n` +
            `${colors.muted('— Quran 2:110')}`,
            {
              padding: 1,
              margin: 1,
              borderStyle: 'round',
              borderColor: '#64B5F6',
            }
          )
        );
      }

      console.log('\n');

    } catch (error) {
      displayError('Failed to calculate Zakat', 'Please try again with valid numbers');
    }
  });
