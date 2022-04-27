import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeRouteGuard} from "@hiboard/auth/guards/protected-route.guard";
import {RedirectGuard} from "@hiboard/navigation/redirect.guard";
import {PageNotFoundComponent} from "@hiboard/ui/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@hiboard/dashboard/dashboard.module').then(({DashboardModule}) => DashboardModule),
    canActivate: [HomeRouteGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('@hiboard/auth/auth.module').then(({AuthModule}) => AuthModule),
  },
  {
    path: 'join',
    loadChildren: () => import('@hiboard/join/join.module').then(({JoinModule}) => JoinModule),
  },
  {
    path: '**',
    canActivate: [RedirectGuard],
    component: PageNotFoundComponent
  }

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
