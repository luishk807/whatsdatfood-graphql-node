import db from '../db/models';

class Base {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  async getAll() {
    return await this.model.findAll();
  }

  async getById(id: number) {
    return await this.model.findAll({
      where: {
        id: id,
      },
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
