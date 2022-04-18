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
}

@Component({
  selector: 'hbd-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  user$ = this.userRepo.user$;
  navItems: NavItem[] = [];

  employeeNavItems: NavItem[] = [
    {
      title: 'Tasks',
      icon: 'assignment',
      link: 'tasks',
    }
  ];

  managerNavItems: NavItem[] = [
    {
      title: 'Employees',
      icon: 'supervised_user_circle',
      link: 'employees'
    }
  ]

  constructor(private userRepo: UserRepository, private authQuery: AuthQuery) {
  }

  ngOnInit(): void {
    this.navItems = this.employeeNavItems;
    // const userRole = this.userRepo.getCurrentUser()!.role;
    // if (userRole === 'employee') {
    //   this.navItems = this.employeeNavItems;
    // } else {
    //   this.navItems = this.managerNavItems;
    // }
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
