import {NgModule} from "@angular/core";
import {EmployeesRoutingModule} from "./employees-routing.module";
import {EmployeesPageComponentModule} from "./employees-page/employees-page.component";
import {EmployeePageComponentModule} from "@hiboard/employees/employee-page/employee-page.component";

@NgModule({
  imports: [EmployeesRoutingModule, EmployeesPageComponentModule, EmployeePageComponentModule]
})
export class EmployeesModule {
}
