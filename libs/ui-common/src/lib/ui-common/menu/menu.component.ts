import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';

import { MenuItem } from '@ss-admin-dashboard/util-common';
import { IconComponent } from '../icon/icon.component';
import { Router } from '@angular/router';

type MenuDirection = 'left' | 'right';

@Component({
  standalone: true,
  imports: [CommonModule, IconComponent],
  selector: 'ad-ui-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Input({ required: true }) menuItems!: MenuItem[];
  @Input({ required: false }) keepOpen = false;
  @Input({ required: false }) menuDirection: MenuDirection = 'right';

  protected showMenu = signal(false);

  @Output() menuOpen = new EventEmitter<boolean>();
  @Output() menuClose = new EventEmitter<boolean>();
  @Output() menuToggle = new EventEmitter<boolean>();

  @HostListener('document:click', ['$event'])
  protected onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target) && !this.keepOpen) {
      this.showMenu.set(false);
    }
  }

  constructor(private readonly elementRef: ElementRef, private readonly router: Router) {} 

  protected onItemClicked(item: MenuItem) {
    this.router.navigateByUrl(item.link);
  }

  protected toggleMenu(){
    this.showMenu.update(x => x = !x);
    this.menuToggle.emit(this.showMenu());

    if (this.showMenu() === false) {
      this.menuClose.emit(true);
    }

    if (this.showMenu() === true) {
      this.menuOpen.emit(true);
    }
  }
}
