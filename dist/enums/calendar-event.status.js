export var CalendarEventStatus;
(function (CalendarEventStatus) {
    CalendarEventStatus[CalendarEventStatus["PENDING"] = 1] = "PENDING";
    CalendarEventStatus[CalendarEventStatus["COMPLETED"] = 2] = "COMPLETED";
    CalendarEventStatus[CalendarEventStatus["IN_PROGRESS"] = 3] = "IN_PROGRESS";
})(CalendarEventStatus || (CalendarEventStatus = {}));
export const getStatusName = (value) => {
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
