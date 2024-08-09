import { AppDataSource } from "../config/data-source";
import { CalendarEvent } from "../entities/calendar-event";
import { CalendarEventStatus } from "../enums/calendar-event.status";

interface ICreateCalendarEventParams {
  title: string;
  description: string;
  status: CalendarEventStatus;
  startDate: Date;
  endDate: Date;
}

interface IUpdateCalendarEventParams {
  title?: string;
  description?: string;
  status?: CalendarEventStatus;
  endDate?: Date;
}

const validateStatus = (status: CalendarEventStatus): CalendarEventStatus => {
  return Object.values(CalendarEventStatus).includes(status) ? status : CalendarEventStatus.PENDING;
};

const createCalendarEvent = async (params: ICreateCalendarEventParams): Promise<CalendarEvent> => {
  const { title, description, status, startDate, endDate } = params;
  const validatedStatus = validateStatus(status);
  const calendarEventRepository = AppDataSource.getRepository(CalendarEvent);
  const event = calendarEventRepository.create({ title, description, status: validatedStatus, startDate, endDate });
  return await calendarEventRepository.save(event);
};

const getListCalendarEvents = async (): Promise<CalendarEvent[]> => {
  const calendarEventRepository = AppDataSource.getRepository(CalendarEvent);
  return await calendarEventRepository.find();
};

const getCalendarEventById = async (id: string): Promise<CalendarEvent | null> => {
  const calendarEventRepository = AppDataSource.getRepository(CalendarEvent);
  return await calendarEventRepository.findOneBy({ id });
};

const updateCalendarEvent = async (id: string, params: IUpdateCalendarEventParams): Promise<number> => {
  const { title, description, status, endDate } = params;
  const validatedStatus = status !== undefined ? validateStatus(status) : undefined;
  
  const calendarEventRepository = AppDataSource.getRepository(CalendarEvent);
  const result = await calendarEventRepository.update(id, { title, description, status: validatedStatus, endDate });
  return result.affected || 0;
};

const deleteCalendarEvent = async (id: string): Promise<number> => {
  const calendarEventRepository = AppDataSource.getRepository(CalendarEvent);
  const result = await calendarEventRepository.delete(id);
  return result.affected || 0;
};

export {
  createCalendarEvent,
  getListCalendarEvents,
  getCalendarEventById,
  updateCalendarEvent,
  deleteCalendarEvent,
};
