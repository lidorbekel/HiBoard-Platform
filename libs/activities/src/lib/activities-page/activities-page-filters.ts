import {activities, activitiestatus, TaskTag} from "@hiboard/activities/types/activities.type";

export interface activitiesFilters {
  names: string;
  tags: TaskTag;
  statuses: activitiestatus;
}

export function activitiesFilters(activities: activities.Entity[], filters: any): activities.Entity[] {
  return activities;
}
