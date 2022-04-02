import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import {CompletedTasksComponentModule} from "@hiboard/ui/completed-tasks/completed-tasks.component";
import {TaskViewComponentModule} from "@hiboard/ui/task-view/task-view.component";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {CommonModule} from "@angular/common";
import {TasksService} from "@hiboard/home/state/tasks.service";
import {TasksRepository} from "@hiboard/home/state/tasks.repository";
import {map, Observable} from "rxjs";
import {Tasks} from "@hiboard/home/types/tasks.type";
import {SubscribeModule} from "@ngneat/subscribe";

@Component({
  selector: 'hbd-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  taskViews = [1,1,1,1,1];
  tasks$: Observable<Tasks.Entity[]>;
  isLoading$: Observable<boolean>;

  constructor(private service: TasksService, private tasksRepo: TasksRepository) { }

  ngOnInit(): void {
    this.isLoading$ = this.tasksRepo.loading$;
    this.fetchTasks();
    this.tasks$ = this.tasksRepo.tasks$;
  }

  private fetchTasks() {
    this.service.fetchTasks();
  }

}

@NgModule({
  declarations: [HomePageComponent],
  imports: [CompletedTasksComponentModule, TaskViewComponentModule, MaterialModule, CommonModule, SubscribeModule],
  exports: [HomePageComponent]
})
export class HomePageComponentModule {
}
