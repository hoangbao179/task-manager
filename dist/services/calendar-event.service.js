import CalendarEvent from "../entity/calendar-event";
import { CalendarEventStatus } from "../enums/calendar-event.status";
const validateStatus = (status) => {
    return Object.values(CalendarEventStatus).includes(status) ? status : CalendarEventStatus.PENDING;
};
const createCalendarEvent = async (params) => {
    const { title, description, status, startDate, dueDate } = params;
    const validatedStatus = validateStatus(status);
    return await CalendarEvent.create({ title, description, status: validatedStatus, startDate, dueDate });
};
const getListCalendarEvents = async () => {
    try {
        return await CalendarEvent.findAll();
    }
    catch (error) {
        throw error;
    }
};
const getCalendarEventById = async (id) => {
    return await CalendarEvent.findByPk(id);
};
const updateCalendarEvent = async (id, params) => {
    const { title, description, status, dueDate } = params;
    const validatedStatus = status !== undefined ? validateStatus(status) : undefined;
    const [affectedRows] = await CalendarEvent.update({ title, description, status: validatedStatus, dueDate }, { where: { id } });
    return affectedRows;
};
const deleteCalendarEvent = async (id) => {
    return await CalendarEvent.destroy({ where: { id } });
};
export { createCalendarEvent, getListCalendarEvents, getCalendarEventById, updateCalendarEvent, deleteCalendarEvent, };
