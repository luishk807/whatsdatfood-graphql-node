import axios from 'axios';
import { _get } from 'helpers';
import { googleResponseAPIType } from 'types';

const GOOGLE_KEY: string | undefined = process.env.GOOGLE_API_KEY;
const GOOGLE_URL: string | undefined = process.env.GOOGLE_URL;
const GOOGLE_CX: string | undefined = process.env.GOOGLE_CX;

export const getGoogleImages = async (
  query: string,
): Promise<googleResponseAPIType | undefined> => {
  if (!query) {
    return undefined;
  }

  if (!GOOGLE_KEY || !GOOGLE_URL || !GOOGLE_CX) {
    console.log('GOOGLE_KEY: ', GOOGLE_KEY);
    console.log('GOOGLE_URL: ', GOOGLE_URL);
    console.log('GOOGLE_CX: ', GOOGLE_CX);
    return undefined;
  }

  try {
    const config = {
      url: 'https://www.googleapis.com/customsearch/v1',
      method: 'get',
      params: {
        q: query,
        searchType: 'image',
        // rights: 'cc_publicdomain|cc_attribute',
        key: 'AIzaSyBvNdJAUUlESzp30sJKRHwamimmx72xYsg',
        cx: '96420aea73055446b',
      },
    };
    const photoUrls: googleResponseAPIType = await axios(config);
    return photoUrls;
  } catch (err: any) {
    console.error('Google API error:', err?.response?.data || err.message);
  }
};
