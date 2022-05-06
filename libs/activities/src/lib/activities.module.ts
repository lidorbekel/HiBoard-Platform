import {NgModule} from "@angular/core";
import {ActivitiesPageComponentModule} from "@hiboard/activities/activities-page/activities-page.component";
import {ActivitiesRoutingModule} from "@hiboard/activities/activities-routing.module";

@NgModule({
  imports: [ActivitiesRoutingModule, ActivitiesPageComponentModule],
})
export class ActivitiesModule {
}
