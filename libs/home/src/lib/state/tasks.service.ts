import {Injectable} from "@angular/core";
import {TasksRepository} from "@hiboard/home/state/tasks.repository";
import {TasksApi} from "@hiboard/home/api/tasks.api";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private tasksRepo: TasksRepository, private api: TasksApi) {
  }

  fetchTasks(){
    this.tasksRepo.setLoading(true);

    this.api.getTasks().pipe(
      tap(({ data }) => {
        this.tasksRepo.setTasks(data.tasks);
        this.tasksRepo.setLoading(false);
      })
    ).subscribe();
  }
}
