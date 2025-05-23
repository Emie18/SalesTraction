# SalesTraction

A web application made using React for the frontend, Node.js and Express for the backend, Sequelize as the ORM, and MySQL as the database.

## Project Structure
```
├── FrontEnd/     # React application
├── BackEnd/      # Node.js API with Sequelize
└── SQL/          # SQL folder
```

## Prerequisites
Make sure you have the following installed:
* [Node.js](https://nodejs.org/) (v16 or later)
* [MySQL](https://www.mysql.com/)
* [npm](https://www.npmjs.com/)


## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Emie18/SalesTraction.git
cd SalesTraction
```

### 2. Create MySQL Database
```bash
CREATE DATABASE database_name;
CREATE USER '<name>'@'localhost' IDENTIFIED BY '<password>';
GRANT ALL PRIVILEGES ON database_name.* TO '<name>'@'<password>';
FLUSH PRIVILEGES;

USE database_name;
SOURCE SQL/DB.sql;
```

The `SQL/CreateDB.sql` script automatically create a database named sales_traction_db and a user SalesTractionAdmin with the password 1234
```bash
SOURCE SQL/CreateDB.sql;
USE sales_traction_db;
SOURCE SQL/DB.sql;
```

### 3. Configure Environment Variables

Create a `.env` file in the `BackEnd/` folder:

```env
MYSQL_USER = '<name of the user>'
MYSQL_PASS = '<password of the user>'
MYSQL_NAME = '<name of the database>'
MYSQL_HOST = '<mysql ip>'
MYSQL_PORT = '<mysql port>' #3306 by default

JWT_SECRET = '<secret>'
```

#### exemple .env for the backend
```env
MYSQL_USER = 'SalesTractionAdmin'
MYSQL_PASS = '1234'
MYSQL_NAME = 'sales_traction_db'
MYSQL_HOST = '127.0.0.1'
MYSQL_PORT = '3306'

JWT_SECRET = 'f5536ea2d461102f617d939359505c2ecb72622f15a8be45b8a7c460e52bce9a'
```

Create a `.env` file in the `FrontEnd/` folder:

```env
VITE_API_HOST = '<api url>'
VITE_API_PORT = '<api port>'
```

#### exemple .env for the frontend
```env
VITE_API_HOST = '127.0.0.1'
VITE_API_PORT = '3000'
```


### 4. Backend & DataBase Setup

```bash
cd BackEnd
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all --seeders-path seeders/core
```

If you want you can generate dummy accounts (50 random students and 20 startups with 3 to 25 offers) eatch dummy account have the password "1234"
```bash
npx sequelize-cli db:seed:all --seeders-path seeders/dummy
```

If you don't wan't dummy data you can delete all profiles images in `BackEnd/uploads/` starting with `startup-` and `student-`

## Installation & Run

Start the backend api at `http://localhost:3000`.
```bash
cd BackEnd
npm start
```

Start the frontend at `http://localhost:5173`.
```bash
cd ../FrontEnd
npm install
npm run dev
```
