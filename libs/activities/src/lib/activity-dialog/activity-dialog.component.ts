import {ChangeDetectionStrategy, Component, Inject, NgModule, OnInit} from '@angular/core';
import {Activities, ActivityStatus} from "@hiboard/activities/types/activities.type";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {ActivitiesService} from "@hiboard/activities/state/activities.service";

export interface ActivityDialogData {
  activity: Activities.Entity;
}

@Component({
  selector: 'hbd-activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityDialogComponent implements OnInit {
  activity: Activities.Entity;

  form = new FormGroup({
    tag: new FormControl('', [Validators.maxLength(10)]),
    status: new FormControl(''),
    description: new FormControl(''),
    weeks: new FormControl('', [Validators.max(4)]),
    days: new FormControl('', [Validators.max(6)]),
    hours: new FormControl('', [Validators.max(23)]),
  })

  validStatuses: ActivityStatus[] = ['backlog', 'in-progress', 'done'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ActivityDialogData,
    activitiesService: ActivitiesService
  ) {
    this.activity = data.activity;
  }

  ngOnInit(): void {
    this.initFormValues();
  }

  initFormValues() {
    this.form.get('tag')!.setValue(this.activity.tag);
    this.form.get('status')!.setValue(this.activity.status);
    this.form.get('description')!.setValue(this.activity.description);
    this.form.get('weeks')!.setValue(this.activity?.estimation?.weeks || 0);
    this.form.get('days')!.setValue(this.activity?.estimation?.days || 0);
    this.form.get('hours')!.setValue(this.activity?.estimation?.hours || 0);
  }

  save() {
    if (this.form.invalid) {
      return;
    }


  }
}

@NgModule({
  declarations: [ActivityDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ErrorTailorModule
  ],
  exports: [ActivityDialogComponent]
})
export class ActivityDialogComponentModule {
}
