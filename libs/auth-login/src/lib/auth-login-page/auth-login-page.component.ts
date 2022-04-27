import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";
import {AuthService} from "@hiboard/auth/state/auth.service";
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
  error: string;

  loading = false;

  constructor(private navigationService: NavigationService,
              private authService: AuthService,
              private toast: HotToastService,
              private cdr: ChangeDetectorRef) {
  }

  login() {
    this.error = '';
    if (this.loginForm.invalid) {
      return;
    }

    const {username, password} = this.loginForm.value;

    this.loading = true;

    this.authService.login(username, password)
      .pipe(
        switchMap(() => {
            return this.navigationService.toDefaultByRole();
          }
        )
      )
      .subscribe({
        error: () => {
          this.toast.close()
          this.error = "Invalid credentials";
          this.loading = false
          this.cdr.markForCheck();
        },
        next: () => this.toast.close(),
        complete: () => this.loading = false
      });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  toForgotPassword() {
    this.navigationService.forgotPassword();
  }

  onJoin() {
    this.navigationService.toJoinHiboard();
  }
}

@NgModule({
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, ErrorTailorModule],
  declarations: [AuthLoginPageComponent]
})
export class AuthLoginPageModule {
}
