import {CanActivate } from "@angular/router";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {AuthService} from "@hiboard/auth/state/auth.service";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";

@Injectable({ providedIn: 'root' })
export class HomeRouteGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) { //switch
          return true;
        } else {
          this.navigationService.toLogin();
        }

        return false;
      })
    );
  }
}
