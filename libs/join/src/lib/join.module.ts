import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {JoinPageComponent} from "./join-page/join-page.component";

const routes: Routes = [
  {
    path: '',
    component: JoinPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoinModule {
}
