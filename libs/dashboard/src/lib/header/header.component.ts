import {ChangeDetectionStrategy, Component, NgModule} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {AuthService} from "@hiboard/auth/state/auth.service";
import {TippyModule} from "@ngneat/helipopper";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";
import {SubscribeModule} from "@ngneat/subscribe";

@Component({
  selector: 'hbd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(private auth: AuthService, private navigationService: NavigationService) {
  }

  logout() {
    this.auth.logout();
  }

  toProfile() {
    this.navigationService.toProfile();
  }

}

@NgModule({
  declarations: [HeaderComponent],
  imports: [MaterialModule, TippyModule, SubscribeModule],
  exports: [HeaderComponent]
})
export class HeaderComponentModule {
}
