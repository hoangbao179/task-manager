import { CalendarEvent } from 'entities/calendar-event';

export interface ICalendarEventResponse {
  id: string;
  title: string;
  startDate: string;
  description: string;   
  endDate: string;
  startTime: string | null;
  endTime: string | null;
  isAllDay: boolean;
}

export class CalendarEventResponse implements ICalendarEventResponse {
  id: string;
  title: string;
  description: string;
  startDate: string;   
  endDate: string;   
  startTime: string | null;
  endTime: string | null;
  isAllDay: boolean;

  constructor(event: CalendarEvent) {
    this.id = event.id;
    this.title = event.title;
    this.description = event.description
    this.startDate = event.startDate.toISOString().split('T')[0];  
    this.endDate = event.endDate.toISOString().split('T')[0]; 
    this.isAllDay = event.isAllDay;
    this.startTime = event.isAllDay ? "00:00:00": event.startDate.toISOString().split('T')[1].slice(0, 8);
    this.endTime = event.isAllDay ? "23:59:59" : event.endDate.toISOString().split('T')[1].slice(0, 8);
  }
}

export interface IFilteredCalendarEventResponse {
  data: any[];
  statusCode: number;
  message?: string;
}