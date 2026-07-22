import { Component, computed, input, output } from '@angular/core';
import { ToastDTO } from '../../../models/ToastDTO';
import { ICONS } from '../../../constants/icons';


@Component({
  selector: 'app-toast-card',
  imports: [],
  templateUrl: './toast-card.html',
})
export class ToastCard {
  icons = ICONS;

  toast = input.required<ToastDTO>()
  closeToast = output<string>();
  baseCardStyle = "flex flex-row items-center w-80 max-w-xs rounded-lg shadow-lg overflow-hidden p-4 gap-2";
  cardStyle = computed(() => {
    let specificCardStyle = this.getTypeSpecificStyle(this.toast());
    return this.baseCardStyle + ' ' + specificCardStyle;
  });

  
  getTypeSpecificStyle(toast: ToastDTO): string {
    switch (toast.type) {
      case 'error':
        return 'bg-red-100';
      case 'info':
        return 'bg-blue-100';
      case 'warning':
        return 'bg-yellow-100';
      case 'success':
        return 'bg-green-100';
    }
  }
}