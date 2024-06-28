import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import {
  heroHome,
  heroPlus,
  heroPencil,
  heroTrash,
  heroUsers,
  heroUser,
  heroArrowLeftStartOnRectangle,
  heroEnvelope,
  heroBars3BottomLeft,
  heroEllipsisVertical,
  heroXCircle,
  heroChevronUpDown,
  heroArrowLeft,
  heroArrowRight,
  heroChevronRight,
  heroChevronDown,
  heroMagnifyingGlass,
  heroCheck,
  heroLockOpen,
  heroLockClosed,
  heroCube,
  heroStar,
  heroXMark,
  heroArrowUpTray
} from '@ng-icons/heroicons/outline';

import { IconType } from '@ss-admin-dashboard/util-common';

type IconColor = 'white' | 'black' | 'gray' | 'light-blue';
type IconSize = 's' | 'm' | 'l'

@Component({
  standalone: true,
  imports: [NgIconComponent],
  selector: 'ad-ui-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IconComponent implements OnInit {
  @Input({ required: true }) icon!: IconType;
  @Input() color: IconColor = 'black';
  @Input() size: IconSize = 'm';

  protected iconSvg = '';
  protected iconSize = 16;

  public ngOnInit(): void {
    switch(this.icon) {
      case 'home': this.iconSvg = heroHome; break;
      case 'add': this.iconSvg = heroPlus; break;
      case 'edit': this.iconSvg = heroPencil; break;
      case 'delete': this.iconSvg = heroTrash; break;
      case 'users': this.iconSvg = heroUsers; break;
      case 'user': this.iconSvg = heroUser; break;
      case 'logout': this.iconSvg = heroArrowLeftStartOnRectangle; break;
      case 'envelope': this.iconSvg = heroEnvelope; break;
      case 'burger-menu': this.iconSvg = heroBars3BottomLeft; break;
      case 'three-dots': this.iconSvg = heroEllipsisVertical; break;
      case 'cancel': this.iconSvg = heroXCircle; break;
      case 'x': this.iconSvg = heroXMark; break;
      case 'sort': this.iconSvg = heroChevronUpDown; break;
      case 'arrow-left': this.iconSvg = heroArrowLeft; break;
      case 'arrow-right': this.iconSvg = heroArrowRight; break;
      case 'chevron-right': this.iconSvg = heroChevronRight; break;
      case 'chevron-down': this.iconSvg = heroChevronDown; break;
      case 'search': this.iconSvg = heroMagnifyingGlass; break;
      case 'save': this.iconSvg = heroCheck; break;
      case 'lock': this.iconSvg = heroLockClosed; break;
      case 'unlock': this.iconSvg = heroLockOpen; break;
      case 'product': this.iconSvg = heroCube; break;
      case 'star': this.iconSvg = heroStar; break;
      case 'upload': this.iconSvg = heroArrowUpTray; break;
      default: this.iconSvg = heroHome; break;
    }

    switch(this.size) {
      case 's': this.iconSize = 8; break;
      case 'm': this.iconSize = 16; break;
      case 'l': this.iconSize = 24; break;
      default: this.iconSize = 16; break;
    }
  }
}