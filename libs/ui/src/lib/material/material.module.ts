import {NgModule} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatGridListModule} from "@angular/material/grid-list";



const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatCardModule,
  MatProgressBarModule,
  MatGridListModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
