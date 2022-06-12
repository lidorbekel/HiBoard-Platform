import {Injectable} from "@angular/core";
import {ActivitiesRepository} from "./activities.repository";
import {toAsyncState} from "@ngneat/loadoff";
import {Activities, ActivityStatus} from "@hiboard/activities/types/activities.type";
import {HttpClient} from "@angular/common/http";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  static inventoryUrl = 'inventory/activities';

  static url = (userId: string) => {
    return `user/${userId}/activities`
  }

  constructor(
    private activitiesRepo: ActivitiesRepository,
    private http: HttpClient,
    private userRepo: UserRepository,
  ) {
  }

  getActivities(id?: string) {
    return this.http.get<Activities.Response>(ActivitiesService.url(id ?? this.userRepo.getCurrentUser()!.id.toString())).pipe(
      tap((res) => {
        this.activitiesRepo.setActivities(res.data);
      }),
      toAsyncState(),
    );
  }

  assignTemplateToEmployee(employeeId: string, templateId: string) {
    return this.http.post(`${ActivitiesService.url(employeeId)}/assign/${templateId}`, {})
  }

  createInventoryActivity(activity: Omit<Activities.InventoryEntity, 'id' | 'userAverageTime'>) {
    return this.http.post<Activities.InventoryResponse>(ActivitiesService.inventoryUrl, activity);
  }

  updateUserActivity(activity: Activities.Entity) {
    return this.http.patch(`${ActivitiesService.url(this.userRepo.userId.toString())}/${activity.id}`, {
      ...activity,
      status: this.convertStatusToEnum(activity.status)
    })
      .pipe(
        tap(() => this.activitiesRepo.updateUserActivity(activity))
      )
  }

  convertStatusToEnum(status: ActivityStatus) {
    if (status === 'Backlog') {
      return 1;
    }
    if (status === 'InProgress') {
      return 2;
    }
    return 3;
  }
}
