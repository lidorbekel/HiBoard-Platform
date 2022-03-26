import {NgModule} from "@angular/core";
import {HomePageComponentModule} from "./home-page/home-page.component";
import {HomeRoutingModule} from "./home-routing.module";

@NgModule({
  imports: [HomeRoutingModule, HomePageComponentModule],
})
export class HomeModule {}
