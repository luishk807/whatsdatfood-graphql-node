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

    await queryInterface.renameColumn('users', 'role', 'role_id');
    // Change column type and default
    await queryInterface.changeColumn('users', 'role_id', {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 1,
    });

    await queryInterface.addColumn('users', 'status_id', {
      type: DataTypes.BIGINT,
    });

    // Add foreign key constraint
    await queryInterface.addConstraint('users', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'fk_user_users_role_constraint',
      references: {
        table: 'user_roles',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('users', {
      fields: ['status_id'],
      type: 'foreign key',
      name: 'fk_users_status_constraint',
      references: {
        table: 'statuses',
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

    await queryInterface.removeConstraint(
      'users',
      'fk_users_status_constraint',
    );
    await queryInterface.renameColumn('users', 'role_id', 'role');

    // Optionally revert column changes
    await queryInterface.changeColumn('users', 'role', {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    });

    await queryInterface.removeColumn('users', 'status_id');
  },
};
