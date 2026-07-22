import { Injectable, signal, WritableSignal } from '@angular/core';
import { ToastDTO } from '../models/ToastDTO';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: WritableSignal<ToastDTO[]> = signal([]);

  add(toast: ToastDTO) {
    this.toasts.set([
      ...this.toasts(),
      toast
    ]);

    setTimeout(() => {  
      this.toasts.set(this.toasts().filter(_toast => _toast.id !== toast.id));
    }, 3000);
  }

  remove(id: string) {
    this.toasts.set(this.toasts().filter(_toast => _toast.id !== id));
  }
}

