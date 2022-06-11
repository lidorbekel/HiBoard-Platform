import {ChangeDetectionStrategy, Component, Inject, NgModule, OnInit} from '@angular/core';
import {Activities, ActivityStatus} from "@hiboard/activities/types/activities.type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {ActivitiesService} from "@hiboard/activities/state/activities.service";

export interface ActivityDialogData {
  activity: Activities.Entity;
  isInventory?: boolean;
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

  validStatuses: ActivityStatus[] = ['Backlog', 'InProgress', 'Done'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ActivityDialogData,
    private userRepo: UserRepository,
    private activitiesService: ActivitiesService,
    public dialogRef: MatDialogRef<ActivityDialogComponent>,
  ) {
    this.activity = data.activity;
  }

  ngOnInit(): void {
    this.initFormValues();
  }

  initFormValues() {
    if (!this.data.isInventory) {
      this.form.get('status')!.setValue(this.activity.status);
    }

    const {days, hours} = this.decodeTimeEstimation(this.activity.activity.timeEstimation);

    this.form.get('days')!.setValue(days);
    this.form.get('hours')!.setValue(hours);

    this.form.get('tag')!.setValue(this.activity.activity.tag);
    this.form.get('description')!.setValue(this.activity.activity.description);
  }

  decodeTimeEstimation(timeEstimation: string) {
    const converted = timeEstimation.split('.');
    let days;
    let hours;
    if (converted.length === 1) {
      days = 0;
      hours = converted[0].split(':')[0];
    } else {
      days = converted[0];
      hours = converted[1]?.slice(0, 2);
    }

    return {
      days,
      hours
    }
  }

  // parseTimeEstimation(estimation: string) {
  //   const converted = estimation.split('.');
  //   let days;
  //   let hours;
  //   if (converted.length === 1) {
  //     days = 0;
  //     hours = converted[0].split(':')[0];
  //   } else {
  //     days = converted[0];
  //     hours = converted[1]?.slice(0, 2);
  //   }
  //   return `${days} ${days === '1' ? 'Day' : 'Days'},  ${hours} Hours`;
  // }


  save() {
    if (this.form.invalid) {
      return;
    }

    const updatedActivity: Activities.Entity = {
      ...this.activity,
      status: this.form.get('status')!.value
    }

    this.activitiesService.updateUserActivity(updatedActivity).subscribe(({
      next: () => this.dialogRef.close()
    }));
  }

  isEmployee() {
    return this.userRepo.isEmployee();
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
