import {from, Observable, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";
import {UserService} from "../../../../user/src/lib/state/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private auth: AngularFireAuth, private userService: UserService, private navigationService: NavigationService,
              private userRepo: UserRepository) {
  }

  login(username: string, password: string) {
    return from(this.auth.signInWithEmailAndPassword(username, password)).pipe(
      tap(({user}) => {
        if (user) {
          user.getIdToken().then(token => {
            localStorage.setItem('token', token)
          });
        }
      }),
      switchMap(() => {
        return this.userService.getUser()
          .pipe(tap({error: () => this.logout()}));
      })
    )
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('token');
      this.userRepo.update(null);
      this.navigationService.toLogin();
    })
  }

  isLoggedIn() {
    return new Observable<boolean>((observer) => {
      this.auth.onAuthStateChanged((user) => {
        observer.next(!!user);
        observer.complete();
      });
    });
  }

  getToken() {
    return from(this.auth.currentUser.then(user => {
      return user?.getIdToken();
    }))
  }
}
