import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnInit} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {ActivitiesRepository} from "@hiboard/activities/state/activities.repository";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'hbd-completed-activities',
  templateUrl: './completed-activities.component.html',
  styleUrls: ['./completed-activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompletedactivitiesComponent implements OnInit {
  total = 0;
  completed = 0;
  percentage = 0;

  constructor(
    private activitiesRepo: ActivitiesRepository,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.activitiesRepo.activities$.pipe(untilDestroyed(this)).subscribe(activities => {
      if (activities) {
        this.total = activities.length;
        this.completed = activities.filter(({status}) => status === 'Done').length;
        this.percentage = (100 * this.completed) / this.total;
        this.cdr.detectChanges();
      }
    })
  }

}

@NgModule({
  declarations: [CompletedactivitiesComponent],
  imports: [MaterialModule],
  exports: [CompletedactivitiesComponent]
})
export class CompletedactivitiesComponentModule {
}
