import {Activities, ActivityStatus} from "@hiboard/activities/types/activities.type";

export interface ActivitiesFilters {
  name: string[];
  week: number[];
  tag: string[];
  status: ActivityStatus[];
}

export const activitiesFilters = (activities: Activities.Entity[], filters: ActivitiesFilters) => {
  if (filters.name?.length) {
    activities = activities.filter(({activity}) => filters.name.includes(activity.title));
  }

  if (filters.week?.length) {
    activities = activities.filter(({activity}) => filters.week.map(week => week.toString()).includes(activity.week.toString()));
  }

  if (filters.tag?.length) {
    activities = activities.filter(({activity}) => filters.tag.includes(activity.tag));
  }

  if (filters.status?.length) {
    activities = activities.filter(({status}) => filters.status.includes(status));
  }

  return activities;
}
