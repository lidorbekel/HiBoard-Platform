import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgModule,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@hiboard/ui/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { CreateUserDialogComponent } from '../../../../user/src/lib/create-user-dialog/create-user-dialog.component';
import { UserService } from '../../../../user/src/lib/state/user.service';
import { UserRepository } from '../../../../user/src/lib/state/user.repository';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CompanyUsersService } from '@hiboard/company-users/state/company-users.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../../user/src/users.types';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '@hiboard/ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'hbd-company-users-page',
  templateUrl: './company-users-page.component.html',
  styleUrls: ['./company-users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyUsersPageComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

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
    private dialog: MatDialog,
    private toast: HotToastService,
    private companyUsersService: CompanyUsersService,
    private userService: UserService,
    private userRepo: UserRepository,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.companyUsersService.managers$.subscribe((managersGridData) => {
      if (managersGridData) {
        this.dataSource.data = managersGridData;
        this.cdr.detectChanges();
      }
    });
    this.companyUsersService.fetchManagersByAdminId(this.userRepo.userId);
  }

  openCreateEmployeeDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      data: { role: 'Manager' },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res !== '') {
        this.companyUsersService.addManager(res);
        this.cdr.detectChanges();
        this.toast.success('Manager created successfully');
      }
    });
  }
  //
  onSearchClear() {
    this.filter.nativeElement.value = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.filter.nativeElement.value
      .trim()
      .toLowerCase();
  }

  onDelete(user: User.Entity) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.companyUsersService.deleteManager(user.id).subscribe({
          next: () => {
            this.toast.success('Manager deleted successfully');
          },
          error: () =>
            this.toast.error(
              'There was a problem deleting the manager, please try again later'
            ),
        });
      }
    });
  }
}

@NgModule({
  declarations: [CompanyUsersPageComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CompanyUsersPageComponent],
})
export class CompanyUsersPageComponentModule {}
