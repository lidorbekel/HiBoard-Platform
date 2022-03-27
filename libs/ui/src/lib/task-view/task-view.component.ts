import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";

@Component({
  selector: 'hbd-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [TaskViewComponent],
  imports: [MaterialModule],
  exports: [TaskViewComponent]
})
export class TaskViewComponentModule {
}
