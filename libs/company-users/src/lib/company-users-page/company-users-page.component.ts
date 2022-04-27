import {ChangeDetectionStrategy, Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {MatDialog} from "@angular/material/dialog";
import {HotToastService} from "@ngneat/hot-toast";
import {CreateUserDialogComponent} from "@hiboard/employees/create-employee-dialog/create-user-dialog.component";

@Component({
  selector: 'hbd-company-users-page',
  templateUrl: './company-users-page.component.html',
  styleUrls: ['./company-users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyUsersPageComponent implements OnInit {

  constructor(private dialog: MatDialog, private toast: HotToastService) {
  }

  ngOnInit(): void {
  }

  openCreateEmployeeDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res?.data) {
        this.toast.success('User created successfully')
      }
    })
  }
}

@NgModule({
  declarations: [CompanyUsersPageComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CompanyUsersPageComponent]
})
export class CompanyUsersPageComponentModule {
}
