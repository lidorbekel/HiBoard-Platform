import {Activities, ActivityStatus} from "@hiboard/activities/types/activities.type";

export interface ActivitiesFilters {
  name: string;
  tag: string;
  status: ActivityStatus[];
}

export const activitiesFilters = (activities: Activities.Entity[], filters: ActivitiesFilters) => {
  console.log(filters)
  if (filters.name?.length) {
    console.log('im in')
    activities = activities.filter(({title}) => filters.name.includes(title));
  }

  if (filters.tag?.length) {
    activities = activities.filter(({tag}) => filters.tag.includes(tag));
  }

  if (filters.status?.length) {
    activities = activities.filter(({status}) => filters.status.includes(status));
  }

  return activities;
}
