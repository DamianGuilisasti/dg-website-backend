import { Router } from 'express';
import UserController from '../controllers/UserController';
import verify from '../middlewares';

const router = Router();


router.post('/login', UserController.login);
router.post('/register', verify.verifyRegister.checkDuplicateUsernameOrEmail, UserController.register);


export default router;