import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component,   input,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconType } from '@ss-admin-dashboard/util-common';
import { IconComponent } from '../icon/icon.component';

type ColorType = 'green' | 'gray';
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  selector: 'ad-ui-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ButtonComponent {
  public text = input.required<string>();
  public disabled = input<boolean>(false);
  public icon = input<IconType>();
  public color = input<ColorType>('gray');
}