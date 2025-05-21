import {Router} from 'express' 
import { login } from '../controllers/auth_controller';

const router = Router();
router.post('/auth', login);


export default router;