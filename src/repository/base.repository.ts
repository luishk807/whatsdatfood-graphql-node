//import sequelize from '../db/models';'

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
    return await this.model.destroy({
      where: {
        id: id,
      },
    });
  }
}

export default Base;
