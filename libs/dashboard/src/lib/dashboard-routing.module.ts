import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TasksModule} from "@hiboard/tasks/tasks.module";
import {RoleGuard} from "@hiboard/auth/guards/role.guard";

const children: Routes = [
  {
    path: 'tasks',
    loadChildren: () =>
      import('@hiboard/tasks/tasks.module').then(
        ({TasksModule}) => TasksModule
      ),
    canActivate: [RoleGuard],
    data: {
      roles: ['employee']
    }
  }
]

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tasks'
      },
      ...children
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
