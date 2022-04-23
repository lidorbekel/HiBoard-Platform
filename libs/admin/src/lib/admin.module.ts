import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CompanyPageComponent} from "@hiboard/admin/company-page/company-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'company-details',
    pathMatch: 'full',
  },
  {
    path: 'company-details',
    component: CompanyPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModule {
}
