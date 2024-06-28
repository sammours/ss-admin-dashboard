import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuItem } from '@ss-admin-dashboard/util-common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'ad-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  @Input({ required: true }) menuItems!: MenuItem[];
  @Input({ required: true }) imageSrc: string | undefined;
  @Input({ required: false }) header: string | undefined;
  @Input({ required: false }) headerDescription: string | undefined;

  protected showMenu = signal(false);

  protected toggleUserMenu(){
    this.showMenu.update(x => x = !x);
  }
}
