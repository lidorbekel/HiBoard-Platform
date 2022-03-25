import {Component, ChangeDetectionStrategy, NgModule, ChangeDetectorRef} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";
import {AuthService} from "@hiboard/auth/state/auth.service";
import {loadingFor} from "@ngneat/loadoff";
import {HotToastService} from "@ngneat/hot-toast";
import {switchMap} from "rxjs";
import {ErrorTailorModule} from "@ngneat/error-tailor";

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

  constructor(private navigationService: NavigationService,
              private authService: AuthService,
              private toast: HotToastService,
              private cdr: ChangeDetectorRef) {}

  login(){
    this.error = '';
    if(this.loginForm.invalid){
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password)
      .pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...'
        }),
        switchMap(() => {
            return this.navigationService.toHome();
          }
        )
      )
      .subscribe({
        error: () => {
          console.log('hi')
          this.toast.close();
          this.error = "Invalid credentials";
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
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, ErrorTailorModule],
  declarations: [AuthLoginPageComponent]
})
export class AuthLoginPageModule {}
