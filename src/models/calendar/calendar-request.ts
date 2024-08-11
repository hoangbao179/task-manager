import { CalendarEventStatus } from "../../enums/calendar-event.status";

export interface ICreateCalendarEventParams {
    title: string;
    description: string;
    status: CalendarEventStatus;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    minutesOffset: number;
    isAllDay?: boolean;
  }
  
  export interface IUpdateCalendarEventParams {
    title?: string;
    description?: string;
    status?: CalendarEventStatus;
    endDate?: Date;
  }
  
  export interface ICalendarEventRequest {
    StartDate: string; 
    EndDate: string; 
    MinutesOffset: number;
  }
  
  export interface ICalendarEventRequest {
    startDate: string; 
    endDate: string; 
    minutesOffset: number;
  }