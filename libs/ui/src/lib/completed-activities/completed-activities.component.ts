import {Component, OnInit, ChangeDetectionStrategy, NgModule, Input} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";

@Component({
  selector: 'hbd-completed-activities',
  templateUrl: './completed-activities.component.html',
  styleUrls: ['./completed-activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompletedactivitiesComponent implements OnInit {
  @Input() total: number;
  @Input() completed: number;
  @Input() percentage: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [CompletedactivitiesComponent],
  imports: [MaterialModule],
  exports: [CompletedactivitiesComponent]
})
export class CompletedactivitiesComponentModule {
}
