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
    await queryInterface.addColumn('users', 'username', {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    });

    // Optionally update users with default/generated usernames
    await queryInterface.sequelize.query(`
      UPDATE "users"
      SET "username" = CONCAT('user_', id)
      WHERE "username" IS NULL
    `);

    // Make column non-nullable
    await queryInterface.changeColumn('users', 'username', {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users', 'username');
  },
};
