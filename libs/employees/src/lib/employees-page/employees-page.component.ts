import {ChangeDetectionStrategy, Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {MatDialog} from "@angular/material/dialog";
import {CreateUserDialogComponent} from "../create-employee-dialog/create-user-dialog.component";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'hbd-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesPageComponent implements OnInit {

  constructor(private dialog: MatDialog, private toast: HotToastService) {
  }

  ngOnInit(): void {
  }

  openCreateEmployeeDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res?.data?.user) {
        this.toast.success('User created successfully')
      }
    })
  }

}

@NgModule({
  declarations: [EmployeesPageComponent],
  imports: [CommonModule, MaterialModule],
  exports: [EmployeesPageComponent]
})
export class EmployeesPageComponentModule {
}
