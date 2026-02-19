import Configstore from 'configstore';

// Using a fixed package name
const PACKAGE_NAME = 'romdhan';

export const config = new Configstore(PACKAGE_NAME, {
  city: 'Mecca',
  country: 'SA',
  calculationMethod: 2,
});

export interface UserSettings {
  city: string;
  country: string;
  calculationMethod: number;
}

export const getSettings = (): UserSettings => {
  return {
    city: config.get('city') || 'Mecca',
    country: config.get('country') || 'SA',
    calculationMethod: config.get('calculationMethod') || 2,
  };
};

export const saveSettings = (settings: Partial<UserSettings>): void => {
  if (settings.city) config.set('city', settings.city);
  if (settings.country) config.set('country', settings.country);
  if (settings.calculationMethod) config.set('calculationMethod', settings.calculationMethod);
};
