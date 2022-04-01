import {from, Observable, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";
import {UserService} from "../../../../user/src/lib/state/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: AngularFireAuth, private userService: UserService, private navigationService: NavigationService) {
  }

  login(username: string, password: string){
    return from(this.auth.signInWithEmailAndPassword(username, password)).pipe(
      tap(({ user }) => {
        if(user){
          user.getIdToken().then(token => {
            localStorage.setItem('token', token)
          });
          // this.userService.getUser(); // TODO remove mock
        }
      }),
      switchMap(() => {
        return this.userService.getUser()
          .pipe(tap({ error: () => this.logout() }));
      })
    )
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('token');
      this.navigationService.toLogin();
    })
  }

  isLoggedIn() {
    return new Observable<boolean>((observer) => {
      this.auth.onAuthStateChanged((user) => {
          if(user){
            observer.next(true);
          } else {
            observer.next(false)
          }
      })
    });
  }

  getToken() {
    return from(this.auth.currentUser.then(user => {
      return user?.getIdToken();
    }))
  }
}
