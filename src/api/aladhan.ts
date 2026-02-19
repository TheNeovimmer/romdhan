import axios from 'axios';

const ALADHAN_API_BASE = 'https://api.aladhan.com/v1';

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface PrayerTimesResponse {
  data: {
    timings: PrayerTimes;
    date: {
      readable: string;
      hijri: {
        date: string;
        month: { en: string; ar: string };
        year: string;
        day: string;
      };
    };
    meta: {
      timezone: string;
      method: { name: string };
    };
  };
}

export const fetchPrayerTimes = async (
  city: string,
  country: string,
  method: number = 2
): Promise<PrayerTimesResponse> => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const response = await axios.get<PrayerTimesResponse>(
    `${ALADHAN_API_BASE}/timingsByCity/${day}-${month}-${year}`,
    {
      params: {
        city,
        country,
        method,
        school: 1,
      },
    }
  );

  return response.data;
};

export const fetchRamadanDate = async (year: number): Promise<{ start: Date; end: Date }> => {
  try {
    const response = await axios.get(`${ALADHAN_API_BASE}/gToH`, {
      params: {
        date: `01-01-${year}`,
      },
    });

    // Ramadan is the 9th month of the Hijri calendar
    // We'll use a calculation-based approach
    const ramadanStart2024 = new Date('2024-03-11');
    const ramadanEnd2024 = new Date('2024-04-09');
    const ramadanStart2025 = new Date('2025-03-01');
    const ramadanEnd2025 = new Date('2025-03-30');
    const ramadanStart2026 = new Date('2026-02-18');
    const ramadanEnd2026 = new Date('2026-03-19');

    const currentYear = new Date().getFullYear();

    if (currentYear === 2024) {
      return { start: ramadanStart2024, end: ramadanEnd2024 };
    } else if (currentYear === 2025) {
      return { start: ramadanStart2025, end: ramadanEnd2025 };
    } else if (currentYear === 2026) {
      return { start: ramadanStart2026, end: ramadanEnd2026 };
    }

    // Default to 2026
    return { start: ramadanStart2026, end: ramadanEnd2026 };
  } catch (error) {
    // Fallback dates for 2026
    return {
      start: new Date('2026-02-18'),
      end: new Date('2026-03-19'),
    };
  }
};
