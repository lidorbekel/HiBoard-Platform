import {Component, ChangeDetectionStrategy, NgModule, ChangeDetectorRef} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";
import {AuthService} from "@hiboard/auth/state/auth.service";
import {switchMap} from "rxjs";
import {loadingFor} from "@ngneat/loadoff";

@Component({
  selector: 'hbd-auth-login-page',
  templateUrl: './auth-login-page.component.html',
  styleUrls: ['./auth-login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLoginPageComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  loading = loadingFor('login');
  error: string;

  constructor(private navigationService: NavigationService, private authService: AuthService,
              private cdr: ChangeDetectorRef) {}

  login(){
    if(this.loginForm.invalid){
      return;
    }

    this.authService.login(this.loginForm.value)
      .pipe(
        switchMap(() => {
          return this.navigationService.toHome();
        }),
        this.loading.login.track()
      )
      .subscribe({
        error: (error) => {
          this.error = error;
          this.cdr.markForCheck();
        },
      });
  }

  get username(){
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  toForgotPassword() {
    this.navigationService.forgotPassword();
  }
}

@NgModule({
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  declarations: [AuthLoginPageComponent]
})
export class AuthLoginPageModule {}
