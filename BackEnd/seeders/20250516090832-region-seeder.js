'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const regions = [
      'Auvergne-Rhône-Alpes',
      'Bourgogne-Franche-Comté',
      'Bretagne',
      'Centre-Val de Loire',
      'Corse',
      'Grand Est',
      'Guadeloupe',
      'Guyane',
      'Hauts-de-France',
      'Île-de-France',
      'La Réunion',
      'Martinique',
      'Mayotte',
      'Normandie',
      'Nouvelle-Aquitaine',
      'Occitanie',
      'Pays de la Loire',
      'Provence-Alpes-Côte d\'Azur'
    ];

    await queryInterface.bulkInsert(
      'region',
      regions.map(name => ({ name })),
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('region', null, {});
  }
};
