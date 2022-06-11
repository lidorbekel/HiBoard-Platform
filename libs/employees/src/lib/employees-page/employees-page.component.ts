import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgModule,
  OnInit,
  ViewChild
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {MatDialog} from "@angular/material/dialog";
import {HotToastService} from "@ngneat/hot-toast";
import {
  CreateUserDialogComponent,
  CreateUserDialogData,
} from "../../../../user/src/lib/create-user-dialog/create-user-dialog.component";
import {UserService} from "../../../../user/src/lib/state/user.service";
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {EmployeesService} from "@hiboard/employees/state/employees.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../../user/src/users.types";
import {MatSort} from "@angular/material/sort";
import {FormControl, FormsModule} from "@angular/forms";
import {ConfirmDialogComponent} from "@hiboard/ui/confirm-dialog/confirm-dialog.component";
import {Templates} from "../../../../templates/src/lib/templates.types";
import {TemplatesService} from "../../../../templates/src/lib/state/templates.service";
import {ActivitiesService} from "@hiboard/activities/state/activities.service";

@UntilDestroy()
@Component({
  selector: 'hbd-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesPageComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  loading = false;

  templates: Templates.Entity[] = [];

  search = new FormControl('');

  displayedColumns: string[] = ['fullName', 'email', 'departmentName', 'done', 'actions'];

  dataSource = new MatTableDataSource<User.Entity>();

  constructor(private dialog: MatDialog,
              private toast: HotToastService,
              private employeesService: EmployeesService,
              private userService: UserService,
              private userRepo: UserRepository,
              private cdr: ChangeDetectorRef,
              private templatesService: TemplatesService,
              private activitiesService: ActivitiesService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;

    this.employeesService.employees$
      .pipe(
        untilDestroyed(this)
      ).subscribe(employeesGridData => {
      if (employeesGridData) {
        this.loading = false;
        this.dataSource.data = employeesGridData;
        this.cdr.detectChanges();
      }
    })

    this.employeesService.fetchEmployeesByManagerId(this.userRepo.userId);

    this.templatesService.getTemplates().pipe(untilDestroyed(this)).subscribe(res => {
      if (res.data) {
        this.templates = res.data;
      }
    })
  }

  navigateToEmployee(employee: User.Entity) {
    console.log(employee)
  }

  openCreateEmployeeDialog() {
    const dialogRef = this.dialog.open<CreateUserDialogComponent, CreateUserDialogData>(CreateUserDialogComponent, {
      data: {
        role: 'Employee',
        templates: this.templates
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.employeesService.addEmployee(res.data);
        if (res.templateId) {
          this.activitiesService.assignTemplateToEmployee(res.data.id, res.templateId).subscribe();
        }

        this.cdr.detectChanges();
        this.toast.success('Employee added successfully')
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

  onDelete(user: User.Entity) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(confirm => {
      if (confirm) {
        this.employeesService.deleteEmployee(user.id)
          .subscribe({
            next: () => {
              this.toast.success('Employee deleted successfully');
              this.cdr.detectChanges();
            },
          })
      }
    })
  }
}

@NgModule({
  declarations: [EmployeesPageComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [EmployeesPageComponent]
})
export class EmployeesPageComponentModule {
}
