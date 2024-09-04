import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

const router = Router();
const userService = new UserService();
const authService = new AuthService(userService);
const authController = new AuthController(authService, userService);

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh-token', authController.refreshToken);
export default router;
