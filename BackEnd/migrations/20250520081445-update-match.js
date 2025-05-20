'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('account_match', 'liked_by_startup', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    })
    return queryInterface
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('account_match', 'liked_by_startup', {})
    return queryInterface
  }
};
