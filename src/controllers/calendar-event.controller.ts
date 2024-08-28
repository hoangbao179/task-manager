import { Request, Response } from 'express';
import { formatResponse } from '../utils/response.utils';
import { HttpStatusCode } from '../enums/http.status';
import { ICreateCalendarEventParams, IUpdateCalendarEventParams } from '../models/calendar/calendar-request';
import CalendarEventService from '../services/calendar/calendar-event.service';

class CalendarEventController {
  private calendarEventService = new CalendarEventService();

  getCalendarEvents = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const result = await this.calendarEventService.getFilteredCalendarEvents(userId, req.body);
    if (result.statusCode === 200) {
      return res.status(200).json(formatResponse(result.data, ''));
    } else {
      return res.status(result.statusCode).json({ message: result.message });
    }
  };

  createCalendarEvent = async (req: Request, res: Response): Promise<Response> => {
    const userId = (req as any).userId;
    try {
      const newCalendarEvent = await this.calendarEventService.createCalendarEvent(req.body as ICreateCalendarEventParams, userId);
      return res.status(HttpStatusCode.CREATED).json(formatResponse(newCalendarEvent, 'Calendar event created successfully'));
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, error.message, [], HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  };

  getCalendarEventById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const calendarEvent = await this.calendarEventService.getCalendarEventById(id);
      if (calendarEvent) {
        return res.status(HttpStatusCode.OK).json(formatResponse(calendarEvent, 'Calendar event retrieved successfully'));
      } else {
        return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse(null, 'Calendar event not found', [], HttpStatusCode.NOT_FOUND));
      }
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, error.message, [], HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  };

  updateCalendarEvent = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const affectedRows = await this.calendarEventService.updateCalendarEvent(id, req.body as IUpdateCalendarEventParams);

      if (affectedRows > 0) {
        return res.status(HttpStatusCode.OK).json(formatResponse(null, 'Calendar event updated successfully'));
      } else {
        return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse(null, 'Calendar event not found', [], HttpStatusCode.NOT_FOUND));
      }
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, error.message, [], HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  };

  deleteCalendarEvent = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const affectedRows = await this.calendarEventService.deleteCalendarEvent(id);

      if (affectedRows > 0) {
        return res.status(HttpStatusCode.OK).json(formatResponse(null, 'Calendar event deleted successfully'));
      } else {
        return res.status(HttpStatusCode.NOT_FOUND).json(formatResponse(null, 'Calendar event not found', [], HttpStatusCode.NOT_FOUND));
      }
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(formatResponse(null, error.message, [], HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  };

}

export default new CalendarEventController();
