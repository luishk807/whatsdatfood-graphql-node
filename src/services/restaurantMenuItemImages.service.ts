import axios from 'axios';
import { _get } from 'helpers';
import { buildRestaurantItemImagePayload } from 'helpers/restaurants.sequelize';
import RestaurantMenuItemImages from 'repository/restaurantMenuImages.repository';
import RestaurantMenuItemsRepo from 'repository/restaurantMenu.repository';
import { RestaurantMenuItemImagesInput } from 'db/models/restaurantMenuItemImages';
import { FLICKR_METHOD } from 'constants/flickr';
import { dbAliases } from 'db';

const RestaurantItemImageRepo = new RestaurantMenuItemImages();
const RestaurantItemRepo = new RestaurantMenuItemsRepo();

const FLICKR_KEY: string | undefined = process.env.FLICKR_KEY;
const FLICKR_URL: string | undefined = process.env.FLICKR_API_URL;

const RestaurantMenuItemImagesFn = {
  async create(payload: RestaurantMenuItemImagesInput) {
    return await RestaurantItemImageRepo.create(payload);
  },
  async destroyItemByRestaurantId(id: number) {
    return await RestaurantItemImageRepo.destroyItemsByRestaurantId(id);
  },
  async bulkCreate(payload: RestaurantMenuItemImagesInput[]) {
    return await RestaurantItemImageRepo.bulkCreate(payload);
  },
  async findById(id: number) {
    return await RestaurantItemImageRepo.getOneById(id);
  },
  async findItemImageByRestItemId(id: number) {
    const dbImages = await RestaurantItemImageRepo.findByRestItemId(id);
    if (dbImages) {
      return dbImages;
    } else {
      const restItemData = await RestaurantItemRepo.getOneById(id);
      if (!restItemData) {
        throw new Error('ERROR: No such restaurant exists');
      } else {
        console.log('no photo for this image, will search through flickr');
        // const restaurantInfo = _get(
        //   restItemData,
        //   dbAliases.restaurantItems.restaurant,
        // );
        // const query = `${restItemData.name} from ${restaurantInfo.name}`;
        // const images = await this.getRestaurantImageByFlickr(query);
        // console.log('result', images);
        // if (images) {
        //   return images;
        // } else {
        //   return null;
        // }
        return null;
      }
    }
  },
  async findItemImagesByFlickrId(id: number) {
    return await RestaurantItemImageRepo.findByFlickrId(id);
  },
  async findAllImagesByRestaurantId(id: number) {
    return await RestaurantItemImageRepo.getOneById(id);
  },
  async getAll() {
    return await RestaurantItemImageRepo.getAll();
  },
  async getResturantImageInfoByFlickr(photoId: string) {
    if (!photoId) {
      return null;
    }
    try {
      const res = await axios({
        url: FLICKR_URL,
        method: 'get',
        params: {
          method: FLICKR_METHOD.INFO,
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
  },
  async getRestaurantImageByFlickr(photoQuery: string) {
    if (!photoQuery) {
      return null;
    }

    console.log(
      'FLICKR_KEY',
      FLICKR_KEY,
      ' query:',
      photoQuery,
      ' url: ',
      FLICKR_URL,
    );

    if (!FLICKR_KEY) {
      return null;
    }

    const res = await axios({
      url: FLICKR_URL,
      method: 'get',
      params: {
        method: FLICKR_METHOD.SEARCH,
        api_key: FLICKR_KEY,
        text: photoQuery,
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

    let photo = photos;

    if (Array.isArray(photo)) {
      photo = photo[0];
    }

    const exists = await this.findItemImagesByFlickrId(photo.id);

    // Compose URL for medium size image
    const photoData = {
      flickr_id: _get(photo, 'id'),
      url_m: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`,
      url_s: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_s.jpg`,
    };

    if (!exists) {
      const photoInfo = await this.getResturantImageInfoByFlickr(photo.id);
      return {
        ...photoData,
        username: _get(photoInfo, 'username'),
        realname: _get(photoInfo, 'realname'),
        license: _get(photoInfo, 'license'),
      };
    } else {
      // create db entity
      const imagePayload = buildRestaurantItemImagePayload(photoData);
      await RestaurantItemImageRepo.create(imagePayload);
      return {
        ...photoData,
        username: _get(exists, 'username'),
        realname: _get(exists, 'realname'),
        license: _get(exists, 'license'),
      };
    }
  },
};

export default RestaurantMenuItemImagesFn;
