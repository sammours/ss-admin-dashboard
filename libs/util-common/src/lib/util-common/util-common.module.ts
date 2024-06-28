import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// extensions
import './extensions/array.extensions';
import './extensions/string.extensions';

@NgModule({
  imports: [CommonModule],
})
export class UtilCommonModule {}