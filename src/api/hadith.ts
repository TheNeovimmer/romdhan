import axios from 'axios';

export interface Hadith {
  id: string;
  arabic: string;
  transliteration: string;
  english: {
    narrator: string;
    text: string;
  };
  reference: string;
}

const ramadanHadiths: Hadith[] = [
  {
    id: '1',
    arabic: '', // Empty to avoid terminal issues
    transliteration: 'Qala Rasool Allah (SAW): Man sāma Ramadhāna imānan wahtisāban ghufira lahu mā taqaddama min dhanbihi',
    english: {
      narrator: 'Narrated by Abu Huraira',
      text: 'Whoever fasts Ramadan out of faith and in the hope of reward, his previous sins will be forgiven.',
    },
    reference: 'Sahih al-Bukhari 38',
  },
  {
    id: '2',
    arabic: '',
    transliteration: 'Qala Rasool Allah (SAW): Idhā dakhala Ramadhānu futtiḥat abwābu al-jannati wa ghulliqat abwābu an-nāri wa suffidat ash-shayātīn',
    english: {
      narrator: 'Narrated by Abu Huraira',
      text: 'When Ramadan begins, the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained.',
    },
    reference: 'Sahih al-Bukhari 3277',
  },
  {
    id: '3',
    arabic: '',
    transliteration: 'Qala Rasool Allah (SAW): Tasarraḥū fa inna fi as-sahūri barakah',
    english: {
      narrator: 'Narrated by Anas bin Malik',
      text: 'Take Suhur as there is a blessing in it.',
    },
    reference: 'Sahih al-Bukhari 1923',
  },
  {
    id: '4',
    arabic: '',
    transliteration: 'Qala Rasool Allah (SAW): Man qāma Ramadhāna imānan wahtisāban ghufira lahu mā taqaddama min dhanbihi',
    english: {
      narrator: 'Narrated by Abu Huraira',
      text: 'Whoever stands in prayer during Ramadan out of faith and in the hope of reward, his previous sins will be forgiven.',
    },
    reference: 'Sahih al-Bukhari 37',
  },
  {
    id: '5',
    arabic: '',
    transliteration: 'Qala Rasool Allah (SAW): Inna liṣ-ṣāimi faraḥatayni yafraḥuhumā: Idhā afṭara fariḥa, wa idhā laqiya Rabbahu fariḥa biṣawmihi',
    english: {
      narrator: 'Narrated by Abu Huraira',
      text: 'The fasting person has two moments of joy: when he breaks his fast he rejoices, and when he meets his Lord he rejoices in his fasting.',
    },
    reference: 'Sahih al-Bukhari 1904',
  },
];

export const fetchRandomHadith = async (): Promise<Hadith> => {
  const randomIndex = Math.floor(Math.random() * ramadanHadiths.length);
  return ramadanHadiths[randomIndex];
};
