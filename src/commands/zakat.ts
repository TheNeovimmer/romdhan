import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';
import ora from 'ora';
import { displaySuccess, displayError } from '../utils/display.js';

interface ZakatAnswers {
  savings: string;
  gold: string;
  silver: string;
  investments: string;
  debts: string;
}

export const zakatCommand = new Command('zakat')
  .description('Calculate your Zakat (2.5% of qualifying wealth)')
  .action(async () => {
    console.log(
      boxen(
        chalk.yellow('💰 Zakat Calculator\n\n') +
        chalk.white('Zakat is 2.5% of your total qualifying wealth that has been in your possession for one lunar year.\n') +
        chalk.cyan('Nisab threshold: Approximately $400+ USD (varies by gold/silver prices)'),
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'yellow',
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
          message: '💵 Cash savings and bank accounts:',
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
          message: '🥇 Value of gold you own:',
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
          message: '🥈 Value of silver you own:',
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
          message: '📈 Value of investments and stocks:',
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
          message: '💳 Outstanding debts you owe:',
          default: '0',
          validate: (input: string) => {
            if (isNaN(Number(input)) || Number(input) < 0) {
              return 'Please enter a valid number';
            }
            return true;
          },
        },
      ]);

      const spinner = ora('Calculating Zakat...').start();
      
      // Simulate calculation time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      spinner.stop();

      const savings = parseFloat(answers.savings) || 0;
      const gold = parseFloat(answers.gold) || 0;
      const silver = parseFloat(answers.silver) || 0;
      const investments = parseFloat(answers.investments) || 0;
      const debts = parseFloat(answers.debts) || 0;

      const totalWealth = savings + gold + silver + investments;
      const netWealth = totalWealth - debts;
      const zakatAmount = netWealth * 0.025;

      // Nisab threshold (approximate, varies by gold/silver prices)
      const nisabThreshold = 400; // Approximate USD value

      console.log(
        boxen(
          `
${chalk.yellow.bold('📊 Wealth Summary:')}
${'─'.repeat(40)}
💵 Cash Savings:        $${savings.toLocaleString()}
🥇 Gold:                $${gold.toLocaleString()}
🥈 Silver:              $${silver.toLocaleString()}
📈 Investments:         $${investments.toLocaleString()}
${chalk.red('💳 Debts:')}             ${chalk.red(`-$${debts.toLocaleString()}`)}
${'─'.repeat(40)}
${chalk.cyan('💰 Total Wealth:')}      $${totalWealth.toLocaleString()}
${chalk.cyan('📉 Net Wealth:')}        $${netWealth.toLocaleString()}

${chalk.green.bold('💵 Zakat Due (2.5%):')}   ${chalk.green.bold(`$${zakatAmount.toLocaleString()}`)}
          `.trim(),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'green',
            title: '🌙 Zakat Calculation',
            titleAlignment: 'center',
          }
        )
      );

      if (netWealth < nisabThreshold) {
        console.log(
          boxen(
            chalk.yellow('⚠️  Your wealth is below the Nisab threshold.\nZakat is not obligatory, but you may still give voluntary charity (Sadaqah).'),
            {
              padding: 1,
              margin: 1,
              borderStyle: 'round',
              borderColor: 'yellow',
            }
          )
        );
      } else {
        displaySuccess(`Your Zakat amount is $${zakatAmount.toLocaleString()}`);
        console.log(
          boxen(
            chalk.cyan('📖 "And establish prayer and give Zakat, and whatever good you put forward for yourselves - you will find it with Allah. Indeed, Allah of what you do, is Seeing." (Quran 2:110)'),
            {
              padding: 1,
              margin: 1,
              borderStyle: 'round',
              borderColor: 'cyan',
            }
          )
        );
      }

    } catch (error) {
      displayError('Failed to calculate Zakat. Please try again.');
    }
  });
