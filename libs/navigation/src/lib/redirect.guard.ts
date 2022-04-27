import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {AuthService} from "@hiboard/auth/state/auth.service";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";

@Injectable({providedIn: 'root'})
export class RedirectGuard implements CanActivate {

  constructor(private authService: AuthService,
              private navigationService: NavigationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          this.navigationService.toDefaultByRole();

          return false;
        }

        this.navigationService.toLogin();

        return true;
      })
    )
  }

}
