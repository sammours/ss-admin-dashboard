import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { initTooltips } from 'flowbite';

@Directive({
    standalone: true,
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[ad-tooltip]',
  })
  export class TooltipDirective implements OnInit {
    constructor(private readonly el: ElementRef, private readonly renderer: Renderer2, @Inject(DOCUMENT) private readonly document: Document) {
        this.el.nativeElement.setAttribute('class', 'absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700');
        this.el.nativeElement.setAttribute('role', 'tooltip');

        const child = this.document.createElement('div');
        child.classList.add('tooltip-arrow');
        child.setAttribute('data-popper-arrow', '');
        this.renderer.appendChild(this.el.nativeElement, child);
    }

    public ngOnInit(): void {
        initTooltips();
    }
  }