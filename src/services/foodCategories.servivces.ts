import { FoodCategoriesInput } from 'db/models/foodCategories';
import FoodCategoryRepository from 'repository/foodCategories.repository';
import {
  buildFoodCategoryPayload,
  buildFoodCategoryResponse,
} from 'helpers/foodCategory.sequelize';
import { _get } from 'helpers';
const FoodCategoryReo = new FoodCategoryRepository();

const FoodCategoryService = {
  async create(item: string) {
    const entry = buildFoodCategoryPayload(item);
    if (entry) {
      return await FoodCategoryReo.create<FoodCategoriesInput>(entry);
    }
    return false;
  },
  async findOrCreate(item: string) {
    const entry = buildFoodCategoryPayload(item);
    if (entry) {
      return await FoodCategoryReo.findOrCreate<FoodCategoriesInput>(
        'name',
        entry,
      );
    }
    return false;
  },
  async bulkCreate(item: FoodCategoriesInput[]) {
    return await FoodCategoryReo.bulkCreate<FoodCategoriesInput>(item);
  },
  async deleteByRestaurantId(id: number) {
    return await FoodCategoryReo.deleteByRestaurantId(id);
  },
  async findById(id: number) {
    const resp = await FoodCategoryReo.getOneById(id);
    return buildFoodCategoryResponse(resp);
  },
  async getAll() {
    const resp = await FoodCategoryReo.getAll();
    return buildFoodCategoryResponse(resp);
  },
};

export default FoodCategoryService;
