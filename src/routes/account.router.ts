import { UserService } from '../services/user/user.service';
import { UserController } from '../controllers/user.controller';
import { Router } from 'express';

const userService = new UserService();
const userController = new UserController(userService);
const router = Router();

router.get('/', userController.getCurrentUser);

export default router;