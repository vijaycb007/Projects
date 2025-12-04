create database bank_db;
use bank_db;

CREATE TABLE accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_number VARCHAR(20) UNIQUE,
  holder_name VARCHAR(100) NOT NULL, 
  pin VARCHAR(10) NOT NULL,
  balance DECIMAL(10,2) DEFAULT 0.00
);

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_number VARCHAR(20) UNIQUE,
  deposit DECIMAL(15,2),
  withdraw DECIMAL(15,2),
  balance DECIMAL(10,2),
  txn_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);