import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { trigger, transition, style, animate, useAnimation, animation } from '@angular/animations';
import { IconComponent } from '../icon/icon.component';

const scaleIn = animation([
  style({ opacity: 0, transform: "scale(0.5)" }),
  animate(
    "{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",
    style({ opacity: 1, transform: "scale(1)" })
  )
]);

const scaleOut = animation([
  animate(
    "{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",
    style({ opacity: 0, transform: "scale(0.5)" })
  )
]);

@Component({
  standalone: true,
  imports: [CommonModule, IconComponent],
  selector: 'ad-ui-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger("carouselAnimation", [
      transition("void => *", [useAnimation(scaleIn, {params: { time: '500ms' }} )]),
      transition("* => void", [useAnimation(scaleOut, {params: { time: '500ms' }})]),
    ])
  ]
})
export class CarouselComponent {
  public slides = input.required<string[]>();

  protected currentSlide = 0;

  protected onPreviousClicked() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides().length - 1 : previous;
  }

  protected onNextClicked() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides().length ? 0 : next;
  }
}
