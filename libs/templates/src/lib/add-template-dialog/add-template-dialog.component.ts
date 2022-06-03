import {ChangeDetectionStrategy, Component, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'hbd-add-template-dialog',
  templateUrl: './add-template-dialog.component.html',
  styleUrls: ['./add-template-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTemplateDialogComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  constructor(
    public dialogRef: MatDialogRef<AddTemplateDialogComponent>,
  ) {
  }

  addTemplate() {
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
