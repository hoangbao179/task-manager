import { UserController } from "../controllers/user.controller";
import { Router } from "express";

const router = Router();
router.get('/', UserController.getCurrentUser);

export default router;