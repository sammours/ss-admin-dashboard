import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';

import { Breadcrumb } from '@ss-admin-dashboard/util-common';
import { IconComponent } from '../icon/icon.component';
import { Router, RouterModule } from '@angular/router';


@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  selector: 'ad-ui-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  @Input({ required: true }) breadcrumbs!: Signal<Breadcrumb[]>;
  @Input({ required: true }) header!: string;

  constructor(protected readonly router: Router) {}
}
