import axios from 'axios';
import { _get } from 'helpers';
import { GoogleResponseAPI } from 'types';

const GOOGLE_KEY: string | undefined = process.env.GOOGLE_API_KEY;
const GOOGLE_URL: string | undefined = process.env.GOOGLE_URL;
const GOOGLE_CX: string | undefined = process.env.GOOGLE_CX;

export const getGoogleImages = async (
  query: string,
): Promise<GoogleResponseAPI | undefined> => {
  if (!query) {
    return undefined;
  }

  if (!GOOGLE_KEY || !GOOGLE_URL || !GOOGLE_CX) {
    return undefined;
  }

  try {
    const config = {
      url: GOOGLE_URL,
      method: 'get',
      params: {
        q: query,
        searchType: 'image',
        // rights: 'cc_publicdomain|cc_attribute',
        key: GOOGLE_KEY,
        cx: GOOGLE_CX,
      },
    };
    const photoUrls: GoogleResponseAPI = await axios(config);
    return photoUrls;
  } catch (err: any) {
    console.error('Google API error:', err?.response?.data || err.message);
  }
};
