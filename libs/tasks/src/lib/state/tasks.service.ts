import {Injectable} from "@angular/core";
import {TasksRepository} from "./tasks.repository";
import {TasksApi} from "../api/tasks.api";
import {tap} from "rxjs";
import {toAsyncState} from "@ngneat/loadoff";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private tasksRepo: TasksRepository, private api: TasksApi) {
  }

  getTasks() {
    return this.api.getTasks().pipe(
      tap(() => {
        this.tasksRepo.setLoading(true)
      }),
      tap(({data}) => {
        this.tasksRepo.setTasks(data.tasks);
      }),
      toAsyncState()
    );
  }
}
