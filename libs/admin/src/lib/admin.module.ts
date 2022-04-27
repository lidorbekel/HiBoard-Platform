import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CompanyUsersPageComponent} from "@hiboard/company-users/company-users-page/company-users-page.component";
import {
  CompanyDetailsPageComponent
} from "@hiboard/company-details/company-details-page/company-details-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'company-details',
    pathMatch: 'full',
  },
  {
    path: 'company-details',
    component: CompanyDetailsPageComponent
  },
  {
    path: 'company-users',
    component: CompanyUsersPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModule {
}
