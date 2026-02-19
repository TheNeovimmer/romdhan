#!/usr/bin/env node

import { Command } from 'commander';
import { displayBanner, displayError, colors, displayQuickStart } from './utils/display.js';
import { getSettings } from './utils/config.js';
import { prayerCommand } from './commands/prayer.js';
import { countdownCommand } from './commands/countdown.js';
import { hadithCommand } from './commands/hadith.js';
import { quranCommand } from './commands/quran.js';
import { zakatCommand } from './commands/zakat.js';
import { tasbihCommand } from './commands/tasbih.js';
import { settingsCommand } from './commands/settings.js';
import { infoCommand } from './commands/info.js';

const program = new Command();

// Configure program
program
  .name('romdhan')
  .description(`${colors.primary('🌙 A beautiful CLI tool for Ramadan')}\n${colors.muted('Prayer times, Quran, Hadith, Zakat calculator, and more')}`)
  .version('1.0.1', '-v, --version', 'Display version number')
  .helpOption('-h, --help', 'Display help for command')
  .configureHelp({
    sortSubcommands: true,
    subcommandTerm: (cmd) => colors.success(cmd.name()),
  });

// Add commands with organized help
program
  .addCommand(prayerCommand)
  .addCommand(countdownCommand)
  .addCommand(hadithCommand)
  .addCommand(quranCommand)
  .addCommand(zakatCommand)
  .addCommand(tasbihCommand)
  .addCommand(settingsCommand)
  .addCommand(infoCommand);

// Handle unknown commands
program.on('command:*', () => {
  displayError(
    `Unknown command: ${program.args.join(' ')}`,
    'Run "romdhan --help" to see all available commands'
  );
  process.exit(1);
});

// Parse arguments
program.parse();

// Show banner and quick start on first run (no args)
const args = process.argv.slice(2);
if (args.length === 0) {
  displayBanner();
  
  // Check if user has configured settings
  const settings = getSettings();
  if (settings.city === 'Mecca' && settings.country === 'SA') {
    displayQuickStart();
  } else {
    program.outputHelp();
  }
} else if (args.length === 1 && !args[0].startsWith('-')) {
  // Show banner for commands without flags
  displayBanner();
}
