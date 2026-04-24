export interface Task {
  taskId: number;
  title: string;
  description?: string;
  status: string;
  priorityLevel: string;
  dueDate?: string | null;
  nextAction?: string | null;
  lastUpdatedDate: string;
}
