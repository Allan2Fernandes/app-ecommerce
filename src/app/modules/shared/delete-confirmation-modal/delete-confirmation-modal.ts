import { Component, input, output } from '@angular/core';
import { BaseModal } from "../base-modal/base-modal";
import { Button } from "../button/button";
import { DeleteConfirmationModalData } from '../../../models/DeleteConfirmationModalData';
import { TranslatePipe } from '../../../pipes/translate-pipe';
import { ICONS } from '../../../constants/icons';

@Component({
  selector: 'app-delete-confirmation-modal',
  imports: [BaseModal, Button, TranslatePipe],
  templateUrl: './delete-confirmation-modal.html',
})
export class DeleteConfirmationModal {
  icons = ICONS;
  data = input.required<DeleteConfirmationModalData>();
  
  closed = output<boolean>();
}
