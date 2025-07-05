import Base from 'repository/base.repository';
import { RestaurantMenuItemsInput } from 'db/models/restaurantMenuItems';
import RestaurantMenuItems from 'db/models/restaurantMenuItems';
import { LIMIT, PAGE } from 'constants/sequelize';
import db from 'db/models';
import { dbAliases } from 'db/index';
import { getPageOffset } from 'helpers/sequelize';
class RestaurantMenuItemsRepo extends Base {
  constructor() {
    super(RestaurantMenuItems);
  }
  async findAllItemsByRestaurantId(
    id: number,
    limit: number = LIMIT,
    page: number = PAGE,
  ) {
    const offset = getPageOffset(limit, page);
    return await this.model.findAll({
      where: {
        restaurant_id: id,
      },
      include: [
        {
          model: db.RestaurantMenuItems,
          as: dbAliases.restaurantItems.restaurant,
        },
        {
          model: db.RestaurantItemImages,
          as: dbAliases.restaurantItems.restaurantItemImages,
        },
      ],
      limit: limit,
      offset: offset,
    });
  }

  async findByQuery(query: RestaurantMenuItemsInput) {
    return await this.model.findOne({ where: query });
  }

  async destroyItemsByRestaurantId(id: number) {
    return await this.model.destroy({
      restaurant_id: id,
    });
  }

  async create(payload: RestaurantMenuItemsInput) {
    const t = await db.sequelize.transaction();

    try {
      const resp = await this.model.upsert(payload, { transaction: t });
      await t.commit();
      return resp;
    } catch (err) {
      await t.rollback();
      return err;
    }
  }
  async bulkCreate(payload: RestaurantMenuItemsInput[]) {
    const t = await db.sequelize.transaction();

    try {
      const resp = await this.model.bulkCreate(payload, {
        transaction: t,
        returning: true,
      });
      await t.commit();
      return resp;
    } catch (err) {
      await t.rollback();
      return err;
    }
  }
}

export default RestaurantMenuItemsRepo;
