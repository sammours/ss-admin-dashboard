import { Component, input, OnDestroy, OnInit, output, signal } from '@angular/core';

import { Breadcrumb } from '@ss-admin-dashboard/util-common';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent, IconComponent, LineComponent } from '@ss-admin-dashboard/ui-common';
import { OrderModel, ProductModel } from '../../models';
import { OrderUtil, ProductUtil } from '../../utilities';
import { orderStatus } from '../../data';
import { ProductFacade } from '../../store/products/product.facade';

@Component({
  selector: 'ad-orders-table',
  standalone: true,
  imports: [CommonModule, IconComponent, ButtonComponent, LineComponent],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss',
})
export class OrdersTableComponent implements OnInit, OnDestroy {
  protected unsubscribe$ = new Subject();
  public items = input.required<OrderModel[]>();
  public editClick = output<string>();

  protected products = signal<ProductModel[]>([]);
  protected OrderUtil = OrderUtil;
  protected orderStatus = orderStatus;

  protected breadcrumbs: Breadcrumb[] = [
    { text: 'Orders', link: '', icon: 'cart'}
  ];

  constructor(private readonly productFacade: ProductFacade,
    private readonly router: Router
  ) {
  }

  public ngOnInit(): void {
    this.productFacade.reset();
    this.productFacade.getByIds(this.items().flatMap(x => x.products.map(x => x.productId)))

    this.productFacade.items$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        this.products.set(result);
      }
    });
  }

  public ngOnDestroy() {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

  protected getTotalPrice(order: OrderModel) {
      let finalPrice = 0;
      order.products.forEach(op => {
        const product = this.products().find(p => op.productId === p.id);
        if (product) {
          finalPrice += ProductUtil.getFinalPrice(product) * op.amount;
        }
    });

    return `${(finalPrice + (finalPrice * 0.19)).toFixed(2)} €`;
  }

  protected onEditClicked(id: string) {
    this.editClick.emit(id);
  }
}

