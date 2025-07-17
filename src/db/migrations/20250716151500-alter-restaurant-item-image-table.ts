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
    await queryInterface.addColumn('restaurant_menu_item_images', 'user_id', {
      type: DataTypes.BIGINT,
      allowNull: true,
    });

    await queryInterface.addColumn('restaurant_menu_item_images', 'status_id', {
      type: DataTypes.BIGINT,
    });

    // Add foreign key constraint
    await queryInterface.addConstraint('restaurant_menu_item_images', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_restaurant_item_image_user_id_constraint',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('restaurant_menu_item_images', {
      fields: ['status_id'],
      type: 'foreign key',
      name: 'fk_restaurant_item_image_status_constraint',
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
      'restaurant_menu_item_images',
      'fk_restaurant_item_image_user_id_constraint',
    );

    await queryInterface.removeConstraint(
      'restaurant_menu_item_images',
      'fk_restaurant_item_image_status_constraint',
    );

    // Optionally revert column changes
    await queryInterface.removeColumn('restaurant_menu_item_images', 'user_id');
    await queryInterface.removeColumn(
      'restaurant_menu_item_images',
      'status_id',
    );
  },
};
