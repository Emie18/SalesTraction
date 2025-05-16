'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const modes = [
      "On-site", "Remote", "Hybrid", "Internship"
    ];

    await queryInterface.bulkInsert(
      'work_mode',
      modes.map(nom => ({ nom })),
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('work_mode', null, {});
  }
};
