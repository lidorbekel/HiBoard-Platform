import {NgModule} from "@angular/core";
import {TemplatesPageComponentModule} from "./templates-page/templates-page.component";
import {TemplatesRoutingModule} from "./templates-routing.module";

@NgModule({
  imports: [TemplatesRoutingModule, TemplatesPageComponentModule]
})
export class TemplatesModule {
}
