import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import {CompletedTasksComponentModule} from "@hiboard/ui/completed-tasks/completed-tasks.component";

@Component({
  selector: 'hbd-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [HomePageComponent],
  imports: [CompletedTasksComponentModule],
  exports: [HomePageComponent]
})
export class HomePageComponentModule {
}
