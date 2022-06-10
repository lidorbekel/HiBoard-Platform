import {ChangeDetectionStrategy, Component, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@hiboard/ui/material/material.module";

@Component({
  selector: 'hbd-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeDialogComponent {
}

@NgModule({
  declarations: [WelcomeDialogComponent],
  imports: [CommonModule, MaterialModule],
  exports: [WelcomeDialogComponent]
})
export class WelcomeDialogComponentModule {
}
