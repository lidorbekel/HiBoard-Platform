import {ActivatedRouteSnapshot, CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "@hiboard/auth/state/auth.service";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {map, Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
    private userRepo: UserRepository
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          const user = this.userRepo.getCurrentUser();
          if (user) {
            const {role} = user;

            const isAuth = route.data['roles'].includes(role);

            if (!isAuth) {
              this.navigationService.toDefaultByRole();
            }

            return isAuth;
          } else {
            return of(false);
          }
        }
      })
    )
    // return this.userRepo.user$.pipe(
    //   map((user) => {
    //
    //     if (user) {
    //       const {role} = user;
    //
    //       const isAuth = route.data['roles'].includes(role);
    //
    //       if (!isAuth) {
    //         this.navigationService.toDefaultByRole(role);
    //       }
    //
    //       return isAuth;
    //     } else {
    //       return of(false);
    //     }
    //   })
    // )
  }
}
