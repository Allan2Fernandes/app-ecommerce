import { OutputEmitterRef } from "@angular/core";

export interface PopupComponent<T> {
  closed: OutputEmitterRef<T>;
}