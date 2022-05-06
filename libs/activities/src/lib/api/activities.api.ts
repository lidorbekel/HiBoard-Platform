import {HttpClient} from "@angular/common/http";
import {activities} from "../types/activities.type";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {activitiesApiMock} from "./activities.api.mock";

@Injectable({
  providedIn: 'root'
})
export class ActivitiesApi {
  static url = 'activities';

  constructor(private http: HttpClient) {
  }

  getactivities() {
    // return this.http.get<activities.Response>(activitiesApi.url);
    return new Observable<activities.Response>((observer) => {
      setTimeout(() => {
        observer.next({data: {activities: activitiesApiMock}})
      }, 2000)
    })
  }
}
