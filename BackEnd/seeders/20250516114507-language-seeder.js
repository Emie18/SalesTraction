'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const languages = [
      "Bulgarian",
      "Croatian",
      "Czech",
      "Danish",
      "Dutch",
      "English",
      "Estonian",
      "Finnish",
      "French",
      "German",
      "Greek",
      "Hungarian",
      "Irish",
      "Italian",
      "Latvian",
      "Lithuanian",
      "Maltese",
      "Polish",
      "Portuguese",
      "Romanian",
      "Slovak",
      "Slovenian",
      "Spanish",
      "Swedish",
    
      // Widely spoken non-EU languages
      "Arabic",
      "Chinese (Simplified)",
      "Chinese (Traditional)",
      "Hebrew",
      "Hindi",
      "Japanese",
      "Korean",
      "Russian",
      "Turkish",
      "Ukrainian",
      "Urdu"
    ];

    await queryInterface.bulkInsert(
      'language',
      languages.map(lang => ({ lang })),
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('language', null, {});
  }
};
