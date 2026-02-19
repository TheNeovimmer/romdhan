# 🌙 Romdhan

[![npm version](https://badge.fury.io/js/romdhan.svg)](https://badge.fury.io/js/romdhan)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)

A beautiful, feature-rich CLI tool for the blessed month of Ramadan. Get prayer times, read Quran, listen to hadith, calculate Zakat, and much more - all from your terminal!

![Romdhan Banner](https://raw.githubusercontent.com/TheNeovimmer/romdhan/main/screenshots/banner.png)

## ✨ Features

- 🕌 **Prayer Times** - Get accurate prayer times for any city worldwide
- ⏰ **Ramadan Countdown** - Track days until Ramadan or Eid
- 📖 **Quran Reader** - Read any Surah with translations
- 📝 **Hadith Collection** - Random Ramadan-related hadiths
- 💰 **Zakat Calculator** - Interactive Zakat calculation
- 📿 **Digital Tasbih** - Counter for dhikr in terminal
- ⚙️ **Settings Management** - Save your location and preferences
- 🌙 **Daily Info** - Moon phases, motivational quotes, and tips

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g romdhan
```

### Using npx (No Installation)

```bash
npx romdhan
```

### Local Installation

```bash
npm install romdhan
```

## 🚀 Usage

After global installation, use the `romdhan` command:

```bash
romdhan [command] [options]
```

### Available Commands

#### 🕌 Prayer Times

Get prayer times for your city:

```bash
# Using default settings
romdhan prayer

# Specify city and country
romdhan prayer --city "New York" --country "US"

# Short options
romdhan prayer -c London -C UK

# Use specific calculation method
romdhan prayer --method 2
```

**Calculation Methods:**
1. University of Islamic Sciences, Karachi
2. Islamic Society of North America (ISNA) **[Default]**
3. Muslim World League
4. Umm al-Qura University, Makkah
5. Egyptian General Authority of Survey
6. Institute of Geophysics, University of Tehran
7. Gulf Region
8. Kuwait
9. Qatar
10. Majlis Ugama Islam Singapura, Singapore
11. Union Organization islamic de France
12. Diyanet İşleri Başkanlığı, Turkey
13. Spiritual Administration of Muslims of Russia
14. Moonsighting Committee
15. Dubai (experimental)

#### ⏰ Countdown

Show countdown to Ramadan or Eid:

```bash
romdhan countdown
```

Output shows:
- Days until Ramadan (if before)
- Current day of Ramadan (if during)
- Days until Eid (if during)
- Progress bar for Ramadan completion

#### 📖 Quran Reader

Read any Surah from the Quran:

```bash
# Read Surah Al-Fatiha (default)
romdhan quran

# Read specific surah
romdhan quran --surah 36

# Limit number of ayahs
romdhan quran --surah 2 --limit 5

# Short options
romdhan quran -s 2 -l 10
```

#### 📝 Hadith

Get a random Ramadan-related hadith:

```bash
romdhan hadith
```

Displays:
- Arabic text
- English translation
- Narrator information
- Reference

#### 💰 Zakat Calculator

Interactive Zakat calculation:

```bash
romdhan zakat
```

The calculator will ask for:
- Cash savings and bank accounts
- Value of gold
- Value of silver
- Investments and stocks
- Outstanding debts

Then calculates:
- Total wealth
- Net wealth (after debts)
- Zakat amount (2.5%)
- Nisab threshold check

#### 📿 Digital Tasbih

Counter for dhikr:

```bash
romdhan tasbih

# Specify dhikr type
romdhan tasbih --dhikr "SubhanAllah"

# Available dhikrs:
# - SubhanAllah (33 times)
# - Alhamdulillah (33 times)
# - Allahu Akbar (34 times)
# - La ilaha illallah (100 times)
# - Astaghfirullah (100 times)
# - Allahumma salli ala Muhammad (100 times)
```

**Usage:**
- Press `ENTER` to increment count
- Press `q` + `ENTER` to quit
- Visual progress bar shows completion

#### ⚙️ Settings

Manage your preferences:

```bash
romdhan settings
```

Options:
- 📍 Set City and Country
- 📐 Change Calculation Method
- 🌍 Auto-detect Location
- 👁️ View Current Settings
- 🗑️ Reset to Defaults

#### 🌙 Daily Info

Get daily Ramadan information:

```bash
romdhan info
```

Shows:
- Current date
- Ramadan status
- Moon phase
- Motivational quote
- Daily tip

## 🔧 Configuration

Settings are stored using `configstore` and persist across sessions.

**Default Settings:**
- City: Mecca
- Country: SA
- Calculation Method: 2 (ISNA)

**Configuration Location:**
- macOS: `~/Library/Preferences/romdhan/`
- Windows: `%APPDATA%/romdhan/`
- Linux: `~/.config/romdhan/Configstore/`

## 📋 Examples

### Quick Start Workflow

```bash
# 1. Set your location
romdhan settings
# Select "Auto-detect Location" or enter manually

# 2. Check prayer times
romdhan prayer

# 3. See how many days until Ramadan
romdhan countdown

# 4. Read a hadith for inspiration
romdhan hadith

# 5. Read some Quran
romdhan quran --surah 1

# 6. Calculate your Zakat
romdhan zakat

# 7. Do some dhikr
romdhan tasbih
```

### Daily Ramadan Routine

```bash
# Morning
romdhan prayer          # Check Fajr time
romdhan info           # Get daily inspiration

# Evening
romdhan quran --surah 18  # Read Surah Al-Kahf
romdhan tasbih            # Complete dhikr
romdhan countdown         # Check progress
```

## 🖼️ Screenshots

### Prayer Times

```
╭──────────────────────────────────────────╮
│    🕌 Prayer Times for New York, US      │
╰──────────────────────────────────────────╯

📅 Date: 2024-03-15
📆 Hijri Date: 5 Ramadan 1445 AH
🌍 Timezone: America/New_York
📐 Method: Islamic Society of North America

🕐 Prayer Times
──────────────────────────────

🌅 Fajr:      05:24 AM
☀️ Sunrise:   07:12 AM
🌞 Dhuhr:     01:15 PM
🌤  Asr:       04:45 PM
🌇 Maghrib:   07:18 PM (Iftar)
🌙 Isha:      08:45 PM
```

### Countdown

```
╭──────────────────────────────────────────╮
│         🌙 Ramadan Countdown             │
╰──────────────────────────────────────────╯

🌙 Ramadan Mubarak!

Day 15 of 30

Progress: 50%
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░

🎉 15 days until Eid al-Fitr!
```

### Tasbih Counter

```
╔══════════════════════════════════════════╗
║           📿 Digital Tasbih              ║
╠══════════════════════════════════════════╣
║                                          ║
║   SubhanAllah                            ║
║   Glory be to Allah                      ║
║                                          ║
║   Count: 17 / 33                         ║
║                                          ║
║   ▓▓▓▓▓▓▓▓▓░░░░░░░░░ 52%                ║
║                                          ║
║   Press ENTER to count                   ║
║   Press q + ENTER to quit                ║
║                                          ║
╚══════════════════════════════════════════╝
```

## 🛠️ Development

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/TheNeovimmer/romdhan.git

# Navigate to directory
cd romdhan

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Or run the compiled version
npm start
```

### Available Scripts

```bash
npm run build      # Compile TypeScript
npm run dev        # Run with ts-node
npm start          # Run compiled version
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Format with Prettier
npm run clean      # Remove dist folder
npm run prepublishOnly  # Clean and build before publish
```

## 📝 API Credits

This CLI uses the following APIs:

- **[Aladhan API](https://aladhan.com/prayer-times-api)** - Prayer times and Hijri date
- **[Al Quran Cloud](https://alquran.cloud/api)** - Quran text and translations
- **[IP-API](http://ip-api.com/)** - Location detection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All praise is due to Allah (SWT)
- Thanks to the creators of the APIs used in this project
- The open-source community for the amazing tools and libraries

## 📞 Support

If you found this tool helpful, please:

- ⭐ Star the repository
- 🐦 Share on social media
- 💰 Give charity (Sadaqah Jariyah)
- 🤲 Make dua for the developers

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/romdhan)
- [GitHub Repository](https://github.com/TheNeovimmer/romdhan)
- [Portfolio](https://ilyes-bouzayen.vercel.app)
- [Issue Tracker](https://github.com/TheNeovimmer/romdhan/issues)

---

<div align="center">
  <strong>🌙 Ramadan Mubarak! 🌙</strong>
  <br>
  <em>May Allah accept your fasts, prayers, and good deeds</em>
  <br><br>
  <sub>Made with ❤️ by <a href="https://ilyes-bouzayen.vercel.app">Ilyes Bouzayen</a></sub>
</div>
