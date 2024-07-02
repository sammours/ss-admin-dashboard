import { Component, OnDestroy, OnInit } from '@angular/core';
import { initFlowbite, initTooltips } from 'flowbite';
import { Subject } from 'rxjs';

@Component({
  selector: 'ad-base-component',
  standalone: true,
  template: ``,
})
export class BaseComponent implements OnInit, OnDestroy {
  protected unsubscribe$ = new Subject();
  
  ngOnInit(): void {
    initFlowbite();
  }

  public ngOnDestroy() {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }
}