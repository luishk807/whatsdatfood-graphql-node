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
     */
    return queryInterface.bulkInsert('statuses', [
      {
        name: 'Active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Aproved',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Blocked',
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
    return queryInterface.bulkDelete('statuses', {}, {});
  },
};
