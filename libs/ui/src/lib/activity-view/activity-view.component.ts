import {ChangeDetectionStrategy, Component, Input, NgModule} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {Activities} from "@hiboard/activities/types/activities.type";
import {CommonModule} from "@angular/common";
import {TippyModule} from "@ngneat/helipopper";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {MatDialog} from "@angular/material/dialog";
import {
  ActivityDialogComponent,
  ActivityDialogData
} from "@hiboard/activities/activity-dialog/activity-dialog.component";

@Component({
  selector: 'hbd-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityViewComponent {
  @Input() activity: Activities.Entity;
  @Input() loading = false;
  @Input() loading2 = true;

  constructor(
    private dialog: MatDialog,
  ) {
  }

  openActivityDialog(activity: Activities.Entity) {
    this.dialog.open<ActivityDialogComponent, ActivityDialogData>(ActivityDialogComponent, {
      data: {activity}
    })
  }
}

@NgModule({
  declarations: [ActivityViewComponent],
  imports: [MaterialModule, CommonModule, TippyModule, NgxSkeletonLoaderModule],
  exports: [ActivityViewComponent]
})
export class TaskViewComponentModule {
}
