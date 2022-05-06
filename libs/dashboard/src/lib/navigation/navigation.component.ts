import {ChangeDetectionStrategy, Component, NgModule, OnInit} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {SubscribeModule} from "@ngneat/subscribe";
import {map} from "rxjs";
import {User} from "../../../../user/src/users.types";

interface NavItem {
  title: string,
  icon: string,
  link: string,
  role?: User.Role
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
      title: 'Activities',
      icon: 'assignment',
      link: 'activities',
      role: 'Employee'
    },
    {
      title: 'Employees',
      icon: 'supervised_user_circle',
      link: 'employees',
      role: 'Manager'
    },
    {
      title: 'Company Details',
      icon: 'library_books',
      link: 'admin/company-details',
      role: 'Admin'
    },
    {
      title: 'Company Users',
      icon: 'supervised_user_circle',
      link: 'admin/company-users',
      role: 'Admin'
    }
  ];

  topNavItems: NavItem[] = [];

  constructor(private userRepo: UserRepository) {
  }

  ngOnInit(): void {
    this.userRepo.user$.pipe(
      map((user) => {
        if (user) {
          this.topNavItems = this.navItems.filter((item) => item.role === user.role);
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
