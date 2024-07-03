import { Component, Inject, Signal } from '@angular/core';
import { CategoryUtil, CommentModel, ProductModel, ProductUtil } from '@ss-admin-dashboard/feature';
import { BaseComponent } from '../../../../base.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface PreviewDialogData {
  product: Signal<ProductModel>,
  comments: Signal<CommentModel[]>

}
@Component({
  selector: 'ad-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.scss',
})
export class ProductPreviewComponent extends BaseComponent {
  protected product: Signal<ProductModel>;
  protected comments: Signal<CommentModel[]>;

  protected CategoryUtil = CategoryUtil;

  protected ProductUtil = ProductUtil;

  constructor(@Inject(MAT_DIALOG_DATA) protected data: PreviewDialogData) {
    super();
    this.product = data.product;
    this.comments = data.comments;
  }

}

