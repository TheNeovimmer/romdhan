import axios from 'axios';

export interface LocationData {
  city: string;
  country: string;
  countryCode: string;
}

export const detectLocation = async (): Promise<LocationData | null> => {
  try {
    const response = await axios.get('http://ip-api.com/json/');
    
    if (response.data && response.data.status === 'success') {
      return {
        city: response.data.city,
        country: response.data.country,
        countryCode: response.data.countryCode,
      };
    }
    
    return null;
  } catch (error) {
    return null;
  }
};
