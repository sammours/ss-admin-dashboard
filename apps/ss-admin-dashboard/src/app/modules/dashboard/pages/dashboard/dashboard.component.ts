import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../base.component';

@Component({
  selector: 'ad-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}

