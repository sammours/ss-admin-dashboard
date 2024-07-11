import { Component, OnInit, signal } from '@angular/core';
import { BaseComponent } from '../../../../base.component';
import { ApexChart } from 'ng-apexcharts';

@Component({
  selector: 'ad-dashboard-target-stats',
  templateUrl: './dashboard-target-stats.component.html',
  styleUrl: './dashboard-target-stats.component.scss',
})
export class DashboardTargetStatsComponent extends BaseComponent implements OnInit {
  protected series: number[] = [];
  protected chart: ApexChart;
  protected labels: string[] = []; 
  protected progress = signal<number>(70);

  constructor() {
    super();

    this.chart = {
      type: "radialBar",
      background: '#1F2937',
      foreColor: '#E5E7EB',
      toolbar: {
        show: false
      }
    };

    this.labels = ['Progress'],

    this.series = [this.progress()];
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}

