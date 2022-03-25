import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeRouteGuard} from "@hiboard/auth/guards/protected-route.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@hiboard/auth/auth.module').then(({ AuthModule }) => AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('@hiboard/dashboard/dashboard.module').then(({ DashboardModule }) => DashboardModule),
    canActivate: [HomeRouteGuard],
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
