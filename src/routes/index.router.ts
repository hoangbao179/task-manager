import { Router } from 'express';
import calendarEventRoutes from './calendar-event.router';
import authRoutes from './auth.router';
import  userRoutes  from './user.router';
import  accountRoutes  from './account.router';
import { authMiddleware } from '../middlewares/authMiddleware';
const router = Router();
       
router.use('/calendar-events', calendarEventRoutes);  
router.use('/auth', authRoutes);  
router.use('/user', authMiddleware, userRoutes); 
router.use('/account', authMiddleware, accountRoutes); 
export default router;
