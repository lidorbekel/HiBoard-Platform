import {from, Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {Auth} from "../auth.types";
import {AuthApi} from "@hiboard/auth/api/auth.api";
import {map} from "rxjs/operators";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authApi: AuthApi, private navigationService: NavigationService) {
  }

  login(credentials: Auth.Login.Body){
    return this.authApi.login(credentials).pipe(
      map((user) => {
        if (user && user.token) {
          // update user store
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }),
      tap({ error: () => this.logout() })
    )
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.navigationService.toLogin();
  }

  isLoggedIn() {
    return new Observable<boolean>((observer) => {
      observer.next(!!localStorage.getItem('currentUser'))
    });
  }
}
