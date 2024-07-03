import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentFacade, CommentModel, ProductFacade, ProductModel, ProductUtil, ProductValidator, categories } from '@ss-admin-dashboard/feature';
import { Breadcrumb, MenuItem, clone } from '@ss-admin-dashboard/util-common';
import { BaseComponent } from '../../../../base.component';
import { takeUntil } from 'rxjs';
import { ProductPreviewComponent } from '../../components/product-preview/product-preview.component';
import {
  MatDialog,
} from '@angular/material/dialog';

@Component({
  selector: 'ad-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent extends BaseComponent implements OnInit {
  protected product = new ProductModel();
  protected comments: CommentModel[] = [];
  protected categories = categories;
  protected ProductUtil = ProductUtil;

  protected breadcrumbs: Breadcrumb[] = [
    { text: 'Products', link: '/products', icon: 'product'},
    { text: 'Edit', link: ''}
  ];

  protected validator = new ProductValidator();
  protected commentMenu = [
    { text: 'Delete', link: '', icon: 'delete'},
    { text: 'Block user', link: '', icon: 'block'},
    { text: 'Visit profile', link: '', icon: 'user'},
  ] as MenuItem[];
  readonly dialog = inject(MatDialog);

  constructor(private readonly facade: ProductFacade,
    private readonly commentFacade: CommentFacade,
    private readonly route: ActivatedRoute
  ) {
    super();
  }

  override ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.product.id = params.get('id') ?? '';
      }

      this.getById();
      this.commentFacade.getByProductId(this.product.id);
    })

    this.facade.product$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        this.product = clone(result);
      }
    });

    this.commentFacade.list$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        this.comments = result;
      }
    });
  }

  protected onPreviewClicked() {
    this.dialog.open(ProductPreviewComponent, {
      width: '1000px',
      maxWidth: '1000px',
      data: {
        product: signal<ProductModel>(this.product),
        comments: signal<CommentModel[]>(this.comments),
      },
      id: 'preview-dialog'
    });
  }
  
  protected onDeleteImageClicked(image: string) {
    this.product.images = this.product.images.filter(x => x !== image);
  }

  public onChanged() {
    this.validator.validate(this.product);
  }

  private getById() {
    this.facade.getById(this.product.id);
  }
}

