import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {SvgIconsModule} from "@ngneat/svg-icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
  AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SvgIconsModule.forRoot({
      defaultSize: 'xxl'
    })
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}