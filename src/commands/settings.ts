import { Command } from 'commander';
import inquirer from 'inquirer';
import boxen from 'boxen';
import ora from 'ora';
import { getSettings, saveSettings } from '../utils/config.js';
import { displaySuccess, displayError, colors, createTableRow } from '../utils/display.js';
import { detectLocation } from '../api/location.js';

interface SettingsAnswers {
  action: string;
}

const calculationMethods = [
  { name: '1. University of Islamic Sciences, Karachi', value: 1 },
  { name: '2. Islamic Society of North America (ISNA) [Default]', value: 2 },
  { name: '3. Muslim World League', value: 3 },
  { name: '4. Umm al-Qura University, Makkah', value: 4 },
  { name: '5. Egyptian General Authority of Survey', value: 5 },
  { name: '6. Institute of Geophysics, University of Tehran', value: 6 },
  { name: '7. Gulf Region', value: 7 },
  { name: '8. Kuwait', value: 8 },
  { name: '9. Qatar', value: 9 },
  { name: '10. Majlis Ugama Islam Singapura, Singapore', value: 10 },
  { name: '11. Union Organization islamic de France', value: 11 },
  { name: '12. Diyanet İşleri Başkanlığı, Turkey', value: 12 },
  { name: '13. Spiritual Administration of Muslims of Russia', value: 13 },
  { name: '14. Moonsighting Committee', value: 14 },
  { name: '15. Dubai (experimental)', value: 15 },
];

export const settingsCommand = new Command('settings')
  .description('⚙️  Configure your preferences and location')
  .addHelpText('after', `
${colors.info.bold('What you can configure:')}
  • Set your city and country for accurate prayer times
  • Choose calculation method for your region
  • Auto-detect your location via IP
  • View and reset settings

${colors.info.bold('Examples:')}
  $ romdhan settings
  $ romdhan prayer    # Uses your saved settings
  `)
  .action(async () => {
    try {
      const currentSettings = getSettings();

      console.log('\n');
      console.log(
        boxen(
          colors.accent.bold('⚙️  Settings Manager') + '\n\n' +
          colors.muted('Configure your location and preferences for accurate prayer times'),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: '#E040FB',
          }
        )
      );

      const { action } = await inquirer.prompt<SettingsAnswers>([
        {
          type: 'list',
          name: 'action',
          message: colors.primary('What would you like to do?'),
          choices: [
            { name: '📍  Set City and Country', value: 'location' },
            { name: '🌍  Auto-detect Location', value: 'detect' },
            { name: '📐  Change Calculation Method', value: 'method' },
            { name: '👁️   View Current Settings', value: 'view' },
            { name: '🗑️   Reset to Defaults', value: 'reset' },
            new inquirer.Separator(),
            { name: '❌  Exit', value: 'exit' },
          ],
          pageSize: 10,
        },
      ]);

      if (action === 'exit') {
        console.log(colors.muted('\nSettings unchanged.\n'));
        return;
      }

      switch (action) {
        case 'location': {
          const answers = await inquirer.prompt([
            {
              type: 'input',
              name: 'city',
              message: colors.primary('Enter your city:'),
              default: currentSettings.city,
              validate: (input: string) => input.length > 0 || 'Please enter a city name',
            },
            {
              type: 'input',
              name: 'country',
              message: colors.primary('Enter country code (e.g., US, UK, SA, TN):'),
              default: currentSettings.country,
              validate: (input: string) => {
                if (input.length === 0) return 'Please enter a country code';
                if (input.length !== 2) return 'Country code should be 2 letters (e.g., US)';
                return true;
              },
            },
          ]);

          saveSettings({
            city: answers.city,
            country: answers.country.toUpperCase(),
          });

          displaySuccess(
            `Location updated successfully!`,
            `Prayer times will now be calculated for ${answers.city}, ${answers.country.toUpperCase()}`
          );
          break;
        }

        case 'detect': {
          const spinner = ora({
            text: colors.info('Detecting your location...'),
            spinner: 'earth',
          }).start();
          
          const location = await detectLocation();
          spinner.stop();

          if (location) {
            console.log('\n');
            console.log(
              boxen(
                `${colors.success.bold('✓ Location Detected')}\n\n` +
                `${createTableRow('City', location.city, '📍')}\n` +
                `${createTableRow('Country', `${location.country} (${location.countryCode})`, '🌍')}`,
                {
                  padding: 1,
                  margin: 1,
                  borderStyle: 'round',
                  borderColor: '#00E676',
                }
              )
            );

            const { confirm } = await inquirer.prompt<{ confirm: boolean }>([
              {
                type: 'confirm',
                name: 'confirm',
                message: colors.primary('Would you like to save this location?'),
                default: true,
              },
            ]);

            if (confirm) {
              saveSettings({
                city: location.city,
                country: location.countryCode,
              });
              displaySuccess('Location saved successfully!');
            }
          } else {
            displayError(
              'Could not detect location',
              'Please set your location manually using "Set City and Country" option'
            );
          }
          break;
        }

        case 'method': {
          const methodAnswer = await inquirer.prompt<{ method: number }>([
            {
              type: 'list',
              name: 'method',
              message: colors.primary('Select calculation method for your region:'),
              choices: calculationMethods,
              default: currentSettings.calculationMethod,
              pageSize: 15,
            },
          ]);

          saveSettings({ calculationMethod: methodAnswer.method });
          
          const selectedMethod = calculationMethods.find(m => m.value === methodAnswer.method);
          displaySuccess(
            'Calculation method updated',
            `Now using: ${selectedMethod?.name.replace(/^\d+\.\s/, '')}`
          );
          break;
        }

        case 'view': {
          const settings = getSettings();
          const method = calculationMethods.find(m => m.value === settings.calculationMethod);

          console.log('\n');
          console.log(
            boxen(
              `${colors.accent.bold('📍 Location Settings')}\n` +
              `${createTableRow('City', settings.city, '📍')}\n` +
              `${createTableRow('Country', settings.country, '🌍')}\n\n` +
              `${colors.accent.bold('📐 Calculation Settings')}\n` +
              `${createTableRow('Method', method?.name.replace(/^\d+\.\s/, '') || 'ISNA', '📐')}`,
              {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: '#64B5F6',
                title: '⚙️  Current Settings',
                titleAlignment: 'center',
              }
            )
          );
          console.log('\n');
          break;
        }

        case 'reset': {
          const { confirm } = await inquirer.prompt<{ confirm: boolean }>([
            {
              type: 'confirm',
              name: 'confirm',
              message: colors.warning('Are you sure you want to reset all settings to defaults?'),
              default: false,
            },
          ]);

          if (confirm) {
            saveSettings({
              city: 'Mecca',
              country: 'SA',
              calculationMethod: 2,
            });
            displaySuccess(
              'Settings reset to defaults',
              'Location: Mecca, SA | Method: ISNA'
            );
          } else {
            console.log(colors.muted('\nReset cancelled.\n'));
          }
          break;
        }
      }
    } catch (error) {
      displayError('Failed to update settings', 'Please try again or check your configuration');
    }
  });
