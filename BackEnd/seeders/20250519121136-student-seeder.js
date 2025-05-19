'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const accounts = [
      {
        type: "student", name: "Clara Dupont", email: "clara.dupont@example.com",
        password: "sunshine123", region: "Île-de-France",
        description: "Motivated and curious learner with a passion for environmental sciences. Always looking for new challenges and opportunities to grow.",
        linkedin: "https://linkedin.com/in/claradupont",
      },
      {
        type: "student", name: "Lucas Martin", email: "lucas.martin@example.com",
        password: "securePass42", region: "Occitanie",
        description: "Aspiring software engineer with a keen interest in web development. I enjoy collaborating on open source projects and learning new technologies.",
        linkedin: "https://linkedin.com/in/lucasmartin",
      },
      {
        type: "student", name: "Amina Diallo", email: "amina.diallo@example.com",
        password: "password987", region: "Provence-Alpes-Côte d'Azur",
        description: "Creative and detail-oriented design student focused on user experience. Passionate about making technology more accessible and inclusive.",
        linkedin: "https://linkedin.com/in/aminadiallo",
      },
      {
        type: "student", name: "Théo Moreau", email: "theo.moreau@example.com",
        password: "theo!2025", region: "Grand Est",
        description: "Engineering student with strong analytical skills and a drive for innovation. Experienced in robotics competitions and technical teamwork.",
        linkedin: "https://linkedin.com/in/theomoreau",
      },
      {
        type: "student", name: "Sophie Caron", email: "sophie.caron@example.com",
        password: "sophieC2024", region: "Nouvelle-Aquitaine",
        description: "Business school student with an interest in sustainable development and social impact. Volunteer and active member of several campus initiatives.",
        linkedin: "https://linkedin.com/in/sophiecaron",
      }
    ];

    await queryInterface.bulkInsert('account', accounts, {});

    var account_email_map = await get_account_email_map(accounts, queryInterface, Sequelize);

    const students = [
      {
        id_account: account_email_map["clara.dupont@example.com"],
        surname: "Dupont",
        school: "Université Paris-Saclay",
        disponibility: "full-time"
      },
      {
        id_account: account_email_map["lucas.martin@example.com"],
        surname: "Martin",
        school: "INSA Lyon",
        disponibility: "part-time"
      },
      {
        id_account: account_email_map["amina.diallo@example.com"],
        surname: "Diallo",
        school: "Université de Strasbourg",
        disponibility: "full-time"
      },
      {
        id_account: account_email_map["theo.moreau@example.com"],
        surname: "Moreau",
        school: "CentraleSupélec",
        disponibility: "internship"
      },
      {
        id_account: account_email_map["sophie.caron@example.com"],
        surname: "Caron",
        school: "Université de Bordeaux",
        disponibility: "part-time"
      }
    ];

    await queryInterface.bulkInsert('student', students, {});
    var student_email_map = await get_student_email_map(accounts, queryInterface, Sequelize);


    const student_languages = [
      { id: student_email_map["clara.dupont@example.com"], lang: "French", natif: true },
      { id: student_email_map["clara.dupont@example.com"], lang: "English", natif: false },
    
      { id: student_email_map["lucas.martin@example.com"], lang: "French", natif: true },
      { id: student_email_map["lucas.martin@example.com"], lang: "German", natif: false },
      { id: student_email_map["lucas.martin@example.com"], lang: "Spanish", natif: false },
    
      { id: student_email_map["amina.diallo@example.com"], lang: "French", natif: true },
      { id: student_email_map["amina.diallo@example.com"], lang: "Arabic", natif: false },
      { id: student_email_map["amina.diallo@example.com"], lang: "English", natif: false },
    
      { id: student_email_map["theo.moreau@example.com"], lang: "French", natif: true },
      { id: student_email_map["theo.moreau@example.com"], lang: "English", natif: false },
    
      { id: student_email_map["sophie.caron@example.com"], lang: "French", natif: true },
      { id: student_email_map["sophie.caron@example.com"], lang: "Spanish", natif: false }
    ];
    
    const account_sectors = [
      { id: account_email_map["clara.dupont@example.com"], sector: "Science and Research" },
      { id: account_email_map["clara.dupont@example.com"], sector: "Education" },
    
      { id: account_email_map["lucas.martin@example.com"], sector: "Information Technology" },
      { id: account_email_map["lucas.martin@example.com"], sector: "Engineering" },
    
      { id: account_email_map["amina.diallo@example.com"], sector: "Arts and Design" },
      { id: account_email_map["amina.diallo@example.com"], sector: "Marketing and Advertising" },
    
      { id: account_email_map["theo.moreau@example.com"], sector: "Aerospace and Defense" },
    
      { id: account_email_map["sophie.caron@example.com"], sector: "Nonprofit and NGOs" },
      { id: account_email_map["sophie.caron@example.com"], sector: "Finance" }
    ];

    await queryInterface.bulkInsert('language_student', student_languages, {});
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