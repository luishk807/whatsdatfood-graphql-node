import Base from './base.repository';
import db from '../db/models/index';

import { FoodCategoriesInput } from 'db/models/foodCategories';
import FoodCategories from 'db/models/foodCategories';
import { dbAliases } from 'db/index';

class FoodCategoryRepo extends Base {
  constructor() {
    super(FoodCategories);
  }
  async getAll() {
    return await this.model.findAll({
      include: [
        {
          model: db.Statuses,
          as: dbAliases.holidays.status,
        },
      ],
    });
  }
}

export default FoodCategoryRepo;
