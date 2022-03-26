import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {SvgIconsModule} from "@ngneat/svg-icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "@hiboard/env";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {HotToastModule} from "@ngneat/hot-toast";
import {ApiModule} from "@hiboard/api//api.module";
import {ErrorTailorModule} from "@ngneat/error-tailor";
import {AngularFireModule} from "@angular/fire/compat";
import {popperVariation, TippyModule, tooltipVariation} from "@ngneat/helipopper";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
  AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ApiModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: () => 'This field is required',
          email: () => 'Invalid email',
          minlength: ({ requiredLength, actualLength }) =>
            `Expected at least ${requiredLength} characters but got only ${actualLength}`,
        }
      }
    }),
    TippyModule.forRoot({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
        menu: popperVariation
      }
    }),
    SvgIconsModule.forRoot({
      defaultSize: 'xxl'
    }),
    HotToastModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth())
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
