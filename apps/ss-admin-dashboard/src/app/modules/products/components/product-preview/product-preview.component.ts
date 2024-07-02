import { Component, input } from '@angular/core';
import { CategoryUtil, CommentFacade, CommentModel, ProductFacade, ProductModel, ProductUtil, categories } from '@ss-admin-dashboard/feature';
import { BaseComponent } from '../../../../base.component';

@Component({
  selector: 'ad-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.scss',
})
export class ProductPreviewComponent extends BaseComponent {
  protected product = input.required<ProductModel>();
  protected comments = input.required<CommentModel[]>();
  protected CategoryUtil = CategoryUtil;

  protected ProductUtil = ProductUtil;

  constructor(private readonly facade: ProductFacade,
    private readonly commentFacade: CommentFacade
  ) {
    super();
  }
}

