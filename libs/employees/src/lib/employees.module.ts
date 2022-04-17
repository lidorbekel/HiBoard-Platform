import {NgModule} from "@angular/core";
import {EmployeesRoutingModule} from "./employees-routing.module";
import {EmployeesPageComponentModule} from "./employees-page/employees-page.component";

@NgModule({
  imports: [EmployeesRoutingModule, EmployeesPageComponentModule]
})
export class EmployeesModule {
}
