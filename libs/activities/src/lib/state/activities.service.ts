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

  getactivities() {
    return this.api.getactivities().pipe(
      tap(() => {
        this.activitiesRepo.setLoading(true)
      }),
      tap(({data}) => {
        this.activitiesRepo.setactivities(data.activities);
      }),
      toAsyncState()
    );
  }
}
