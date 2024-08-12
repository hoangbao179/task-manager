export enum CalendarEventStatus {
  PENDING = 1,
  COMPLETED = 2,
  IN_PROGRESS = 3,
}

export const getStatusName = (value: CalendarEventStatus): string => {
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
};
