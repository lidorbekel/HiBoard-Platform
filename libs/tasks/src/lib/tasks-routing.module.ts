import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TasksPageComponent} from "@hiboard/tasks/tasks-page/tasks-page.component";

const routes: Routes = [{path: '', component: TasksPageComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {
}
