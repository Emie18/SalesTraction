'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const commissions = [
      "0%-5%", "5%-10%", "10%-15%", "15%-20%", "20%+"
    ];
    

    await queryInterface.bulkInsert(
      'commission',
      commissions.map(commission => ({ commission })),
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('commission', null, {});
  }
};
