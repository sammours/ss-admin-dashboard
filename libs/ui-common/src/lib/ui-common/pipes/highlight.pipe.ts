import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, term: string): string {
    if (term === '') {
      return text;
    }
    const regex = new RegExp(term, 'gi'); 
    return text.replace( 
        regex, 
        (match) => `<span class="highlight">${match}</span>` 
    ) 
  }
}