import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";

@Component({
  selector: 'hbd-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [NavigationComponent],
  imports: [MaterialModule],
  exports: [NavigationComponent]
})
export class NavigationComponentModule {
}
