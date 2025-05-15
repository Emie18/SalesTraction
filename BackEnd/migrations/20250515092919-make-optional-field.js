'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('Students', 'linkdin', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    queryInterface.changeColumn('Students', 'image', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    return queryInterface
  },

  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn('Students', 'linkdin', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    queryInterface.changeColumn('Students', 'image', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    return queryInterface
  }
};
