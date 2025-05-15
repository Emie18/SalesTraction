CREATE DATABASE sales_traction_db;
CREATE USER 'SalesTractionAdmin'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON sales_traction_db.* TO 'SalesTractionAdmin'@'1234';
FLUSH PRIVILEGES;
EXIT;