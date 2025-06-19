import Base from './base.repository';
import { Op, Sequelize, literal, QueryTypes } from 'sequelize';
import { RestaurantsInput } from '../db/models/restaurants';
import Restaurants from '../db/models/restaurants';
import db from '../db/models';
import { LIMIT, OFFSET } from '../constants/sequelize';
import { getPageOffset } from '../utils/sequelize';
import { mainModule } from 'process';
class RestaurantsRepo extends Base {
  constructor() {
    super(Restaurants);
  }

  async create(payload: RestaurantsInput) {
    const t = await db.sequelize.transaction();

    try {
      const resp = await db.sequelize.query(
        `INSERT INTO restaurants (name, slug, address, city, state, country, postal_code, created_at, updated_at) values(:name, :slug, :address, :city, :state, :country, :postal_code, NOW(), NOW())`,
        {
          replacements: {
            ...payload,
          },
        },
        {
          transaction: t,
        },
      );
      //const resp = await this.model.create(payload, { transaction: t });
      await t.commit();
      return resp;
    } catch (err) {
      await t.rollback();
      return err;
    }
  }

  async findByNameMatch(
    name: string,
    page: number = LIMIT,
    limit: number = OFFSET,
  ) {
    const offset = getPageOffset(limit, page);
    console.log('j', name);
    return await this.model.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
      offset: offset,
    });
  }

  async findByName(name: string, page: number = LIMIT, limit: number = OFFSET) {
    const offset = getPageOffset(limit, page);
    return await db.sequelize.query(
      `SELECT 
        * 
      FROM 
        restaurants 
      WHERE lower(name) like :name 
    `,
      {
        replacements: {
          name: `%${name.toLocaleLowerCase()}%`,
        },
        limit: limit,
        offset: offset,
        type: QueryTypes.SELECT,
      },
    );
  }
}

export default RestaurantsRepo;
