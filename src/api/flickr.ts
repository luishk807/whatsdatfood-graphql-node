import axios from 'axios';
import { _get } from 'helpers';
import pLimit from 'p-limit';

const limit = pLimit(1); // concurrency = 1
const FLICKR_KEY: string | undefined = process.env.FLICKR_KEY;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function axiosWithRetry(config: any, retries = 3, delayMs = 1000) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await axios(config);
    } catch (err: any) {
      if (err.response?.status === 429 && i < retries) {
        const retryAfter = err.response?.headers?.['retry-after'];
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : delayMs;
        console.warn(`429 Too Many Requests. Retrying in ${waitTime}ms...`);
        await wait(waitTime);
        delayMs *= 2;
        continue;
      }
      throw err;
    }
  }
}

export const getFlickPhotoInfo = async (photoId: string) => {
  if (!photoId) {
    return null;
  }
  try {
    const res = await axiosWithRetry({
      url: 'https://api.flickr.com/services/rest/',
      method: 'get',
      params: {
        method: 'flickr.photos.getInfo',
        api_key: FLICKR_KEY,
        photo_id: photoId,
        format: 'json',
        nojsoncallback: 1,
      },
    });

    if (res) {
      const owner = _get(res, 'owner');
      return {
        id: _get(res, 'id'),
        nsid: _get(owner, 'nsid'),
        license: _get(res, 'license'),
        username: _get(owner, 'username'),
        realname: _get(owner, 'realname'),
        title: _get(res, 'title._content'),
      };
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};

export const getFlickPhoto = async (query: string) => {
  if (!query) {
    return null;
  }

  console.log('FLICKR_KEY', FLICKR_KEY, ' query:', query);

  if (!FLICKR_KEY) {
    return null;
  }

  try {
    const res = await axiosWithRetry({
      url: 'https://api.flickr.com/services/rest/',
      method: 'get',
      params: {
        method: 'flickr.photos.search',
        api_key: FLICKR_KEY,
        text: query,
        license: '4,5,6,9,10', // e.g. CC licenses
        per_page: 1,
        page: 1,
        format: 'json',
        nojsoncallback: 1,
      },
    });

    const photos = _get(res, 'data.photos.photo');

    if (!photos || (photos && !photos.length)) {
      return null;
    }

    const photoUrls = Promise.all(
      photos.map(async (photo: any) => {
        limit(async () => {
          // await wait(300); // wait 300ms between requests
          const photoInfo = await getFlickPhotoInfo(photo.id);
          // Compose URL for medium size image
          return {
            username: _get(photoInfo, 'usernamer'),
            realname: _get(photoInfo, 'realname'),
            license: _get(photoInfo, 'license'),
            flickr_id: _get(photo, 'id'),
            url_m: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`,
            url_s: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_s.jpg`,
          };
        });
      }),
    );

    console.log('Found photos:', photoUrls);
    return photoUrls;
  } catch (err) {
    console.error(err);
  }
};
