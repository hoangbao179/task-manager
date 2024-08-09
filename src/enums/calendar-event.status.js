class CalendarEventStatus {
    static PENDING = 1;
    static COMPLETED = 2;
    static IN_PROGRESS = 3;
  
    static getStatusName(value) {
      switch (value) {
        case CalendarEventStatus.PENDING:
          return 'Pending';
        case CalendarEventStatus.COMPLETED:
          return 'Completed';
        case CalendarEventStatus.IN_PROGRESS:
          return 'In Progress';
        default:
          return 'Unknown';
      }
    }
  }
  
  module.exports = CalendarEventStatus;
