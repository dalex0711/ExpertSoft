import fs from 'fs';
import csv from 'csv-parser';
import { pool } from '../db.js';

export async function loadData(pathFile) {
  return new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream(pathFile)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', async () => {
        try {
          // Sets to avoid duplicates in memory
          const statusSet = new Set();
          const typeSet = new Set();
          const platformSet = new Set();
          const customerSet = new Set();
          const invoiceSet = new Set();

          for (const row of rows) {
            /*** STATUS ***/
            if (!statusSet.has(row['Estado de la Transacción'])) {
              await pool.query(
                'INSERT IGNORE INTO transaction_status (name_status) VALUES (?)',
                [row['Estado de la Transacción']]
              );
              statusSet.add(row['Estado de la Transacción']);
            }

            /*** TYPE ***/
            if (!typeSet.has(row['Tipo de Transacción'])) {
              await pool.query(
                'INSERT IGNORE INTO transaction_types (name_type) VALUES (?)',
                [row['Tipo de Transacción']]
              );
              typeSet.add(row['Tipo de Transacción']);
            }

            /*** PLATFORM ***/
            if (!platformSet.has(row['Plataforma Utilizada'])) {
              await pool.query(
                'INSERT IGNORE INTO platforms (name) VALUES (?)',
                [row['Plataforma Utilizada']]
              );
              platformSet.add(row['Plataforma Utilizada']);
            }

            /*** CUSTOMERS ***/
            if (!customerSet.has(row['Número de Identificación'])) {
              await pool.query(
                `INSERT IGNORE INTO customers 
                (id_customer, name_customer, identification_number, address, cellphone, mail) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                  row['id_cliente'],
                  row['Nombre del Cliente'],
                  row['Número de Identificación'],
                  row['Dirección'],
                  row['Teléfono'],
                  row['Correo Electrónico']
                ]
              );
              customerSet.add(row['Número de Identificación']);
            }

            /*** INVOICE ***/
            if (!invoiceSet.has(row['Número de Factura'])) {
              await pool.query(
                `INSERT IGNORE INTO invoice 
                (invoice_number, billing_period, invoiced_amount, invoiced_paid)
                VALUES (?, ?, ?, ?)`,
                [
                  row['Número de Factura'],
                  row['Periodo de Facturación'],
                  row['Monto Facturado'],
                  row['Monto Pagado']
                ]
              );
              invoiceSet.add(row['Número de Factura']);
            }

            /*** TRANSACTION ***/
            await pool.query(
              `INSERT INTO transactions
              (id_transaction, transaction_date, transaction_amount, id_type, id_status, id_customer, id_platforms, invoice_number)
              VALUES (?, ?, ?, 
                (SELECT id_type FROM transaction_types WHERE name_type = ?),
                (SELECT id_status FROM transaction_status WHERE name_status = ?),
                ?,
                (SELECT id_platforms FROM platforms WHERE name = ?),
                ?
              )`,
              [
                row['ID de la Transacción'],
                row['Fecha y Hora de la Transacción'],
                row['Monto de la Transacción'],
                row['Tipo de Transacción'],
                row['Estado de la Transacción'],
                row['id_cliente'],
                row['Plataforma Utilizada'],
                row['Número de Factura']
              ]
            );
          }

          console.log('All data inserted successfully without in-memory duplicates');
          resolve();
        } catch (error) {
          console.error('Error inserting data:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        reject(error);
      });
  });
}
