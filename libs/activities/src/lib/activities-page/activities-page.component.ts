import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivitiesRepository} from "@hiboard/activities/state/activities.repository";
import {ActivitiesService} from "@hiboard/activities/state/activities.service";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {Activities} from "@hiboard/activities/types/activities.type";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {TaskViewComponentModule} from "@hiboard/ui/activity-view/activity-view.component";
import {AsyncState} from "@ngneat/loadoff";
import {ActivitiesFiltersComponentModule} from "@hiboard/activities/activities-filters/activities-filters.component";
import {SubscribeModule} from "@ngneat/subscribe";
import {CompletedactivitiesComponentModule} from "@hiboard/ui/completed-activities/completed-activities.component";
import {BindQueryParamsFactory} from "@ngneat/bind-query-params";
import {map, startWith, switchMap} from "rxjs";
import {activitiesFilters} from "@hiboard/activities/activities-page/activities-page-filters";

@UntilDestroy()
@Component({
  selector: 'hbd-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.scss'],
  providers: [
    ActivitiesRepository,
    ActivitiesService,
    UserRepository
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesPageComponent implements OnInit {
  activities: AsyncState<Activities.Response>;
  filteredActivities: Activities.Entity[];
  totalActivities: number;
  completedActivities: number;
  activitiesPercentage: number;
  loadingArray = Array(9);

  filters = new FormGroup({
    name: new FormControl(),
    tag: new FormControl(),
    status: new FormControl()
  });

  queryParamsManager = this.factory
    .create<Activities.PageQueryParams>([
      {
        queryKey: 'name',
        type: 'array'
      },
      {
        queryKey: 'tag',
        type: 'array'
      },
      {
        queryKey: 'status',
        type: 'array'
      }
    ])
    .connect(this.filters);

  constructor(
    private service: ActivitiesService,
    private activitiesRepo: ActivitiesRepository,
    private userRepo: UserRepository,
    private cdr: ChangeDetectorRef,
    private factory: BindQueryParamsFactory,
  ) {
  }

  ngOnInit(): void {
    this.filters.valueChanges.pipe(
      startWith(this.activities),
      switchMap(() => {
        return this.activitiesRepo.activities$.pipe(
          map((activities) => activitiesFilters(activities, this.filters.value))
        )
      })
    ).subscribe((filteredActivities) => {
      this.filteredActivities = filteredActivities;
      this.cdr.detectChanges();
    })

    this.fetchActivities();
    this.totalActivities = this.userRepo.totalActivities;
    this.completedActivities = this.userRepo.completedActivities;
    this.activitiesPercentage = this.completedActivities / this.totalActivities * 100;
  }

  private fetchActivities() {
    this.service.getActivities().pipe(
      untilDestroyed(this)
    )
      .subscribe((activities) => {
        this.activities = activities;
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
