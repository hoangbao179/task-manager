const express = require('express');
const { createCalendarEvent, getListCalendarEvents, getCalendarEventById, updateCalendarEvent, deleteCalendarEvent } = require('../controllers/calendar-event.controller');

const router = express.Router();

router.post('/calendar-event', createCalendarEvent);
router.get('/calendar-events', getListCalendarEvents);
router.get('/calendar-event/:id', getCalendarEventById);
router.put('/calendar-event/:id', updateCalendarEvent);
router.delete('/calendar-event/:id', deleteCalendarEvent);

module.exports = router;
