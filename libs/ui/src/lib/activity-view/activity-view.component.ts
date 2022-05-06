import {ChangeDetectionStrategy, Component, Input, NgModule, OnInit} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {activities} from "@hiboard/activities/types/activities.type";

@Component({
  selector: 'hbd-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityViewComponent implements OnInit {
  @Input() activity: activities.Entity;

  constructor() {
  }

  ngOnInit(): void {
  }
}

@NgModule({
  declarations: [ActivityViewComponent],
  imports: [MaterialModule],
  exports: [ActivityViewComponent]
})
export class TaskViewComponentModule {
}
