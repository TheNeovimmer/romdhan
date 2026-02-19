export const motivationalQuotes = [
  {
    quote: "Ramadan is not just about abstaining from food, it's about feeding the soul.",
    author: "Unknown",
  },
  {
    quote: "The best gift you can give yourself this Ramadan is a heart that is free from hatred and grudges.",
    author: "Unknown",
  },
  {
    quote: "Fasting is the shield that protects you from the fire of hell.",
    author: "Prophet Muhammad ﷺ",
  },
  {
    quote: "Ramadan is the month of mercy, forgiveness, and salvation from the Fire.",
    author: "Unknown",
  },
  {
    quote: "The fragrance of paradise can be smelled from a distance of five hundred years, but those who are fasting will smell it before they enter it.",
    author: "Prophet Muhammad ﷺ",
  },
  {
    quote: "In Ramadan, the gates of heaven are opened, the gates of hell are closed, and the devils are chained.",
    author: "Prophet Muhammad ﷺ",
  },
  {
    quote: "Make this Ramadan the turning point in your life. Break free from the deceptions of this world and indulge into the sweetness of Iman.",
    author: "Unknown",
  },
  {
    quote: "Ramadan is a time to empty your stomach to feed your soul.",
    author: "Unknown",
  },
];

export const getRandomQuote = (): { quote: string; author: string } => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};
