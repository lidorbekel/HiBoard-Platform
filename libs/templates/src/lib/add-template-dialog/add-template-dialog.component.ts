import {ChangeDetectionStrategy, Component, Inject, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Templates} from "../templates.types";

export interface AddTemplateDialogData {
  action: 'add' | 'edit';
  template?: Templates.Entity
}

@Component({
  selector: 'hbd-add-template-dialog',
  templateUrl: './add-template-dialog.component.html',
  styleUrls: ['./add-template-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTemplateDialogComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddTemplateDialogData,
    public dialogRef: MatDialogRef<AddTemplateDialogComponent>,
  ) {
  }

  ngOnInit(): void {
    if (this.data.template) {
      this.form.setValue({name: this.data.template.name})
    }
  }

  saveTemplate() {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(this.form.value.name);
  }

}

@NgModule({
  declarations: [AddTemplateDialogComponent],
  imports: [CommonModule, MaterialModule, ErrorTailorModule, ReactiveFormsModule],
  exports: [AddTemplateDialogComponent]
})
export class AddTemplateDialogComponentModule {
}
