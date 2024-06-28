import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductFacade, ProductModel, ProductValidator, UserModelUtil } from '@ss-admin-dashboard/feature';
import { Breadcrumb, clone } from '@ss-admin-dashboard/util-common';
import { BaseComponent } from '../../../base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'ad-user-product',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent extends BaseComponent implements OnInit {
  protected product = new ProductModel();
  protected UserModelUtil = UserModelUtil;

  protected breadcrumbs: Breadcrumb[] = [
    { text: 'Products', link: '/products', icon: 'product'},
    { text: 'Edit', link: ''}
  ];

  protected validator = new ProductValidator();
  protected activeImage = '';

  constructor(protected readonly facade: ProductFacade,
    private readonly route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.product.id = params.get('id') ?? '';
      }

      this.getById();
    })

    this.facade.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        this.product = clone(result);
        this.activeImage = this.product.images[0] ?? '';
      }
    });
  }

  public onChanged() {
    this.validator.validate(this.product);
  }

  private getById() {
    this.facade.getById(this.product.id);
  }
}

