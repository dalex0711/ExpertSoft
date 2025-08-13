import {Router} from 'express'; //Modulo de express -> Agrupar las rutas
import {getCustomers, postCustomers,updateCustomers, deleteCustomers} from '../controllers/customer.controller.js'; 

const router = Router();

// Obtener todos los transcation.
router.get('/customers', getCustomers);

// crear una una transcation
router.post('/customers',postCustomers);

// actualizar un customer
router.put('/customers/:id',updateCustomers);

//delete

router.delete('/customers/:id',deleteCustomers)

export default router