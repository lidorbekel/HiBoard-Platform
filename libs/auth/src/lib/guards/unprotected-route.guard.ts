import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavigationService} from "@hiboard/navigation/navigaiton.service";
import {AuthService} from "@hiboard/auth/state/auth.service";

@Injectable({providedIn: 'root'})
export class UnProtectedRouteGuard implements CanLoad, CanActivate {
  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.canLoad();
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          this.navigationService.toDefaultByRole();
        }

        return true;
      })
    );
  }
}
