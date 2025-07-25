import Base from './base.repository';
import db from '../db/models/index';

import { FoodCategoriesInput } from 'db/models/foodCategories';
import FoodCategories from 'db/models/foodCategories';
import { dbAliases } from 'db/index';

class FoodCategoryRepo extends Base {
  constructor() {
    super(FoodCategories);
  }

  async deleteByRestaurantId(id: number) {
    const t = await db.sequelize.transaction();
    try {
      const resp = await this.model.destroy({
        where: {
          restaurant_id: id,
        },
        force: true,
        transaction: t,
      });
      await t.commit();
      return resp;
    } catch (err) {
      await t.rollback();
      return err;
    }
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
