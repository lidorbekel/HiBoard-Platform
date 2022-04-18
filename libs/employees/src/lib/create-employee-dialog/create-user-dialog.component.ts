import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {UserService} from "../../../../user/src/lib/state/user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {HotToastService} from "@ngneat/hot-toast";
import {ErrorOnSubmitMatcher} from "@hiboard/ui/material/error-state-matcher";

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
    role: new FormControl('employee'),
  })

  matcher = new ErrorOnSubmitMatcher();

  loading = false;

  constructor(private userService: UserService, public dialogRef: MatDialogRef<CreateUserDialogComponent>,
              private toast: HotToastService,
              private cdr: ChangeDetectorRef,) {
  }

  createUser() {
    if (this.createUserForm.invalid) {
      return;
    }

    this.loading = true;

    this.userService.createUser(this.createUserForm.value).subscribe({
      next: (res) => {
        this.dialogRef.close(res)
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
  imports: [MaterialModule, ReactiveFormsModule, ErrorTailorModule, CommonModule],
  exports: [CreateUserDialogComponent]
})
export class CreateUserDialogComponentModule {
}
