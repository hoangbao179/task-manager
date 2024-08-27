import { Request, Response } from 'express';
import * as CalendarEventService from '../services/calendar-event.service';
import { formatResponse } from '../utils/response.utils';
import { HttpStatusCode } from '../enums/http.status';

export const getCalendarEvents = async (req: Request, res: Response) => {
  const requestData = req.body;
  const result = await CalendarEventService.getFilteredCalendarEvents(requestData);
  if (result.statusCode === 200) {
    return res.status(200).json(formatResponse(result.data, ''));
  } else {
    return res.status(result.statusCode).json({ message: result.message });
  }
};

export const createCalendarEvent = async (req: Request, res: Response): Promise<Response> => {
  const { title, description, status, startDate, endDate, startTime, endTime, minutesOffset, isAllDay } = req.body;

  try {
    const newCalendarEvent = await CalendarEventService.createCalendarEvent({
      title,
      description,
      status,
      startDate,
      endDate,
      startTime,
      endTime,
      minutesOffset,
      isAllDay
    });
    return res.status(HttpStatusCode.CREATED).json(formatResponse(newCalendarEvent, 'Calendar event created successfully'));
  } catch (error: any) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, error.message, [], HttpStatusCode.INTERNAL_SERVER_ERROR));
  }
};

export const getCalendarEventById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const calendarEvent = await CalendarEventService.getCalendarEventById(id);
    if (calendarEvent) {
      return res.status(HttpStatusCode.OK).json(formatResponse(calendarEvent, 'Calendar event retrieved successfully'));
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse(null, 'Calendar event not found', [], HttpStatusCode.NOT_FOUND));
    }
  } catch (error: any) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, error.message, [], HttpStatusCode.INTERNAL_SERVER_ERROR));
  }
};

export const updateCalendarEvent = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { title, description, status, endDate } = req.body;

  try {
    const affectedRows = await CalendarEventService.updateCalendarEvent(id, {
      title,
      description,
      status,
      endDate,
    });

    if (affectedRows > 0) {
      return res.status(HttpStatusCode.OK).json(formatResponse(null, 'Calendar event updated successfully'));
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse(null, 'Calendar event not found', [], HttpStatusCode.NOT_FOUND));
    }
  } catch (error: any) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, error.message, [], HttpStatusCode.INTERNAL_SERVER_ERROR));
  }
};

export const deleteCalendarEvent = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const affectedRows = await CalendarEventService.deleteCalendarEvent(id);

    if (affectedRows > 0) {
      return res.status(HttpStatusCode.OK).json(formatResponse(null, 'Calendar event deleted successfully'));
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse(null, 'Calendar event not found', [], HttpStatusCode.NOT_FOUND));
    }
  } catch (error: any) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, error.message, [], HttpStatusCode.INTERNAL_SERVER_ERROR));
  }
};
