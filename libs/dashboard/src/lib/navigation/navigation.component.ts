import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

interface NavItem {
  title: string,
  icon: string,
  link: string
}

@Component({
  selector: 'hbd-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {

  navItems: NavItem[] = [
    {
      title: 'Home',
      icon: 'home',
      link: 'home'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [NavigationComponent],
  imports: [MaterialModule, RouterModule, CommonModule],
  exports: [NavigationComponent]
})
export class NavigationComponentModule {
}
