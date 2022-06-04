import {ChangeDetectionStrategy, Component, EventEmitter, NgModule, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {TemplatesService} from "../state/templates.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Activities} from "@hiboard/activities/types/activities.type";
import {Templates} from "../templates.types";
import {HotToastService} from "@ngneat/hot-toast";

@UntilDestroy()
@Component({
  selector: 'hbd-add-activity-sidebar',
  templateUrl: './add-activity-sidebar.component.html',
  styleUrls: ['./add-activity-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddActivitySidebarComponent implements OnInit {
  @Output() closeSideBar = new EventEmitter();
  templates: Templates.Entity[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.maxLength(10)]),
    description: new FormControl(''),
    templates: new FormControl('', [Validators.required]),
    weeks: new FormControl(0, [Validators.max(4)]),
    days: new FormControl(0, [Validators.max(6)]),
    hours: new FormControl(0, [Validators.max(23)]),
  })

  templatesNames: string[] = [];
  initialTemplatesNames: string[] = [];

  constructor(
    private templatesService: TemplatesService,
    private toast: HotToastService
  ) {
  }

  ngOnInit(): void {
    this.initTemplates();
  }

  initTemplates() {
    this.templatesService.templates$.pipe(
      untilDestroyed(this)
    ).subscribe((templates) => {
      this.templates = templates;
      this.templatesNames = templates.map(({name}) => name);
      this.initialTemplatesNames = this.templatesNames.slice();
    })
  }

  get templatesControl() {
    return this.form.get('templates') as FormControl;
  }

  selectAll() {
    if (this.templatesControl.value.length === this.initialTemplatesNames.length) {
      this.templatesControl.setValue([])
    } else {
      this.templatesControl.setValue([...this.templatesNames, 'Select All'])
    }
  }

  remove(control: FormControl, value: string): void {
    const index = control.value.indexOf(value);
    if (index !== -1) {
      control.value.splice(index, 1);
    }

    control.setValue(control.value); // To trigger change detection
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }

    const newActivity: Omit<Activities.InventoryEntity, 'id'> = {
      title: this.form.get('name')!.value,
      description: this.form.get('description')!.value,
      estimation: {
        weeks: this.form.get('weeks')!.value,
        days: this.form.get('days')!.value,
        hours: this.form.get('hours')!.value,
      },
      tag: this.form.get('tag')!.value,
    };

    const selectedTemplates = this.templates.filter((template) => {
      return this.form.get('templates')!.value.includes(template.name);
    })


    this.templatesService.addActivityToTemplates(newActivity, selectedTemplates).pipe(untilDestroyed(this)).subscribe({
      next: () => {
        this.toast.success('Templates Updated Successfully !')
        this.closeSideBar.emit({save: true})
      }
    });
  }
}

@NgModule({
  declarations: [AddActivitySidebarComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, ErrorTailorModule],
  exports: [AddActivitySidebarComponent]
})
export class AddActivitySidebarComponentModule {
}
