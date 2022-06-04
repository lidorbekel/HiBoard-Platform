import {Injectable} from "@angular/core";
import {ActivitiesRepository} from "./activities.repository";
import {ActivitiesApi} from "../api/activities.api";
import {tap} from "rxjs";
import {toAsyncState} from "@ngneat/loadoff";
import {Activities} from "@hiboard/activities/types/activities.type";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  static url = 'inventory/activities';

  constructor(private activitiesRepo: ActivitiesRepository, private api: ActivitiesApi, private http: HttpClient) {
  }

  getActivities() {
    return this.api.getActivities().pipe(
      tap(({data}) => {
        this.activitiesRepo.setActivities(data.activities);
      }),
      toAsyncState()
    );
  }

  createInventoryActivity(activity: Omit<Activities.InventoryEntity, 'id'>) {
    return this.http.post<Activities.InventoryResponse>(ActivitiesApi.url, activity);
  }
}
