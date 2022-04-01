import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {AuthService} from "@hiboard/auth/state/auth.service";
import {TippyModule} from "@ngneat/helipopper";

@Component({
  selector: 'hbd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

}

@NgModule({
  declarations: [HeaderComponent],
  imports: [MaterialModule, TippyModule],
  exports: [HeaderComponent]
})
export class HeaderComponentModule {
}
