import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, input, signal } from '@angular/core';

import { MenuItem } from '@ss-admin-dashboard/util-common';
import { IconComponent } from '../icon/icon.component';
import { Router, RouterModule } from '@angular/router';
import { initDropdowns } from 'flowbite';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

type MenuDirection = 'before' | 'after' | 'above' | 'below';

@Component({
  standalone: true,
  imports: [CommonModule, IconComponent, MatButtonModule, MatMenuModule, RouterModule],
  selector: 'ad-ui-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  protected menuItems = input.required<MenuItem[]>();
  protected withBorder = input<boolean>(false);
  protected direction = input<MenuDirection>('below');

  constructor(private readonly router: Router) {
  } 

  protected onItemClicked(item: MenuItem) {
    if (item.link !== '') {
      this.router.navigateByUrl(item.link);
    }
  }
}
