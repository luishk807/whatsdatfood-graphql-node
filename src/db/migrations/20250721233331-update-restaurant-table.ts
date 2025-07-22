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
    await queryInterface.addColumn('restaurants', 'phone', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('restaurants', 'payment_method', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('restaurants', 'rating', {
      type: DataTypes.DOUBLE,
    });
    await queryInterface.addColumn('restaurants', 'michelin_score', {
      type: DataTypes.INTEGER,
    });
    await queryInterface.addColumn('restaurants', 'description', {
      type: DataTypes.TEXT,
    });
    await queryInterface.addColumn('restaurants', 'delivery_method', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('restaurants', 'letter_grade', {
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
    await queryInterface.removeColumn('restaurants', 'phone');
    await queryInterface.removeColumn('restaurants', 'payment_method');
    await queryInterface.removeColumn('restaurants', 'rating');
    await queryInterface.removeColumn('restaurants', 'michelin_score');
    await queryInterface.removeColumn('restaurants', 'description');
    await queryInterface.removeColumn('restaurants', 'delivery_method');
    await queryInterface.removeColumn('restaurants', 'letter_grade');
  },
};
