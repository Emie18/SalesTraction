'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const accounts = [
      {
        type: "startup",
        name: "GreenPulse",
        email: "contact@greenpulse.io",
        password: "green1234",
        description: "GreenPulse develops AI-powered energy optimization solutions for urban buildings. Our mission is to help cities achieve carbon neutrality through smart infrastructure.",
        linkedin: "https://www.linkedin.com/company/greenpulse",
        region: "Île-de-France"
      },
      {
        type: "startup",
        name: "AquaCropTech",
        email: "hello@aquacroptech.fr",
        password: "waterwise2024",
        description: "We specialize in precision agriculture tools for water management. Our IoT devices help farmers monitor soil moisture and reduce waste while improving yield.",
        linkedin: "https://www.linkedin.com/company/aquacroptech",
        region: "Occitanie"
      },
      {
        type: "startup",
        name: "NeuroInsight",
        email: "info@neuroinsight.ai",
        password: "neurostart2025",
        description: "NeuroInsight leverages neuroscience and machine learning to improve cognitive health. Our solutions are used by clinics and research labs across Europe.",
        linkedin: "https://www.linkedin.com/company/neuroinsight",
        region: "Auvergne-Rhône-Alpes"
      },
      {
        type: "startup",
        name: "RecycLoop",
        email: "team@recycloop.com",
        password: "loopit42",
        description: "RecycLoop is an environmental startup creating blockchain-based waste tracking solutions. We empower local governments and businesses to meet sustainability goals.",
        linkedin: "https://www.linkedin.com/company/recycloop",
        region: "Normandie"
      },
      {
        type: "startup",
        name: "MediBridge",
        email: "contact@medibridge.health",
        password: "healthconnect2025",
        description: "MediBridge connects rural clinics to urban hospitals through telemedicine and logistics support. We focus on providing affordable and scalable medical infrastructure.",
        linkedin: "https://www.linkedin.com/company/medibridge-health",
        region: "Grand Est"
      },
    ];

    await queryInterface.bulkInsert('account', accounts, {});
    var account_email_map = await get_account_email_map(accounts, queryInterface, Sequelize);

    const startup = [
      {id_account: account_email_map["contact@greenpulse.io"], siret: "83320178600019", is_valid: true},
      {id_account: account_email_map["hello@aquacroptech.fr"], siret: "88294567100025", is_valid: true},
      {id_account: account_email_map["info@neuroinsight.ai"], siret: "79823498700034", is_valid: true},
      {id_account: account_email_map["team@recycloop.com"], siret: "89456123000017", is_valid: true},
      {id_account: account_email_map["contact@medibridge.health"], siret: "91234567800045", is_valid: false}
    ];

    await queryInterface.bulkInsert('startup', startup, {});
    
    const account_sectors = [
      {id: account_email_map["contact@greenpulse.io"], sector: "Energy and Utilities"},
      {id: account_email_map["hello@aquacroptech.fr"], sector: "Agriculture"},
      {id: account_email_map["info@neuroinsight.ai"], sector: "Science and Research"},
      {id: account_email_map["info@neuroinsight.ai"], sector: "Healthcare"},
      {id: account_email_map["team@recycloop.com"], sector: "Manufacturing"},
      {id: account_email_map["contact@medibridge.health"], sector: "Healthcare"},
      {id: account_email_map["contact@medibridge.health"], sector: "Telecommunications"}
    ];
    

    await queryInterface.bulkInsert('account_sector', account_sectors, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('student', null, {});
    await queryInterface.bulkDelete('account', null, {});
    await queryInterface.bulkDelete('language_student', null, {});
    await queryInterface.bulkDelete('account_sector', null, {});
  }
};


async function get_account_email_map(accounts, queryInterface, Sequelize){
  // Query inserted accounts (based on email)
  const inserted_accounts = await queryInterface.sequelize.query(
    `SELECT id, email FROM account WHERE email IN (:emails)`,
    {
      type: Sequelize.QueryTypes.SELECT,
      replacements: { emails: accounts.map(acc => acc.email) }
    }
  );

  // Map emails to IDs
  const email_accounts = {};
  inserted_accounts.forEach(acc => { email_accounts[acc.email] = acc.id; });

  return email_accounts
}