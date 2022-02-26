import {RouterModule, Routes} from "@angular/router";
import {AuthLoginPageComponent} from "./auth-login-page/auth-login-page.component";
import {NgModule} from "@angular/core";

const loginRoutes: Routes = [
  {
    path: '',
    component: AuthLoginPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
})
export class AuthLoginRoutingModule {}
