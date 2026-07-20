import { Injectable, signal, WritableSignal } from '@angular/core';
import en from '../../assets/localization/en.json'
import dk from '../../assets/localization/dk.json'
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  defaultLanguage: string = 'en';
  languages = ['en', 'dk'];
  private selectedLanguage: WritableSignal<string> = signal<string>(this.defaultLanguage);
  public selectedLanguage$ = toObservable(this.selectedLanguage);
  private translations: Record<string, Record<string, string>> = {
    en,
    dk
  };

  public setSelectedLanguage(lang: string): void {
    if(!this.languages.includes(lang)) {
      return;
    }
    this.selectedLanguage.set(lang);
  }

  public translate(key: string): string {
    return this.translations[this.selectedLanguage()][key] ?? key;
  }

}
