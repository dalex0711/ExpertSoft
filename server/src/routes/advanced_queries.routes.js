import { Router } from 'express'; 
import { paymentCustomer, PendingInvoices, transactionsNequi } from '../controllers/advanced_queries.controller.js'; 

const router = Router(); 

// Route to get total payments made by each customer
router.get('/paymentCustomer', paymentCustomer);

// Route to list pending invoices along with customer and transaction info
router.get('/pendingInvoices', PendingInvoices);

// Route to list transactions made from a specific platform (e.g., Nequi)
router.get('/transactionsNequi', transactionsNequi);

export default router; 
