import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppInitializer} from "@hiboard/core/app-init/app-initializer";

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory(appInitializer: AppInitializer) {
        return () => appInitializer.init();
      },
      deps: [AppInitializer],
    },
  ],
})
export class CoreModule {
}
