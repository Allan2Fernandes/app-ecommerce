import { Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast-service';
import { ToastCard } from "../toast-card/toast-card";

@Component({
  selector: 'app-toast',
  imports: [ToastCard],
  templateUrl: './toast.html',
})
export class Toast {
  toastService = inject(ToastService);
}