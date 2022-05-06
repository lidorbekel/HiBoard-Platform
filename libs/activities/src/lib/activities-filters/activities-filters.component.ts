import {ChangeDetectionStrategy, Component, Input, NgModule, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {CommonModule} from "@angular/common";
import {AsyncState, isLoading} from "@ngneat/loadoff";
import {activities} from "@hiboard/activities/types/activities.type";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'hbd-activities-filters',
  templateUrl: './activities-filters.component.html',
  styleUrls: ['./activities-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesFiltersComponent implements OnInit {
  loading: boolean;
  names: string[];
  statuses: string[];
  tags = ['HR', 'R&D', 'Sales'];
  filteredOptions: Observable<string[]>;

  tagsControl = new FormControl();


  @Input() set activities(activities: AsyncState<activities.Response>) {
    const data = activities.res?.data.activities;
    this.loading = isLoading(activities);
    if (data) {
      // this.initFilterValues(data);
    }
  }

  ngOnInit() {
    this.filteredOptions = this.tagsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private initFilterValues() {
    this.tags = ['HR', 'R&D', 'Sales'];
    this.statuses = ['backlog', 'in-progress', 'done'];
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tags.filter(option => option.toLowerCase().includes(filterValue));
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
