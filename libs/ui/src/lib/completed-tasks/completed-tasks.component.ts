import {Component, OnInit, ChangeDetectionStrategy, NgModule, Input} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";

@Component({
  selector: 'hbd-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompletedTasksComponent implements OnInit {
  @Input() value = 50;
  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [CompletedTasksComponent],
  imports: [MaterialModule],
  exports: [CompletedTasksComponent]
})
export class CompletedTasksComponentModule {
}
