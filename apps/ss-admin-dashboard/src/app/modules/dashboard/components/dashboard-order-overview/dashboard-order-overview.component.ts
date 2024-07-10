import { Component, OnInit, signal } from '@angular/core';
import { BaseComponent } from '../../../../base.component';
import {
  OrderFacade,
  OrderModel,
} from '@ss-admin-dashboard/feature';
import { takeUntil } from 'rxjs';
import { clone, FilterOptions } from '@ss-admin-dashboard/util-common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
} from 'ng-apexcharts';
import { DateTime } from 'luxon';

@Component({
  selector: 'ad-dashboard-order-overview',
  templateUrl: './dashboard-order-overview.component.html',
  styleUrl: './dashboard-order-overview.component.scss',
})
export class DashboardOrderOverviewComponent
  extends BaseComponent
  implements OnInit
{
  protected orders = signal<OrderModel[]>([]);
  protected series: ApexAxisChartSeries = [];
  protected chart: ApexChart;
  protected stroke: ApexStroke;

  constructor(private readonly orderFacade: OrderFacade) {
    super();
    this.chart = {
      height: 350,
      type: 'line',
      background: '#1F2937',
      foreColor: '#E5E7EB',
      toolbar: {
        show: false,
      },
    };

    this.stroke = {
      curve: 'smooth',
    }
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.getOrders();
    this.orderFacade.list$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          this.orders.set(clone(result.items));
          this.initializeChartData();
        }
      });
  }

  private initializeChartData() {
    const minDate = this.getMinDate();
    const maxDate = this.getMaxDate();

    const quartersDifference =
      maxDate.year * 4 +
      maxDate.quarter -
      (minDate.year * 4 + minDate.quarter) +
      1; // Add current quarter

    const data: { x: string; y: number }[] = [];
    let year = minDate.year;
    let quarter = minDate.quarter;
    Array.from({ length: quartersDifference }, () => {
      data.push({
        x: `Q${quarter} ${year}`,
        y:
          this.orders().where((x) => {
            const d = DateTime.fromISO(x.date + '');
            return d.year === year && d.quarter === quarter;
          })?.length ?? 0,
      });
      if (quarter % 4 === 0) {
        year++;
        quarter = 1;
      } else {
        quarter++;
      }
    });

    this.series = [{ data: data }];
  }

  private getOrders() {
    const filter = new FilterOptions();
    filter.take = -1;
    this.orderFacade.getAll(filter);
  }

  private getMaxDate() {
    return DateTime.fromISO(
      this.orders()
        .orderByDescending((x) => x.date)
        .find((x) => x.date !== undefined)?.date + ''
    );
  }

  private getMinDate() {
    return DateTime.fromISO(
      this.orders()
        .orderBy((x) => x.date)
        .find((x) => x.date !== undefined)?.date + ''
    );
  }
}
