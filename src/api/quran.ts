import axios from 'axios';

const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

export interface Ayah {
  number: number;
  text: string;
  translation?: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

export const fetchSurah = async (surahNumber: number): Promise<Surah> => {
  try {
    const response = await axios.get(`${QURAN_API_BASE}/surah/${surahNumber}/editions/quran-uthmani,en.asad`);
    
    const arabicData = response.data.data[0];
    const englishData = response.data.data[1];

    return {
      number: arabicData.number,
      name: arabicData.name,
      englishName: arabicData.englishName,
      englishNameTranslation: arabicData.englishNameTranslation,
      numberOfAyahs: arabicData.numberOfAyahs,
      revelationType: arabicData.revelationType,
      ayahs: arabicData.ayahs.map((ayah: any, index: number) => ({
        number: ayah.numberInSurah,
        text: ayah.text,
        translation: englishData.ayahs[index]?.text,
      })),
    };
  } catch (error) {
    throw new Error(`Failed to fetch Surah ${surahNumber}`);
  }
};

export const getSurahInfo = (surahNumber: number): Promise<Surah> => {
  return fetchSurah(surahNumber);
};
