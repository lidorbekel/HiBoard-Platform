import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {EMPTY, switchMap} from "rxjs";
import {UserService} from "../../../../libs/user/src/lib/state/user.service";
import {AuthService} from "@hiboard/auth/state/auth.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'hbd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().pipe(
      map((isLoggedIn) => {
        if(isLoggedIn){
          return this.userService.getUser();
        }

        return EMPTY;
      })
    ).subscribe();
  }
}
