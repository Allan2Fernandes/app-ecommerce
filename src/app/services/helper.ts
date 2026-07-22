import { Injectable } from '@angular/core';

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
}
