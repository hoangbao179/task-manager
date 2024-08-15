import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { CalendarEvent } from "../entities/calendar-event";
import { CalendarEventStatus } from "../enums/calendar-event.status";
import { ICalendarEventRequest, ICreateCalendarEventParams, IUpdateCalendarEventParams } from "../models/calendar/calendar-request";
import { CalendarEventResponse } from "../models/calendar/calendar-response";

const calendarEventRepository: Repository<CalendarEvent> = AppDataSource.getRepository(CalendarEvent);

const validateStatus = (status: CalendarEventStatus): CalendarEventStatus => {
  return Object.values(CalendarEventStatus).includes(status) ? status : CalendarEventStatus.PENDING;
};

const adjustToUtc = (date: string, time: string | null | undefined, minutesOffset: number): Date => {
  const timePart = time ? time : '00:00:00';
  const localDate = new Date(`${date}T${timePart}`);
  localDate.setMinutes(localDate.getMinutes() - minutesOffset);
  return new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
};


export const getFilteredCalendarEvents = async (request: ICalendarEventRequest) => {
  const { startDate, endDate, minutesOffset } = request;
  try {
  const startDateTime = isNaN(Date.parse(startDate)) ? null : new Date(`${startDate}T00:00:00Z`);
  const endDateTime = isNaN(Date.parse(endDate)) ? null : new Date(`${endDate}T23:59:59Z`);

  if (!startDateTime || !endDateTime) {
    return {
      data: null,
      statusCode: 400,
      message: 'Invalid startDate or endDate format',
    };
  }

    startDateTime.setMinutes(startDateTime.getMinutes() - minutesOffset);
    endDateTime.setMinutes(endDateTime.getMinutes() - minutesOffset);

    const events = await calendarEventRepository.createQueryBuilder('event')
      .where(
        `(event.startDate >= :startDate AND event.endDate <= :endDate) OR
         (event.startDate <= :startDate AND event.endDate >= :endDate) OR
         (event.startDate <= :endDate AND event.endDate >= :endDate) OR
         (event.startDate >= :startDate AND event.endDate >= :endDate AND event.startDate <= :endDate)`,
        { startDate: startDateTime, endDate: endDateTime }
      )
      .select([
        'event.id',
        'event.title',
        'event.description',
        'event.startDate',
        'event.endDate',
        'event.isAllDay'
      ])
      .getMany();

    return {
      data: events.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        startDate: event.startDate.toISOString().split('T')[0],
        endDate: event.endDate.toISOString().split('T')[0],
        startTime: event.isAllDay ? null : event.startDate.toISOString().split('T')[1].slice(0, 8),
        endTime: event.isAllDay ? null : event.endDate.toISOString().split('T')[1].slice(0, 8),
        isAllDay: event.isAllDay
      })),
      statusCode: 200
    };
  } catch (error) {
    return {
      data: startDate,
      statusCode: 500,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

export const createCalendarEvent = async (params: ICreateCalendarEventParams): Promise<CalendarEvent> => {
  const { title, description, status, startDate, startTime, endDate, endTime, minutesOffset, isAllDay } = params;
  const validatedStatus = validateStatus(status);
  
  const utcStartDate = adjustToUtc(startDate, startTime, minutesOffset);
  const utcEndDate = adjustToUtc(endDate, endTime, minutesOffset);

  try {
    const event = calendarEventRepository.create({
      title,
      description,
      status: validatedStatus,
      startDate: utcStartDate,
      endDate: utcEndDate,
      isAllDay: isAllDay || false,
    });

    return await calendarEventRepository.save(event);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to create calendar event');
  }
};

export const getCalendarEventById = async (id: string): Promise<CalendarEventResponse | null> => {
  const calendarEvent = await calendarEventRepository.findOneBy({ id });

  if (!calendarEvent) {
    return null;
  }

  return new CalendarEventResponse(calendarEvent); 
};

export const updateCalendarEvent = async (id: string, params: IUpdateCalendarEventParams): Promise<number> => {
  const { title, description, status, endDate } = params;
  const validatedStatus = status !== undefined ? validateStatus(status) : undefined;

  const result = await calendarEventRepository.update(id, { title, description, status: validatedStatus, endDate });
  return result.affected || 0;
};

export const deleteCalendarEvent = async (id: string): Promise<number> => {
  const result = await calendarEventRepository.delete(id);
  return result.affected || 0;
};
