import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TasksModule} from "@hiboard/tasks/tasks.module";
import {RoleGuard} from "@hiboard/auth/guards/role.guard";
import {UserProfilePageComponent} from "@hiboard/user-profile/user-profile-page/user-profile-page.component";

const children: Routes = [
  {
    path: 'tasks',
    loadChildren: () =>
      import('@hiboard/tasks/tasks.module').then(
        ({TasksModule}) => TasksModule
      ),
    data: {
      roles: ['employee']
    }
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('@hiboard/employees/employees.module').then(
        ({EmployeesModule}) => EmployeesModule
      ),
    data: {
      roles: ['manager']
    }
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('@hiboard/admin/admin.module').then(
        ({AdminModule}) => AdminModule
      ),
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'profile',
    component: UserProfilePageComponent
  }
];

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
      ...children.map((child) => ({...child, canActivate: [RoleGuard]}))
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
