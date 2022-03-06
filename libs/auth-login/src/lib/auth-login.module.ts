import {NgModule} from "@angular/core";
import {AuthLoginRoutingModule} from "@hiboard/auth-login/auth-login-routing.module";
import {SvgIconsModule} from "@ngneat/svg-icon";

@NgModule({
  imports: [
    AuthLoginRoutingModule,
    SvgIconsModule.forChild([]),
  ]
})
export class AuthLoginModule {}
