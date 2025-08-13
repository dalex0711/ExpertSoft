import { Router } from 'express'; 
import{loadCsv} from '../controllers/uploadCvs.controller.js'

const router = Router();

router.post('/api/upload-csv',loadCsv)

export default router;