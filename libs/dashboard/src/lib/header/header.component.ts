import {ChangeDetectionStrategy, Component, NgModule} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {AuthService} from "@hiboard/auth/state/auth.service";
import {TippyModule} from "@ngneat/helipopper";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";
import {SubscribeModule} from "@ngneat/subscribe";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {ThemeService} from "@hiboard/core/theme.service";

@Component({
  selector: 'hbd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  user$ = this.userRepo.user$;
  theme$ = this.themeService.activeTheme$;

  constructor(private auth: AuthService, private navigationService: NavigationService,
              private userRepo: UserRepository,
              private themeService: ThemeService
  ) {
  }

  logout() {
    this.auth.logout();
  }

  toProfile() {
    this.navigationService.toProfile();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

@NgModule({
  declarations: [HeaderComponent],
  imports: [MaterialModule, TippyModule, SubscribeModule],
  exports: [HeaderComponent]
})
export class HeaderComponentModule {
}
