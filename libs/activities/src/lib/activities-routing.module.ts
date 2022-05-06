import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ActivitiesPageComponent} from "@hiboard/activities/activities-page/activities-page.component";

const routes: Routes = [{path: '', component: ActivitiesPageComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivitiesRoutingModule {
}
