import axios from 'axios';

export interface Hadith {
  id: string;
  arabic: string;
  english: {
    narrator: string;
    text: string;
  };
  reference: string;
}

const ramadanHadiths: Hadith[] = [
  {
    id: '1',
    arabic: 'قال رسول الله ﷺ: مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ',
    english: {
      narrator: 'Narrated by Abu Huraira',
      text: 'Whoever fasts Ramadan out of faith and in the hope of reward, his previous sins will be forgiven.',
    },
    reference: 'Sahih al-Bukhari 38',
  },
  {
    id: '2',
    arabic: 'قال رسول الله ﷺ: إِذَا دَخَلَ رَمَضَانُ فُتِّحَتْ أَبْوَابُ الْجَنَّةِ وَغُلِّقَتْ أَبْوَابُ النَّارِ وَصُفِّدَتِ الشَّيَاطِينُ',
    english: {
      narrator: 'Narrated by Abu Huraira',
      text: 'When Ramadan begins, the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained.',
    },
    reference: 'Sahih al-Bukhari 3277',
  },
  {
    id: '3',
    arabic: 'قال رسول الله ﷺ: تَسَحَّرُوا فَإِنَّ فِي السَّحُورِ بَرَكَةً',
    english: {
      narrator: 'Narrated by Anas bin Malik',
      text: 'Take Suhur as there is a blessing in it.',
    },
    reference: 'Sahih al-Bukhari 1923',
  },
  {
    id: '4',
    arabic: 'قال رسول الله ﷺ: مَنْ قَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ',
    english: {
      narrator: 'Narrated by Abu Huraira',
      text: 'Whoever stands in prayer during Ramadan out of faith and in the hope of reward, his previous sins will be forgiven.',
    },
    reference: 'Sahih al-Bukhari 37',
  },
  {
    id: '5',
    arabic: 'قال رسول الله ﷺ: إِنَّ لِلصَّائِمِ فَرْحَتَيْنِ يَفْرَحُهُمَا: إِذَا أَفْطَرَ فَرِحَ، وَإِذَا لَقِيَ رَبَّهُ فَرِحَ بِصَوْمِهِ',
    english: {
      narrator: 'Narrated by Abu Huraira',
      text: 'The fasting person has two moments of joy: when he breaks his fast he rejoices, and when he meets his Lord he rejoices in his fasting.',
    },
    reference: 'Sahih al-Bukhari 1904',
  },
];

export const fetchRandomHadith = async (): Promise<Hadith> => {
  // Return a random hadith from the local collection
  const randomIndex = Math.floor(Math.random() * ramadanHadiths.length);
  return ramadanHadiths[randomIndex];
};
