import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {SvgIconsModule} from "@ngneat/svg-icon";

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
    RouterModule,
    SvgIconsModule,
  ],
  exports: [AuthPageComponent]
})
export class AuthPageComponentModule {
}
