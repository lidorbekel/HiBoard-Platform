import {NgModule} from "@angular/core";
import {TasksPageComponentModule} from "@hiboard/tasks/tasks-page/tasks-page.component";
import {TasksRoutingModule} from "@hiboard/tasks/tasks-routing.module";

@NgModule({
  imports: [TasksRoutingModule, TasksPageComponentModule],
})
export class TasksModule {
}
