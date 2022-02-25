import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'hbd-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent {}

@NgModule({
  declarations: [AuthPageComponent],
  imports: [
    RouterModule
  ],
  exports: [AuthPageComponent]
})
export class AuthPageComponentModule {
}
