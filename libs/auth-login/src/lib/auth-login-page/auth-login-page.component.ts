import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';

@Component({
  selector: 'hbd-auth-login-page',
  templateUrl: './auth-login-page.component.html',
  styleUrls: ['./auth-login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLoginPageComponent {

}

@NgModule({
  imports: [],
  declarations: [AuthLoginPageComponent]
})
export class AuthLoginPageModule {}
