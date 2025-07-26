import db from '../db/models';
import { Op } from 'sequelize';
import { _get } from 'helpers';
import { LIMIT, PAGE } from '../constants/sequelize';
import { getPageOffset } from '../helpers/sequelize';

class Base {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  async create<T extends object>(payload: T) {
    const t = await db.sequelize.transaction();
    try {
      const resp = await this.model.upsert(payload, {
        transaction: t,
        returning: true,
      });
      console.log(resp);
      await t.commit();
      return resp[0];
    } catch (err) {
      await t.rollback();
      this.handlerError(err);
    }
  }

  async createOrUpdate<T extends object>(payload: T) {
    const t = await db.sequelize.transaction();
    const userId = _get(payload, 'user_id');
    const restItemId = _get(payload, 'restaurant_menu_item_id');

    if (!userId || !restItemId) {
      throw new Error('User info and restaurant Info Required');
    }
    try {
      const find = await this.model.findOne({
        where: {
          user_id: userId,
          restaurant_menu_item_id: restItemId,
        },
      });

      if (!find) {
        const resp = await this.model.upsert(payload, {
          transaction: t,
          returning: true,
        });
        console.log(resp);
        await t.commit();
        return resp[0];
      } else {
        return await this.update(payload);
      }
    } catch (err) {
      await t.rollback();
      this.handlerError(err);
    }
  }
  async findOrCreate<T extends object>(
    key: string,
    payload: T,
    isMatch?: boolean,
  ) {
    const t = await db.sequelize.transaction();
    const value = _get(payload, key);

    const whereMath = isMatch
      ? {
          [Op.iLike]: `%${value}%`,
        }
      : value;

    console.log(payload, 'findorcreate');
    try {
      const [record, created] = await this.model.findOrCreate({
        where: {
          [key]: whereMath,
        },
        default: payload,
        transaction: t,
        returning: true,
      });
      if (created) {
        console.log(`record ${value} was created`);
      }
      await t.commit();
      return record;
    } catch (err) {
      await t.rollback();
      this.handlerError(err);
    }
  }
  async bulkCreate<T extends object>(payload: T[]) {
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
      this.handlerError(err);
    }
  }

  async getAll(limit: number = LIMIT, page: number = PAGE) {
    const offset = getPageOffset(limit, page);
    return await this.model.findAll({
      limit,
      offset,
    });
  }

  async getOneById(id: number) {
    return await this.model.findOne({
      where: {
        id: id,
      },
    });
  }
  async getAllById(id: number, limit: number = LIMIT, page: number = PAGE) {
    const offset = getPageOffset(limit, page);
    return await this.model.findAll({
      where: {
        id: id,
      },
      limit,
      offset,
    });
  }
  async deleteById(id: number) {
    const t = await db.sequelize.transaction();
    try {
      const resp = await this.model.destroy({
        where: {
          id: id,
        },
        transaction: t,
      });
      await t.commit();
      return resp;
    } catch (err) {
      await t.rollback();
      this.handlerError(err);
    }
  }
  async update<T extends object>(payload: T) {
    const id = _get(payload, 'id');
    const t = await db.sequelize.transaction();
    try {
      const [affectedCount, updatedRows] = await this.model.update(payload, {
        where: {
          id,
        },
        transaction: t,
        returning: true,
      });
      if (affectedCount === 0) {
        throw new Error(`No item found with id ${id}`);
      }

      await t.commit();
      return updatedRows[0]; // return the updated instance
    } catch (err) {
      await t.rollback();
      this.handlerError(err);
    }
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
      this.handlerError(err);
    }
  }
  async handlerError(err: any) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw err;
  }
}

export default Base;
