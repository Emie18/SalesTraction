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
    var startup_email_map = await get_startup_email_map(accounts, queryInterface, Sequelize);
    
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

    const offers = [
      {
        id_startup: startup_email_map["contact@greenpulse.io"],
        name: "Smart Energy Monitor",
        product: "IoT-based energy consumption tracker",
        pitch: "Real-time energy tracking for eco-conscious homes and businesses.",
        range_offer: "€5,000 - €15,000",
        client: "B2B and public institutions",
        work_mode: "Hybrid",
        commission: "",
        commission_offer_commission: "5%-10%"
      },
      {
        id_startup: startup_email_map["hello@aquacroptech.fr"],
        name: "AgriSense Platform",
        product: "Precision agriculture analytics dashboard",
        pitch: "Boost crop yield with data-driven irrigation insights.",
        range_offer: "€10,000 - €30,000",
        client: "Large-scale farms and agri-cooperatives",
        work_mode: "Remote",
        commission: "",
        commission_offer_commission: "10%-15%"
      },
      {
        id_startup: startup_email_map["info@neuroinsight.ai"],
        name: "Cognitive Response Analyzer",
        product: "Neuroimaging-powered marketing analysis tool",
        pitch: "Understand consumer behavior through brain data analytics.",
        range_offer: "€25,000 - €100,000",
        client: "Marketing agencies and research labs",
        work_mode: "On-site",
        commission: "",
        commission_offer_commission: "15%-20%"
      },
      {
        id_startup: startup_email_map["team@recycloop.com"],
        name: "Circular Waste Tracker",
        product: "AI-powered recycling logistics system",
        pitch: "Streamline your supply chain for a greener tomorrow.",
        range_offer: "€8,000 - €20,000",
        client: "Municipalities and logistics companies",
        work_mode: "Remote",
        commission: "",
        commission_offer_commission: "5%-10%"
      },
      {
        id_startup: startup_email_map["contact@greenpulse.io"],
        name: "Green Pulse Solar Planner",
        product: "Solar panel deployment optimization tool",
        pitch: "Accelerate solar adoption with intelligent site assessments.",
        range_offer: "€12,000 - €40,000",
        client: "Construction firms and energy planners",
        work_mode: "Hybrid",
        commission: "",
        commission_offer_commission: "10%-15%"
      },
      {
        id_startup: startup_email_map["hello@aquacroptech.fr"],
        name: "Crop Health Drone Kit",
        product: "Drone & AI bundle for crop disease detection",
        pitch: "Early detection means healthier harvests and higher profits.",
        range_offer: "€7,000 - €25,000",
        client: "Agri-tech distributors",
        work_mode: "Internship",
        commission: "",
        commission_offer_commission: "0%-5%"
      },
      {
        id_startup: startup_email_map["info@neuroinsight.ai"],
        name: "FocusMax",
        product: "AI-powered focus enhancement tool",
        pitch: "Maximize productivity using neuroscience-backed insights.",
        range_offer: "€3,000 - €10,000",
        client: "Corporate wellness programs",
        work_mode: "Hybrid",
        commission: "",
        commission_offer_commission: "5%-10%"
      },
      {
        id_startup: startup_email_map["team@recycloop.com"],
        name: "EcoLogistics Suite",
        product: "Real-time recycling logistics optimization platform",
        pitch: "From pickup to processing – optimize every step of the recycling chain.",
        range_offer: "€15,000 - €35,000",
        client: "Waste management companies",
        work_mode: "On-site",
        commission: "",
        commission_offer_commission: "20%+"
      }
    ]
    await queryInterface.bulkInsert('offer', offers, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('offer', null, {});
    await queryInterface.bulkDelete('language_student', null, {});
    await queryInterface.bulkDelete('account_sector', null, {});
    await queryInterface.bulkDelete('startup', null, {});
    await queryInterface.bulkDelete('student', null, {});
    await queryInterface.bulkDelete('account', null, {});
  }
};

async function get_startup_email_map(accounts, queryInterface, Sequelize){
  // Get inserted student IDs by joining with accounts
  const insertedStartUp = await queryInterface.sequelize.query(
   `
   SELECT startup.id AS startup_id, account.email
   FROM startup
   JOIN account ON startup.id_account = account.id
   WHERE account.email IN (:emails)
   `,
   {
     type: Sequelize.QueryTypes.SELECT,
     replacements: { emails: accounts.map(a => a.email) }
   }
 );

 const emailToStartUpId = {};
 insertedStartUp.forEach(row => {
  emailToStartUpId[row.email] = row.startup_id;
 });

 return emailToStartUpId
}

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