import {from, Observable, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";
import {Auth, authState, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "@angular/fire/auth";
import {UserService} from "../../../../user/src/lib/state/user.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth, private userService: UserService, private navigationService: NavigationService) {
  }

  login(username: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, username, password)).pipe(
      tap(({ user }) => {
        console.log(user)
        user.getIdToken().then(token => {
          console.log(token)
          localStorage.setItem('token', token)
        });
      }),
      switchMap(() => {
        return this.userService.getUser()
          .pipe(tap({ error: () => this.logout() }));
      })
    )
  }

  logout() {
    this.auth.signOut();
    localStorage.removeItem('token');
    this.navigationService.toLogin();
  }

  isLoggedIn() {
    return new Observable<boolean>((observer) => {
      if(this.auth.currentUser && localStorage.getItem('token')){
        observer.next(true);
      } else {
        observer.next(false)
      }
    })
  }

  getToken() {
    return from(this.auth.currentUser!.getIdToken());
  }
}
