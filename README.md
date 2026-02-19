<div align="center">

# 🌙 Romdhan

**A Modern CLI Companion for Ramadan**

[![npm version](https://badge.fury.io/js/romdhan.svg)](https://badge.fury.io/js/romdhan)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

Get prayer times, read Quran, reflect on Hadith, calculate Zakat, and track your Ramadan progress — all from your terminal.

[Installation](#installation) • [Usage](#usage) • [Features](#features) • [Documentation](#documentation)

</div>

---

## ✨ Why Romdhan?

Romdhan is designed for developers and terminal enthusiasts who want quick access to Islamic tools without leaving their command line. Whether you're checking prayer times before a meeting, reading Quran during breaks, or calculating Zakat, Romdhan brings everything to your fingertips.

### Key Features

- 🕌 **Accurate Prayer Times** — 15 calculation methods supported
- ⏰ **Smart Countdown** — Automatically detects if Ramadan is ongoing, upcoming, or has ended
- 📖 **Quran Reader** — Read any Surah with English translations
- 📝 **Authentic Hadith** — Ramadan-related hadiths with transliteration
- 💰 **Zakat Calculator** — Interactive wealth calculation with Nisab check
- 📿 **Digital Tasbih** — Counter for dhikr with visual progress
- ⚙️ **Smart Settings** — Auto-location detection and persistent preferences
- 🌙 **Daily Insights** — Moon phases, quotes, and Ramadan tips

---

## 📦 Installation

### Global Installation

```bash
npm install -g romdhan
```

### Using npx (No Installation)

```bash
npx romdhan
```

### Requirements

- Node.js >= 16.0.0
- Terminal with Unicode support (for best experience)

---

## 🚀 Quick Start

```bash
# 1. Configure your location
romdhan settings

# 2. Check today's prayer times
romdhan prayer

# 3. View Ramadan countdown
romdhan countdown

# 4. Get daily inspiration
romdhan info
```

---

## 📚 Documentation

### 🕌 Prayer Times

Get accurate prayer times for any city worldwide.

```bash
# Using saved settings
romdhan prayer

# Specify location
romdhan prayer --city "New York" --country "US"
romdhan prayer -c London -C UK

# Choose calculation method
romdhan prayer --method 4
```

**Available Methods:**

| # | Method | Region |
|---|--------|--------|
| 1 | University of Islamic Sciences, Karachi | South Asia |
| 2 | Islamic Society of North America (ISNA) | North America |
| 3 | Muslim World League | Europe |
| 4 | Umm al-Qura University, Makkah | Arabian Peninsula |
| 5 | Egyptian General Authority of Survey | Egypt |
| 6-15 | Various regional methods | Worldwide |

---

### ⏰ Countdown

Smart countdown that adapts to Ramadan's status:

```bash
romdhan countdown
```

- **Before Ramadan:** Days remaining until start
- **During Ramadan:** Current day with progress bar
- **After Ramadan:** Days until next Ramadan

---

### 📖 Quran Reader

Read any of the 114 Surahs with translations:

```bash
# Read Surah Al-Fatiha (default)
romdhan quran

# Read specific Surah
romdhan quran --surah 36
romdhan quran -s 2 -l 5
```

**Popular Surahs:**
- **1** - Al-Fatiha (The Opening)
- **36** - Yaseen
- **67** - Al-Mulk
- **112** - Al-Ikhlas

---

### 📝 Hadith

Get authentic Ramadan-related hadiths:

```bash
romdhan hadith
```

**Features:**
- Transliteration for universal terminal compatibility
- English translation
- Authentic references
- Use `--arabic` flag if your terminal supports Arabic text

---

### 💰 Zakat Calculator

Interactive Zakat calculation with step-by-step guidance:

```bash
romdhan zakat
```

**Calculates:**
- Cash savings & bank accounts
- Gold & Silver values
- Investments & stocks
- Outstanding debts
- Total wealth vs Nisab threshold
- Zakat amount (2.5%)

---

### 📿 Digital Tasbih

Interactive dhikr counter:

```bash
romdhan tasbih
romdhan tasbih --dhikr "Alhamdulillah"
```

**Available Dhikr:**
- SubhanAllah (33x)
- Alhamdulillah (33x)
- Allahu Akbar (34x)
- La ilaha illallah (100x)
- Astaghfirullah (100x)
- Allahumma salli ala Muhammad (100x)

**Controls:**
- `ENTER` — Count
- `q` + `ENTER` — Quit

---

### ⚙️ Settings

Manage your preferences:

```bash
romdhan settings
```

**Options:**
- 📍 Set City & Country
- 🌍 Auto-detect Location
- 📐 Choose Calculation Method
- 👁️ View Current Settings
- 🗑️ Reset to Defaults

**Configuration Files:**
- macOS: `~/Library/Preferences/romdhan/`
- Linux: `~/.config/romdhan/`
- Windows: `%APPDATA%/romdhan/`

---

### 🌙 Daily Info

Get daily Ramadan insights:

```bash
romdhan info
```

**Includes:**
- Current Ramadan status
- Moon phase
- Motivational quote
- Daily tip

---

## 🖥️ Interface Preview

### Prayer Times
```
╔══════════════════════════════════════════════════╗
║  🕌 New York, US                                 ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  📅 Gregorian Date        February 19, 2026      ║
║  📆 Hijri Date            2 Ramadan 1447 AH      ║
║  🌍 Timezone              America/New_York       ║
║  📐 Method                ISNA                   ║
║                                                  ║
║  🕐 Prayer Times                                 ║
║  ──────────────────────────────────────────────  ║
║     🌅 Fajr:       05:24 AM                      ║
║     ☀️ Sunrise:    07:12 AM                      ║
║  ▶  🌞 Dhuhr:      01:15 PM  (Next)              ║
║     🌤️ Asr:        04:45 PM                      ║
║     🌇 Maghrib:    07:18 PM (Iftar)              ║
║     🌙 Isha:       08:45 PM                      ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

### Ramadan Countdown
```
╔══════════════════════════════════════════════════╗
║  ✨ Ramadan Progress                             ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  🌙 Ramadan Mubarak!                             ║
║                                                  ║
║  Day 15 of 30                                    ║
║                                                  ║
║  Progress:                                       ║
║  ████████████████░░░░░░░░░░░░░░░░░░░░ 50%        ║
║                                                  ║
║  🎉 15 days until Eid al-Fitr!                   ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

---

## 🛠️ Development

### Setup

```bash
# Clone repository
git clone https://github.com/TheNeovimmer/romdhan.git
cd romdhan

# Install dependencies
npm install

# Build
npm run build

# Development mode
npm run dev

# Run tests
npm test
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript |
| `npm run dev` | Development with hot reload |
| `npm start` | Run compiled version |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format with Prettier |
| `npm run clean` | Remove build files |

---

## 📝 API Credits

- **[Aladhan API](https://aladhan.com/prayer-times-api)** — Prayer times & Hijri dates
- **[Al Quran Cloud](https://alquran.cloud/api)** — Quran text & translations
- **[IP-API](http://ip-api.com/)** — Location detection

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Start

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Commit Convention

- `feat:` — New features
- `fix:` — Bug fixes
- `docs:` — Documentation
- `style:` — Code style
- `refactor:` — Code refactoring
- `test:` — Tests
- `chore:` — Maintenance

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- All praise is due to Allah (SWT)
- API providers for their excellent services
- Open-source community for the amazing tools

---

<div align="center">

**🌙 Ramadan Mubarak! 🌙**

*May Allah accept your fasts, prayers, and good deeds*

</div>
