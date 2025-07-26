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
    await queryInterface.addColumn('restaurants', 'parking_available', {
      type: DataTypes.BOOLEAN,
    });
    await queryInterface.addColumn('restaurants', 'cash_only', {
      type: DataTypes.BOOLEAN,
    });
    await queryInterface.addColumn('restaurants', 'drive_through', {
      type: DataTypes.BOOLEAN,
    });
    await queryInterface.addColumn('restaurants', 'delivery_option', {
      type: DataTypes.BOOLEAN,
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('restaurants', 'parking_available');
    await queryInterface.removeColumn('restaurants', 'cash_only');
    await queryInterface.removeColumn('restaurants', 'drive_through');
    await queryInterface.removeColumn('restaurants', 'delivery_option');
  },
};
