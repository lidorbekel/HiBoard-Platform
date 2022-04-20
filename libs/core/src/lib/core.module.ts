import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppInit} from "@hiboard/core/app-init/app-init";

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory(appInitializer: AppInit) {
        return () => appInitializer.init();
      },
      deps: [AppInit],
    },
  ],
})
export class CoreModule {
}
