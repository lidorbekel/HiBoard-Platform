import {ChangeDetectionStrategy, Component, Input, NgModule, OnInit} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {Activities} from "@hiboard/activities/types/activities.type";
import {CommonModule} from "@angular/common";
import {TippyModule} from "@ngneat/helipopper";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";

@Component({
  selector: 'hbd-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityViewComponent implements OnInit {
  @Input() activity: Activities.Entity;
  @Input() loading = false;
  @Input() loading2 = true;

  constructor() {
  }

  ngOnInit(): void {
  }
}

@NgModule({
  declarations: [ActivityViewComponent],
  imports: [MaterialModule, CommonModule, TippyModule, NgxSkeletonLoaderModule],
  exports: [ActivityViewComponent]
})
export class TaskViewComponentModule {
}
