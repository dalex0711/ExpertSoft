import { pool } from '../db.js'

// Controller to get the total amount paid by each customer
export const paymentCustomer = async (req, res) => {
    try {
        // Fetch total payments grouped by customer
        const [rows] = await pool.query(`
            SELECT c.name_customer as Customer, SUM(i.invoiced_paid) AS total_paid
            FROM customers c
            JOIN transactions t ON t.id_customer = c.id_customer
            JOIN invoice i ON t.invoice_number = i.invoice_number
            GROUP BY c.id_customer, c.name_customer
            ORDER BY total_paid DESC;
        `)
        res.json(rows) 
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
};

// Controller to get all pending or failed invoices with customer and transaction info
export const PendingInvoices = async (req, res) => {
    try {
        // Fetch invoices with their related customer and transaction details
        const [rows] = await pool.query(`
            SELECT
                c.name_customer, i.billing_period,i.invoiced_amount,i.invoiced_paid,
                t.id_transaction,t.transaction_date,
                t.transaction_amount,ts.name_status AS transaction_status
            FROM invoice i
            JOIN transactions t ON t.invoice_number = i.invoice_number
            JOIN customers c ON t.id_customer = c.id_customer
            JOIN transaction_status ts ON t.id_status = ts.id_status
            WHERE ts.name_status IN ('Pendiente','Fallida')
            ORDER BY i.invoice_number;
        `)
        res.json(rows) 
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
};

// Controller to get all transactions made through a specific platform (Nequi)
export const transactionsNequi = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT c.name_customer, t.id_transaction, t.transaction_date, t.transaction_amount,
                i.invoice_number,i.billing_period,i.invoiced_amount,i.invoiced_paid,p.name AS platform_name
            FROM transactions t
            JOIN customers c ON t.id_customer = c.id_customer
            JOIN invoice i ON t.invoice_number = i.invoice_number
            JOIN platforms p ON t.id_platforms = p.id_platforms
            WHERE p.name = 'Nequi'
            ORDER BY t.transaction_date DESC;
        `)
        res.json(rows) 
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
};
