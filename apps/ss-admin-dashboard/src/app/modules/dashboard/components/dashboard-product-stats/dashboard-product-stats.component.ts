import { Component, computed, OnInit, signal } from '@angular/core';
import { BaseComponent } from '../../../../base.component';
import { ProductFacade, ProductModel } from '@ss-admin-dashboard/feature';
import { takeUntil } from 'rxjs';
import { DateTime } from 'luxon';
import { FilterOptions } from '@ss-admin-dashboard/util-common';
import { ApexAxisChartSeries, ApexChart } from 'ng-apexcharts';

@Component({
  selector: 'ad-dashboard-product-stats',
  templateUrl: './dashboard-product-stats.component.html',
  styleUrl: './dashboard-product-stats.component.scss',
})
export class DashboardProductStatsComponent extends BaseComponent implements OnInit {
  protected percent = computed(() => (this.newProductsCount() * 100) / this.totalProductsCount());
  protected newProductsCount = signal<number>(0);

  private totalProductsCount = signal<number>(0);
  private products = signal<ProductModel[]>([]);

  protected series: ApexAxisChartSeries = [];
  protected chart: ApexChart;

  constructor(private readonly productFacade: ProductFacade) {
    super();

    this.chart = {
      type: "bar",
      background: '#1F2937',
      foreColor: '#E5E7EB',
      toolbar: {
        show: false
      }
    };
  }

  override ngOnInit(): void {
    super.ngOnInit();

    const filter = new FilterOptions();
    filter.take = -1;
    this.productFacade.getAll(filter);
    this.productFacade.list$.pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.newProductsCount.set(result.items.where(x => DateTime.fromISO(x.createdAt + '').startOf('day') >= DateTime.now().minus({ month: 6}).startOf('day')).length);
        this.totalProductsCount.set(result.items.length);
        this.products.set(result.items);
        this.initializeChart();
      }
    });
  }

  private initializeChart() {
    const years = this.products().map(x => DateTime.fromISO(x.createdAt + '').year).distinct(x => x);

    const data: { x: string; y: number }[] = [];
    years.forEach(year => 
      data.push({ x: year.toString(), y: this.products().count(x => DateTime.fromISO(x.createdAt + '').year === year)})
    )

    this.series = [{ name: 'Products', data }];
  }
}

