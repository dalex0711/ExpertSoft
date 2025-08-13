
DROP DATABASE IF EXISTS expertSoft;

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS expertSoft;
USE expertSoft;


-- Transaction types table
CREATE TABLE transaction_types (
    id_type INT PRIMARY KEY AUTO_INCREMENT,  -- auto-increment ID
    name_type VARCHAR(50) NOT NULL UNIQUE    -- unique type name
);

-- Transaction status table
CREATE TABLE transaction_status (
    id_status INT PRIMARY KEY AUTO_INCREMENT,
    name_status VARCHAR(50) NOT NULL UNIQUE  -- unique status name
);

-- Customers table
CREATE TABLE customers (
    id_customer INT PRIMARY KEY AUTO_INCREMENT,
    name_customer VARCHAR(100) NOT NULL,
    identification_number VARCHAR(50) NOT NULL UNIQUE, -- unique ID number
    address VARCHAR(255),
    cellphone VARCHAR(20),
    mail VARCHAR(100) NOT NULL UNIQUE  -- unique email
);

-- Platforms table
CREATE TABLE platforms (
    id_platforms INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE  -- unique platform name
);

-- Invoice table
CREATE TABLE invoice (
    invoice_number VARCHAR(20) PRIMARY KEY,  -- use VARCHAR to store FAC codes
    billing_period VARCHAR(20) NOT NULL,
    invoiced_amount DECIMAL(12,2) NOT NULL,
    invoiced_paid DECIMAL(12,2) NOT NULL
);

-- Transactions table
CREATE TABLE transactions (
    id_transaction VARCHAR(20) PRIMARY KEY,  -- use VARCHAR to store TXN codes
    transaction_date DATETIME NOT NULL,
    transaction_amount DECIMAL(12,2) NOT NULL,
    id_type INT NOT NULL,
    id_status INT NOT NULL,
    id_customer INT NOT NULL,
    id_platforms INT NOT NULL,
    invoice_number VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_type) REFERENCES transaction_types(id_type) ON DELETE CASCADE,
    FOREIGN KEY (id_status) REFERENCES transaction_status(id_status) ON DELETE CASCADE,
    FOREIGN KEY (id_customer) REFERENCES customers(id_customer) ON DELETE CASCADE,
    FOREIGN KEY (id_platforms) REFERENCES platforms(id_platforms) ON DELETE CASCADE,
    FOREIGN KEY (invoice_number) REFERENCES invoice(invoice_number) ON DELETE CASCADE
);
