import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';

@Component({
  selector: 'hbd-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [],
  exports: [PageNotFoundComponent]
})
export class PageNotFoundComponentModule {
}
