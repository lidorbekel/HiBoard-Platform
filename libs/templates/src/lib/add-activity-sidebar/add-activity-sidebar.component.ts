import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlErrorsDirective, ErrorTailorModule} from "@ngneat/error-tailor";
import {TemplatesService} from "../state/templates.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Activities} from "@hiboard/activities/types/activities.type";
import {Templates} from "../templates.types";
import {HotToastService} from "@ngneat/hot-toast";
import {ActivitiesService} from "@hiboard/activities/state/activities.service";
import {BehaviorSubject} from "rxjs";

@UntilDestroy()
@Component({
  selector: 'hbd-add-activity-sidebar',
  templateUrl: './add-activity-sidebar.component.html',
  styleUrls: ['./add-activity-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddActivitySidebarComponent implements OnInit {
  @ViewChild('nameErrorTailor', {static: true}) nameErrorTailor: ControlErrorsDirective;

  @ViewChild('selectErrorTailor', {static: true}) selectErrorTailor: ControlErrorsDirective;

  @ViewChild('formDirective') formDirective: FormGroupDirective;
  @Output() closeSideBar = new EventEmitter();

  @Input() isTemplates: boolean;

  @Input() sidenavClose: BehaviorSubject<boolean>;

  templates: Templates.Entity[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.maxLength(10)]),
    description: new FormControl(''),
    templates: new FormControl(''),
    weeks: new FormControl(0, [Validators.max(4)]),
    days: new FormControl(0, [Validators.max(6)]),
    hours: new FormControl(0, [Validators.max(23)]),
  })

  templatesNames: string[] = [];
  initialTemplatesNames: string[] = [];

  constructor(
    private templatesService: TemplatesService,
    private activitiesService: ActivitiesService,
    private toast: HotToastService,
  ) {
  }

  ngOnInit(): void {
    this.initTemplates();
  }

  ngAfterViewInit() {
    this.sidenavClose.pipe(untilDestroyed(this)).subscribe(isClosed => {
      if (isClosed) {
        this.form.reset();
        this.formDirective.resetForm();
        this.nameErrorTailor.hideError();
        this.selectErrorTailor?.hideError();
      }
    })
  }

  initTemplates() {
    if (this.isTemplates) {
      this.form.get('templates')!.setValidators(Validators.required);
      this.templatesService.templates$.pipe(
        untilDestroyed(this)
      ).subscribe((templates) => {
        this.templates = templates;
        this.templatesNames = templates.map(({name}) => name);
        this.initialTemplatesNames = this.templatesNames.slice();
      })
    } else {
      this.templates = [this.templatesService.activeTemplate$.getValue()!];
    }
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

    let selectedTemplates: Templates.Entity[];

    if (this.isTemplates) {
      selectedTemplates = this.templates.filter((template) => {
        return this.form.get('templates')!.value.includes(template.name);
      })
    } else {
      selectedTemplates = this.templates;
    }

    this.activitiesService.createInventoryActivity(newActivity).pipe(
      untilDestroyed(this)
    ).subscribe((res) => {
      this.templatesService.updateTemplatesWithNewActivity(selectedTemplates, res.data)
        .pipe(untilDestroyed(this)).subscribe({
        next: () => {
          this.toast.success(`Template${selectedTemplates.length > 1 ? 's' : ''} Updated Successfully !`)
          this.closeSideBar.emit({save: true})
        }
      });
    })
  }
}

@NgModule({
  declarations: [AddActivitySidebarComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, ErrorTailorModule],
  exports: [AddActivitySidebarComponent]
})
export class AddActivitySidebarComponentModule {
}
