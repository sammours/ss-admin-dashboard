import { Component, OnInit } from '@angular/core';
import { ProductFacade } from '@ss-admin-dashboard/feature';
import { Breadcrumb } from '@ss-admin-dashboard/util-common';
import { BaseComponent } from '../../../../base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ad-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
})
export class InboxComponent extends BaseComponent implements OnInit {
  protected breadcrumbs: Breadcrumb[] = [
    { text: 'Products', link: '', icon: 'product'}
  ];

  constructor(private readonly facade: ProductFacade,
    private readonly router: Router
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}

