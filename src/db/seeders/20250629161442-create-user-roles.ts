'use strict';
import { QueryInterface, Sequelize } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */ return queryInterface.bulkInsert('user_roles', [
      {
        name: 'User',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Guest',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('user_roles', {}, {});
  },
};
