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
    // Change column type and default
    await queryInterface.changeColumn('users', 'role', {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 1,
    });

    // Add foreign key constraint
    await queryInterface.addConstraint('users', {
      fields: ['role'],
      type: 'foreign key',
      name: 'fk_user_users_role_constraint',
      references: {
        table: 'user_roles',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // Remove foreign key constraint
    await queryInterface.removeConstraint(
      'users',
      'fk_user_users_role_constraint',
    );

    // Optionally revert column changes
    await queryInterface.changeColumn('users', 'role', {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    });
  },
};
