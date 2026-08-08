import { Component, computed, input, output } from '@angular/core';
import { twMerge } from 'tailwind-merge'

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  text = input.required<string>();
  iconPath = input<string>();
  buttonStyle = input<string>('');
  contentStyle = input<string>('');
  disabled = input<boolean>(false);

  clicked = output<void>();

  buttonStyleBase = 'flex items-center font-medium rounded-lg hover:bg-blue-300';
  contentStyleBase = 'flex items-center justify-center px-3 text-gray-900'

  buttonStyleMerged = computed(() => twMerge(this.buttonStyleBase, this.buttonStyle(), this.disabled() ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' : ''));
  constentStyleMerged = computed(() => twMerge(this.contentStyleBase, this.contentStyle()));
}
