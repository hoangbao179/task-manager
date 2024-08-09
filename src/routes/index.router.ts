import { Router } from 'express';
import userRoutes from './user.router';
import calendarEventRoutes from './calendar-event.router';

const router = Router();

router.use('/users', userRoutes);            
router.use('/calendar-events', calendarEventRoutes);  

export default router;
