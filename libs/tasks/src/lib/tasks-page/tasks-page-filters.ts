import {Tasks, TaskStatus, TaskTag} from "@hiboard/tasks/types/tasks.type";

export interface TasksFilters {
  names: string;
  tags: TaskTag;
  statuses: TaskStatus;
}

export function tasksFilters(tasks: Tasks.Entity[], filters: any): Tasks.Entity[] {
  return tasks;
}
