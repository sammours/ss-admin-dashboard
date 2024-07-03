import { Component, OnInit, signal } from '@angular/core';
import { FilterOptionsFactory, OrderFacade, OrderModel, OrderUtil, ProductFacade, ProductModel, ProductUtil, orderStatus } from '@ss-admin-dashboard/feature';
import { Breadcrumb, Filter, FilterOptions, PaginatedList, clone } from '@ss-admin-dashboard/util-common';
import { BaseComponent } from '../../../../base.component';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'ad-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent extends BaseComponent implements OnInit {
  protected result = new PaginatedList<OrderModel>();
  protected products = signal<ProductModel[]>([]);
  protected OrderUtil = OrderUtil;
  protected orderStatus = orderStatus;

  protected breadcrumbs: Breadcrumb[] = [
    { text: 'Orders', link: '', icon: 'cart'}
  ];

  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  readonly campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });

  protected filter = new FilterOptions();
  protected filterFactory = new FilterOptionsFactory();
  constructor(private readonly facade: OrderFacade,
    private readonly productFacade: ProductFacade,
    private readonly router: Router
  ) {
    super();
    this.filter.sort = { field: 'number', direction: 'asc'};
    this.filter.take = 10;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getAll();
    this.productFacade.reset();
    this.facade.list$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        this.result = result;
        this.productFacade.getByIds(this.result.items.flatMap(x => x.products.map(x => x.productId)))
      }
    });

    this.productFacade.items$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        this.products.set(result);
      }
    });
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

  protected onOrderTypeSelected(value: string) {
    this.filterFactory.filter(this.filter, 'status', value);
    this.getAll();
  }

  protected onDateSelected(value: string) {
    this.filterFactory.filter(this.filter, 'date', value);
    this.getAll();
  }

  protected onFilterChanged(filter: Filter[]) {
    this.filter.filter = filter;
    this.getAll();
  }

  protected onEditClicked(id: string) {
    this.router.navigate(['/orders', id]);
  }

  protected onSortChanged(direction: 'asc' | 'desc') {
    this.filterFactory.sort(this.filter, 'date', direction);
    this.getAll();
  }

  protected onPageChanged(page: number) {
    this.filterFactory.paginate(this.filter, page);
    this.getAll()
  }

  private getAll() {
    this.facade.getAll(clone(this.filter));
  }
}

