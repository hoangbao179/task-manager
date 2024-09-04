import { CalendarEvent } from ".../../entities/calendar-event";
import { ICalendarEventRequest, ICreateCalendarEventParams, IUpdateCalendarEventParams } from "../../models/calendar/calendar-request";
import { CalendarEventResponse, IFilteredCalendarEventResponse } from "../../models/calendar/calendar-response";

export interface ICalendarEventService {
     getFilteredCalendarEvents(userId: string, request: ICalendarEventRequest):Promise<IFilteredCalendarEventResponse>;

     createCalendarEvent(params: ICreateCalendarEventParams, userId: string): Promise<CalendarEvent>;

     getCalendarEventById(id: string): Promise<CalendarEventResponse | null>;

     updateCalendarEvent(id: string, params: IUpdateCalendarEventParams): Promise<number>;

     deleteCalendarEvent(id: string): Promise<number>;
}
