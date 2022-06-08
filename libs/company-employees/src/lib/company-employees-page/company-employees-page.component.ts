import { map, Observable, pluck } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgModule,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@hiboard/ui/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { UserService } from '../../../../user/src/lib/state/user.service';
import { UserRepository } from '../../../../user/src/lib/state/user.repository';
import { CompanyService } from '@hiboard/company/state/company.service';
import { CompanyRepository } from '../../../../company/src/lib/state/company.repository';
import { CompanyEmployeesService } from '@hiboard/company-employees/state/company-employees.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../../user/src/users.types';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '@hiboard/ui/confirm-dialog/confirm-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'hbd-company-employees-page',
  templateUrl: './company-employees-page.component.html',
  styleUrls: ['./company-employees-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyEmployeesPageComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  loading = false;

  $data: Observable<any>;

  search = new FormControl('');
  displayedColumns: string[] = [
    'fullName',
    'email',
    'departmentName',
    'done',
    'actions',
  ];

  dataSource = new MatTableDataSource<User.Entity>();

  constructor(
    private companyEmployeesService: CompanyEmployeesService,
    private companyService: CompanyService,
    private companyRepo: CompanyRepository,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.$data = this.companyRepo.loading$.pipe(
      filter((loading) => !loading),
      switchMap(() => this.companyRepo.company$),
      filter((company) => !!company),
      tap((company: any) =>
        this.companyEmployeesService.fetchEmployeesByCompanyId(company.id)
      ),
      switchMap(() => this.companyEmployeesService.employees$),
      filter((employeesData) => !!employeesData),
      pluck('users'),
      tap((users) => console.log(users)),
      tap(() => (this.loading = false)),
      tap(() => this.cdr.detectChanges())
    );
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
}

@NgModule({
  declarations: [CompanyEmployeesPageComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [CompanyEmployeesPageComponent],
})
export class CompanyEmployeesPageComponentModule {}
