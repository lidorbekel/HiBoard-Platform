import {NgModule} from "@angular/core";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeaderComponentModule} from "@hiboard/dashboard/header/header.component";
import {NavigationComponentModule} from "@hiboard/dashboard/navigation/navigation.component";

@NgModule({
  imports: [DashboardRoutingModule, HeaderComponentModule, NavigationComponentModule],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
