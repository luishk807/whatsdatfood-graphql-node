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
    await queryInterface.addColumn('restaurants', 'tasting_menu_only', {
      type: DataTypes.BOOLEAN,
    });
    await queryInterface.addColumn('restaurants', 'tasting_menu_price', {
      type: DataTypes.FLOAT,
    });
    await queryInterface.addColumn('restaurants', 'price_range', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('restaurants', 'drink_pairing_price', {
      type: DataTypes.FLOAT,
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('restaurants', 'tasting_menu_only');
    await queryInterface.removeColumn('restaurants', 'tasting_menu_price');
    await queryInterface.removeColumn('restaurants', 'price_range');
    await queryInterface.removeColumn('restaurants', 'drink_pairing_price');
  },
};
