import Base from './base.repository';
import { Op } from 'sequelize';
import { RestaurantsInput } from 'db/models/restaurants';
import Restaurants from 'db/models/restaurants';
import db from 'db/models';
import { dbAliases } from 'db/index';
import { LIMIT, PAGE } from 'constants/sequelize';
import { getPageOffset, normalizeApostrophes } from 'helpers/sequelize';
import { _get } from 'helpers';
import { RestaurantsWithItemsOutput } from 'interfaces';

class RestaurantsRepo extends Base {
  constructor() {
    super(Restaurants);
  }

  async getAll(limit: number = LIMIT, page: number = PAGE) {
    const offset = getPageOffset(limit, page);
    return await this.model.findAll({
      limit,
      offset,
      include: [
        {
          model: db.RestaurantMenuItems,
          as: dbAliases.restaurant.restaurantItems,
          include: [
            {
              model: db.UserRatings,
              as: dbAliases.restaurantItems.userRatings,
            },
            {
              model: db.RestaurantMenuItemImages,
              as: dbAliases.restaurantItems.restaurantItemImages,
            },
          ],
        },
      ],
    });
  }

  async create(payload: RestaurantsInput) {
    const t = await db.sequelize.transaction();

    try {
      const resp = await db.sequelize.query(
        `INSERT INTO restaurants (name, slug, address, city, state, country, postal_code, created_at, updated_at) values(:name, :slug, :address, :city, :state, :country, :postal_code, NOW(), NOW())
         RETURNING *`,
        {
          replacements: {
            ...payload,
          },
          transaction: t,
          type: db.Sequelize.QueryTypes.INSERT,
        },
      );
      await t.commit();
      const resp_data = _get(resp, '0.0');
      return resp_data;
    } catch (err) {
      await t.rollback();
      return err;
    }
  }

  async findBySlug(slug: string): Promise<RestaurantsWithItemsOutput> {
    if (!slug) {
      throw new Error('findBySlug Error: name is empty');
    }

    return (await this.model.findOne({
      where: {
        slug: slug,
      },
      include: {
        model: db.RestaurantMenuItems,
        as: dbAliases.restaurant.restaurantItems,
        include: [
          {
            model: db.UserRatings,
            as: dbAliases.restaurantItems.userRatings,
          },
          {
            model: db.RestaurantMenuItemImages,
            as: dbAliases.restaurantItems.restaurantItemImages,
          },
        ],
      },
    })) as unknown as RestaurantsWithItemsOutput;
  }

  async findByNameMatch(
    name: string,
    page: number = PAGE,
    limit: number = LIMIT,
  ) {
    if (!name) {
      throw new Error('findByNameMatch Error: name is empty');
    }
    const offset = getPageOffset(limit, page);
    return await this.model.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: db.RestaurantMenuItems,
          as: dbAliases.restaurant.restaurantItems,
        },
      ],
      limit: limit,
      offset: offset,
    });
  }

  async findByName(name: string, page: number = PAGE, limit: number = LIMIT) {
    console.log(db.aliases);
    if (!name) {
      throw new Error('findByName Error: name is empty');
    }
    const normalizedName = normalizeApostrophes(name); // fix issues with names with apostrophe
    const offset = getPageOffset(limit, page);
    return await db.Restaurants.findAll({
      where: {
        name: {
          [Op.iLike]: `%${normalizedName.toLowerCase()}%`,
        },
      },
      include: [
        {
          model: db.RestaurantMenuItems,
          as: dbAliases.restaurant.restaurantItems, // make sure this matches your association alias
        },
      ],
      limit,
      offset,
    });
  }
}

export default RestaurantsRepo;
