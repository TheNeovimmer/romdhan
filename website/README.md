# Romdhan Website

A modern, bilingual (English/Arabic) website for the Romdhan CLI tool built with React, TypeScript, GSAP, and Tailwind CSS.

## Features

- **Bilingual Support**: Full i18n implementation with English and Arabic translations
- **GSAP Animations**: Smooth scroll-triggered animations and interactive elements
- **Interactive Terminal**: Browser-based terminal demo where visitors can try commands
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Glass morphism effects, gradient borders, and smooth transitions
- **Arabic Typography**: Custom Arabic fonts including \_\_shaumy font

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: GSAP with ScrollTrigger
- **Internationalization**: i18next + react-i18next
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Navigate to website directory
cd website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
website/
├── src/
│   ├── components/
│   │   ├── sections/       # Page sections (Hero, Features, etc.)
│   │   ├── ui/            # Reusable UI components
│   │   └── Navbar.tsx     # Navigation component
│   ├── i18n/
│   │   ├── i18n.ts        # i18n configuration
│   │   └── locales/       # Translation files
│   │       ├── en.json    # English translations
│   │       └── ar.json    # Arabic translations
│   ├── styles/
│   │   └── index.css      # Global styles + Tailwind
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── public/
│   └── romdhan-icon.svg   # App icon
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Sections

1. **Hero**: Animated intro with terminal preview and stats
2. **Features**: 6 key features with hover animations
3. **Commands**: Interactive command reference with copy functionality
4. **Demo**: Fully functional terminal emulator
5. **Installation**: Quick start guide with copy-to-clipboard
6. **Footer**: Links and credits

## Customization

### Adding New Translations

1. Add new locale file in `src/i18n/locales/`
2. Import and register in `src/i18n/i18n.ts`
3. Add language option in language switcher

### Modifying Animations

Animations are handled via GSAP in each section component. Look for `useEffect` hooks with `gsap.context()` to modify animation behavior.

### Changing Colors

Colors are defined in `tailwind.config.js` and used as CSS variables in `src/styles/index.css`.

## Performance

- Lazy loading of components
- Canvas-based star background (no DOM overhead)
- Optimized animations with GSAP
- Minimal dependencies

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - Same as Romdhan CLI

## Credits

- Built by Ilyes Bouzayen
- Icons by Lucide
- Fonts: Inter, Poppins, Noto Sans Arabic, \_\_shaumy
