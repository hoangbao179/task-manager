import { Request, Response } from 'express';
import * as CalendarEventService from '../services/calendar-event.service';
import { formatResponse } from '../utils/response.utils';
import { HttpStatusCode } from '../enums/http.status';

export const createCalendarEvent = async (req: Request, res: Response): Promise<Response> => {
  const { title, description, status, startDate, dueDate } = req.body;

  try {
    const newCalendarEvent = await CalendarEventService.createCalendarEvent({
      title,
      description,
      status,
      startDate,
      dueDate,
    });
    return res.status(HttpStatusCode.CREATED).json(formatResponse(newCalendarEvent, 'Calendar event created successfully'));
  } catch (error: any) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, error.message, [], HttpStatusCode.INTERNAL_SERVER_ERROR));
  }
};

export const getListCalendarEvents = async (req: Request, res: Response): Promise<Response> => {
  try {
    const calendarEvents = await CalendarEventService.getListCalendarEvents();
    return res.status(HttpStatusCode.OK).json(formatResponse(calendarEvents, 'List of calendar events retrieved successfully'));
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
  const { title, description, status, dueDate } = req.body;

  try {
    const affectedRows = await CalendarEventService.updateCalendarEvent(id, {
      title,
      description,
      status,
      dueDate,
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
