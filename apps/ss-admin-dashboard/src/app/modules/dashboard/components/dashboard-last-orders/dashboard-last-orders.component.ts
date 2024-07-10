import { Component, OnInit, signal } from '@angular/core';
import { BaseComponent } from '../../../../base.component';
import {
  OrderFacade,
  OrderModel,
} from '@ss-admin-dashboard/feature';
import { takeUntil } from 'rxjs';
import { clone } from '@ss-admin-dashboard/util-common';
import { Router } from '@angular/router';

@Component({
  selector: 'ad-dashboard-last-orders',
  templateUrl: './dashboard-last-orders.component.html',
  styleUrl: './dashboard-last-orders.component.scss',
})
export class DashboardLastOrdersComponent
  extends BaseComponent
  implements OnInit
{
  protected orders = signal<OrderModel[]>([]);

  constructor(private readonly orderFacade: OrderFacade,
    private readonly router: Router
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.orderFacade.list$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          this.orders.set(clone(result.items.slice(0, 3)));
        }
      });
  }

  protected onEditClicked(id: string) {
    this.router.navigate(['/orders', id]);
  }
}
