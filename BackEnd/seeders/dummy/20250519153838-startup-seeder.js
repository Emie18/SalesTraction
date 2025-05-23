'use strict';

const bcrypt = require('bcrypt');

// Utility for random SIRET number generation (14 digits)
function generate_siret() {
  let siret = "";
  for (let i = 0; i < 14; i++) {
    siret += Math.floor(Math.random() * 10);
  }
  return siret;
}

// Simple startup name generator example (you can replace with fancier logic)
const prefix = [
  "eco","bio","green","terra","aqua","solar","neuro","tech","smart","auto","nano","cyber",
  "re","gen","hydro","pulse","zen","omni","quant","farm","volt","net","grid","logic","synth",
  "aero","clim","clean","flux","nova","pure","urban","blue","clear","bright","deep","fresh","geo",
  "hyper","inno","luna","meta","neo","opt","prime","pro","root","seed","sky","wave","wise","zenith","zero"
];


const names = [
  "pulse","tech","labs","works","logic","net","core","ware","scape","link","flow","base","sync","sense",
  "point","grid","line","byte","wave","zone","nest","field","spark","shift","forge","beam","drive","rise",
  "bridge","loop","stack","cloud","flux","mark","edge","craft","quest","seed","path","track","lab","port",
  "deck","dock","yard","vault","trail","boost","mate","sphere","haven"
];


const regions = [
  'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Bretagne', 'Centre-Val de Loire', 'Corse', 'Grand Est',
  'Guadeloupe', 'Guyane', 'Hauts-de-France', 'Île-de-France', 'La Réunion', 'Martinique', 'Mayotte',
  'Normandie', 'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire',  'Provence-Alpes-Côte d\'Azur'
];

const sectors = [
  "Information Technology", "Healthcare", "Finance", "Education", "Engineering", "Construction", "Retail",
  "Hospitality", "Manufacturing", "Transportation", "Legal", "Marketing and Advertising", "Media and Entertainment",
  "Government and Public Administration", "Telecommunications", "Agriculture", "Energy and Utilities",
  "Pharmaceuticals", "Real Estate", "Nonprofit and NGOs", "Aerospace and Defense", "Arts and Design",
  "Science and Research", "Automotive", "Human Resources"
]

const descriptions = [
  "Innovative AI solutions for sustainable urban energy management.",
  "IoT devices that optimize water use in agriculture.",
  "Machine learning to improve brain health diagnostics.",
  "Blockchain tech for transparent waste recycling.",
  "Telemedicine platform connecting rural and urban healthcare.",
  "Innovating solutions to improve everyday life through technology and sustainability.",
  "Empowering businesses with cutting-edge software and data analytics tools.",
  "Creating smart devices to enhance home and workplace efficiency.",
  "Developing AI-driven platforms for better decision-making and automation.",
  "Revolutionizing renewable energy usage with innovative products and services.",
  "Building scalable digital solutions for the healthcare and wellness industries.",
  "Bridging the gap between urban infrastructure and environmental sustainability.",
  "Designing IoT-enabled systems for smarter agriculture and resource management.",
  "Providing cloud-based tools for seamless collaboration and productivity.",
  "Delivering blockchain-based solutions for enhanced transparency and security.",
  "Offering next-gen mobility solutions for smarter, cleaner transportation.",
  "Simplifying complex processes with intuitive apps and smart automation.",
  "Transforming data into actionable insights for improved business outcomes.",
  "Creating immersive experiences with augmented and virtual reality technologies.",
  "Helping organizations reduce their carbon footprint through innovative software.",
  "Developing personalized health monitoring systems powered by AI.",
  "Facilitating remote work with secure, efficient communication platforms.",
  "Improving supply chain management with real-time tracking and analytics.",
  "Making sustainable living accessible through eco-friendly products and services.",
  "Building next-level cybersecurity solutions to protect digital assets."
];

const images = [
  "startup-1.jpg", "startup-2.jpg", "startup-3.jpg", "startup-4.jpg", "startup-5.webp", "startup-6.png",
  "startup-7.webp", "startup-8.jpg", "startup-9.jpeg", "startup-10.jpg", "startup-11.png", "startup-12.png",
  "startup-13.webp", "startup-14.webp", "startup-15.jpg", "startup-16.jpg", "startup-17.jpg", "startup-18.jpeg",
  "startup-19.jpeg", "startup-20.jpeg"
]

const emails = (name) => `contact@${name.toLowerCase()}.com`;
const linkedin = (name) => `https://www.linkedin.com/company/${name.toLowerCase()}`;

// Offers

function generateRangeOffer(minLimit = 1000, maxLimit = 20000, step = 500) {
  const roundToStep = (num, step) => Math.round(num / step) * step;
  const minPrice = roundToStep( Math.random() * (maxLimit - minLimit) + minLimit, step );
  const maxPrice = roundToStep(minPrice + Math.random() * (maxLimit - minPrice), step);

  const formatPrice = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `€${formatPrice(minPrice)} - €${formatPrice(maxPrice)}`;
}

const offer_names = [
  "Smart Energy Monitor", "AquaSense", "NeuroTrack", "GreenCycle", "MediConnect",
  "AgriPulse", "SolarVision", "WasteWatch", "UrbanFlow", "HealthLink",
  "Nexis","PulseTrack","CloudForge","QuantumLink","SyncWave","VoltEdge","AeroMesh",
  "DataNest","SmartFlux","HyperGrid","NanoCore","CircuitFlow","ByteBridge","LogicStream",
  "PixelSense","CipherNet","TerraLink","EchoSync","FluxDrive","OptiCloud","NeuroSphere","AquaNet",
  "MetaCore","GridWave","SynthPulse","PathFinder","NovaLink","SkyLine","CloudMorph","EdgeQuest",
  "DeepWave","BioTrack","VoltStream","OmniFlow","ClearPath","LunaSync","ZenithCore","PureLink",
  "WaveMesh","BlueGrid","BrightNet","RootSense","SparkLabs","CoreNest","ShiftDrive","HiveSync",
  "LoopCraft","Questify","Trailblaze","PulseNet","NovaPulse"
];


const product = [
  "IoT-based energy consumption tracker",
  "Smart water quality analyzer",
  "Wearable brain activity monitor",
  "Blockchain-based recycling platform",
  "Telemedicine communication device",
  "Precision farming sensor",
  "Solar panel efficiency optimizer",
  "Waste management tracking software",
  "Urban traffic flow sensor",
  "Remote patient monitoring system",
  "AI-powered customer support chatbot",
  "IoT-based energy consumption tracker",
  "Cloud-native project management platform",
  "Blockchain-based supply chain tracker",
  "Augmented reality shopping assistant",
  "Smart home automation system",
  "Wearable health monitoring device",
  "Machine learning fraud detection tool",
  "Virtual reality training simulator",
  "Edge computing analytics platform",
  "5G-enabled smart city infrastructure",
  "Cybersecurity threat detection software",
  "Autonomous drone delivery system",
  "Voice-controlled personal assistant",
  "Big data visualization dashboard",
  "Remote workforce collaboration tool",
  "AI-driven content recommendation engine",
  "Smart agriculture monitoring sensors",
  "Robotic process automation software",
  "Cloud-based video conferencing solution"
];

const pitches = [
  "Real-time energy tracking for eco-conscious homes and businesses.",
  "Advanced water quality analytics for sustainable agriculture.",
  "Improving cognitive health through wearable data.",
  "Enabling transparent and accountable recycling.",
  "Connecting rural clinics to urban hospitals seamlessly.",
  "Boosting crop yields with precision data.",
  "Maximizing solar output via smart monitoring.",
  "Tracking waste flows to optimize collection routes.",
  "Smart sensors to improve city traffic management.",
  "Remote health monitoring to improve patient outcomes."
];

const clients = [
  "B2B and public institutions",
  "Small and medium enterprises",
  "Healthcare providers",
  "Agricultural companies",
  "Municipal governments",
  "Residential customers"
];

const work_modes = [
  "On-site", "Remote", "Hybrid", "Internship"
];

const commissions = [
  "0%-5%", "5%-10%", "10%-15%", "15%-20%", "20%+"
];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const nb_startup = 20
    const max_nb_offer = 25
    const min_nb_offer = 3

    const accounts = []
    const startups_data = []
    const offers_buffer = []
    
    const pass = await bcrypt.hash("1234", 10)
    for (let i = 0; i < nb_startup; i++) {
      const id_name = Math.floor(Math.random() * names.length);
      const id_prefix = Math.floor(Math.random() * prefix.length);
      const id_regions = Math.floor(Math.random() * regions.length);
      const id_descriptions = Math.floor(Math.random() * descriptions.length);
      const id_sector = Math.floor(Math.random() * sectors.length);
      const startup_name = prefix[id_prefix] + names[id_name];

      accounts.push({
        type: "startup",
        name: startup_name,
        email: emails(startup_name),
        password: pass,
        description: descriptions[id_descriptions],
        linkedin: linkedin(startup_name),
        region: regions[id_regions],
        image: "/uploads/" + images[i]
      })

      startups_data.push({
        email: emails(startup_name),
        siret: generate_siret(),
        sector: sectors[id_sector]
      })

      const nb_offer = Math.max(Math.floor(Math.random() * max_nb_offer), min_nb_offer);
      for (let i = 0; i < nb_offer; i++) {
        const id_prefix = Math.floor(Math.random() * prefix.length);
        const id_offer = Math.floor(Math.random() * offer_names.length);
        const id_product = Math.floor(Math.random() * product.length);
        const id_pitch = Math.floor(Math.random() * pitches.length);
        const id_clients = Math.floor(Math.random() * clients.length);
        const id_work_mode = Math.floor(Math.random() * work_modes.length);
        const id_commissions = Math.floor(Math.random() * commissions.length);


        offers_buffer.push({
          email: emails(startup_name),
          name: prefix[id_prefix] + " " + offer_names[id_offer],
          product: product[id_product],
          pitch: pitches[id_pitch],
          range_offer: generateRangeOffer(),
          client: clients[id_clients],
          work_mode: work_modes[id_work_mode],
          commission: commissions[id_commissions]
        })
      }
      
    }
    await queryInterface.bulkInsert('account', accounts, {});
    var account_email_map = await get_account_email_map(accounts, queryInterface, Sequelize);

    const startup = startups_data.map(e => ({
      id_account: account_email_map[e.email],
      siret: e.siret,
      is_valid: true
    }));
    await queryInterface.bulkInsert('startup', startup, {});
    var startup_email_map = await get_startup_email_map(accounts, queryInterface, Sequelize);
    
    const account_sectors = startups_data.map(e => ({
      id: account_email_map[e.email],
      sector: e.sector
    }));
    await queryInterface.bulkInsert('account_sector', account_sectors, {});

    shuffle(offers_buffer)
    const offers = offers_buffer.map(e => ({
      id_startup: startup_email_map[e.email],
      name: e.name,
      product: e.product,
      pitch: e.pitch,
      range_offer: e.range_offer,
      client: e.client,
      work_mode: e.work_mode,
      commission: "",
      commission_offer_commission: e.commission
    }));
    await queryInterface.bulkInsert('offer', offers, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('offer_student', null, {});
    await queryInterface.bulkDelete('offer', null, {});
    await queryInterface.bulkDelete('language_student', null, {});
    await queryInterface.bulkDelete('account_match', null, {});
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

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}