import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation-service';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  ts = inject(TranslationService)
  transform(key: string): string {
    return this.ts.translate(key);
  }

}
