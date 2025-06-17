import db from '../db/models';
import { LIMIT, OFFSET } from '../constants/sequelize';
import { getPageOffset } from '../utils/sequelize';

class Base {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  async getAll(limit: number = LIMIT, page: number = 1) {
    const offset = getPageOffset(limit, page);
    return await this.model.findAll({
      limit,
      offset,
    });
  }

  async getById(id: number, limit: number = LIMIT, page: number = 1) {
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
      const resp = await this.model.destroy(
        {
          where: {
            id: id,
          },
        },
        { transaction: t },
      );
      await t.commit();
      return resp;
    } catch (err) {
      await t.rollback();
      return err;
    }
  }
}

export default Base;
