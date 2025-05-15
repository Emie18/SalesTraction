require('dotenv').config(); // load .env

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_NAME,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  },
  test: {
    // similar
  },
  production: {
    // similar
  }
};