import {RouterModule, Routes} from "@angular/router";import {NgModule} from "@angular/core";
import {
  AuthChangePasswordPageComponent
} from "@hiboard/auth-change-password/auth-change-password-page/auth-change-password-page.component";

const loginRoutes: Routes = [
  {
    path: '',
    component: AuthChangePasswordPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
})
export class AuthChangePassworRoutingNodule {}
