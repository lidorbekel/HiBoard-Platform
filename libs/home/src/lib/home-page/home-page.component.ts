// import {Component, OnInit, ChangeDetectionStrategy, NgModule, OnDestroy, Inject} from '@angular/core';
// import {CompletedTasksComponentModule} from "@hiboard/ui/completed-tasks/completed-tasks.component";
// import {TaskViewComponentModule} from "@hiboard/ui/task-view/task-view.component";
// import {MaterialModule} from "@hiboard/ui/material/material.module";
// import {CommonModule} from "@angular/common";
// import {TasksService} from "@hiboard/home/../../../../tasks/state/tasks.service";
// import {TasksRepository} from "@hiboard/home/../../../../tasks/state/tasks.repository";
// import {map, Observable} from "rxjs";
// import {Tasks} from "@hiboard/home/../../../../tasks/types/tasks.type";
// import {SubscribeModule} from "@ngneat/subscribe";
// import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
// import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
// import {ErrorTailorModule} from "@ngneat/error-tailor";
// import {TasksFiltersComponentModule} from "@hiboard/home/../../../../tasks/tasks-filters/tasks-filters.component";
// import {BindQueryParamsFactory, BindQueryParamsManager, QueryDefOptions} from "@ngneat/bind-query-params";
//
// @UntilDestroy()
// @Component({
//   selector: 'hbd-home-page',
//   templateUrl: './home-page.component.html',
//   styleUrls: ['./home-page.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class HomePageComponent implements OnInit, OnDestroy {
//   tasks$: Observable<Tasks.Entity[]>;
//   filteredTasks: Tasks.Entity[] = [];
//   isLoading$: Observable<boolean>;
//
//   filters = new FormGroup({
//     searchTerm: new FormControl('')
//   })
//
//   queryParamsManager:
//     | BindQueryParamsManager<Tasks.PageQueryParams>
//     | undefined;
//
//   constructor(private service: TasksService,
//               private tasksRepo: TasksRepository,
//               private factory: BindQueryParamsFactory
//   ) { }
//
//   ngOnInit(): void {
//     this.isLoading$ = this.tasksRepo.loading$;
//     this.fetchTasks();
//     this.tasks$ = this.tasksRepo.tasks$;
//
//     this.filters.get('searchTerm')!.valueChanges.subscribe(res => {
//       console.log(res);
//     })
//   }
//
//   initBindQueryParams() {
//     const queryParams =
//   }
//
//   private fetchTasks() {
//     this.service.fetchTasks().pipe(
//       map((res) => {
//         this.filteredTasks = res.data.tasks;
//       }),
//       untilDestroyed(this)
//     ).subscribe();
//   }
//
//   getFilteredTasksTitles() {
//     return this.filteredTasks.map((task) => task.title);
//   }
//
//   ngOnDestroy(): void {
//     this.queryParamsManager.destroy();
//   }
// }
//
// @NgModule({
//   declarations: [HomePageComponent],
//   imports: [CompletedTasksComponentModule, TaskViewComponentModule, MaterialModule, CommonModule, SubscribeModule, ReactiveFormsModule, ErrorTailorModule, TasksFiltersComponentModule],
//   exports: [HomePageComponent]
// })
// export class HomePageComponentModule {
// }
