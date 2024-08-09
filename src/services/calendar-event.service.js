const CalendarEvent = require('../entity/calendar-event');
const CalendarEventStatus = require('../enums/calendar-event.status');


const validateStatus = (status) => {
    return Object.values(CalendarEventStatus).includes(status) ? status : CalendarEventStatus.PENDING;
};


const createCalendarEvent = async ({ title, description, status, startDate, dueDate }) => {
    const validatedStatus = validateStatus(status);
    return await CalendarEvent.create({ title, description, status: validatedStatus, startDate, dueDate });
};

const getListCalendarEvents = async () => {
    try {
        return await CalendarEvent.findAll();
    } catch (error) {
        throw error;
    }
};

const getCalendarEventById = async (id) => {
    return await CalendarEvent.findByPk(id);
};

const updateCalendarEvent = async (id, { title, description, status, dueDate }) => {
    const validatedStatus = validateStatus(status);
    return await CalendarEvent.update({ title, description, status: validatedStatus, dueDate }, { where: { id } });
};

const deleteCalendarEvent = async (id) => {
    return await CalendarEvent.destroy({ where: { id } });
};

module.exports = {
    createCalendarEvent,
    getListCalendarEvents,
    getCalendarEventById,
    updateCalendarEvent,
    deleteCalendarEvent,
};