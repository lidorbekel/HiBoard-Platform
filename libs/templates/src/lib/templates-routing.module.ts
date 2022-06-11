import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TemplatesPageComponent} from "./templates-page/templates-page.component";
import {TemplatePageComponent} from "./template-page/template-page.component";

const routes: Routes = [
  {path: '', component: TemplatesPageComponent},
  {path: ':id', component: TemplatePageComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TemplatesRoutingModule {
}
