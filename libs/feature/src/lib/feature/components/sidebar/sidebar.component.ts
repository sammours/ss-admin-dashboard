import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@ss-admin-dashboard/ui-common';

import { MenuItem } from '@ss-admin-dashboard/util-common';

interface SidebarMenuItem extends MenuItem {
  verticalPosition: 'top' | 'bottom';
}

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, IconComponent],
  selector: 'ad-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() showSidebar = signal(false);

  protected menuItems = signal<SidebarMenuItem[]>([
    { verticalPosition: 'top', text: 'Dashboard', link: '', icon: 'home'},
    { verticalPosition: 'top', text: 'Users', link: '/users', icon: 'users'},
    { verticalPosition: 'top', text: 'Product management', link: '', icon: 'product', children: [
      { text: 'Product overview', link: '/products', icon: 'product' },
      { text: 'Order overview', link: '/orders', icon: 'cart' },
      { text: 'Shipping overview', link: '', icon: 'product' },
    ] },
    { verticalPosition: 'top', text: 'Inbox', link: '/inbox', icon: 'inbox'},
    { verticalPosition: 'bottom', text: 'Logout', link: '', icon: 'logout'},
  ]);

  protected topMenuItems = computed(() => this.menuItems().filter(x => x.verticalPosition === 'top'));
  protected bottomMenuItems = computed(() => this.menuItems().filter(x => x.verticalPosition === 'bottom'));

  protected toggleSidebar() {
    this.showSidebar.update(x => x = !x);
  }
}
