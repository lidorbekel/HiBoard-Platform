import { CompanyEmployeesPageComponent } from './../../../company-employees/src/lib/company-employees-page/company-employees-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesPageComponent } from './employees-page/employees-page.component';

const routes: Routes = [{ path: '', component: EmployeesPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
