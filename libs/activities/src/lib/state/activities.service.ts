import {Injectable} from "@angular/core";
import {ActivitiesRepository} from "./activities.repository";
import {ActivitiesApi} from "../api/activities.api";
import {tap} from "rxjs";
import {toAsyncState} from "@ngneat/loadoff";

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  constructor(private activitiesRepo: ActivitiesRepository, private api: ActivitiesApi) {
  }

  getActivities() {
    return this.api.getActivities().pipe(
      tap(({data}) => {
        this.activitiesRepo.setActivities(data.activities);
      }),
      toAsyncState()
    );
  }
}
