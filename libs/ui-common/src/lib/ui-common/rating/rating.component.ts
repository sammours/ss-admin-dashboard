import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component,   input,  } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  standalone: true,
  imports: [CommonModule, IconComponent],
  selector: 'ad-ui-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RatingComponent {
  public rating = input.required<number>();
}