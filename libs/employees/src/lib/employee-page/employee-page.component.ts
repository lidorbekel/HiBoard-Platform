import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgModule,
  OnInit,
  ViewChild
} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ActivitiesService} from "@hiboard/activities/state/activities.service";
import {AsyncState} from "@ngneat/loadoff";
import {Activities} from "@hiboard/activities/types/activities.type";
import {EmployeesService} from "@hiboard/employees/state/employees.service";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../../user/src/users.types";
import {SubscribeModule} from "@ngneat/subscribe";
import {MatSort} from "@angular/material/sort";
import {CompletedactivitiesComponentModule} from "@hiboard/ui/completed-activities/completed-activities.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";

@UntilDestroy()
@Component({
  selector: 'hbd-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeePageComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  activities: AsyncState<Activities.Response>;
  loading = false;
  employee: User.Entity;

  search = new FormControl('');

  displayedColumns: string[] = ['name', 'tag', 'status'];

  dataSource = new MatTableDataSource<Activities.Entity>();
  
  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private activitiesService: ActivitiesService,
    private employeesService: EmployeesService,
    private userRepo: UserRepository,
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      untilDestroyed(this)
    ).subscribe(res => {
      this.fetchActivities(res['id']);

      this.employeesService.fetchEmployeesByManagerId(this.userRepo.userId)
        .pipe(
          untilDestroyed(this),
        ).subscribe(({
        next: () => {
          this.employee = this.employeesService.getEmployeeById(res['id']);
          this.cdr.detectChanges();
        }
      }))
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private fetchActivities(id: string) {
    this.activitiesService.getActivities(id).pipe(
      untilDestroyed(this)
    )
      .subscribe((activities) => {
        if (activities.res?.data) {
          this.dataSource.data = activities.res?.data;
          this.cdr.markForCheck();
        }
      })
  }

  onSearchClear() {
    this.filter.nativeElement.value = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.filter.nativeElement.value.trim().toLowerCase();
  }

}

@NgModule({
  declarations: [EmployeePageComponent],
  imports: [MaterialModule, CommonModule, SubscribeModule, CompletedactivitiesComponentModule,
    NgxChartsModule
  ],
  exports: [EmployeePageComponent]
})
export class EmployeePageComponentModule {
}
