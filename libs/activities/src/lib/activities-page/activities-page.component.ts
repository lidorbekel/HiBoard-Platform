import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivitiesRepository} from "@hiboard/activities/state/activities.repository";
import {BindQueryParamsFactory} from "@ngneat/bind-query-params";
import {ActivitiesService} from "@hiboard/activities/state/activities.service";
import {activities} from "@hiboard/activities/types/activities.type";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {map, switchMap} from "rxjs";
import {activitiesFilters} from "@hiboard/activities/activities-page/activities-page-filters";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {TaskViewComponentModule} from "@hiboard/ui/activity-view/activity-view.component";
import {AsyncState} from "@ngneat/loadoff";
import {ActivitiesFiltersComponentModule} from "@hiboard/activities/activities-filters/activities-filters.component";
import {SubscribeModule} from "@ngneat/subscribe";
import {CompletedactivitiesComponentModule} from "@hiboard/ui/completed-activities/completed-activities.component";

@UntilDestroy()
@Component({
  selector: 'hbd-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.scss'],
  providers: [
    ActivitiesRepository,
    ActivitiesService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesPageComponent implements OnInit, OnDestroy {
  activities: AsyncState<activities.Response>;
  filteredActivities: any;
  completedActivitiesPercent = 0;


  filters = new FormGroup({
    names: new FormControl(),
    tags: new FormControl(),
    statuses: new FormControl()
  });

  queryParamsManager = this.factory
    .create<activities.PageQueryParams>([
      {
        queryKey: 'names',
        type: 'array'
      },
      {
        queryKey: 'tags',
        type: 'array'
      },
      {
        queryKey: 'statuses',
        type: 'array'
      },
    ]).connect(this.filters);

  constructor(
    private service: ActivitiesService,
    private activitiesRepo: ActivitiesRepository,
    private factory: BindQueryParamsFactory,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.filters.valueChanges.pipe(
      switchMap((filters) => {
        return this.activitiesRepo.activities$.pipe(
          map((activities) => activitiesFilters(activities, filters))
        );
      }),
      untilDestroyed(this)
    )
      .subscribe((filteredActivities) => {
        this.filteredActivities = filteredActivities;
      });

    this.fetchactivities();
  }

  ngOnDestroy() {
    this.queryParamsManager.destroy();
  }

  private fetchactivities() {
    this.service.getactivities().pipe(
      untilDestroyed(this)
    )
      .subscribe((activities) => {
        this.activities = activities;
        if (activities.res) {
          this.completedActivitiesPercent = (activities.res.data.activities.filter(({status}) => status === 'done').length / activities.res.data.activities.length) * 100;
        }
        this.cdr.markForCheck();
      })
  }

}

@NgModule({
  declarations: [ActivitiesPageComponent],
  imports: [CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    TaskViewComponentModule,
    ActivitiesFiltersComponentModule,
    SubscribeModule,
    CompletedactivitiesComponentModule,
  ],
  exports: [ActivitiesPageComponent]
})
export class ActivitiesPageComponentModule {
}
