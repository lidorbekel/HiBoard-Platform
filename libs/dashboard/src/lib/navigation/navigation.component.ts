import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnInit} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {SubscribeModule} from "@ngneat/subscribe";
import {map} from "rxjs";
import {User} from "../../../../user/src/users.types";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {CompanyRepository} from "@hiboard/company/state/company.repository";

interface NavItem {
  title: string;
  icon: string;
  link: string;
  role?: User.Role;
}

@UntilDestroy()
@Component({
  selector: 'hbd-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  user$ = this.userRepo.user$;

  navItems: NavItem[] = [
    {
      title: 'Activities',
      icon: 'assignment',
      link: 'activities',
      role: 'Employee',
    },
    {
      title: 'Company Employees',
      icon: 'people_alt',
      link: 'company-employees',
      role: 'Employee',
    },

    {
      title: 'Employees',
      icon: 'supervised_user_circle',
      link: 'employees',
      role: 'Manager',
    },
    {
      title: 'Company Employees',
      icon: 'people_alt',
      link: 'company-employees',
      role: 'Manager',
    },
    {
      title: 'Company Details',
      icon: 'library_books',
      link: 'admin/company-details',
      role: 'Admin',
    },
    {
      title: 'Managers',
      icon: 'supervised_user_circle',
      link: 'admin/managers',
      role: 'Admin'
    },
    {
      title: 'Templates',
      icon: 'view_quilt',
      link: 'templates',
      role: 'Manager'
    }
  ];

  companyName: string;

  topNavItems: NavItem[] = [];

  constructor(private userRepo: UserRepository, private companyRepo: CompanyRepository, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.userRepo.user$.pipe(
      untilDestroyed(this),
      map((user) => {
        if (user) {
          this.topNavItems = this.navItems.filter((item) => item.role === user.role);
        }
      })
    ).subscribe();

    this.companyRepo.company$.pipe(untilDestroyed(this)).subscribe(company => {
      if (company) {
        this.companyName = company.name;
        this.cdr.detectChanges();
      }
    })
  }
}

@NgModule({
  declarations: [NavigationComponent],
  imports: [MaterialModule, RouterModule, CommonModule, SubscribeModule],
  exports: [NavigationComponent],
})
export class NavigationComponentModule {
}
