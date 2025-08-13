import { pool } from '../db.js'

// Get all customers from the database
export const getCustomers = async (req, res) => {
    try {
        // Execute SELECT query to fetch all customer records
        const [rows] = await pool.query('SELECT * FROM customers')
        res.json(rows) 
    } catch (error) {
        // Handle server/database errors
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};

// Create a new customer
export const postCustomers = async (req, res) => {
    const { name_customer, identification_number, address, cellphone, mail } = req.body;

    // Validate that no fields are empty
    if (!name_customer || !identification_number || !address || !cellphone || !mail) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    try {
        // Insert a new record into the customers table
        const [rows] = await pool.query(
            `INSERT IGNORE INTO customers 
                (name_customer, identification_number, address, cellphone, mail) 
                VALUES (?, ?, ?, ?, ?)`,
            [name_customer, identification_number, address, cellphone, mail]
        );

        // Send success message and the inserted ID
        res.status(201).json({
            message: 'Data successfully inserted',
            insertedId: rows.insertId
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

// Update an existing customer
export const updateCustomers = async (req, res) => {
    const { id } = req.params;
    const { name_customer, identification_number, address, cellphone, mail } = req.body;

    // Validate that no fields are empty
    if (!name_customer || !identification_number || !address || !cellphone || !mail) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    try {
        // Update the customer record with the matching ID
        const [result] = await pool.query(
            `UPDATE customers 
             SET name_customer = ?, identification_number = ?, address = ?, cellphone = ?, mail = ?
             WHERE id_customer = ?`,
            [name_customer, identification_number, address, cellphone, mail, id]
        );

        // If no rows were affected, the customer does not exist
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Customer not found'
            });
        }

        // Retrieve and return the updated record
        const [rows] = await pool.query('SELECT * FROM customers WHERE id_customer = ?', [id]);
        res.json(rows[0]);

    } catch (error) {
        // Log and handle any errors
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};


// Delete a customer by ID
export const deleteCustomers = async (req, res) => {
    try {
        // Execute DELETE query for the given customer ID
        const [result] = await pool.query(
            'DELETE FROM customers WHERE id_customer = ?', 
            [req.params.id]
        );

        // If no rows were affected, the customer does not exist
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Customer not found'
        });

        // Send success message 
        return res.status(200).json({
            message: 'Removed successfully'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};