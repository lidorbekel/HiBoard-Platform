import {ChangeDetectionStrategy, Component, Inject, NgModule, OnInit} from '@angular/core';
import {Activities, ActivityStatus} from "@hiboard/activities/types/activities.type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {ActivitiesService} from "@hiboard/activities/state/activities.service";
import {decodeTimeEstimation} from '../activities-utils';

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

  userAverageTime = '';

  form = new FormGroup({
    tag: new FormControl({disabled: true}),
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
    const {hours, days, minutes} = this.decodeTimeEstimation(this.activity.activity.userAverageTime);

    this.userAverageTime = this.userAverageTime + `${days + ' ' + (days === '1' || days === '01' ? 'Day ' : 'Days ')}`;

    this.userAverageTime = this.userAverageTime + `${hours + ' ' + (hours === '1' || hours === '01' ? 'Hour ' : 'Hours ')}`;

    this.userAverageTime = this.userAverageTime + `${minutes + ' ' + (minutes === '1' || minutes === '01' ? 'Minute ' : 'Minutes ')}`;
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
    return decodeTimeEstimation(timeEstimation);
  }

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
