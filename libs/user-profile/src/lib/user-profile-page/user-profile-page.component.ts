import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnInit} from '@angular/core';
import {UserRepository} from "../../../../user/src/lib/state/user.repository";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {SubscribeModule} from "@ngneat/subscribe";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {TippyModule} from "@ngneat/helipopper";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {HotToastService} from "@ngneat/hot-toast";
import {UserService} from "../../../../user/src/lib/state/user.service";

@UntilDestroy()
@Component({
  selector: 'hbd-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfilePageComponent implements OnInit {
  user$ = this.userRepo.user$;
  loading = false;
  panelOpenState = false;
  hideCurrentPassword = true;
  hideNewPassword = true;

  form = new FormGroup({
    email: new FormControl({value: null, disabled: true}),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
  })

  constructor(private userRepo: UserRepository,
              private toast: HotToastService,
              private userService: UserService,
              private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.user$.pipe(
      untilDestroyed(this)
    ).subscribe((user) => {
      if (user) {
        const {firstName, lastName, email} = user;
        this.form.get('firstName')?.setValue(firstName);
        this.form.get('lastName')?.setValue(lastName);
        this.form.get('email')!.setValue(email);
        this.form.get('currentPassword')!.setValue('');
        this.form.get('newPassword')!.setValue('');
      }
    })

    this.currentPassword.valueChanges.subscribe((currentPass) => {
      if (currentPass) {
        this.newPassword.setValidators([Validators.required, Validators.minLength(6)])
      } else {
        this.newPassword.clearValidators();
      }

      this.newPassword.updateValueAndValidity();
    })
  }

  get currentPassword() {
    return this.form.get('currentPassword')!;
  }

  get newPassword() {
    return this.form.get('newPassword')!;
  }

  onEdit() {
    if (this.form.invalid) {
      return;
    }

    if (this.newPassword.value && !this.currentPassword.value) {
      this.toast.error('Must fill current password');
      return;
    }

    this.loading = true;

    this.userService.updateUser(this.form.value).subscribe({
      next: () => {
        this.toast.success('Profile updated successfully');
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.toast.error('There was a problem updating your profile');
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

}

@NgModule({
  declarations: [UserProfilePageComponent],
  imports: [CommonModule, MaterialModule, SubscribeModule, ErrorTailorModule, ReactiveFormsModule, TippyModule],
  exports: [UserProfilePageComponent]
})
export class UserProfilePageComponentModule {
}
