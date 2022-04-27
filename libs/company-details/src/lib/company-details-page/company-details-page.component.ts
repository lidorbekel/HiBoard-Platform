import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnInit} from '@angular/core';
import {CompanyService} from "@hiboard/company/state/company.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {CompanyRepository} from "@hiboard/company/state/company.repository";
import {CommonModule} from "@angular/common";
import {SubscribeModule} from "@ngneat/subscribe";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "@hiboard/ui/confirm-dialog/confirm-dialog.component";
import {Company} from "@hiboard/company/company.types";
import {HotToastService} from "@ngneat/hot-toast";

@UntilDestroy()
@Component({
  selector: 'hbd-company-details-page',
  templateUrl: './company-details-page.component.html',
  styleUrls: ['./company-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailsPageComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  loading = false;

  company$ = this.companyRepo.company$;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    departments: new FormControl(''),
    description: new FormControl('')
  })

  departments: string[] = [];

  constructor(private companyService: CompanyService,
              private companyRepo: CompanyRepository,
              private dialog: MatDialog,
              private toast: HotToastService,
              private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.company$.pipe(
      untilDestroyed(this)
    ).subscribe((company) => {
      if (company) {
        if (company.departments) {
          this.departments = company.departments;
        }
        this.form.get('name')!.setValue(company.name);
        this.form.get('description')!.setValue(company.description || '');
      }
    })
  }

  remove(department: string): void {
    const index = this.departments.indexOf(department);

    if (index >= 0) {
      this.departments.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.departments.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  onEdit() {
    if (this.form.invalid) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.loading = true;
        this.cdr.detectChanges();

        const {name, departments, description} = this.form.value;
        const updatedCompany = {
          id: this.companyRepo.companyId,
          name,
          departments,
          description
        } as Company.Entity;

        this.companyService.updateCompany(updatedCompany).subscribe((res) => {
          if (res.data.name) {
            this.toast.success('Details updated successfully !')
            this.companyRepo.update(res.data);
            this.loading = false;
            this.cdr.detectChanges();
          } else {
            this.toast.error('There was a problem updating the details, please try again later...')
            this.loading = false;
            this.cdr.detectChanges();
          }
        })
      }
    })
  }
}

@NgModule({
  declarations: [CompanyDetailsPageComponent],
  imports: [
    CommonModule,
    SubscribeModule,
    MaterialModule,
    ReactiveFormsModule,
    ErrorTailorModule
  ],
  exports: [CompanyDetailsPageComponent]
})
export class CompanyDetailsPageComponentModule {
}
