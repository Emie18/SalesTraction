'use strict';

const bcrypt = require('bcrypt');

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

const languages = [
  "Bulgarian", "Croatian", "Czech", "Danish", "Dutch", "English",
  "Estonian", "Finnish", "French", "German", "Greek", "Hungarian", "Irish", "Italian", "Latvian",
  "Lithuanian", "Maltese", "Polish", "Portuguese", "Romanian", "Slovak", "Slovenian", "Spanish", "Swedish",

  "Arabic", "Chinese (Simplified)", "Chinese (Traditional)", "Hebrew", "Hindi", "Japanese", "Korean",
  "Russian", "Turkish", "Ukrainian", "Urdu"
]

const schools = [
  "Université Paris-Saclay",
  "Sorbonne University", 
  "École Polytechnique",
  "Université PSL (Paris Sciences et Lettres)", 
  "Université Grenoble Alpes", 
  "Université de Strasbourg", 
  "Université de Bordeaux", 
  "Université Claude Bernard Lyon 1", 
  "Université de Montpellier", 
  "Aix-Marseille Université", 
  "Université de Lille", 
  "Université de Rennes 1", 
  "Université de Lorraine", 
  "Sciences Po Paris", 
  "Université Côte d’Azur", 
  "Université de Nantes", 
  "Université Paris 1 Panthéon-Sorbonne", 
  "Université de Versailles Saint-Quentin-en-Yvelines", 
  "École Normale Supérieure de Lyon", 
  "Université Toulouse III - Paul Sabatier", 

  "Télécom Paris", ,
  "Ensimag (Grenoble INP)",
  "École Normale Supérieure (ENS Paris)", 
  "CentraleSupélec", 
  "IMT Atlantique", 
  "École 42",
  "ENSEEIHT (INP Toulouse)", 
  "INSA Lyon", 
  "ISEP (Institut Supérieur d'Électronique de Paris)", 
  "ENSEA", 
  "École Centrale de Nantes", 
  "EURECOM", 

  "ISEN Lille (Yncréa Hauts-de-France)", 
  "ISEN Brest", 
  "ISEN Toulon", 
  "ISEN Nantes", 
  "ISEN Fès (Morocco)",
]

const names = [
  "Emma", "Liam", "Noah", "Olivia", "Lucas", "Mia", "Ethan", "Ava", "Leo", "Sofia",
  "Gabriel", "Chloe", "Nathan", "Emily", "Samuel", "Isabella", "Arthur", "Amelia",
  "Benjamin", "Charlotte", "Thomas", "Léa", "Alex", "Zoe", "Adam", "Luna", "Hugo",
  "Jade", "Max", "Nina", "Oscar", "Anna", "Yanis", "Sarah", "Enzo", "Maya", "Ryan",
  "Emma", "Elise", "Julian", "Alice", "David", "Manon", "Paul", "Inès", "Matteo",
  "Clara", "Dylan", "Iris", "Kevin", "Eva", "Romain", "Alicia", "Jules", "Camille"
]
const surnames = [
  "Smith", "Johnson", "Brown", "Garcia", "Martinez", "Lopez", "Gonzalez", "Rodriguez",
  "Davis", "Miller", "Wilson", "Anderson", "Taylor", "Thomas", "Moore", "Martin",
  "Lee", "Clark", "Lewis", "Walker", "Allen", "Young", "King", "Wright", "Scott",
  "Torres", "Nguyen", "Perez", "Hill", "Baker", "Green", "Adams", "Nelson", "Carter",
  "Mitchell", "Roberts", "Phillips", "Campbell", "Evans", "Turner", "Parker",
  "Cohen", "Dubois", "Leroy", "Moreau", "Rossi", "Ricci", "Schneider", "Keller",
  "Müller", "Silva", "Costa", "Ferreira", "Santos", "Kumar", "Patel", "Sharma"
]

const descriptions = [
  "Motivated student with strong analytical skills and a passion for innovation.",
  "Detail-oriented computer science student with hands-on coding experience.",
  "Business student eager to apply academic knowledge to real-world challenges.",
  "Creative thinker with a background in design and user experience.",
  "Tech enthusiast with solid foundation in full-stack development.",
  "Organized and driven, with proven ability to manage time effectively.",
  "Strong communicator with leadership experience in group projects.",
  "Quick learner with a passion for emerging technologies and startups.",
  "Engineering student experienced in prototyping and CAD design.",
  "Marketing intern with knowledge of digital strategy and analytics tools.",
  "Curious and resourceful, with a problem-solving mindset.",
  "Finance student with strong quantitative and Excel modeling skills.",
  "Collaborative team player with a positive attitude and growth mindset.",
  "Aspiring data scientist skilled in Python, statistics, and visualization.",
  "Self-starter with entrepreneurial mindset and hands-on project experience.",
  "Passionate about sustainability and working on impactful solutions.",
  "Effective multitasker, balancing studies with volunteer responsibilities.",
  "Mobile app developer with experience in Flutter and React Native.",
  "Cognitive science major interested in human-computer interaction.",
  "Energetic and adaptable, ready to contribute to dynamic teams."
]

const disponibility = [
  "Immediate",
  "In 1 week", "In 2 weeks", "In 1 month",
  "From next semester", "Weekdays only", "Weekends only",
  "Part-time only", "Full-time",  "Flexible hours",
  "Evenings only", "Mornings only",
  "During summer break", "During academic year",
  "Remote only", "On-site only", "Hybrid (remote & on-site)",
  "Available upon request", "After final exams",
  "Starting from September", "Starting from January"
]

const emails = (name, surname, i) => `${name.toLowerCase()}.${surname.toLowerCase()}${i}@exemple.com`;
const linkedin = (name, surname, i) => `https://www.linkedin.com/in/${name.toLowerCase()+surname.toLowerCase()}${i}`;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
    const nb_student = 50
    const max_sector = 5
    const max_languages = 2

    const accounts = []
    const student_data = []

    const languages_data = []
    const sector_data = []
    
    const pass = await bcrypt.hash("1234", 10)
    for (let i = 0; i < nb_student; i++) {
      const id_name = Math.floor(Math.random() * names.length);
      const id_surnames = Math.floor(Math.random() * surnames.length);
      const id_regions = Math.floor(Math.random() * regions.length);
      const id_descriptions = Math.floor(Math.random() * descriptions.length);
      const id_schools = Math.floor(Math.random() * schools.length);
      const id_disponibility = Math.floor(Math.random() * disponibility.length);
      

      const account_email = emails(names[id_name], surnames[id_surnames], i)
      accounts.push({
        type: "student", name: names[id_name], email: account_email,
        password: pass, region: regions[id_regions],
        description: descriptions[id_descriptions],
        linkedin: linkedin(names[id_name], surnames[id_surnames], i),
        image: "/uploads/student-" + (i+1) + ".jpeg"
      })

      student_data.push({
        email: account_email,
        surname: surnames[id_surnames],
        school: schools[id_schools],
        disponibility: disponibility[id_disponibility],
      })

      const nb_sector = Math.floor(Math.random() * max_sector) + 1;  
      const usedSectors = new Set();
      let timeout = 0

      for (let i = 0; i < nb_sector; i++) {
        let id_sector;
        do {
          timeout++
          id_sector = Math.floor(Math.random() * sectors.length);
          if(timeout > 50) continue;
        } while (usedSectors.has(id_sector) && usedSectors.size < sectors.length);

        usedSectors.add(id_sector);

        sector_data.push({
          email: account_email,
          sector: sectors[id_sector]
        });
      }

      const nb_language = Math.floor(Math.random() * max_languages) + 1;
      const usedLanguages = new Set();
      timeout = 0

      for (let i = 0; i < nb_language; i++) {
        let id_language;
        do {
          id_language = Math.floor(Math.random() * languages.length);
          if(timeout > 50) continue;
        } while (usedLanguages.has(id_language) && usedLanguages.size < languages.length);

        usedLanguages.add(id_language);

        languages_data.push({
          email: account_email,
          lang: languages[id_language],
          natif: i === 0
        });
      }
    }

    await queryInterface.bulkInsert('account', accounts, {});

    var account_email_map = await get_account_email_map(accounts, queryInterface, Sequelize);

    const students = student_data.map(e => ({
      id_account: account_email_map[e.email],
      surname: e.surname,
      school: e.school,
      disponibility: e.disponibility
    }));

    await queryInterface.bulkInsert('student', students, {});
    var student_email_map = await get_student_email_map(accounts, queryInterface, Sequelize);


    const student_languages = languages_data.map(e => ({
      id: student_email_map[e.email],
      lang: e.lang,
      natif: e.natif
    }));

    const account_sectors = sector_data.map(e => ({
      id: account_email_map[e.email],
      sector: e.sector
    }));

    await queryInterface.bulkInsert('language_student', student_languages, {});
    await queryInterface.bulkInsert('account_sector', account_sectors, {});
  }catch(e){
      console.log(e)
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('offer_student', null, {});
    await queryInterface.bulkDelete('account_match', null, {});
    await queryInterface.bulkDelete('account_sector', null, {});
    await queryInterface.bulkDelete('language_student', null, {});
    await queryInterface.bulkDelete('account_sector', null, {});
    await queryInterface.bulkDelete('student', null, {});
    await queryInterface.bulkDelete('account', null, {});
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

async function get_student_email_map(accounts, queryInterface, Sequelize){
   // Get inserted student IDs by joining with accounts
   const insertedStudents = await queryInterface.sequelize.query(
    `
    SELECT student.id AS student_id, account.email
    FROM student
    JOIN account ON student.id_account = account.id
    WHERE account.email IN (:emails)
    `,
    {
      type: Sequelize.QueryTypes.SELECT,
      replacements: { emails: accounts.map(a => a.email) }
    }
  );

  const emailToStudentId = {};
  insertedStudents.forEach(row => {
    emailToStudentId[row.email] = row.student_id;
  });

  return emailToStudentId
}