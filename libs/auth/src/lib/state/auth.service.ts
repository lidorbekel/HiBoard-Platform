import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();
}
