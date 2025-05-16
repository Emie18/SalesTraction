'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const states = [
      "Waiting", "Declined", "Accepted"
    ];

    await queryInterface.bulkInsert(
      'offer_state',
      states.map(name => ({ name })),
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('offer_state', null, {});
  }
};
