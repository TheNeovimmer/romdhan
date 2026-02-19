export const getMoonPhase = (date: Date = new Date()): string => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();

  let c, e, jd, b;

  if (month < 3) {
    year--;
    month += 12;
  }

  ++month;
  c = 365.25 * year;
  e = 30.6 * month;
  jd = c + e + day - 694039.09;
  jd /= 29.5305882;
  b = parseInt((jd).toString());
  jd -= b;
  b = Math.round(jd * 8);

  if (b >= 8) b = 0;

  const phases = [
    '🌑 New Moon',
    '🌒 Waxing Crescent',
    '🌓 First Quarter',
    '🌔 Waxing Gibbous',
    '🌕 Full Moon',
    '🌖 Waning Gibbous',
    '🌗 Last Quarter',
    '🌘 Waning Crescent',
  ];

  return phases[b];
};

export const getRamadanDay = (): number | null => {
  const today = new Date();
  const ramadanStart2024 = new Date('2024-03-11');
  const ramadanEnd2024 = new Date('2024-04-09');
  const ramadanStart2025 = new Date('2025-03-01');
  const ramadanEnd2025 = new Date('2025-03-30');
  const ramadanStart2026 = new Date('2026-02-18');
  const ramadanEnd2026 = new Date('2026-03-19');

  let startDate: Date | null = null;
  let endDate: Date | null = null;

  if (today >= ramadanStart2024 && today <= ramadanEnd2024) {
    startDate = ramadanStart2024;
    endDate = ramadanEnd2024;
  } else if (today >= ramadanStart2025 && today <= ramadanEnd2025) {
    startDate = ramadanStart2025;
    endDate = ramadanEnd2025;
  } else if (today >= ramadanStart2026 && today <= ramadanEnd2026) {
    startDate = ramadanStart2026;
    endDate = ramadanEnd2026;
  }

  if (startDate) {
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  }

  return null;
};
