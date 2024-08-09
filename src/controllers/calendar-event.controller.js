const CalendarEventService = require('../services/calendar-event.service');

exports.createCalendarEvent = async (req, res) => {
  const { title, description, status, startDate, dueDate } = req.body;

  try {
    const newCalendarEvent = await CalendarEventService.createCalendarEvent({ title, description, status, startDate, dueDate });
    res.status(201).json(newCalendarEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getListCalendarEvents = async (req, res) => {
  try {
    const CalendarEvents = await CalendarEventService.getListCalendarEvents();
    res.status(200).json(CalendarEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCalendarEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const CalendarEvent = await CalendarEventService.getCalendarEventById(id);
    res.status(200).json(CalendarEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCalendarEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;
  try {
    const updatedCalendarEvent = await CalendarEventService.updateCalendarEvent(id, { title, description, status, dueDate });
    res.status(200).json(updatedCalendarEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCalendarEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await CalendarEventService.deleteCalendarEvent(id);
    res.status(200).json({ message: 'CalendarEvent deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
