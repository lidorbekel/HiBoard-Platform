import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, NgModule} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {HotToastService} from "@ngneat/hot-toast";
import {ErrorOnSubmitMatcher} from "@hiboard/ui/material/error-state-matcher";
import {TippyModule} from "@ngneat/helipopper";
import {User} from "../../users.types";
import {UserService} from "../state/user.service";
import {CompanyRepository} from "@hiboard/company/state/company.repository";
import {UserRepository} from "../state/user.repository";

export interface CreateUserDialogData {
  role: User.Role
}

@Component({
  selector: 'hbd-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserDialogComponent {
  createUserForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    department: new FormControl(''),
  })

  departments = this.companyRepo.currentCompany!.departments

  hidePassword = true;

  matcher = new ErrorOnSubmitMatcher();

  loading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: CreateUserDialogData,
              private userService: UserService,
              private userRepo: UserRepository,
              public dialogRef: MatDialogRef<CreateUserDialogComponent>,
              private toast: HotToastService,
              private cdr: ChangeDetectorRef,
              private companyRepo: CompanyRepository
  ) {
  }

  createUser() {
    if (this.createUserForm.invalid) {
      return;
    }
    this.loading = true;

    const isCreateEmployee = this.data.role === 'Employee';

    const newUser: User.NewEntity = {
      ...this.createUserForm.value,
      department: isCreateEmployee ? this.userRepo.getCurrentUser()!.department : this.createUserForm.get('department')!.value,
      role: this.data.role,
      companyId: this.companyRepo.currentCompany!.id,
    }

    this.userService.createUser(newUser, {managerId: this.userRepo.userId}).subscribe({
      next: (res) => {
        this.dialogRef.close(res.data)
      },
      error: () => {
        this.loading = false;
        this.toast.error('There was a problem to create the user, please try again later.')
        this.cdr.detectChanges();
      }
    })
  }

}

@NgModule({
  declarations: [CreateUserDialogComponent],
  imports: [MaterialModule, ReactiveFormsModule, ErrorTailorModule, CommonModule, TippyModule],
  exports: [CreateUserDialogComponent]
})
export class CreateUserDialogComponentModule {
}
