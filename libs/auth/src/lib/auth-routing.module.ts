import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthPageComponent} from "@hiboard/auth/auth-page/auth-page.component";
import {UnProtectedRouteGuard} from "@hiboard/auth/guards/unprotected-route.guard";

const guards = {
  canLoad: [UnProtectedRouteGuard],
  canActivate: [UnProtectedRouteGuard],
};

const authRoutes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        ...guards,
        loadChildren: () => import('@hiboard/auth-login/auth-login.module').then(({ AuthLoginModule }) => AuthLoginModule)
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
