import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthService} from "@hiboard/auth/state/auth.service";
import {EMPTY, switchMap, tap} from "rxjs";
import {UserService} from "../../../../libs/user/src/lib/state/user.service";

@Component({
  selector: 'hbd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private auth: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.auth.isLoggedIn().pipe(
      // TODO remove mock
      // tap((isLoggedIn) => {
      //     if(isLoggedIn){
      //       return this.userService.getUser(); //remove
      //     }
      // })
      switchMap((isLoggedIn) => {
        if(isLoggedIn){
          return this.userService.getUser();
        }

        return EMPTY;
      })
    ).subscribe();
  }
}
