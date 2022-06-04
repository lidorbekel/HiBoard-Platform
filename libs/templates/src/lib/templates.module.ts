import {NgModule} from "@angular/core";
import {TemplatesPageComponentModule} from "./templates-page/templates-page.component";
import {TemplatesRoutingModule} from "./templates-routing.module";
import {TemplatePageComponentModule} from "./template-page/template-page.component";

@NgModule({
  imports: [TemplatesRoutingModule, TemplatesPageComponentModule, TemplatePageComponentModule]
})
export class TemplatesModule {
}
