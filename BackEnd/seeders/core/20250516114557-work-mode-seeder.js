'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const modes = [
      "On-site", "Remote", "Hybrid", "Internship"
    ];

    await queryInterface.bulkInsert(
      'work_mode',
      modes.map(work_mode => ({ work_mode })),
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('work_mode', null, {});
  }
};
