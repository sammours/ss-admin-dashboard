import { Component, Input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuItem } from '@ss-admin-dashboard/util-common';
import { IconComponent } from '@ss-admin-dashboard/ui-common';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  standalone: true,
  imports: [UserMenuComponent, RouterModule, IconComponent],
  selector: 'ad-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() showSidebar = signal(false);

  protected menuItems: MenuItem[] = [
    { text: 'Dashboard', link: '', icon: 'home'},
    { text: 'Users', link: ''},
  ];

  protected toggleSidebar() {
    this.showSidebar.update(x => x = !x);
  }
}
