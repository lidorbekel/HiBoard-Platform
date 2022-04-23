import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TasksRepository} from "@hiboard/tasks/state/tasks.repository";
import {BindQueryParamsFactory} from "@ngneat/bind-query-params";
import {TasksService} from "@hiboard/tasks/state/tasks.service";
import {Tasks} from "@hiboard/tasks/types/tasks.type";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {map, switchMap} from "rxjs";
import {tasksFilters} from "@hiboard/tasks/tasks-page/tasks-page-filters";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {TaskViewComponentModule} from "@hiboard/ui/task-view/task-view.component";
import {AsyncState} from "@ngneat/loadoff";
import {TasksFiltersComponentModule} from "@hiboard/tasks/tasks-filters/tasks-filters.component";
import {SubscribeModule} from "@ngneat/subscribe";
import {CompletedTasksComponentModule} from "@hiboard/ui/completed-tasks/completed-tasks.component";

@UntilDestroy()
@Component({
  selector: 'hbd-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  providers: [
    TasksRepository,
    TasksService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPageComponent implements OnInit, OnDestroy {
  tasks: AsyncState<Tasks.Response>;
  filteredTasks: any;
  completedTasksPercent = 0;


  filters = new FormGroup({
    names: new FormControl(),
    tags: new FormControl(),
    statuses: new FormControl()
  });

  queryParamsManager = this.factory
    .create<Tasks.PageQueryParams>([
      {
        queryKey: 'names',
        type: 'array'
      },
      {
        queryKey: 'tags',
        type: 'array'
      },
      {
        queryKey: 'statuses',
        type: 'array'
      },
    ]).connect(this.filters);

  constructor(
    private service: TasksService,
    private tasksRepo: TasksRepository,
    private factory: BindQueryParamsFactory,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.filters.valueChanges.pipe(
      switchMap((filters) => {
        return this.tasksRepo.tasks$.pipe(
          map((tasks) => tasksFilters(tasks, filters))
        );
      }),
      untilDestroyed(this)
    )
      .subscribe((filteredTasks) => {
        this.filteredTasks = filteredTasks;
      });

    this.fetchTasks();
  }

  ngOnDestroy() {
    this.queryParamsManager.destroy();
  }

  private fetchTasks() {
    this.service.getTasks().pipe(
      untilDestroyed(this)
    )
      .subscribe((tasks) => {
        this.tasks = tasks;
        if (tasks.res) {
          this.completedTasksPercent = (tasks.res.data.tasks.filter(({status}) => status === 'done').length / tasks.res.data.tasks.length) * 100;
        }
        this.cdr.markForCheck();
      })
  }

}

@NgModule({
  declarations: [TasksPageComponent],
  imports: [CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    TaskViewComponentModule,
    TasksFiltersComponentModule,
    SubscribeModule,
    CompletedTasksComponentModule,
  ],
  exports: [TasksPageComponent]
})
export class TasksPageComponentModule {
}
