import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';

@Component({
  selector: 'hbd-auth-change-password-page',
  templateUrl: './auth-change-password-page.component.html',
  styleUrls: ['./auth-change-password-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthChangePasswordPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [AuthChangePasswordPageComponent],
  imports: [],
  exports: [AuthChangePasswordPageComponent]
})
export class AuthChangePasswordPageComponentModule {
}
