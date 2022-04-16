import {ChangeDetectionStrategy, Component, NgModule, OnInit} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {SubscribeModule} from "@ngneat/subscribe";
import {AuthQuery} from "@hiboard/auth/state/auth.query";
import {User} from "../../../../user/src/users.types";

interface NavItem {
  title: string,
  icon: string,
  link: string,
  permission: User.Role[] | User.Role
}

@Component({
  selector: 'hbd-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  user$ = this.userRepo.user$;

  navItems: NavItem[] = [
    {
      title: 'Home',
      icon: 'home',
      link: 'home',
      permission: 'employee'
    }
  ];

  constructor(private userRepo: UserRepository, private authQuery: AuthQuery) {
  }

  ngOnInit(): void {
  }

  hasAccess(permission: User.Role | User.Role[]) {
    return this.authQuery.hasAccess(permission);
  }

}

@NgModule({
  declarations: [NavigationComponent],
  imports: [MaterialModule, RouterModule, CommonModule, SubscribeModule],
  exports: [NavigationComponent]
})
export class NavigationComponentModule {
}
