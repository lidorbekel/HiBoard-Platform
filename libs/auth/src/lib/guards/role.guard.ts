import {ActivatedRouteSnapshot, CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "@hiboard/auth/state/auth.service";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";

@Injectable({providedIn: 'root'})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
    private userRepo: UserRepository
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const isAuth = route.data['roles'].includes(this.userRepo.getCurrentUser()?.role);

    if (!isAuth) {
      this.navigationService.toDefaultByRole();
      // this.authService.logout();
    }

    return isAuth;
  }
}
