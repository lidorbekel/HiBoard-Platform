import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgModule,
  OnInit,
  ViewChild
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {TemplatesService} from "../state/templates.service";
import {MatTableDataSource} from "@angular/material/table";
import {Templates} from "../templates.types";
import {UserRepository} from 'libs/user/src/lib/state/user.repository';
import {FormControl} from "@angular/forms";
import {ConfirmDialogComponent} from "@hiboard/ui/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {HotToastService} from "@ngneat/hot-toast";
import {AddTemplateDialogComponent, AddTemplateDialogData} from "../add-template-dialog/add-template-dialog.component";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";
import {MatDrawer} from "@angular/material/sidenav";
import {AddActivitySidebarComponentModule} from "../add-activity-sidebar/add-activity-sidebar.component";
import {BehaviorSubject} from "rxjs";

@UntilDestroy()
@Component({
  selector: 'hbd-templates-page',
  templateUrl: './templates-page.component.html',
  styleUrls: ['./templates-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplatesPageComponent implements OnInit {
  activeUserDepartment: string;
  loading = false;
  templates: Templates.Entity[] = []

  @ViewChild('filter') filter: ElementRef;
  dataSource = new MatTableDataSource<Templates.Entity>();
  search = new FormControl('');
  displayedColumns: string[] = ['name', 'actions'];

  sidenavClose = new BehaviorSubject(true);

  constructor(
    private templatesService: TemplatesService,
    private cdr: ChangeDetectorRef,
    private userRepo: UserRepository,
    private dialog: MatDialog,
    private toast: HotToastService,
    private navigationService: NavigationService
  ) {
  }

  ngOnInit(): void {
    this.templatesService.setActiveTemplate(null);

    this.activeUserDepartment = this.userRepo.getCurrentUser()!.department;
    this.activeUserDepartment = this.activeUserDepartment[0].toUpperCase() + this.activeUserDepartment.substr(1);

    this.templatesService.templates$.pipe(untilDestroyed(this)).subscribe(templates => {
      if (templates) {
        this.loading = false;
        this.dataSource.data = templates;
        this.cdr.detectChanges();
      }
    })

    this.fetchTemplates();
  }

  fetchTemplates() {
    this.loading = true;
    this.templatesService.getTemplates().pipe(untilDestroyed(this)).subscribe();
  }

  onSearchClear() {
    this.filter.nativeElement.value = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.filter.nativeElement.value.trim().toLowerCase();
  }

  onDeleteTemplate(template: Templates.Entity) {
    this.dialog.open(ConfirmDialogComponent).afterClosed()
      .pipe(untilDestroyed(this)).subscribe(confirm => {
      if (confirm) {
        this.templatesService.deleteTemplate(template.id).pipe(untilDestroyed(this)).subscribe({
          next: () => {
            this.toast.success('Template deleted successfully');
            this.cdr.detectChanges();
          },
          error: () => {
            this.toast.error('There was a problem deleting your template, please try again later.')
          }
        })
      }
    })
  }

  navigateToTemplate(template: Templates.Entity) {
    this.templatesService.setActiveTemplate(template);
    this.navigationService.toTemplate(template.id);
  }

  openAddTemplateDialog() {
    this.sidenavClose.next(false);
    this.dialog.open<AddTemplateDialogComponent, AddTemplateDialogData>(AddTemplateDialogComponent, {data: {action: 'add'}}).afterClosed()
      .pipe(untilDestroyed(this)).subscribe((res) => {
      if (res) {
        this.templatesService.createTemplate({
          name: res,
          activities: []
        }).pipe(untilDestroyed(this)).subscribe({
          next: () => this.toast.success('Template added successfully !')
        })
      }
    })
  }

  openEditTemplateDialog(template: Templates.Entity) {
    this.dialog.open<AddTemplateDialogComponent, AddTemplateDialogData>(AddTemplateDialogComponent, {
      data: {action: 'edit', template}
    }).afterClosed().pipe((untilDestroyed(this))).subscribe((res) => {
      if (res) {
        this.templatesService.updateTemplate({
          ...template,
          name: res
        }).pipe(untilDestroyed(this)).subscribe({
          next: () => this.toast.success(`${template.name} Template renamed successfully`)
        })
      }
    })
  }

  onTemplatesChange({save}: { save: boolean }, drawer: MatDrawer) {
    if (save) {
      this.fetchTemplates();
    }
    drawer.close();
  }

  onClose() {
    this.sidenavClose.next(true);
  }
}

@NgModule({
  declarations: [TemplatesPageComponent],
  imports: [CommonModule, MaterialModule, AddActivitySidebarComponentModule],
  exports: [TemplatesPageComponent]
})
export class TemplatesPageComponentModule {
}
