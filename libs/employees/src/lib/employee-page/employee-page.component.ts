import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgModule,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '@hiboard/ui/material/material.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivitiesService } from '@hiboard/activities/state/activities.service';
import { AsyncState } from '@ngneat/loadoff';
import { Activities } from '@hiboard/activities/types/activities.type';
import { EmployeesService } from '@hiboard/employees/state/employees.service';
import { UserRepository } from '../../../../user/src/lib/state/user.repository';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../../user/src/users.types';
import { SubscribeModule } from '@ngneat/subscribe';
import { MatSort } from '@angular/material/sort';
import { CompletedactivitiesComponentModule } from '@hiboard/ui/completed-activities/completed-activities.component';
import { NavigationService } from '@hiboard/navigation/navigaiton.service';
import { ChartOptions, ChartType } from 'chart.js';
import {
  ChartsModule,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet,
} from 'ng2-charts';

@UntilDestroy()
@Component({
  selector: 'hbd-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePageComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  activities: AsyncState<Activities.Response>;
  loading = false;
  employee: User.Entity;

  search = new FormControl('');

  displayedColumns: string[] = ['name', 'tag', 'status', 'onTime'];

  dataSource = new MatTableDataSource<Activities.Entity>();

  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          let totalCount: number = 0;
          if (data?.datasets) {
            data.datasets[0]['data']?.forEach((data) => {
              totalCount += data ? +data : 0;
            });

            const index: any = '' + tooltipItem.index;
            const count: any = data.datasets ? data.datasets[0]['data'] : [];
            return `${(count[index] * 100) / totalCount}% (${count[index]})`;
          }

          return '';
        },
      },
    },
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [DatalabelsPlugin];
  public pieChartColors: any = [{ backgroundColor: [] }];

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private activitiesService: ActivitiesService,
    private employeesService: EmployeesService,
    private userRepo: UserRepository,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

    this.route.params.pipe(untilDestroyed(this)).subscribe((res) => {
      this.fetchActivities(res['id']);

      this.employeesService
        .fetchEmployeesByManagerId(this.userRepo.userId)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            this.employee = this.employeesService.getEmployeeById(res['id']);
            this.cdr.detectChanges();
          },
        });
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private fetchActivities(id: string) {
    this.activitiesService
      .getActivities(id)
      .pipe(untilDestroyed(this))
      .subscribe((activities) => {
        if (activities.res?.data) {
          console.log(activities.res.data);
          this.dataSource.data = activities.res?.data;
          const dataMap = new Map<string, number>();
          const statuses = Array.from(
            new Set(this.dataSource.data.map((activity) => activity.status))
          );

          for (let i = 0; i < statuses.length; i++) {
            const status = statuses[i];
            dataMap.set(
              status,
              this.dataSource.data.filter(
                (activity) => activity.status === status
              )?.length ?? 0
            );
          }

          this.pieChartLabels = Array.from(dataMap.keys());
          const labelMap = new Map<string, string>();
          labelMap.set('Done', 'rgba(38, 166, 91, 1)');
          labelMap.set('InProgress', 'rgba(230, 126, 34, 1)');
          labelMap.set('Backlog', 'rgba(137, 196, 244, 1)');

          this.pieChartData = this.pieChartLabels.map((key) =>
            dataMap.get('' + key)
          );

          this.pieChartColors[0]['backgroundColor'] = this.pieChartLabels.map(
            (key) => labelMap.get('' + key)
          );

          this.cdr.markForCheck();
        }
      });
  }

  onSearchClear() {
    this.filter.nativeElement.value = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.filter.nativeElement.value
      .trim()
      .toLowerCase();
  }

  goBack() {
    this.navigationService.toEmployees();
  }
}

@NgModule({
  declarations: [EmployeePageComponent],
  imports: [
    MaterialModule,
    CommonModule,
    SubscribeModule,
    CompletedactivitiesComponentModule,
    ChartsModule,
  ],
  exports: [EmployeePageComponent],
})
export class EmployeePageComponentModule {}
