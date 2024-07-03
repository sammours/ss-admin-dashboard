import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { OrderFacade, OrderModel, OrderUtil, ProductFacade, ProductModel, ProductUtil } from '@ss-admin-dashboard/feature';
import { Breadcrumb, clone } from '@ss-admin-dashboard/util-common';
import { BaseComponent } from '../../../../base.component';
import { takeUntil } from 'rxjs';

interface OrderProduct { 
  amount: number;
  product: ProductModel;
  finalPrice: number;
}

@Component({
  selector: 'ad-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrl: './order-edit.component.scss',
})
export class OrderEditComponent extends BaseComponent implements OnInit {
  @Input() id = '';
  protected order = new OrderModel();
  protected orderProducts: OrderProduct[] = [];
  
  protected roundedOverAllPrice = computed(() => this.overAllPrice().toFixed(2));
  protected roundedOverAllFinalPrice = computed(() => this.overAllFinalPrice().toFixed(2));
  protected roundedSaving = computed(() => (this.overAllPrice() - this.overAllFinalPrice()).toFixed(2));
  protected roundedFinal = computed(() => (this.overAllFinalPrice() + (this.overAllFinalPrice() * 0.19)).toFixed(2));

  private overAllPrice = signal(0);
  private overAllFinalPrice = signal(0);
  protected OrderUtil = OrderUtil;

  protected breadcrumbs: Breadcrumb[] = [
    { text: 'Orders', link: '/orders', icon: 'cart'},
    { text: 'Edit', link: ''}
  ];

  constructor(private readonly facade: OrderFacade,
    private readonly productFacade: ProductFacade
  ) {
    super();
  }

  override ngOnInit(): void {
    this.getById();
    this.facade.order$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        this.order = clone(result);
        this.productFacade.getByIds(this.order.products.map(x => x.productId));
      }
    });

    this.productFacade.items$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        this.orderProducts = [];
        this.overAllPrice.set(0);
        this.overAllFinalPrice.set(0);
        result.forEach(product => {
          const amount = this.order.products.find(x => x.productId === product.id)?.amount ?? 0;
          const finalPrice = this.getProductOrderFinalPrice(product, amount);
          this.orderProducts.push({ amount, product, finalPrice });
          this.overAllPrice.update(x => x + (product.price * amount));
          this.overAllFinalPrice.update(x => x + finalPrice);
        });
      }
    });
  }

  private getProductOrderFinalPrice(product: ProductModel, amount: number) {
    return ProductUtil.getFinalPrice(product) * amount;
  }

  private getById() {
    this.facade.getById(this.id);
  }
}

