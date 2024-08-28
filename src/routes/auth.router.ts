import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth/auth.service';
import UserService from '../services/user/user.service';

const router = Router();
const userService = new UserService();
const authService = new AuthService(userService);
const authController = new AuthController(authService);

router.post('/login', authController.login); 
router.post('/register', authController.register); 

export default router;
