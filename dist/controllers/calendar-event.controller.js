import * as CalendarEventService from '../services/calendar-event.service'; // Ensure correct import
// Define the types for request and response
export const createCalendarEvent = async (req, res) => {
    const { title, description, status, startDate, dueDate } = req.body;
    try {
        const newCalendarEvent = await CalendarEventService.createCalendarEvent({
            title,
            description,
            status,
            startDate,
            dueDate,
        });
        return res.status(201).json(newCalendarEvent);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
export const getListCalendarEvents = async (req, res) => {
    try {
        const calendarEvents = await CalendarEventService.getListCalendarEvents();
        return res.status(200).json(calendarEvents);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
export const getCalendarEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const calendarEvent = await CalendarEventService.getCalendarEventById(id);
        if (calendarEvent) {
            return res.status(200).json(calendarEvent);
        }
        else {
            return res.status(404).json({ message: 'CalendarEvent not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
export const updateCalendarEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;
    try {
        const affectedRows = await CalendarEventService.updateCalendarEvent(id, {
            title,
            description,
            status,
            dueDate,
        });
        if (affectedRows > 0) {
            return res.status(200).json({ message: 'CalendarEvent updated successfully' });
        }
        else {
            return res.status(404).json({ message: 'CalendarEvent not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
export const deleteCalendarEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await CalendarEventService.deleteCalendarEvent(id);
        if (affectedRows > 0) {
            return res.status(200).json({ message: 'CalendarEvent deleted successfully' });
        }
        else {
            return res.status(404).json({ message: 'CalendarEvent not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
