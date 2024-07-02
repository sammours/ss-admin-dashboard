import { CommonModule } from '@angular/common';
import { Component,   input,  } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'ad-ui-line',
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss'
})
export class LineComponent {
  public text = input<string>('');
}