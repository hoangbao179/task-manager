import { Router } from 'express';
import calendarEventRoutes from './calendar-event.router';
import authRoutes from './auth.router';
import userRoutes from './user.router';
const router = Router();
       
router.use('/calendar-events', calendarEventRoutes);  
router.use('/auth', authRoutes);  
router.use('/user', userRoutes);  
export default router;
