import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesPageComponent} from './employees-page/employees-page.component';
import {EmployeePageComponent} from "@hiboard/employees/employee-page/employee-page.component";

const routes: Routes = [
  {path: '', component: EmployeesPageComponent},
  {
    path: ':id',
    component: EmployeePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {
}
