import chalk from 'chalk';
import figlet from 'figlet';
import boxen from 'boxen';

// Color palette for modern design
export const colors = {
  primary: chalk.hex('#00D9FF'),
  secondary: chalk.hex('#FF6B6B'),
  success: chalk.hex('#00E676'),
  warning: chalk.hex('#FFD93D'),
  error: chalk.hex('#FF1744'),
  info: chalk.hex('#64B5F6'),
  muted: chalk.hex('#9E9E9E'),
  accent: chalk.hex('#E040FB'),
  white: chalk.white,
};

// Modern styled banner
export const displayBanner = (): void => {
  console.log('\n');
  console.log(
    colors.primary(
      figlet.textSync('ROMDHAN', {
        font: 'Big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  );
  console.log(
    boxen(
      colors.warning('✨ Your Companion for the Blessed Month of Ramadan') + '\n' + 
      colors.muted('Type ') + colors.success('romdhan --help') + colors.muted(' to get started'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: '#FFD93D',
        dimBorder: false,
      }
    )
  );
};

// Modern error display
export const displayError = (message: string, suggestion?: string): void => {
  console.error('\n');
  console.error(
    boxen(
      colors.error.bold('✖ Error') + '\n\n' +
      colors.error(message) +
      (suggestion ? '\n\n' + colors.info('💡 ' + suggestion) : ''),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: '#FF1744',
      }
    )
  );
  console.error('\n');
};

// Modern success display
export const displaySuccess = (message: string, details?: string): void => {
  console.log('\n');
  console.log(
    boxen(
      colors.success.bold('✓ Success') + '\n\n' +
      colors.success(message) +
      (details ? '\n\n' + colors.muted(details) : ''),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: '#00E676',
      }
    )
  );
  console.log('\n');
};

// Info display
export const displayInfo = (title: string, content: string): void => {
  console.log(
    boxen(
      colors.info.bold(title) + '\n\n' + content,
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: '#64B5F6',
      }
    )
  );
};

// Warning display
export const displayWarning = (message: string): void => {
  console.log(
    boxen(
      colors.warning.bold('⚠ Warning') + '\n\n' + colors.warning(message),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: '#FFD93D',
      }
    )
  );
};

// Section header
export const displaySection = (title: string, emoji: string = '📌'): void => {
  console.log('\n' + colors.accent.bold(`${emoji} ${title}`));
  console.log(colors.muted('─'.repeat(50)));
};

// Prayer time formatter
export const formatPrayerTime = (name: string, time: string, isNext: boolean = false): string => {
  const timeStr = colors.primary.bold(time);
  const nameStr = isNext ? colors.success.bold(name) : colors.info(name);
  const indicator = isNext ? colors.success(' → ') : '   ';
  return `${indicator}${nameStr}: ${timeStr}`;
};

// Label formatter
export const formatLabel = (label: string): string => {
  return colors.accent.bold(label);
};

// Value formatter
export const formatValue = (value: string | number): string => {
  return colors.primary(String(value));
};

// Create progress bar
export const createProgressBar = (current: number, total: number, length: number = 30): string => {
  const percentage = Math.round((current / total) * 100);
  const filled = Math.round((current / total) * length);
  const empty = length - filled;
  
  const bar = colors.success('█'.repeat(filled)) + colors.muted('░'.repeat(empty));
  return `${bar} ${colors.primary.bold(percentage + '%')}`;
};

// Create a nice table row
export const createTableRow = (label: string, value: string, icon: string = ''): string => {
  const iconStr = icon ? icon + ' ' : '';
  return `${iconStr}${colors.info(label.padEnd(20))} ${colors.primary(value)}`;
};

// Tips box
export const displayTip = (tip: string): void => {
  console.log(
    boxen(
      colors.warning('💡 Tip: ') + colors.white(tip),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: '#FFD93D',
        dimBorder: true,
      }
    )
  );
};

// Quick start guide for beginners
export const displayQuickStart = (): void => {
  console.log('\n');
  console.log(
    boxen(
      colors.accent.bold('🚀 Quick Start Guide') + '\n\n' +
      colors.primary('Essential Commands:') + '\n\n' +
      colors.info('1. ') + colors.white('romdhan settings') + colors.muted('     → Configure your location') + '\n' +
      colors.info('2. ') + colors.white('romdhan prayer') + colors.muted('       → View prayer times') + '\n' +
      colors.info('3. ') + colors.white('romdhan countdown') + colors.muted('    → Ramadan countdown') + '\n' +
      colors.info('4. ') + colors.white('romdhan info') + colors.muted('         → Daily inspiration') + '\n\n' +
      colors.muted('Run ') + colors.success('romdhan --help') + colors.muted(' for all commands'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'double',
        borderColor: '#E040FB',
      }
    )
  );
  console.log('\n');
};

// Check if terminal supports Unicode
export const supportsUnicode = (): boolean => {
  return process.platform !== 'win32' || !!process.env.WT_SESSION || !!process.env.TERM_PROGRAM;
};

// Check if terminal supports Arabic
export const supportsArabic = (): boolean => {
  const lang = process.env.LANG || '';
  const term = process.env.TERM || '';
  return lang.includes('UTF-8') || lang.includes('utf8') || term.includes('256color');
};
