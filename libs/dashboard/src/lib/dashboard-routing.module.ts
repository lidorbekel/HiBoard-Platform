import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RoleGuard} from "@hiboard/auth/guards/role.guard";
import {UserProfilePageComponent} from "@hiboard/user-profile/user-profile-page/user-profile-page.component";

const children: Routes = [
  {
    path: 'activities',
    loadChildren: () =>
      import('@hiboard/activities/activities.module').then(
        ({ActivitiesModule}) => ActivitiesModule
      ),
    data: {
      roles: ['Employee']
    }
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('@hiboard/employees/employees.module').then(
        ({EmployeesModule}) => EmployeesModule
      ),
    data: {
      roles: ['Manager']
    }
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('@hiboard/admin/admin.module').then(
        ({AdminModule}) => AdminModule
      ),
    data: {
      roles: ['Admin']
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
        redirectTo: 'activities'
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
