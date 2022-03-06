import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";

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

  constructor(private navigationService: NavigationService) {}

  login(){

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
