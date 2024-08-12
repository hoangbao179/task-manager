import { createCalendarEvent, getCalendarEvents, getCalendarEventById, updateCalendarEvent, deleteCalendarEvent } from '../controllers/calendar-event.controller';
import * as express from 'express';

const router = express.Router();
router.post('', createCalendarEvent);
router.post('/query', getCalendarEvents);
router.get('/:id', getCalendarEventById);
router.put('/:id', updateCalendarEvent);
router.delete('/:id', deleteCalendarEvent);

export default router;