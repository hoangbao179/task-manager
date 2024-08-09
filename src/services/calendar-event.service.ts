import CalendarEvent from "../entity/calendar-event";
import { CalendarEventStatus } from "../enums/calendar-event.status";
import { ICalendarEvent, ICalendarEventCreationAttributes } from "../entity/calendar-event";

// Define the types for the parameters
interface ICreateCalendarEventParams {
  title: string;
  description: string;
  status: CalendarEventStatus;
  startDate: Date;
  dueDate: Date;
}

interface IUpdateCalendarEventParams {
  title?: string;
  description?: string;
  status?: CalendarEventStatus;
  dueDate?: Date;
}

const validateStatus = (status: CalendarEventStatus): CalendarEventStatus => {
  return Object.values(CalendarEventStatus).includes(status) ? status : CalendarEventStatus.PENDING;
};

const createCalendarEvent = async (params: ICreateCalendarEventParams): Promise<ICalendarEvent> => {
  const { title, description, status, startDate, dueDate } = params;
  const validatedStatus = validateStatus(status);
  return await CalendarEvent.create({ title, description, status: validatedStatus, startDate, dueDate });
};

const getListCalendarEvents = async (): Promise<ICalendarEvent[]> => {
  try {
    return await CalendarEvent.findAll();
  } catch (error) {
    throw error;
  }
};

const getCalendarEventById = async (id: string): Promise<ICalendarEvent | null> => {
  return await CalendarEvent.findByPk(id);
};

const updateCalendarEvent = async (id: string, params: IUpdateCalendarEventParams): Promise<number> => {
  const { title, description, status, dueDate } = params;
  const validatedStatus = status !== undefined ? validateStatus(status) : undefined;
  const [affectedRows] = await CalendarEvent.update(
    { title, description, status: validatedStatus, dueDate },
    { where: { id } }
  );
  return affectedRows;
};

const deleteCalendarEvent = async (id: string): Promise<number> => {
  return await CalendarEvent.destroy({ where: { id } });
};

export {
  createCalendarEvent,
  getListCalendarEvents,
  getCalendarEventById,
  updateCalendarEvent,
  deleteCalendarEvent,
};
