import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {SvgIconsModule} from "@ngneat/svg-icon";

@NgModule({
  imports: [
    AuthRoutingModule,
    SvgIconsModule
  ],
})
export class AuthModule {
}
