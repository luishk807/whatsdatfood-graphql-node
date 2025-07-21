'use strict';
import { QueryInterface, Sequelize, DataTypes } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('user_ratings', 'title', {
      type: DataTypes.STRING,
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('user_ratings', 'title');
  },
};
