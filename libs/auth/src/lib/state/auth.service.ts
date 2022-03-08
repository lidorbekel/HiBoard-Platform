import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";
import {Auth} from "../auth.types";
import {AuthApi} from "@hiboard/auth/api/auth.api";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private authApi: AuthApi) {
  }


  login(credentials: Auth.Login.Body){
    this.authApi.login(credentials);
  }
}
