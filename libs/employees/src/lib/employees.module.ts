import { NgModule } from '@angular/core';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesPageComponentModule } from './employees-page/employees-page.component';
import { EmployeePageComponentModule } from '@hiboard/employees/employee-page/employee-page.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    EmployeesRoutingModule,
    EmployeesPageComponentModule,
    EmployeePageComponentModule,
    ChartsModule,
  ],
})
export class EmployeesModule {}
