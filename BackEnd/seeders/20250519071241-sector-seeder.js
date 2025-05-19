'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const sectors = [
      "Information Technology",
      "Healthcare",
      "Finance",
      "Education",
      "Engineering",
      "Construction",
      "Retail",
      "Hospitality",
      "Manufacturing",
      "Transportation",
      "Legal",
      "Marketing and Advertising",
      "Media and Entertainment",
      "Government and Public Administration",
      "Telecommunications",
      "Agriculture",
      "Energy and Utilities",
      "Pharmaceuticals",
      "Real Estate",
      "Nonprofit and NGOs",
      "Aerospace and Defense",
      "Arts and Design",
      "Science and Research",
      "Automotive",
      "Human Resources"
    ];
    

    await queryInterface.bulkInsert(
      'sector',
      sectors.map(name => ({ name })),
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sector', null, {});
  }
};
