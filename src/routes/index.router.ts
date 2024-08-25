import { Router } from 'express';
import calendarEventRoutes from './calendar-event.router';
import authRoutes from './auth.router';
import userRoutes from './user.router';
import { authMiddleware } from '../middlewares/authMiddleware';
const router = Router();
       
router.use('/calendar-events', authMiddleware, calendarEventRoutes);  
router.use('/auth', authMiddleware, authRoutes);  
router.use('/user', authMiddleware, userRoutes);  
export default router;
