import {ChangeDetectionStrategy, Component, Input, NgModule, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {CommonModule} from "@angular/common";
import {AsyncState, isLoading} from "@ngneat/loadoff";
import {Activities, ActivityStatus} from "@hiboard/activities/types/activities.type";
import {Observable} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'hbd-activities-filters',
  templateUrl: './activities-filters.component.html',
  styleUrls: ['./activities-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesFiltersComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  loading: boolean;
  names: string[];
  statuses: ActivityStatus[];
  tags: string[];
  filteredOptions: Observable<string[]>;

  tagsControl = new FormControl();

  @Input() formGroup: FormGroup;

  @Input() set activities(activities: AsyncState<Activities.Response>) {
    if (activities) {
      const data = activities.res?.data;
      this.loading = isLoading(activities);
      if (data) {
        this.initFilterValues(data);
      }
    }
  }

  constructor() {
  }

  ngOnInit(): void {

  }

  get nameControl() {
    return this.formGroup.get('name') as FormControl;
  }

  get tagControl() {
    return this.formGroup.get('tag') as FormControl;
  }

  get statusControl() {
    return this.formGroup.get('status') as FormControl;
  }

  private initFilterValues(activities: Activities.Entity[]) {
    this.names = Array.from(new Set(activities.map(({activity}) => activity.title)));

    this.tags = Array.from(new Set(activities.map(({activity}) => activity.tag)));

    this.statuses = Array.from(new Set(activities.map((activity) => activity.status)));
  }

  getSelectTriggerTitle(selectTrigger: keyof Activities.PageQueryParams) {
    if (selectTrigger === 'name') {

      return this.nameControl.value ? this.nameControl.value[0] : '';
    }

    if (selectTrigger === 'tag') {
      return this.tagControl.value ? this.tagControl.value[0] : '';
    }

    return this.statusControl.value ? this.statusControl.value[0] : '';
  }

  remove(control: FormControl, value: string): void {
    const index = control.value.indexOf(value);
    if (index !== -1) {
      control.value.splice(index, 1);
    }

    control.setValue(control.value); // To trigger change detection
  }

  clearAll() {
    this.nameControl.reset();
    this.tagControl.reset();
    this.statusControl.reset();
  }
}

@NgModule({
  declarations: [ActivitiesFiltersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorTailorModule,
    MaterialModule,
  ],
  exports: [ActivitiesFiltersComponent]
})
export class ActivitiesFiltersComponentModule {
}
