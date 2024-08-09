import { createCalendarEvent, getListCalendarEvents, getCalendarEventById, updateCalendarEvent, deleteCalendarEvent } from '../controllers/calendar-event.controller';
import * as express from 'express';
const router = express.Router();
router.post('/calendar-event', createCalendarEvent);
router.get('/calendar-events', getListCalendarEvents);
router.get('/calendar-event/:id', getCalendarEventById);
router.put('/calendar-event/:id', updateCalendarEvent);
router.delete('/calendar-event/:id', deleteCalendarEvent);
export default router;
