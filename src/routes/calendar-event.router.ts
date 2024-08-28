import CalendarEventController from '../controllers/calendar-event.controller';
import * as express from 'express';

const router = express.Router();
router.post('', CalendarEventController.createCalendarEvent);
router.post('/query', CalendarEventController.getCalendarEvents);
router.get('/:id', CalendarEventController.getCalendarEventById);
router.put('/:id', CalendarEventController.updateCalendarEvent);
router.delete('/:id', CalendarEventController.deleteCalendarEvent);

export default router;