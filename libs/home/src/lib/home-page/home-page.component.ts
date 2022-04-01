import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import {CompletedTasksComponentModule} from "@hiboard/ui/completed-tasks/completed-tasks.component";
import {TaskViewComponentModule} from "@hiboard/ui/task-view/task-view.component";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'hbd-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  taskViews = [1,1,1,1,1];

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [HomePageComponent],
  imports: [CompletedTasksComponentModule, TaskViewComponentModule, MaterialModule, CommonModule],
  exports: [HomePageComponent]
})
export class HomePageComponentModule {
}
