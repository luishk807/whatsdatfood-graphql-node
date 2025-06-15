//import sequelize from '../db/models';

class Base {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  async getAll() {
    return this.model.findAll();
  }
}

export default Base;
