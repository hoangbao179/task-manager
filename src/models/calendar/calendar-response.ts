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
    if (event.isAllDay) {
      this.startTime = "00:00:00";
      this.endTime = "23:59:59";
    } else {
      this.startTime = event.startDate.toTimeString().split(' ')[0];
      this.endTime = event.endDate.toTimeString().split(' ')[0];
    }
  }
}