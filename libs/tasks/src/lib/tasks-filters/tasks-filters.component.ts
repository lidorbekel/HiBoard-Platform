import {ChangeDetectionStrategy, Component, Input, NgModule, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {CommonModule} from "@angular/common";
import {AsyncState, isLoading} from "@ngneat/loadoff";
import {Tasks} from "@hiboard/tasks/types/tasks.type";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'hbd-tasks-filters',
  templateUrl: './tasks-filters.component.html',
  styleUrls: ['./tasks-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksFiltersComponent implements OnInit {
  loading: boolean;
  names: string[];
  statuses: string[];
  tags = ['HR', 'R&D', 'Sales'];
  filteredOptions: Observable<string[]>;

  tagsControl = new FormControl();


  @Input() set tasks(tasks: AsyncState<Tasks.Response>) {
    const data = tasks.res?.data.tasks;
    this.loading = isLoading(tasks);
    if (data) {
      // this.initFilterValues(data);
    }
  }

  ngOnInit() {
    this.filteredOptions = this.tagsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private initFilterValues() {
    this.tags = ['HR', 'R&D', 'Sales'];
    this.statuses = ['backlog', 'in-progress', 'done'];
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tags.filter(option => option.toLowerCase().includes(filterValue));
  }
}

@NgModule({
  declarations: [TasksFiltersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorTailorModule,
    MaterialModule,
  ],
  exports: [TasksFiltersComponent]
})
export class TasksFiltersComponentModule {
}
