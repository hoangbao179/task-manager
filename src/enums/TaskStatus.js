class TaskStatus {
    static PENDING = 1;
    static COMPLETED = 2;
    static IN_PROGRESS = 3;
  
    static getStatusName(value) {
      switch (value) {
        case TaskStatus.PENDING:
          return 'Pending';
        case TaskStatus.COMPLETED:
          return 'Completed';
        case TaskStatus.IN_PROGRESS:
          return 'In Progress';
        default:
          return 'Unknown';
      }
    }
  }
  
  module.exports = TaskStatus;
