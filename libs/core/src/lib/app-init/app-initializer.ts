import {Injectable} from "@angular/core";
import {AuthService} from "@hiboard/auth/state/auth.service";
import {UserService} from "../../../../user/src/lib/state/user.service";
import {EMPTY} from "rxjs";
import {switchMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AppInitializer {
  constructor(private authService: AuthService, private userService: UserService) {
  }

  init() {
    return this.authService.isLoggedIn().pipe(
      switchMap((isLoggedIn) => {
        if (isLoggedIn) {
          return this.userService.getUser();
        }
        return EMPTY;
      })
    );
  }
}
