#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { displayBanner, displayError } from './utils/display.js';
import { prayerCommand } from './commands/prayer.js';
import { countdownCommand } from './commands/countdown.js';
import { hadithCommand } from './commands/hadith.js';
import { quranCommand } from './commands/quran.js';
import { zakatCommand } from './commands/zakat.js';
import { tasbihCommand } from './commands/tasbih.js';
import { settingsCommand } from './commands/settings.js';
import { infoCommand } from './commands/info.js';

const program = new Command();

program
  .name('romdhan')
  .description('🌙 A beautiful CLI tool for Ramadan')
  .version('1.0.0', '-v, --version', 'Display version number')
  .helpOption('-h, --help', 'Display help for command');

// Display banner on startup
if (process.argv.length === 2 || (process.argv[2] && !process.argv[2].startsWith('-'))) {
  displayBanner();
}

// Add commands
program.addCommand(prayerCommand);
program.addCommand(countdownCommand);
program.addCommand(hadithCommand);
program.addCommand(quranCommand);
program.addCommand(zakatCommand);
program.addCommand(tasbihCommand);
program.addCommand(settingsCommand);
program.addCommand(infoCommand);

// Handle unknown commands
program.on('command:*', () => {
  displayError(`Unknown command: ${program.args.join(' ')}`);
  console.log(chalk.yellow('\nRun "romdhan --help" for available commands.\n'));
  process.exit(1);
});

// Parse arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
