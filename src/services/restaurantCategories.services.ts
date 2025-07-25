import { RestaurantCategoriesInput } from 'db/models/restaurantCategories';
import RestarauntCategory from 'repository/restaurantCategories.repository';
import { _get } from 'helpers';
import {
  buildRestaurantCategoryPayload,
  getRestaurantCategoryResponse,
} from 'helpers/restaurants.sequelize';
import FoodCategoryService from './foodCategories.servivces';
const RestaurantCategoryRepo = new RestarauntCategory();

const RestaurantCategoryService = {
  async create(item: RestaurantCategoriesInput) {
    return await RestaurantCategoryRepo.create<RestaurantCategoriesInput>(item);
  },
  async bulkCreate(item: RestaurantCategoriesInput[]) {
    return await RestaurantCategoryRepo.bulkCreate<RestaurantCategoriesInput>(
      item,
    );
  },
  async deleteByRestaurantId(id: number) {
    return await RestaurantCategoryRepo.deleteByRestaurantId(id);
  },
  async findById(id: number) {
    const resp = await RestaurantCategoryRepo.getOneById(id);
    return getRestaurantCategoryResponse(resp);
  },
  async getAll() {
    const resp = await RestaurantCategoryRepo.getAll();
    return getRestaurantCategoryResponse(resp);
  },
  async processRestaurantCategoryFromRestaurant(
    restId: number,
    foodCategories: string[],
  ) {
    if (Array.isArray(foodCategories)) {
      const categoryCategorySaved = [];
      for (let foodCategory of foodCategories) {
        const resp = await FoodCategoryService.findOrCreate(foodCategory);
        if (resp) {
          let item = buildRestaurantCategoryPayload(restId, resp);
          categoryCategorySaved.push(item as RestaurantCategoriesInput);
        }
      }

      if (categoryCategorySaved.length) {
        await this.deleteByRestaurantId(restId);
        await this.bulkCreate(categoryCategorySaved);
      }
    }
  },
};

export default RestaurantCategoryService;
