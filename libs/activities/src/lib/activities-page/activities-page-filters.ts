import {Activities, ActivityStatus} from "@hiboard/activities/types/activities.type";

export interface ActivitiesFilters {
  name: string;
  tag: string;
  status: ActivityStatus[];
}

export const activitiesFilters = (activities: Activities.Entity[], filters: ActivitiesFilters) => {
  if (filters.name?.length) {
    activities = activities.filter(({activity}) => filters.name.includes(activity.title));
  }

  if (filters.tag?.length) {
    activities = activities.filter(({activity}) => filters.tag.includes(activity.tag));
  }

  if (filters.status?.length) {
    activities = activities.filter(({status}) => filters.status.includes(status));
  }

  return activities;
}
