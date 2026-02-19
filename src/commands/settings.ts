import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';
import ora from 'ora';
import { getSettings, saveSettings, UserSettings } from '../utils/config.js';
import { displaySuccess, displayError } from '../utils/display.js';
import { detectLocation } from '../api/location.js';

interface SettingsAnswers {
  action: string;
}

interface CityCountryAnswers {
  city: string;
  country: string;
  method: number;
}

const calculationMethods = [
  { name: 'University of Islamic Sciences, Karachi', value: 1 },
  { name: 'Islamic Society of North America (ISNA)', value: 2 },
  { name: 'Muslim World League', value: 3 },
  { name: 'Umm al-Qura University, Makkah', value: 4 },
  { name: 'Egyptian General Authority of Survey', value: 5 },
  { name: 'Institute of Geophysics, University of Tehran', value: 6 },
  { name: 'Gulf Region', value: 7 },
  { name: 'Kuwait', value: 8 },
  { name: 'Qatar', value: 9 },
  { name: 'Majlis Ugama Islam Singapura, Singapore', value: 10 },
  { name: 'Union Organization islamic de France', value: 11 },
  { name: 'Diyanet İşleri Başkanlığı, Turkey', value: 12 },
  { name: 'Spiritual Administration of Muslims of Russia', value: 13 },
  { name: 'Moonsighting Committee', value: 14 },
  { name: 'Dubai (experimental)', value: 15 },
];

export const settingsCommand = new Command('settings')
  .description('Manage your default settings')
  .action(async () => {
    try {
      const currentSettings = getSettings();

      const { action } = await inquirer.prompt<SettingsAnswers>([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            { name: '📍 Set City and Country', value: 'location' },
            { name: '📐 Change Calculation Method', value: 'method' },
            { name: '🌍 Auto-detect Location', value: 'detect' },
            { name: '👁️  View Current Settings', value: 'view' },
            { name: '🗑️  Reset to Defaults', value: 'reset' },
          ],
        },
      ]);

      switch (action) {
        case 'location': {
          const answers = await inquirer.prompt<CityCountryAnswers>([
            {
              type: 'input',
              name: 'city',
              message: 'Enter your city:',
              default: currentSettings.city,
            },
            {
              type: 'input',
              name: 'country',
              message: 'Enter your country code (e.g., US, UK, SA):',
              default: currentSettings.country,
            },
          ]);

          saveSettings({
            city: answers.city,
            country: answers.country.toUpperCase(),
          });

          displaySuccess(`Settings saved! City: ${answers.city}, Country: ${answers.country.toUpperCase()}`);
          break;
        }

        case 'method': {
          const methodAnswer = await inquirer.prompt<{ method: number }>([
            {
              type: 'list',
              name: 'method',
              message: 'Select calculation method:',
              choices: calculationMethods,
              default: currentSettings.calculationMethod,
            },
          ]);

          saveSettings({ calculationMethod: methodAnswer.method });
          
          const selectedMethod = calculationMethods.find(m => m.value === methodAnswer.method);
          displaySuccess(`Calculation method updated to: ${selectedMethod?.name}`);
          break;
        }

        case 'detect': {
          const spinner = ora('Detecting your location...').start();
          
          const location = await detectLocation();
          
          spinner.stop();

          if (location) {
            console.log(
              boxen(
                `
${chalk.green('✅ Location detected!')}

${chalk.yellow('City:')}    ${location.city}
${chalk.yellow('Country:')} ${location.country} (${location.countryCode})
                `.trim(),
                {
                  padding: 1,
                  margin: 1,
                  borderStyle: 'round',
                  borderColor: 'green',
                }
              )
            );

            const { confirm } = await inquirer.prompt<{ confirm: boolean }>([
              {
                type: 'confirm',
                name: 'confirm',
                message: 'Would you like to save this location?',
                default: true,
              },
            ]);

            if (confirm) {
              saveSettings({
                city: location.city,
                country: location.countryCode,
              });
              displaySuccess('Location saved!');
            }
          } else {
            displayError('Could not detect location. Please set manually.');
          }
          break;
        }

        case 'view': {
          const settings = getSettings();
          const method = calculationMethods.find(m => m.value === settings.calculationMethod);

          console.log(
            boxen(
              `
${chalk.yellow.bold('📍 Location Settings:')}
${chalk.cyan('City:')}    ${settings.city}
${chalk.cyan('Country:')} ${settings.country}

${chalk.yellow.bold('📐 Calculation Settings:')}
${chalk.cyan('Method:')} ${method?.name || 'Islamic Society of North America (ISNA)'}
              `.trim(),
              {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'cyan',
                title: '⚙️  Current Settings',
                titleAlignment: 'center',
              }
            )
          );
          break;
        }

        case 'reset': {
          const { confirm } = await inquirer.prompt<{ confirm: boolean }>([
            {
              type: 'confirm',
              name: 'confirm',
              message: 'Are you sure you want to reset all settings to defaults?',
              default: false,
            },
          ]);

          if (confirm) {
            saveSettings({
              city: 'Mecca',
              country: 'SA',
              calculationMethod: 2,
            });
            displaySuccess('Settings reset to defaults!');
          }
          break;
        }
      }
    } catch (error) {
      displayError('Failed to update settings. Please try again.');
    }
  });
