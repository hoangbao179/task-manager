import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

router.post('/user', UserController.createUser);
router.get('/user/:id', UserController.getUser);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

export default router;