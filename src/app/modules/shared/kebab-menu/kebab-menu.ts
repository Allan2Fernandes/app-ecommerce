import { Component, input, model, ModelSignal, output, signal, WritableSignal } from '@angular/core';
import { ICONS } from '../../../constants/icons';
import { MenuOption } from '../../../models/MenuOption';
import { TranslatePipe } from '../../../pipes/translate-pipe';

@Component({
  selector: 'app-kebab-menu',
  imports: [TranslatePipe],
  templateUrl: './kebab-menu.html',
})
export class KebabMenu {
  menuOptions = input.required<MenuOption[]>()
  optionClicked = output<MenuOption>();

  icons = ICONS
  showMenu = signal<boolean>(false);

  toggleMenu() {
    this.showMenu.set(!this.showMenu());
  }
}
