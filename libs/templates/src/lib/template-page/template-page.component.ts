import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgModule,
  OnInit,
  ViewChild
} from '@angular/core';
import {TemplatesService} from "../state/templates.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {SubscribeModule} from "@ngneat/subscribe";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl} from "@angular/forms";
import {Activities} from "@hiboard/activities/types/activities.type";
import {MatDialog} from "@angular/material/dialog";
import {NavigationService} from "@hiboard/navigation/navigaiton.service";
import {AddActivitySidebarComponentModule} from "../add-activity-sidebar/add-activity-sidebar.component";
import {MatDrawer} from "@angular/material/sidenav";

@UntilDestroy()
@Component({
  selector: 'hbd-template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplatePageComponent implements OnInit {
  activeTemplate$ = this.templatesService.activeTemplate$;
  loading = false;

  @ViewChild('filter') filter: ElementRef;
  dataSource = new MatTableDataSource<Activities.Entity>();
  search = new FormControl('');
  displayedColumns: string[] = ['name', 'tag', 'actions'];

  constructor(
    private templatesService: TemplatesService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private navigationService: NavigationService
  ) {
  }

  ngOnInit(): void {
    if (!this.activeTemplate$.getValue()) {
      this.route.params.pipe(
        untilDestroyed(this)
      ).subscribe(res => {
        this.templatesService.getTemplate(res['id']).pipe(
          untilDestroyed(this)
        ).subscribe((res) => {
          this.templatesService.setActiveTemplate(res.data)
        });
      })
    }

    this.activeTemplate$.pipe(
      untilDestroyed(this)
    ).subscribe(res => {
      if (res) {
        this.dataSource.data = res.activities;
        this.cdr.detectChanges();
      }
    })
  }


  onSearchClear() {
    this.filter.nativeElement.value = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.filter.nativeElement.value.trim().toLowerCase();
  }

  goBack() {
    this.navigationService.toTemplates()
  }

  onTemplateChange({save}: { save: boolean }, drawer: MatDrawer) {
    if (save) {
      // this.fetchTemplates();
    }
    drawer.close();
  }
}

@NgModule({
  declarations: [TemplatePageComponent],
  imports: [SubscribeModule, CommonModule, MaterialModule, RouterModule, AddActivitySidebarComponentModule],
  exports: [TemplatePageComponent]
})
export class TemplatePageComponentModule {
}
