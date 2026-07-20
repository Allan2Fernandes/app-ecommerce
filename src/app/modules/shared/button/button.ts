import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  text = input.required<string>();
  iconPath = input<string>();
  buttonStyle = input<string>('flex items-center font-medium rounded-lg hover:bg-blue-300');
  contentStyle = input<string>('flex items-center justify-center px-3 text-gray-900');
  clicked = output<void>();
}
