import { CalendarEventService } from '../services/calendar/calendar-event.service';
import { CalendarEventController } from '../controllers/calendar-event.controller';
import * as express from 'express';

const calendarService = new CalendarEventService();
const calendarEventController = new CalendarEventController(calendarService);

const router = express.Router();

router.post('', calendarEventController.createCalendarEvent);
router.post('/query', calendarEventController.getCalendarEvents);
router.get('/:id', calendarEventController.getCalendarEventById);
router.put('/:id', calendarEventController.updateCalendarEvent);
router.delete('/:id', calendarEventController.deleteCalendarEvent);

export default router;