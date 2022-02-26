import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthPageComponent} from "@hiboard/auth/auth-page/auth-page.component";

const authRoutes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadChildren: () => import('@hiboard/auth-login/auth-login.module').then(({ AuthLoginModule }) => AuthLoginModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
