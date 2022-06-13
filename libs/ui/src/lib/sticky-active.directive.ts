import {Directive, ElementRef, NgModule, OnDestroy, OnInit,} from '@angular/core';

@Directive({
  selector: '[hbdStickyActive]',
})
export class StickyActiveDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  constructor(private host: ElementRef) {
  }

  ngOnInit() {
    this.observer = new IntersectionObserver(
      ([e]) => {
        e.target.classList.toggle('sticky-active', e.intersectionRatio < 1);
      },
      {threshold: [1]}
    );
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

@NgModule({
  declarations: [StickyActiveDirective],
  exports: [StickyActiveDirective],
})
export class StickyActiveDirectiveModule {
}
