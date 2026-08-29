import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Helper {
  static isNullOrUndefined(value: unknown): value is null | undefined {
    return value === undefined || value === null;
  }

  static isEmptyString(value: string): boolean {
    return value === ''
  }

  static isFormValid(form: FormGroup): Signal<boolean> {
    return toSignal(
      form.statusChanges.pipe(map(status => status === 'INVALID')),
      { initialValue: form.invalid }
    );
  }
}
