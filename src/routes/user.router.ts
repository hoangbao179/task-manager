import * as express from 'express';
import UserService from '../services/user/user.service';
import UserController from '../controllers/user.controller';

const userService = new UserService();
const userController = new UserController(userService);

const router = express.Router();

router.get('/:id', userController.getUser);
router.post('', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;