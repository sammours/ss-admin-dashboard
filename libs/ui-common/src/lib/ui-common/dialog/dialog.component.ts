import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

import { IconComponent } from '../icon/icon.component';

@Component({
  standalone: true,
  imports: [CommonModule, IconComponent],
  selector: 'ad-ui-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @Output() closeDialog = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape') onKeydownHandler() {
    this.closeDialog.emit(true);
  }
}
