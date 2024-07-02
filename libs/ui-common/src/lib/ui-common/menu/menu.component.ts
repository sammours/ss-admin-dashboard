import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';

import { MenuItem } from '@ss-admin-dashboard/util-common';
import { IconComponent } from '../icon/icon.component';
import { Router } from '@angular/router';
import { initDropdowns } from 'flowbite';

type MenuDirection = 'left' | 'right' | 'top' | 'bottom' | 'bottom-start' | 'top-start';

@Component({
  standalone: true,
  imports: [CommonModule, IconComponent],
  selector: 'ad-ui-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  @Input({ required: true }) menuItems!: MenuItem[];
  @Input({ required: true }) id!: string;
  @Input({ required: false }) keepOpen = false;
  @Input({ required: false }) withBorder = false;
  @Input({ required: false }) direction: MenuDirection = 'bottom-start';

  protected showMenu = signal(false);

  @Output() menuOpen = new EventEmitter<boolean>();
  @Output() menuClose = new EventEmitter<boolean>();
  @Output() menuToggle = new EventEmitter<boolean>();

  constructor(private readonly elementRef: ElementRef, private readonly router: Router) {
  } 

  public ngOnInit(): void {
    initDropdowns();
  }

  protected onItemClicked(item: MenuItem) {
    if (item.link !== '') {
      this.router.navigateByUrl(item.link);
    }
  }
}
