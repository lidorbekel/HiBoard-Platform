import {ChangeDetectionStrategy, Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {MatDialog} from "@angular/material/dialog";
import {HotToastService} from "@ngneat/hot-toast";
import {CreateUserDialogComponent} from "../../../../user/src/lib/create-user-dialog/create-user-dialog.component";

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
      if (res?.data) {
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
