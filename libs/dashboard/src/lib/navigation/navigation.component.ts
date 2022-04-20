import {ChangeDetectionStrategy, Component, NgModule, OnInit} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {SubscribeModule} from "@ngneat/subscribe";
import {map} from "rxjs";

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

  constructor(private userRepo: UserRepository) {
  }

  ngOnInit(): void {
    this.userRepo.user$.pipe(
      map((user) => {
        if (user) {
          const {role} = user;
          if (role === 'employee') {
            this.navItems = this.employeeNavItems;
          } else {
            this.navItems = this.managerNavItems;
          }
        }
      })
    ).subscribe();
  }
}

@NgModule({
  declarations: [NavigationComponent],
  imports: [MaterialModule, RouterModule, CommonModule, SubscribeModule],
  exports: [NavigationComponent]
})
export class NavigationComponentModule {
}
