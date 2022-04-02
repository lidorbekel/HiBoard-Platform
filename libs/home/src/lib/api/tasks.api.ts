import {HttpClient} from "@angular/common/http";
import {Tasks} from "@hiboard/home/types/tasks.type";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tasksApiMock} from "@hiboard/home/api/tasks.api.mock";

@Injectable({
  providedIn: 'root'
})
export class TasksApi {
  static url = 'tasks';

  constructor(private http: HttpClient) {
  }

  getTasks() {
    // return this.http.get<Tasks.Response>(TasksApi.url);
    return new Observable<Tasks.Response>((observer) => {
      setTimeout(() => {
        observer.next({ data: { tasks: tasksApiMock } })
      }, 2000)
    })
  }
}
