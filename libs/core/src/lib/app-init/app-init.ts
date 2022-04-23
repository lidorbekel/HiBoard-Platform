import {Injectable} from "@angular/core";
import {AuthService} from "@hiboard/auth/state/auth.service";
import {UserService} from "../../../../user/src/lib/state/user.service";
import {EMPTY, switchMap} from "rxjs";

@Injectable({providedIn: 'root'})
export class AppInit {
  constructor(private authService: AuthService, private userService: UserService) {
  }

  init(): void {
    this.authService.isLoggedIn().pipe(
      switchMap((isLoggedIn) => {
        if (isLoggedIn) {
          return this.userService.getUser();
        }

        return EMPTY;
      })
    ).subscribe();
  }
}
