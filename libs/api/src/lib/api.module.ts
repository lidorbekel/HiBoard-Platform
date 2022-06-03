import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {TokenInterceptor} from './token.interceptor';
import {BaseUrlInterceptor} from "@hiboard/api/base-url.interceptor";
import {ErrorsInterceptor} from "@hiboard/api/errors.interceptor";

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true,
    },
  ]
})
export class ApiModule {
}
